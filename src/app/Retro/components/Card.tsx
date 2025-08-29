import React from 'react';

const Card = () => {
  return (
    <div className="w-full max-w-md bg-gray-300 border-4 border-black rounded-lg shadow-solid-black p-8 space-y-6">
      <h2 className="text-3xl font-bold text-black text-center">LOGIN</h2>
      <div className="space-y-4">
        <div>
          <label className="text-black">USERNAME</label>
          <input
            type="text"
            className="w-full mt-2 p-3 bg-white border-2 border-black rounded-none focus:outline-none"
          />
        </div>
        <div>
          <label className="text-black">PASSWORD</label>
          <input
            type="password"
            className="w-full mt-2 p-3 bg-white border-2 border-black rounded-none focus:outline-none"
          />
        </div>
      </div>
      <button className="w-full p-3 bg-yellow-400 text-black border-2 border-black rounded-none font-bold hover:bg-yellow-500 active:bg-yellow-600 shadow-solid-black-sm">
        LOGIN
      </button>
    </div>
  );
};

export default Card;
