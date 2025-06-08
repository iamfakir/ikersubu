"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiUpload, FiDownload } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Audio processing setup
const setupAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

// Placeholder for the audio file. Replace with your own if needed.
const DEMO_AUDIO = "/assets/audio/demo.mp3";

function bufferToWav(buffer: AudioBuffer): Blob {
  // Adapted from https://github.com/Jam3/audiobuffer-to-wav
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const bufferArray = new ArrayBuffer(length);
  const view = new DataView(bufferArray);
  // RIFF chunk descriptor
  let offset = 0;
  function writeString(s: string) {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
    offset += s.length;
  }
  writeString('RIFF');
  view.setUint32(offset, length - 8, true); offset += 4;
  writeString('WAVE');
  writeString('fmt ');
  view.setUint32(offset, 16, true); offset += 4;
  view.setUint16(offset, 1, true); offset += 2;
  view.setUint16(offset, numOfChan, true); offset += 2;
  view.setUint32(offset, buffer.sampleRate, true); offset += 4;
  view.setUint32(offset, buffer.sampleRate * 2 * numOfChan, true); offset += 4;
  view.setUint16(offset, numOfChan * 2, true); offset += 2;
  view.setUint16(offset, 16, true); offset += 2;
  writeString('data');
  view.setUint32(offset, length - offset - 4, true); offset += 4;
  // Write PCM samples
  for (let i = 0; i < buffer.length; i++) {
    for (let ch = 0; ch < numOfChan; ch++) {
      let sample = buffer.getChannelData(ch)[i];
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }
  return new Blob([bufferArray], { type: 'audio/wav' });
}

const AirfryPage = () => {
  // Audio state
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [presence, setPresence] = useState(50);
  const [wet, setWet] = useState(50);
  const [fileName, setFileName] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  // Audio nodes refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const presenceNodeRef = useRef<BiquadFilterNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const wetGainRef = useRef<GainNode | null>(null);
  const mergerRef = useRef<GainNode | null>(null);

  // Initialize audio context and load default audio
  useEffect(() => {
    audioContextRef.current = setupAudioContext();
    
    // Load default audio
    const loadDemoAudio = async () => {
      try {
        const response = await fetch(DEMO_AUDIO);
        if (!response.ok) {
          console.error('Failed to load demo audio');
          return;
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer);
        setAudioBuffer(audioBuffer);
      } catch (error) {
        console.error('Error loading demo audio:', error);
      }
    };

    loadDemoAudio();

    // Cleanup function
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current.disconnect();
      }
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, []);

  // Update audio processing when settings change
  useEffect(() => {
    if (!audioContextRef.current || !presenceNodeRef.current || !dryGainRef.current || !wetGainRef.current) return;
    
    const now = audioContextRef.current.currentTime;
    
    // Update presence (0-6dB boost at 7kHz)
    presenceNodeRef.current.gain.setValueAtTime((presence / 100) * 6, now);
    
    // Update wet/dry mix
    dryGainRef.current.gain.setValueAtTime(1 - wet / 100, now);
    wetGainRef.current.gain.setValueAtTime(wet / 100, now);
  }, [presence, wet]);

  // Handle audio file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      if (!arrayBuffer || !audioContextRef.current) return;
      
      audioContextRef.current.decodeAudioData(arrayBuffer)
        .then((buffer) => {
          setAudioBuffer(buffer);
          // Reset playback state when new file is loaded
          if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current.disconnect();
            audioSourceRef.current = null;
          }
          setIsPlaying(false);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  // Initialize audio nodes
  const initializeAudioNodes = () => {
    if (!audioContextRef.current || !audioBuffer) return;
    
    // Create audio nodes if they don't exist
    if (!presenceNodeRef.current) {
      presenceNodeRef.current = audioContextRef.current.createBiquadFilter();
      presenceNodeRef.current.type = "highshelf";
      presenceNodeRef.current.frequency.value = 7000; // 7 kHz
      presenceNodeRef.current.gain.value = (presence / 100) * 6; // 0-6dB
    }
    
    if (!dryGainRef.current) {
      dryGainRef.current = audioContextRef.current.createGain();
      dryGainRef.current.gain.value = 1 - wet / 100;
    }
    
    if (!wetGainRef.current) {
      wetGainRef.current = audioContextRef.current.createGain();
      wetGainRef.current.gain.value = wet / 100;
    }
    
    if (!mergerRef.current) {
      mergerRef.current = audioContextRef.current.createGain();
    }
  };

  // Play audio with current settings
  const playAudio = () => {
    if (!audioBuffer || !audioContextRef.current) return;
    
    // Resume audio context if it's in a suspended state
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    // Stop any currently playing audio
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current.disconnect();
    }
    
    // Initialize audio nodes
    initializeAudioNodes();
    
    // Create new source
    audioSourceRef.current = audioContextRef.current.createBufferSource();
    audioSourceRef.current.buffer = audioBuffer;
    
    // Connect nodes
    audioSourceRef.current.connect(dryGainRef.current!);
    audioSourceRef.current.connect(presenceNodeRef.current!);
    presenceNodeRef.current!.connect(wetGainRef.current!);
    dryGainRef.current!.connect(mergerRef.current!);
    wetGainRef.current!.connect(mergerRef.current!);
    mergerRef.current!.connect(audioContextRef.current.destination);
    
    // Start playback
    audioSourceRef.current.start(0);
    setIsPlaying(true);
    
    // Clean up when playback ends
    audioSourceRef.current.onended = () => {
      setIsPlaying(false);
    };
  };

  // Stop audio playback
  const stopAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
    }
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  // Process and download the audio
  const processAndDownload = async () => {
    if (!audioBuffer || !audioContextRef.current) return;
    
    try {
      // Create offline context for rendering
      const offlineCtx = new (window.OfflineAudioContext || (window as any).webkitOfflineAudioContext)(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      
      // Create offline audio nodes
      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      
      const presenceNode = offlineCtx.createBiquadFilter();
      presenceNode.type = "highshelf";
      presenceNode.frequency.value = 7000;
      presenceNode.gain.value = (presence / 100) * 6;
      
      const dryGain = offlineCtx.createGain();
      const wetGain = offlineCtx.createGain();
      dryGain.gain.value = 1 - wet / 100;
      wetGain.gain.value = wet / 100;
      
      const merger = offlineCtx.createGain();
      
      // Connect nodes for offline processing
      source.connect(dryGain);
      source.connect(presenceNode);
      presenceNode.connect(wetGain);
      dryGain.connect(merger);
      wetGain.connect(merger);
      merger.connect(offlineCtx.destination);
      
      // Start rendering
      source.start(0);
      const renderedBuffer = await offlineCtx.startRendering();
      
      // Create download link
      const blob = bufferToWav(renderedBuffer);
      const url = URL.createObjectURL(blob);
      
      // Trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `airfry_processed_${fileName || 'audio'}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  // Enhanced RangeInput component with better styling and feedback
  const RangeInput = ({ 
    value, 
    min, 
    max, 
    onChange, 
    label, 
    unit = '%',
    className = '' 
  }: {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    label: string;
    unit?: string;
    className?: string;
  }) => {
    // Calculate the percentage for the progress fill
    const progress = ((value - min) / (max - min)) * 100;
    
    // Generate a unique ID for the input to ensure proper CSS targeting
    const inputId = `range-${label.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
      <div className={`flex flex-col w-full ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <label 
            htmlFor={inputId}
            className="text-platinum-300 text-sm font-medium cursor-pointer hover:text-platinum-100 transition-colors"
          >
            {label}
          </label>
          <span className="text-cyan-300 text-sm font-mono bg-black/30 px-2 py-0.5 rounded">
            {value}{unit}
          </span>
        </div>
        <div className="relative">
          <input
            id={inputId}
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              onChange(newValue);
              // Update the visual feedback
              const input = e.target as HTMLInputElement;
              input.style.setProperty('--value', `${((newValue - min) / (max - min)) * 100}%`);
            }}
            className="w-full range-slider"
            style={{
              '--value': `${progress}%`,
              '--min': min,
              '--max': max,
              '--thumb-size': '18px',
              '--track-height': '6px',
              '--track-color': '#1f2937',
              '--progress-color': '#06b6d4',
              '--thumb-color': '#ffffff',
              '--thumb-border': '#06b6d4',
            } as React.CSSProperties}
            onMouseDown={(e) => {
              const input = e.target as HTMLInputElement;
              input.classList.add('active');
            }}
            onMouseUp={(e) => {
              const input = e.target as HTMLInputElement;
              input.classList.remove('active');
            }}
            onTouchStart={(e) => {
              const input = e.target as HTMLInputElement;
              input.classList.add('active');
            }}
            onTouchEnd={(e) => {
              const input = e.target as HTMLInputElement;
              input.classList.remove('active');
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-platinum-200">AIRFRY</h1>

        <div className="max-w-2xl mx-auto bg-black rounded-xl border border-platinum-800 p-6 shadow-2xl">
          {/* File Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-platinum-300 mb-3 text-center">
              UPLOAD AUDIO
            </label>
            <div className="flex justify-center">
              <label className="cursor-pointer group">
                <div className="px-6 py-2 border-2 border-platinum-600 rounded-full text-platinum-200 group-hover:bg-platinum-800/30 transition-colors duration-300 flex items-center gap-2">
                  <FiUpload className="text-platinum-400" />
                  <span>{fileName || 'Choose file...'}</span>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="audio/*" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Main Controls */}
          <div className="space-y-8 mb-8">
            {/* Play/Pause Button */}
            <div className="flex justify-center">
              <button
                onClick={togglePlayback}
                disabled={!audioBuffer}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                  audioBuffer 
                    ? 'bg-platinum-700 hover:bg-platinum-600 text-white shadow-lg hover:shadow-platinum-500/30' 
                    : 'bg-platinum-900 text-platinum-600 cursor-not-allowed'
                }`}
              >
                {isPlaying ? <FiPause /> : <FiPlay className="ml-1" />}
              </button>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Presence Control */}
              <RangeInput
                value={presence}
                min={0}
                max={100}
                onChange={setPresence}
                label="PRESENCE (7kHz)"
              />

              {/* Wet/Dry Mix */}
              <RangeInput
                value={wet}
                min={0}
                max={100}
                onChange={setWet}
                label="WET/DRY MIX"
              />
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center">
            <button
              onClick={processAndDownload}
              disabled={!audioBuffer}
              className={`px-6 py-2 rounded-full border-2 border-platinum-600 text-platinum-200 flex items-center gap-2 transition-all duration-300 ${
                audioBuffer 
                  ? 'hover:bg-platinum-800/30 hover:border-platinum-500 hover:text-white' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <FiDownload className="text-cyan-400" />
              <span>EXPORT</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Enhanced range input styles */}
      <style jsx global>{`
        /* Base styles for all range inputs */
        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #1f2937;
          outline: none;
          margin: 10px 0;
        }

        /* Track */
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          cursor: pointer;
          background: #1f2937;
          border-radius: 3px;
        }

        /* Thumb */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          margin-top: -6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid #06b6d4;
          transition: all 0.2s ease;
        }

        /* Progress fill */
        input[type="range"] {
          background: linear-gradient(to right, #06b6d4 0%, #06b6d4 var(--value, 50%), #1f2937 var(--value, 50%), #1f2937 100%);
        }

        /* Hover states */
        input[type="range"]:hover::-webkit-slider-thumb {
          transform: scale(1.1);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.2);
        }

        /* Focus states */
        input[type="range"]:focus {
          outline: none;
        }

        input[type="range"]:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.4);
        }

        /* Firefox styles */
        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 6px;
          cursor: pointer;
          background: #1f2937;
          border-radius: 3px;
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #06b6d4;
        }

        /* For IE/Edge */
        input[type="range"]::-ms-track {
          width: 100%;
          height: 6px;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          color: transparent;
        }

        input[type="range"]::-ms-fill-lower {
          background: #06b6d4;
          border-radius: 10px;
        }

        input[type="range"]::-ms-fill-upper {
          background: #1f2937;
          border-radius: 10px;
        }

        input[type="range"]::-ms-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #06b6d4;
        }
      `}</style>
    </div>
  );
};

export default AirfryPage;
