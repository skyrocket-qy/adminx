'use client';
import { useState, useEffect } from 'react';

const SystemStats = () => {
  const [stats, setStats] = useState({
    cpu: 0,
    mem: 0,
    net: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.random() * 100,
        mem: Math.random() * 100,
        net: Math.random() * 100,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const StatBar = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center gap-4">
      <span className="w-16">{label}</span>
      <div className="w-full bg-gray-700/50 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-16 text-right">{value.toFixed(2)}%</span>
    </div>
  );

  return (
    <section className="py-12 px-6 bg-black text-green-500 font-mono z-20 relative">
      <div className="container mx-auto">
        <div className="p-4 border-2 border-green-500/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">System Status</h2>
          <div className="space-y-4">
            <StatBar label="CPU" value={stats.cpu} />
            <StatBar label="Memory" value={stats.mem} />
            <StatBar label="Network" value={stats.net} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemStats;
