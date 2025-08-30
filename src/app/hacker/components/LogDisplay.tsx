'use client';
import { useState, useEffect } from 'react';

const LogDisplay = () => {
  const [logs, setLogs] = useState<{ message: string; status: 'info' | 'success' | 'error' }[]>([]);
  const logLines = [
    { message: "Initializing connection to target mainframe...", status: 'info' },
    { message: "IP: 192.168.1.101... Port: 443", status: 'info' },
    { message: "Connection encrypted. SSL handshake complete.", status: 'success' },
    { message: "Attempting to bypass firewall... Rule #3 bypassed.", status: 'info' },
    { message: "Rule #7 bypassed. Rule #12 bypassed.", status: 'info' },
    { message: "Firewall penetration successful.", status: 'success' },
    { message: "Gaining root access... ", status: 'info' },
    { message: "Authentication required. Using brute force attack.", status: 'info' },
    { message: "Password found: 'password123'. Access granted.", status: 'success' },
    { message: "Downloading sensitive data... accounts.zip (4.7 GB)", status: 'info' },
    { message: "Download complete. Covering tracks...", status: 'success' },
    { message: "Deleting server logs... ERROR: Permission denied.", status: 'error' },
    { message: "Disconnecting from mainframe.", status: 'info' },
  ] as const;

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

  const getStatusClass = (status: 'info' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section className="py-20 px-6 bg-black text-green-500 font-mono z-20 relative">
      <div className="container mx-auto">
        <div className="w-full h-64 bg-gray-900/50 p-4 border-2 border-green-500/50 rounded-lg overflow-y-scroll">
          {logs.map((log, index) => (
            <p key={index} className={`text-sm ${getStatusClass(log.status)}`}>
              <span className="text-gray-500">{`[${new Date().toLocaleTimeString()}] `}</span>
              <span className={`font-bold ${getStatusClass(log.status)}`}>
                {log.status.toUpperCase()}:
              </span> {log.message}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogDisplay;
