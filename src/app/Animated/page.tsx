'use client'

import React from 'react';
import Header from './components/Header';
import Card from './components/Card';

const AnimatedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 overflow-hidden">
      <Header />
      <main className="container mx-auto p-4">
        <div className="flex justify-center items-center h-full mt-32">
          <Card />
        </div>
      </main>
    </div>
  );
};

export default AnimatedPage;
