import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait a bit before hiding splash screen
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500); // Wait for fade out animation
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random increment between 5-20
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#1a1a2e] flex items-center justify-center transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background Grid */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="splashGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.5"/>
            </pattern>
            <filter id="splashGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#splashGrid)" filter="url(#splashGlow)" opacity="0.3" />
        </svg>
      </div>

      {/* Blur Orbs */}
      <div className="absolute top-1/4 left-[15%] w-80 h-80 bg-[#1e40af]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-[15%] w-96 h-96 bg-[#7c3aed]/25 rounded-full blur-3xl animate-pulse"></div>

      <div className="text-center z-10">
        {/* Logo/Name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-glow-purple animate-pulse">
          Aamir Naqvi
        </h1>
        
        {/* Loading Bar */}
        <div className="w-64 md:w-80 mx-auto mb-4">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <p className="text-gray-400 text-sm md:text-base text-glow-gray">
          Loading Portfolio... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;