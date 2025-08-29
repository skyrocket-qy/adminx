'use client'

import React from 'react';
import Header from './components/Header';
import Card from './components/Card';

const RetroPage = () => {
  return (
    <div className="min-h-screen bg-gray-200 font-mono">
      <Header />
      <main className="container mx-auto p-4">
        <div className="flex justify-center items-center h-full mt-32">
          <Card />
        </div>
      </main>
    </div>
  );
};

export default RetroPage;
