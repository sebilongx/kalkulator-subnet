export interface VLSMSubnetInput {
  id: string;
  name: string;
  requiredHosts: number;
}

export interface VLSMSubnetResult {
  id: string;
  name: string;
  requiredHosts: number;
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  cidr: number;
  totalHosts: number;
  usableHosts: number;
  firstUsable: string;
  lastUsable: string;
  ipRange: string;
}

export interface VLSMResult {
  subnets: VLSMSubnetResult[];
  baseNetwork: string;
  baseCidr: number;
  totalBaseHosts: number;
  totalUsedHosts: number;
  totalRemainingHosts: number;
  efficiency: number;
  totalSubnets: number;
  success: boolean;
  error?: string;
}

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function intToIp(int: number): string {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
}

function getRequiredCidr(hosts: number): number {
  // Find smallest CIDR that can accommodate the required hosts
  // usable = 2^(32-cidr) - 2, so we need 2^(32-cidr) >= hosts + 2
  for (let cidr = 32; cidr >= 0; cidr--) {
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? totalHosts : totalHosts - 2;
    if (usableHosts >= hosts) {
      return cidr;
    }
  }
  return 0;
}

export function calculateVLSM(
  baseIp: string,
  baseCidr: number,
  subnetInputs: VLSMSubnetInput[]
): VLSMResult {
  // Validate base IP
  const octets = baseIp.split('.').map(Number);
  if (octets.length !== 4 || octets.some((o) => isNaN(o) || o < 0 || o > 255)) {
    return {
      subnets: [],
      baseNetwork: '',
      baseCidr,
      totalBaseHosts: 0,
      totalUsedHosts: 0,
      totalRemainingHosts: 0,
      efficiency: 0,
      totalSubnets: 0,
      success: false,
      error: 'IP address dasar tidak valid.',
    };
  }

  // Calculate base network
  const baseIpInt = ipToInt(baseIp);
  const baseMaskInt = baseCidr === 0 ? 0 : (~0 << (32 - baseCidr)) >>> 0;
  const baseNetworkInt = baseIpInt & baseMaskInt;
  const baseNetwork = intToIp(baseNetworkInt);
  const baseTotalHosts = Math.pow(2, 32 - baseCidr);

  // Validate subnet inputs
  if (subnetInputs.length === 0) {
    return {
      subnets: [],
      baseNetwork,
      baseCidr,
      totalBaseHosts: baseTotalHosts,
      totalUsedHosts: 0,
      totalRemainingHosts: baseTotalHosts,
      efficiency: 0,
      totalSubnets: 0,
      success: false,
      error: 'Tambahkan minimal satu subnet.',
    };
  }

  // Sort subnets by required hosts (largest first) - this is the key VLSM algorithm
  const sortedInputs = [...subnetInputs].sort((a, b) => b.requiredHosts - a.requiredHosts);

  // Calculate required CIDR for each subnet
  const subnetRequirements = sortedInputs.map((input) => ({
    ...input,
    requiredCidr: getRequiredCidr(input.requiredHosts),
  }));

  // Check if total required hosts fit in base network
  const totalRequired = subnetRequirements.reduce((sum, s) => {
    return sum + Math.pow(2, 32 - s.requiredCidr);
  }, 0);

  if (totalRequired > baseTotalHosts) {
    return {
      subnets: [],
      baseNetwork,
      baseCidr,
      totalBaseHosts: baseTotalHosts,
      totalUsedHosts: 0,
      totalRemainingHosts: 0,
      efficiency: 0,
      totalSubnets: 0,
      success: false,
      error: `Total host yang dibutuhkan (${totalRequired}) melebihi kapasitas network dasar (${baseTotalHosts}).`,
    };
  }

  // Allocate subnets
  const results: VLSMSubnetResult[] = [];
  let currentNetworkInt = baseNetworkInt;

  for (const req of subnetRequirements) {
    const subnetSize = Math.pow(2, 32 - req.requiredCidr);
    const subnetNetworkInt = currentNetworkInt;
    const subnetBroadcastInt = subnetNetworkInt + subnetSize - 1;
    const subnetMaskInt = req.requiredCidr === 0 ? 0 : (~0 << (32 - req.requiredCidr)) >>> 0;

    const totalHosts = subnetSize;
    const usableHosts = req.requiredCidr >= 31 ? totalHosts : totalHosts - 2;

    let firstUsable = '';
    let lastUsable = '';

    if (req.requiredCidr === 32) {
      firstUsable = intToIp(subnetNetworkInt);
      lastUsable = intToIp(subnetNetworkInt);
    } else if (req.requiredCidr === 31) {
      firstUsable = intToIp(subnetNetworkInt);
      lastUsable = intToIp(subnetBroadcastInt);
    } else {
      firstUsable = intToIp(subnetNetworkInt + 1);
      lastUsable = intToIp(subnetBroadcastInt - 1);
    }

    results.push({
      id: req.id,
      name: req.name,
      requiredHosts: req.requiredHosts,
      networkAddress: intToIp(subnetNetworkInt),
      broadcastAddress: intToIp(subnetBroadcastInt),
      subnetMask: intToIp(subnetMaskInt),
      cidr: req.requiredCidr,
      totalHosts,
      usableHosts,
      firstUsable,
      lastUsable,
      ipRange: `${firstUsable} - ${lastUsable}`,
    });

    // Move to next available address
    currentNetworkInt = subnetBroadcastInt + 1;
  }

  // Calculate summary
  const totalUsedHosts = results.reduce((sum, s) => sum + s.totalHosts, 0);
  const totalRemainingHosts = baseTotalHosts - totalUsedHosts;
  const efficiency = baseTotalHosts > 0 ? (totalUsedHosts / baseTotalHosts) * 100 : 0;

  return {
    subnets: results,
    baseNetwork,
    baseCidr,
    totalBaseHosts: baseTotalHosts,
    totalUsedHosts,
    totalRemainingHosts,
    efficiency: Math.round(efficiency * 100) / 100,
    totalSubnets: results.length,
    success: true,
  };
}
