import React from 'react';

interface AudioWaveProps {
  className?: string;
}

const AudioWave: React.FC<AudioWaveProps> = ({ className = '' }) => {
  return (
    <div className={`audio-wave ${className}`}>
      {[...Array(20)].map((_, i) => (
        <div key={i} className="wave-bar" style={{ 
          animationDelay: `${i * 0.1}s`,
          left: `${i * 5}%`
        }} />
      ))}
    </div>
  );
};

export default AudioWave; 