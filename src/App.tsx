import { useState, useCallback } from 'react';
import { calculateSubnet, cidrFromSubnetMask, SubnetResult } from './utils/subnetCalculator';

function App() {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState(24);
  const [inputMode, setInputMode] = useState<'cidr' | 'mask'>('cidr');
  const [subnetMaskInput, setSubnetMaskInput] = useState('255.255.255.0');
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState('');
  const [showBinary, setShowBinary] = useState(false);

  const handleCalculate = useCallback(() => {
    setError('');
    setResult(null);

    let finalCidr = cidr;

    if (inputMode === 'mask') {
      const calculatedCidr = cidrFromSubnetMask(subnetMaskInput);
      if (calculatedCidr === null) {
        setError('Subnet mask tidak valid. Pastikan format benar (contoh: 255.255.255.0)');
        return;
      }
      finalCidr = calculatedCidr;
    }

    const res = calculateSubnet(ip, finalCidr);
    if (!res) {
      setError('IP address tidak valid. Pastikan format benar (contoh: 192.168.1.0)');
      return;
    }
    setResult(res);
  }, [ip, cidr, inputMode, subnetMaskInput]);

  const handleReset = () => {
    setIp('');
    setCidr(24);
    setSubnetMaskInput('');
    setResult(null);
    setError('');
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('id-ID');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">Subnet Mask Calculator</h1>
            <p className="text-sm text-blue-200/70">Kalkulator Subnetting IP Address</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Input Parameter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IP Address Input */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">IP Address</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="192.168.1.0"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
              />
              <p className="text-xs text-white/40 mt-1">Contoh: 192.168.1.0 atau 10.0.0.0</p>
            </div>

            {/* CIDR / Subnet Mask */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                {inputMode === 'cidr' ? 'CIDR Prefix (/)' : 'Subnet Mask'}
              </label>
              
              {/* Toggle */}
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setInputMode('cidr')}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    inputMode === 'cidr'
                      ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  CIDR
                </button>
                <button
                  onClick={() => setInputMode('mask')}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    inputMode === 'mask'
                      ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Subnet Mask
                </button>
              </div>

              {inputMode === 'cidr' ? (
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={cidr}
                    onChange={(e) => setCidr(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                  />
                  <input
                    type="number"
                    min="0"
                    max="32"
                    value={cidr}
                    onChange={(e) => setCidr(parseInt(e.target.value) || 0)}
                    className="w-16 px-3 py-3 bg-white/5 border border-white/20 rounded-xl text-white text-center focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={subnetMaskInput}
                  onChange={(e) => setSubnetMaskInput(e.target.value)}
                  placeholder="255.255.255.0"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                />
              )}
            </div>
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
                Hitung
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
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ResultCard
                label="Network Address"
                value={result.networkAddress}
                icon="🌐"
                color="from-blue-500/20 to-blue-600/20"
                borderColor="border-blue-500/30"
              />
              <ResultCard
                label="Broadcast Address"
                value={result.broadcastAddress}
                icon="📡"
                color="from-purple-500/20 to-purple-600/20"
                borderColor="border-purple-500/30"
              />
              <ResultCard
                label="Subnet Mask"
                value={result.subnetMask}
                icon="🔒"
                color="from-cyan-500/20 to-cyan-600/20"
                borderColor="border-cyan-500/30"
              />
              <ResultCard
                label="Usable Hosts"
                value={formatNumber(result.usableHosts)}
                icon="💻"
                color="from-green-500/20 to-green-600/20"
                borderColor="border-green-500/30"
              />
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Network Info */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informasi Network
                </h3>
                <div className="space-y-3">
                  <ResultRow label="IP Address" value={result.ipAddress} />
                  <ResultRow label="CIDR" value={`/${result.cidr}`} />
                  <ResultRow label="Subnet Mask" value={result.subnetMask} />
                  <ResultRow label="Wildcard Mask" value={result.wildcardMask} />
                  <ResultRow label="Network Address" value={result.networkAddress} highlight />
                  <ResultRow label="Broadcast Address" value={result.broadcastAddress} highlight />
                  <ResultRow label="First Usable Host" value={result.firstUsableHost} />
                  <ResultRow label="Last Usable Host" value={result.lastUsableHost} />
                </div>
              </div>

              {/* Host Info */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  Informasi Host
                </h3>
                <div className="space-y-3">
                  <ResultRow label="Total Hosts" value={formatNumber(result.totalHosts)} />
                  <ResultRow label="Usable Hosts" value={formatNumber(result.usableHosts)} highlight />
                  <ResultRow label="IP Class" value={result.ipClass} />
                  <ResultRow label="IP Type" value={result.ipType} />
                  <ResultRow label="Host Bits" value={`${32 - result.cidr} bit`} />
                  <ResultRow label="Network Bits" value={`${result.cidr} bit`} />
                </div>

                {/* Visual Range Bar */}
                <div className="mt-6">
                  <p className="text-xs text-white/50 mb-2">Range IP Address</p>
                  <div className="relative h-8 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                    <div className="absolute inset-0 flex">
                      <div className="w-[5%] bg-red-500/30 flex items-center justify-center" title="Network">
                        <span className="text-[8px] text-red-300">NET</span>
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-green-500/30 to-green-400/30 flex items-center justify-center">
                        <span className="text-[10px] text-green-300">Usable Hosts</span>
                      </div>
                      <div className="w-[5%] bg-orange-500/30 flex items-center justify-center" title="Broadcast">
                        <span className="text-[8px] text-orange-300">BC</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-white/40">{result.networkAddress}</span>
                    <span className="text-[10px] text-white/40">{result.broadcastAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Binary View */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Representasi Biner
                </h3>
                <button
                  onClick={() => setShowBinary(!showBinary)}
                  className="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-all"
                >
                  {showBinary ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>

              {showBinary && (
                <div className="space-y-3 font-mono text-sm">
                  <BinaryRow label="IP Address" binary={result.binaryIpAddress} />
                  <BinaryRow label="Subnet Mask" binary={result.binarySubnetMask} />
                  <div className="border-t border-white/10 my-2"></div>
                  <BinaryRow label="Network Address" binary={result.binaryNetworkAddress} highlight />
                  <BinaryRow label="Broadcast Address" binary={result.binaryBroadcastAddress} highlight />
                </div>
              )}

              {!showBinary && (
                <p className="text-white/40 text-sm italic">Klik "Tampilkan" untuk melihat representasi biner</p>
              )}
            </div>

            {/* Quick Reference Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Referensi CIDR Umum
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">CIDR</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Subnet Mask</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Total Hosts</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Usable Hosts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cidr: 8, mask: '255.0.0.0', total: 16777216, usable: 16777214 },
                      { cidr: 16, mask: '255.255.0.0', total: 65536, usable: 65534 },
                      { cidr: 20, mask: '255.255.240.0', total: 4096, usable: 4094 },
                      { cidr: 22, mask: '255.255.252.0', total: 1024, usable: 1022 },
                      { cidr: 24, mask: '255.255.255.0', total: 256, usable: 254 },
                      { cidr: 25, mask: '255.255.255.128', total: 128, usable: 126 },
                      { cidr: 26, mask: '255.255.255.192', total: 64, usable: 62 },
                      { cidr: 27, mask: '255.255.255.224', total: 32, usable: 30 },
                      { cidr: 28, mask: '255.255.255.240', total: 16, usable: 14 },
                      { cidr: 30, mask: '255.255.255.252', total: 4, usable: 2 },
                    ].map((row) => (
                      <tr
                        key={row.cidr}
                        className={`border-b border-white/5 ${
                          row.cidr === result.cidr ? 'bg-cyan-500/20 border-cyan-500/30' : 'hover:bg-white/5'
                        } transition-colors`}
                      >
                        <td className="py-2 px-3 font-mono">/{row.cidr}</td>
                        <td className="py-2 px-3 font-mono">{row.mask}</td>
                        <td className="py-2 px-3">{formatNumber(row.total)}</td>
                        <td className="py-2 px-3">{formatNumber(row.usable)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-white/70 mb-2">Masukkan IP Address untuk Mulai</h3>
            <p className="text-white/40 max-w-md mx-auto">
              Masukkan IP address dan pilih CIDR prefix atau subnet mask, lalu klik tombol "Hitung" untuk melihat hasil kalkulasi subnet.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-white/30 text-sm">
          <p>Subnet Mask Calculator &copy; 2025 — Kalkulator Subnetting IP Address</p>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function ResultCard({ label, value, icon, color, borderColor }: { label: string; value: string; icon: string; color: string; borderColor: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} backdrop-blur-md rounded-xl border ${borderColor} p-4`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-white/50 mb-1">{label}</p>
      <p className="text-lg font-bold font-mono">{value}</p>
    </div>
  );
}

function ResultRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 px-3 rounded-lg ${highlight ? 'bg-white/5' : ''}`}>
      <span className="text-white/60 text-sm">{label}</span>
      <span className={`font-mono text-sm font-medium ${highlight ? 'text-cyan-300' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function BinaryRow({ label, binary, highlight = false }: { label: string; binary: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 py-2 px-3 rounded-lg ${highlight ? 'bg-white/5' : ''}`}>
      <span className="text-xs text-white/50">{label}</span>
      <span className={`font-mono text-sm ${highlight ? 'text-cyan-300' : 'text-white/80'} break-all`}>{binary}</span>
    </div>
  );
}

export default App;
