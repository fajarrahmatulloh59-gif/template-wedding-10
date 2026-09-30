import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData.ts';

// ======================================================
// 🎵 CUSTOMER MUSIC
//
// GANTI FILE:
//
// public/music/backsound.mp3
//
// CUSTOMER TIDAK PERLU MENGUBAH COMPONENT.
// ======================================================

interface MusicControlProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

export const MusicControl: React.FC<MusicControlProps> = ({ isPlaying, toggleMusic }) => {
  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E8DFC8]/60 shadow-[0_4px_20px_-4px_rgba(110,100,80,0.12)] hover:border-[#D4AF37]/40 hover:bg-white/90 transition-all duration-300 cursor-pointer"
      >
        {/* Animated equalizer waves or rotating disk */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div
            className={`w-5 h-5 rounded-full border border-[#D4AF37]/50 flex items-center justify-center transition-transform ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : 'opacity-60'
            }`}
          >
            <Music className="w-2.5 h-2.5 text-[#8C7A5B]" />
          </div>

          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#7D9D85] ring-2 ring-white animate-pulse" />
          )}
        </div>

        {/* Text indicator */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-widest text-[#8C7A5B] font-medium leading-none">
            {isPlaying ? 'Music Playing' : 'Music Paused'}
          </span>
          <span className="text-[11px] font-serif text-[#2C2926] max-w-[130px] truncate leading-tight mt-0.5">
            {WEDDING_DATA.music.title}
          </span>
        </div>

        {/* Icon toggle */}
        <div className="text-[#8C7A5B] group-hover:text-[#2C2926] transition-colors ml-0.5">
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </div>
      </button>
    </div>
  );
};
