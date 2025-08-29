'use client'

import React from 'react';
import Header from './components/Header';
import Card from './components/Card';

const GlassmorphismPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 bg-cover bg-center" style={{backgroundImage: "url('/auth_bg.png')"}}>
      <Header />
      <main className="container mx-auto p-4">
        <div className="flex justify-center items-center h-full mt-32">
          <Card />
        </div>
      </main>
    </div>
  );
};

export default GlassmorphismPage;
