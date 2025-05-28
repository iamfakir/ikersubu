'use client';

import { useEffect, useRef } from 'react';

const WaveAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const width = canvas.width;
    const height = canvas.height;
    const N = 500;
    const dx = 1;
    let t = 0;

    const draw = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 3; // Increased line width for better visibility

      // Draw wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.7)';

      for (let i = 0; i < N; i++) {
        let x = (i - N / 2) * dx;
        let sigma = 30;
        let k0 = 0.2;

        // Gaussian envelope
        let envelope = Math.exp(-x * x / (2 * sigma * sigma));

        // Time-evolving wave
        let real = envelope * Math.cos(k0 * x - 0.02 * t);

        let px = i * (width / N);
        let py = height / 2 - real * 150; // Increased amplitude

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw probability density
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
      for (let i = 0; i < N; i++) {
        let x = (i - N / 2) * dx;
        let sigma = 30;
        let envelope = Math.exp(-x * x / (2 * sigma * sigma));
        let prob = envelope * envelope;

        let px = i * (width / N);
        let py = height / 2 - prob * 400; // Increased amplitude

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      t++;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          opacity: 0.5,
          background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)'
        }}
      />
    </div>
  );
};

export default WaveAnimation;
