import { useState, useEffect, useRef } from 'react';
import { WEDDING_DATA } from '../data/weddingData.ts';

// ======================================================
// 🎵 CUSTOMER MUSIC
//
// GANTI FILE:
// public/music/backsound.mp3
//
// CUSTOMER TIDAK PERLU MENGUBAH COMPONENT.
// ======================================================

// Single global audio instance outside of React component lifecycle
let globalAudio: HTMLAudioElement | null = null;

export function useMusic() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!globalAudio && typeof window !== 'undefined') {
      globalAudio = new Audio(WEDDING_DATA.music.src);
      globalAudio.loop = true;
      globalAudio.preload = 'auto';

      globalAudio.addEventListener('playing', () => setIsPlaying(true));
      globalAudio.addEventListener('pause', () => setIsPlaying(false));
      globalAudio.addEventListener('canplaythrough', () => setIsLoaded(true));
      globalAudio.addEventListener('error', (e) => {
        console.warn('Audio playback warning:', e);
      });
    } else if (globalAudio) {
      setIsPlaying(!globalAudio.paused);
      setIsLoaded(globalAudio.readyState >= 3);
    }
  }, []);

  const play = async () => {
    if (globalAudio) {
      try {
        await globalAudio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio autoplay blocked by browser policy:', err);
      }
    }
  };

  const pause = () => {
    if (globalAudio) {
      globalAudio.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (!globalAudio) return;
    if (globalAudio.paused) {
      play();
    } else {
      pause();
    }
  };

  return {
    isPlaying,
    isLoaded,
    play,
    pause,
    toggle,
  };
}
