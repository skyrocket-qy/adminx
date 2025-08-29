import React from 'react';

const Card = () => {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6">
      <h2 className="text-3xl font-bold text-white text-center">Login</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white/80">Username</label>
          <input
            type="text"
            className="w-full mt-2 p-3 bg-white/20 rounded-lg border border-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none text-white"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="text-white/80">Password</label>
          <input
            type="password"
            className="w-full mt-2 p-3 bg-white/20 rounded-lg border border-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none text-white"
            placeholder="Enter your password"
          />
        </div>
      </div>
      <button className="w-full p-3 bg-indigo-500 text-white rounded-lg font-bold hover:bg-indigo-600 transition-colors">
        Login
      </button>
    </div>
  );
};

export default Card;
