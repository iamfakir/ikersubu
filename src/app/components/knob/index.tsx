'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import './knob.css';

interface KnobProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: number;
  label: string;
}

const Knob: React.FC<KnobProps> = ({ value, onChange, min = 0, max = 100, step = 1, size = 80, label }) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startY: number; startValue: number } | null>(null);

  const handleInteractionStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragRef.current = {
      startY: clientY,
      startValue: value,
    };
  };

  const handleInteractionEnd = useCallback(() => {
    setIsDragging(false);
    dragRef.current = null;
  }, []);

  const handleInteractionMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragRef.current) return;

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const { startY, startValue } = dragRef.current;
    const deltaY = startY - clientY;
    const range = max - min;
    const sensitivity = 200; // Adjusted sensitivity

    let newValue = startValue + (deltaY / sensitivity) * range;
    newValue = Math.round(newValue / step) * step;
    newValue = Math.max(min, Math.min(max, newValue));

    onChange(newValue);
  }, [min, max, step, onChange]);

  useEffect(() => {
    const moveHandler = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        handleInteractionMove(e);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('touchmove', moveHandler);
      window.addEventListener('mouseup', handleInteractionEnd);
      window.addEventListener('touchend', handleInteractionEnd);
    } else {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchend', handleInteractionEnd);
    }

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isDragging, handleInteractionMove, handleInteractionEnd]);

  const rotation = ((value - min) / (max - min)) * 270 - 135;

  return (
    <div className="knob-container" style={{ width: size, height: size + 40 }}>
      <div
        ref={knobRef}
        className="knob"
        style={{ width: size, height: size }}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
        <div 
          className={`knob-dial ${isDragging ? 'no-transition' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }} 
        />
      </div>
      <div className="knob-label">{label}</div>
      <div className="knob-value">{value.toFixed(step < 1 ? 2 : 0)}</div>
    </div>
  );
};

export default Knob;