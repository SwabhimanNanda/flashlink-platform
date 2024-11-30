"use client"
import { useState, useEffect } from 'react';

export default function LoadingDots() {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        return prev.length < 3 ? prev + '.' : '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <p className="text-lg font-semibold text-black">Loading{dots}</p>
    </div>
  );
}