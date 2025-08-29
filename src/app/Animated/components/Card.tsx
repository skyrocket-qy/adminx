'use client'
import React from 'react';

const Card = () => {
  return (
    <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-6 transform hover:scale-105 transition-transform duration-500">
      <h2 className="text-3xl font-bold text-white text-center animate-fade-in-down">
        Login
      </h2>
      <div className="space-y-4 animate-fade-in-up animation-delay-300">
        <div>
          <label className="text-white/80">Username</label>
          <input
            type="text"
            className="w-full mt-2 p-3 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-white/60 focus:outline-none text-white transition-all duration-300 focus:bg-white/40"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="text-white/80">Password</label>
          <input
            type="password"
            className="w-full mt-2 p-3 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-white/60 focus:outline-none text-white transition-all duration-300 focus:bg-white/40"
            placeholder="Enter your password"
          />
        </div>
      </div>
      <button className="w-full p-3 bg-pink-500 text-white rounded-lg font-bold hover:bg-pink-600 transition-transform transform hover:scale-105 active:scale-95 duration-300 animate-bounce-in animation-delay-600">
        Login
      </button>
    </div>
  );
};

export default Card;

const styles = `
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out forwards;
}
.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}
.animate-bounce-in {
  animation: bounce-in 0.6s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}
.animation-delay-600 {
  animation-delay: 0.6s;
}
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
