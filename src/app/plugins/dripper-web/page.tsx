'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const DripperWebPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [saturationNode, setSaturationNode] = useState<WaveShaperNode | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [status, setStatus] = useState('Upload an audio file to begin');
  const [fileName, setFileName] = useState('');
  
  const knobRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    createKnobMarkers();
    updateKnobDisplay();
  }, []);

  useEffect(() => {
    updateKnobDisplay();
    updateRealTimeSaturation();
  }, [currentStep]);

  useEffect(() => {
    if (pointerRef.current && markersRef.current) {
      const angle = 180 + (currentStep * 330 / 12);
      pointerRef.current.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      
      // Create markers
      const markersContainer = markersRef.current;
      markersContainer.innerHTML = '';
      
      for (let i = 0; i <= 12; i++) {
        const markerAngle = 180 + (i * 330 / 12);
        const marker = document.createElement('div');
        marker.className = `absolute w-1 h-4 rounded-full ${
          i === currentStep ? 'bg-[#ff6b6b]' : 'bg-white/60'
        }`;
        marker.style.left = '50%';
        marker.style.top = '8px';
        marker.style.transformOrigin = '50% 72px';
        marker.style.transform = `translateX(-50%) rotate(${markerAngle}deg)`;
        markersContainer.appendChild(marker);
      }
    }
  }, [currentStep]);

  const createKnobMarkers = () => {
    if (!markersRef.current) return;
    
    markersRef.current.innerHTML = '';
    const totalAngle = 330;
    const startAngle = 180;
    
    for (let i = 0; i <= 12; i++) {
      const marker = document.createElement('div');
      marker.className = 'knob-marker';
      marker.id = `marker-${i}`;
      
      const angle = startAngle + (i * totalAngle / 12);
      marker.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      
      markersRef.current.appendChild(marker);
    }
  };

  const createSaturationCurve = (amount: number) => {
    const samples = 44100;
    const curve = new Float32Array(samples);
    
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      
      if (currentStep <= 6) {
        // Even harmonics mode - softer saturation
        const evenSat = amount * 0.5;
        curve[i] = Math.tanh(x * (1 + evenSat * 3)) * (1 - evenSat * 0.1);
      } else {
        // Odd harmonics mode - harder saturation
        const oddSat = ((currentStep - 6) / 6) * 0.7;
        curve[i] = x * (1 + oddSat) + Math.sin(x * Math.PI * oddSat) * oddSat * 0.3;
        curve[i] = Math.max(-1, Math.min(1, curve[i]));
      }
    }
    
    return curve;
  };

  const updateRealTimeSaturation = () => {
    if (saturationNode) {
      const saturationAmount = currentStep / 12;
      const curve = createSaturationCurve(saturationAmount);
      saturationNode.curve = curve;
      saturationNode.oversample = '4x';
    }
  };

  const updateKnobDisplay = () => {
    if (!pointerRef.current || !markersRef.current) return;
    
    const totalAngle = 330;
    const startAngle = 180;
    const pointerAngle = startAngle + (currentStep * totalAngle / 12);
    
    pointerRef.current.style.transform = `translateX(-50%) rotate(${pointerAngle}deg)`;
    
    const markers = markersRef.current.querySelectorAll('.knob-marker');
    markers.forEach((marker, index) => {
      if (index <= currentStep) {
        marker.classList.add('active');
      } else {
        marker.classList.remove('active');
      }
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus('Loading audio file...');
    setFileName(file.name);
    
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const arrayBuffer = await file.arrayBuffer();
      const buffer = await context.decodeAudioData(arrayBuffer);
      
      setAudioContext(context);
      setAudioBuffer(buffer);
      setupAudioChain(context);
      setStatus(`Loaded: ${file.name}`);
    } catch (error) {
      setStatus('Error loading audio file');
      console.error('Audio loading error:', error);
    }
  };

  const setupAudioChain = (context: AudioContext) => {
    const gain = context.createGain();
    const saturation = context.createWaveShaper();
    
    gain.connect(context.destination);
    saturation.connect(gain);
    
    setGainNode(gain);
    setSaturationNode(saturation);
    
    // Initialize saturation
    const curve = createSaturationCurve(currentStep / 12);
    saturation.curve = curve;
    saturation.oversample = '4x';
  };

  const playAudio = async () => {
    if (!audioBuffer || !audioContext || !saturationNode || isPlaying) return;

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(saturationNode);
    
    source.onended = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setStatus('Playback finished');
    };

    const offset = isPaused ? pauseTime : 0;
    const when = audioContext.currentTime;
    
    source.start(when, offset);
    setStartTime(when - offset);
    setSourceNode(source);
    setIsPlaying(true);
    setIsPaused(false);
    setStatus('Playing with real-time saturation...');
  };

  const pauseAudio = () => {
    if (isPlaying && sourceNode && audioContext) {
      setPauseTime(audioContext.currentTime - startTime);
      sourceNode.stop();
      setIsPlaying(false);
      setIsPaused(true);
      setStatus('Playback paused');
    }
  };

  const stopAudio = () => {
    if (sourceNode) {
      sourceNode.stop();
      setSourceNode(null);
      setIsPlaying(false);
      setIsPaused(false);
      setPauseTime(0);
      setStatus('Playback stopped');
    }
  };

  const downloadProcessedAudio = async () => {
    if (!audioBuffer || !audioContext) return;

    setStatus('Processing audio for download...');
    
    try {
      const offlineCtx = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      
      const source = offlineCtx.createBufferSource();
      const saturation = offlineCtx.createWaveShaper();
      const gain = offlineCtx.createGain();
      
      source.buffer = audioBuffer;
      saturation.curve = createSaturationCurve(currentStep / 12);
      saturation.oversample = '4x';
      
      source.connect(saturation);
      saturation.connect(gain);
      gain.connect(offlineCtx.destination);
      
      source.start(0);
      
      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = bufferToWav(renderedBuffer);
      const url = URL.createObjectURL(wavBlob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `saturated_audio_step_${currentStep}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setStatus('Download started');
    } catch (error) {
      setStatus('Error processing audio');
      console.error('Download error:', error);
    }
  };

  const bufferToWav = (buffer: AudioBuffer) => {
    const length = buffer.length;
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);
    
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * numberOfChannels * 2, true);
    
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  };

  // Removed knob scroll and click handlers - now using arrow controls

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tripper98') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-[#ff6b6b] mb-4">Enter Password</h2>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-3 rounded-md bg-white/20 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] hover:from-[#ff5252] hover:to-[#ff7979] text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Submit
            </button>
            {error && <p className="text-[#ff6b6b] mt-4">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="h-screen overflow-hidden bg-black text-white flex flex-col">
        {/* Mobile Warning */}
        <div className="md:hidden flex-1 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-[#ff6b6b] mb-4">Desktop Experience Required</h2>
            <p className="text-gray-300 mb-4">This audio processor is best experienced on a desktop or laptop computer for optimal performance and usability.</p>
            <p className="text-sm text-gray-400">Please visit this page on a larger screen to access the full functionality.</p>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden md:flex flex-col h-full">
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl max-w-4xl w-full">
              <h1 className="text-4xl font-light text-center mb-8 text-[#ff6b6b] drop-shadow-lg">
                Dripper Web - Saturation Audio Processor
              </h1>
              
              {/* Upload Section */}
              <div className="text-center mb-8">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] hover:from-[#ff5252] hover:to-[#ff7979] text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Upload Audio File
                </button>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="audio/*" 
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {fileName && (
                  <p className="mt-4 text-gray-300">Loaded: {fileName}</p>
                )}
              </div>

              {/* Knob Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-6">
                  {/* Knob Container */}
                  {/* Knob */}
                  <div 
                    ref={knobRef}
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-[#333] to-[#555] relative shadow-2xl hover:shadow-[#555]/30 transition-all duration-300"
                    style={{
                      boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div ref={markersRef} className="absolute inset-0 pointer-events-none"></div>
                    <div 
                      ref={pointerRef}
                      className={`absolute top-3 left-1/2 w-1 h-16 rounded-full shadow-lg ${currentStep > 6 ? 'bg-gradient-to-b from-[#8e44ad] to-[#9b59b6]' : 'bg-gradient-to-b from-[#ff6b6b] to-[#ff8e8e]'}`}
                        style={{
                          transformOrigin: '50% 77px',
                          transform: 'translateX(-50%) rotate(180deg)',
                          boxShadow: `0 0 15px ${currentStep > 6 ? 'rgba(142, 68, 173, 0.5)' : 'rgba(255, 107, 107, 0.5)'}`,
                          transition: 'transform 0.1s ease-out, background-color 0.3s ease-out, box-shadow 0.3s ease-out' // Added transition for animation
                        }}
                    ></div>
                    
                    {/* Knob Step Numbers */}
                    {Array.from({ length: 13 }, (_, i) => {
                      const angle = 180 + (i * 330 / 12);
                      const radius = 90;
                      const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                      const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
                      return (
                        <div
                          key={i}
                          className="absolute text-xs font-bold text-white pointer-events-none"
                          style={{
                            left: `calc(50% + ${x}px - 6px)`,
                            top: `calc(50% + ${y}px - 6px)`,
                            width: '12px',
                            height: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {i}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Arrows below knob */}
                  <div className="flex justify-center gap-8 mt-4">
                    {/* Left Arrow */}
                    <button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] hover:from-[#7d3c98] hover:to-[#8e44ad] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-5 rounded-full transition-all duration-300 text-xl"
                    >
                      ←
                    </button>
                    
                    {/* Right Arrow */}
                    <button
                      onClick={() => setCurrentStep(Math.min(12, currentStep + 1))}
                      disabled={currentStep === 12}
                      className="bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] hover:from-[#7d3c98] hover:to-[#8e44ad] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-5 rounded-full transition-all duration-300 text-xl"
                    >
                      →
                    </button>
                  </div>
                  
                  {/* Dripper/Tripper Buttons */}
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() => setCurrentStep(1)} // Dripper sets to step 1
                      className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] hover:from-[#ff5252] hover:to-[#ff7979] text-white font-medium py-2 px-4 rounded-full transition-all duration-300 shadow-lg"
                    >
                      Dripper
                    </button>
                    <button
                      onClick={() => setCurrentStep(7)} // Tripper sets to step 7
                      className="bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] hover:from-[#7d3c98] hover:to-[#8e44ad] text-white font-medium py-2 px-4 rounded-full transition-all duration-300 shadow-lg"
                    >
                      Tripper
                    </button>
                  </div>
                  
                  {/* Step Display */}
                  
                  
                  
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 mb-6">
                <button 
                  onClick={playAudio}
                  disabled={!audioBuffer || isPlaying}
                  className="bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] hover:from-[#7d3c98] hover:to-[#8e44ad] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  Play
                </button>
                <button 
                  onClick={pauseAudio}
                  disabled={!isPlaying}
                  className="bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] hover:from-[#7d3c98] hover:to-[#8e44ad] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  Pause
                </button>
                <button 
                  onClick={stopAudio}
                  disabled={!audioBuffer}
                  className="bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] hover:from-[#7d3c98] hover:to-[#8e44ad] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  Stop
                </button>
                <button 
                  onClick={downloadProcessedAudio}
                  disabled={!audioBuffer}
                  className="bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] hover:from-[#7d3c98] hover:to-[#8e44ad] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  Download
                </button>
              </div>

              {/* Status */}
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <p className="text-gray-300">{status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .knob-marker {
          position: absolute;
          width: 2px;
          height: 15px;
          background: rgba(255, 255, 255, 0.6);
          top: 5px;
          left: 50%;
          transform-origin: 50% 75px;
          transform: translateX(-50%);
          transition: all 0.3s ease;
        }
        
        .knob-marker.active {
          background: #ff6b6b;
          box-shadow: 0 0 8px rgba(255, 107, 107, 0.8);
        }
      `}</style>
    </>
  );
};

export default DripperWebPage;