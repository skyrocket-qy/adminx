'use client';
import { useState, useEffect } from 'react';

const LogDisplay = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logLines = [
    "Initializing connection to target mainframe...",
    "IP: 192.168.1.101... Port: 443",
    "Connection encrypted. SSL handshake complete.",
    "Attempting to bypass firewall... Rule #3 bypassed.",
    "Rule #7 bypassed. Rule #12 bypassed.",
    "Firewall penetration successful.",
    "Gaining root access... ",
    "Authentication required. Using brute force attack.",
    "Password found: 'password123'. Access granted.",
    "Downloading sensitive data... accounts.zip (4.7 GB)",
    "Download complete. Covering tracks...",
    "Deleting server logs... Done.",
    "Disconnecting from mainframe.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prevLogs => {
        if (prevLogs.length < logLines.length) {
          return [...prevLogs, logLines[prevLogs.length]];
        }
        clearInterval(interval);
        return prevLogs;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-black text-green-500 font-mono z-20 relative">
      <div className="container mx-auto">
        <div className="w-full h-64 bg-gray-900/50 p-4 border-2 border-green-500/50 rounded-lg overflow-y-scroll">
          {logs.map((log, index) => (
            <p key={index} className="text-sm">
              <span className="text-gray-500">{`[${new Date().toLocaleTimeString()}] `}</span>
              {log}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogDisplay;
