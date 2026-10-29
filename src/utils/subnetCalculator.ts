export interface SubnetResult {
  ipAddress: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableHost: string;
  lastUsableHost: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  ipType: string;
  binarySubnetMask: string;
  binaryIpAddress: string;
  binaryNetworkAddress: string;
  binaryBroadcastAddress: string;
}

function ipToBinary(ip: string): string {
  return ip
    .split('.')
    .map((octet) => parseInt(octet).toString(2).padStart(8, '0'))
    .join('.');
}

function binaryToIp(binary: string): string {
  return binary
    .split('.')
    .map((octet) => parseInt(octet, 2).toString())
    .join('.');
}

function getIpClass(firstOctet: number): string {
  if (firstOctet >= 1 && firstOctet <= 126) return 'Class A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'Class B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'Class C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'Class D (Multicast)';
  if (firstOctet >= 240 && firstOctet <= 255) return 'Class E (Reserved)';
  return 'Unknown';
}

function getIpType(ip: string): string {
  const octets = ip.split('.').map(Number);
  
  // Private ranges
  if (octets[0] === 10) return 'Private (RFC 1918)';
  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return 'Private (RFC 1918)';
  if (octets[0] === 192 && octets[1] === 168) return 'Private (RFC 1918)';
  
  // Loopback
  if (octets[0] === 127) return 'Loopback';
  
  // Link-local
  if (octets[0] === 169 && octets[1] === 254) return 'Link-Local (APIPA)';
  
  // Multicast
  if (octets[0] >= 224 && octets[0] <= 239) return 'Multicast';
  
  return 'Public';
}

export function calculateSubnet(ip: string, cidr: number): SubnetResult | null {
  // Validate IP
  const octets = ip.split('.').map(Number);
  if (octets.length !== 4 || octets.some((o) => isNaN(o) || o < 0 || o > 255)) {
    return null;
  }

  // Validate CIDR
  if (cidr < 0 || cidr > 32) {
    return null;
  }

  // Calculate subnet mask
  const maskBinary = '1'.repeat(cidr).padEnd(32, '0');
  const subnetMask = binaryToIp(
    maskBinary.slice(0, 8) + '.' + maskBinary.slice(8, 16) + '.' + maskBinary.slice(16, 24) + '.' + maskBinary.slice(24, 32)
  );

  // Calculate wildcard mask
  const wildcardBinary = '0'.repeat(cidr).padEnd(32, '1');
  const wildcardMask = binaryToIp(
    wildcardBinary.slice(0, 8) + '.' + wildcardBinary.slice(8, 16) + '.' + wildcardBinary.slice(16, 24) + '.' + wildcardBinary.slice(24, 32)
  );

  // Convert IP to binary
  const ipBinary = ipToBinary(ip);
  const ipBinaryStr = ipBinary.replace(/\./g, '');

  // Calculate network address
  const networkBinaryStr = ipBinaryStr
    .split('')
    .map((bit, i) => (i < cidr ? bit : '0'))
    .join('');

  const networkBinary =
    networkBinaryStr.slice(0, 8) + '.' + networkBinaryStr.slice(8, 16) + '.' + networkBinaryStr.slice(16, 24) + '.' + networkBinaryStr.slice(24, 32);
  const networkAddress = binaryToIp(networkBinary);

  // Calculate broadcast address
  const broadcastBinaryStr = ipBinaryStr
    .split('')
    .map((bit, i) => (i < cidr ? bit : '1'))
    .join('');

  const broadcastBinary =
    broadcastBinaryStr.slice(0, 8) + '.' + broadcastBinaryStr.slice(8, 16) + '.' + broadcastBinaryStr.slice(16, 24) + '.' + broadcastBinaryStr.slice(24, 32);
  const broadcastAddress = binaryToIp(broadcastBinary);

  // Calculate hosts
  const hostBits = 32 - cidr;
  const totalHosts = Math.pow(2, hostBits);
  const usableHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : totalHosts - 2;

  // Calculate first and last usable hosts
  let firstUsableHost = '';
  let lastUsableHost = '';

  if (cidr === 32) {
    firstUsableHost = ip;
    lastUsableHost = ip;
  } else if (cidr === 31) {
    firstUsableHost = networkAddress;
    lastUsableHost = broadcastAddress;
  } else {
    const firstBinary = networkBinaryStr
      .split('')
      .map((bit, i) => (i === 31 ? '1' : bit))
      .join('');
    const lastBinary = broadcastBinaryStr
      .split('')
      .map((bit, i) => (i === 31 ? '0' : bit))
      .join('');

    firstUsableHost = binaryToIp(
      firstBinary.slice(0, 8) + '.' + firstBinary.slice(8, 16) + '.' + firstBinary.slice(16, 24) + '.' + firstBinary.slice(24, 32)
    );
    lastUsableHost = binaryToIp(
      lastBinary.slice(0, 8) + '.' + lastBinary.slice(8, 16) + '.' + lastBinary.slice(16, 24) + '.' + lastBinary.slice(24, 32)
    );
  }

  const formattedBinaryMask = maskBinary.slice(0, 8) + '.' + maskBinary.slice(8, 16) + '.' + maskBinary.slice(16, 24) + '.' + maskBinary.slice(24, 32);

  return {
    ipAddress: ip,
    cidr,
    subnetMask,
    wildcardMask,
    networkAddress,
    broadcastAddress,
    firstUsableHost,
    lastUsableHost,
    totalHosts,
    usableHosts,
    ipClass: getIpClass(octets[0]),
    ipType: getIpType(ip),
    binarySubnetMask: formattedBinaryMask,
    binaryIpAddress: ipBinary,
    binaryNetworkAddress: networkBinary,
    binaryBroadcastAddress: broadcastBinary,
  };
}

export function cidrFromSubnetMask(mask: string): number | null {
  const octets = mask.split('.').map(Number);
  if (octets.length !== 4 || octets.some((o) => isNaN(o) || o < 0 || o > 255)) {
    return null;
  }

  const binary = octets.map((o) => o.toString(2).padStart(8, '0')).join('');
  
  // Validate it's a proper subnet mask (all 1s followed by all 0s)
  const match = binary.match(/^1*0*$/);
  if (!match) return null;

  return binary.split('').filter((b) => b === '1').length;
}
