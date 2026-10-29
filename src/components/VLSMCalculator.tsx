import { useState } from 'react';
import { calculateVLSM, VLSMSubnetInput, VLSMResult } from '../utils/vlsmCalculator';

let nextId = 1;

function VLSMCalculator() {
  const [baseIp, setBaseIp] = useState('192.168.1.0');
  const [baseCidr, setBaseCidr] = useState(24);
  const [subnets, setSubnets] = useState<VLSMSubnetInput[]>([
    { id: '1', name: 'Departemen IT', requiredHosts: 50 },
    { id: '2', name: 'Departemen HR', requiredHosts: 25 },
    { id: '3', name: 'Departemen Finance', requiredHosts: 10 },
  ]);
  const [result, setResult] = useState<VLSMResult | null>(null);
  const [error, setError] = useState('');

  const addSubnet = () => {
    setSubnets([...subnets, { id: String(++nextId), name: '', requiredHosts: 10 }]);
  };

  const removeSubnet = (id: string) => {
    if (subnets.length <= 1) return;
    setSubnets(subnets.filter((s) => s.id !== id));
  };

  const updateSubnet = (id: string, field: 'name' | 'requiredHosts', value: string | number) => {
    setSubnets(
      subnets.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    // Validate inputs
    const emptyNames = subnets.filter((s) => !s.name.trim());
    if (emptyNames.length > 0) {
      setError('Semua subnet harus memiliki nama.');
      return;
    }

    const invalidHosts = subnets.filter((s) => s.requiredHosts <= 0);
    if (invalidHosts.length > 0) {
      setError('Jumlah host harus lebih dari 0.');
      return;
    }

    const res = calculateVLSM(baseIp, baseCidr, subnets);
    if (!res.success) {
      setError(res.error || 'Terjadi kesalahan.');
      return;
    }
    setResult(res);
  };

  const handleReset = () => {
    setBaseIp('192.168.1.0');
    setBaseCidr(24);
    setSubnets([{ id: String(++nextId), name: '', requiredHosts: 10 }]);
    setResult(null);
    setError('');
  };

  const formatNumber = (num: number): string => num.toLocaleString('id-ID');

  return (
    <div className="space-y-6">
      {/* Base Network Input */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          Network Dasar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">IP Address</label>
            <input
              type="text"
              value={baseIp}
              onChange={(e) => setBaseIp(e.target.value)}
              placeholder="192.168.1.0"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">CIDR Prefix</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="32"
                value={baseCidr}
                onChange={(e) => setBaseCidr(parseInt(e.target.value))}
                className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
              />
              <input
                type="number"
                min="0"
                max="32"
                value={baseCidr}
                onChange={(e) => setBaseCidr(parseInt(e.target.value) || 0)}
                className="w-16 px-3 py-3 bg-white/5 border border-white/20 rounded-xl text-white text-center focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subnet Rows */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Daftar Subnet ({subnets.length})
          </h2>
          <button
            onClick={addSubnet}
            className="px-3 py-1.5 text-sm bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 rounded-lg transition-all flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Subnet
          </button>
        </div>

        <div className="space-y-3">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-3 text-xs text-white/50 font-medium px-2">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Nama Subnet</div>
            <div className="col-span-4">Jumlah Host Dibutuhkan</div>
            <div className="col-span-2 text-right">Aksi</div>
          </div>

          {/* Subnet Rows */}
          {subnets.map((subnet, index) => (
            <div
              key={subnet.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-white/5 rounded-xl p-3 border border-white/5"
            >
              <div className="hidden md:block col-span-1 text-white/40 font-mono text-sm">
                {index + 1}
              </div>
              <div className="md:col-span-5">
                <label className="md:hidden text-xs text-white/50 block mb-1">Nama Subnet</label>
                <input
                  type="text"
                  value={subnet.name}
                  onChange={(e) => updateSubnet(subnet.id, 'name', e.target.value)}
                  placeholder="Nama subnet..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                />
              </div>
              <div className="md:col-span-4">
                <label className="md:hidden text-xs text-white/50 block mb-1">Jumlah Host</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={subnet.requiredHosts}
                    onChange={(e) => updateSubnet(subnet.id, 'requiredHosts', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  />
                  <span className="text-xs text-white/40 whitespace-nowrap">hosts</span>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={() => removeSubnet(subnet.id)}
                  disabled={subnets.length <= 1}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Hapus subnet"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Hitung VLSM
            </span>
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white/70 hover:text-white font-semibold rounded-xl transition-all active:scale-95"
          >
            Reset
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && result.success && (
        <div className="space-y-6 animate-fadeIn">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard
              label="Total Subnet"
              value={String(result.totalSubnets)}
              icon="📦"
              color="from-blue-500/20 to-blue-600/20"
              borderColor="border-blue-500/30"
            />
            <SummaryCard
              label="Host Terpakai"
              value={formatNumber(result.totalUsedHosts)}
              icon="💻"
              color="from-green-500/20 to-green-600/20"
              borderColor="border-green-500/30"
            />
            <SummaryCard
              label="Host Tersisa"
              value={formatNumber(result.totalRemainingHosts)}
              icon="📊"
              color="from-yellow-500/20 to-yellow-600/20"
              borderColor="border-yellow-500/30"
            />
            <SummaryCard
              label="Efisiensi"
              value={`${result.efficiency}%`}
              icon="⚡"
              color="from-purple-500/20 to-purple-600/20"
              borderColor="border-purple-500/30"
            />
          </div>

          {/* Results Table */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Hasil Pembagian Subnet
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-3 text-white/60 font-medium">Nama</th>
                    <th className="text-left py-3 px-3 text-white/60 font-medium">Network</th>
                    <th className="text-left py-3 px-3 text-white/60 font-medium">Mask</th>
                    <th className="text-left py-3 px-3 text-white/60 font-medium">CIDR</th>
                    <th className="text-left py-3 px-3 text-white/60 font-medium">Broadcast</th>
                    <th className="text-left py-3 px-3 text-white/60 font-medium">Usable</th>
                    <th className="text-left py-3 px-3 text-white/60 font-medium">IP Range</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subnets.map((subnet, index) => (
                    <tr
                      key={subnet.id}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        index % 2 === 0 ? 'bg-white/[0.02]' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-xs text-cyan-300 font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-white">{subnet.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-cyan-300">{subnet.networkAddress}</td>
                      <td className="py-3 px-3 font-mono text-white/70">{subnet.subnetMask}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-400/30 rounded text-blue-300 text-xs font-mono">
                          /{subnet.cidr}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-orange-300">{subnet.broadcastAddress}</td>
                      <td className="py-3 px-3 font-mono text-green-300">{formatNumber(subnet.usableHosts)}</td>
                      <td className="py-3 px-3 font-mono text-white/60 text-xs">{subnet.ipRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Allocation Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Visualisasi Alokasi
            </h3>
            <div className="space-y-3">
              <div className="flex h-8 rounded-lg overflow-hidden border border-white/10">
                {result.subnets.map((subnet, index) => {
                  const widthPercent = (subnet.totalHosts / result.totalBaseHosts) * 100;
                  const colors = [
                    'bg-blue-500/60',
                    'bg-cyan-500/60',
                    'bg-green-500/60',
                    'bg-yellow-500/60',
                    'bg-purple-500/60',
                    'bg-pink-500/60',
                    'bg-orange-500/60',
                    'bg-red-500/60',
                    'bg-teal-500/60',
                    'bg-indigo-500/60',
                  ];
                  return (
                    <div
                      key={subnet.id}
                      className={`${colors[index % colors.length]} flex items-center justify-center border-r border-white/10 last:border-r-0`}
                      style={{ width: `${Math.max(widthPercent, 2)}%` }}
                      title={`${subnet.name}: ${subnet.networkAddress} (/${subnet.cidr})`}
                    >
                      {widthPercent > 5 && (
                        <span className="text-[10px] text-white font-medium truncate px-1">
                          {subnet.name}
                        </span>
                      )}
                    </div>
                  );
                })}
                {result.totalRemainingHosts > 0 && (
                  <div
                    className="bg-white/10 flex items-center justify-center"
                    style={{ width: `${(result.totalRemainingHosts / result.totalBaseHosts) * 100}%` }}
                    title={`Sisa: ${result.totalRemainingHosts} hosts`}
                  >
                    {(result.totalRemainingHosts / result.totalBaseHosts) * 100 > 5 && (
                      <span className="text-[10px] text-white/50">Sisa</span>
                    )}
                  </div>
                )}
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-2">
                {result.subnets.map((subnet, index) => {
                  const colors = [
                    'bg-blue-500/60',
                    'bg-cyan-500/60',
                    'bg-green-500/60',
                    'bg-yellow-500/60',
                    'bg-purple-500/60',
                    'bg-pink-500/60',
                    'bg-orange-500/60',
                    'bg-red-500/60',
                    'bg-teal-500/60',
                    'bg-indigo-500/60',
                  ];
                  return (
                    <div key={subnet.id} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded ${colors[index % colors.length]}`}></div>
                      <span className="text-xs text-white/60">{subnet.name}</span>
                    </div>
                  );
                })}
                {result.totalRemainingHosts > 0 && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-white/10 border border-white/20"></div>
                    <span className="text-xs text-white/60">Sisa ({formatNumber(result.totalRemainingHosts)})</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !error && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📐</div>
          <h3 className="text-lg font-semibold text-white/60 mb-2">VLSM Calculator</h3>
          <p className="text-white/40 max-w-md mx-auto text-sm">
            Masukkan network dasar dan tambahkan subnet yang dibutuhkan. VLSM akan otomatis membagi alamat IP secara efisien dari subnet terbesar ke terkecil.
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon, color, borderColor }: { label: string; value: string; icon: string; color: string; borderColor: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} backdrop-blur-md rounded-xl border ${borderColor} p-4`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-white/50 mb-1">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

export default VLSMCalculator;
