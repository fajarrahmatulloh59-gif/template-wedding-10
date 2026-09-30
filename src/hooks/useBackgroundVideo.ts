import { useRef, useEffect } from 'react';

// ======================================================
// 🎬 CUSTOMER VIDEO
//
// TEMPLATE 10 — WHITE VEIL CINEMATIC
//
// GANTI VIDEO CUSTOMER DI:
// public/video/prewedding.mp4
//
// CUSTOMER CUKUP MENGGANTI FILE VIDEO.
// TIDAK PERLU MENGUBAH COMPONENT.
//
// OPTIONAL:
// public/video/prewedding.webm
//
// OPTIONAL MOBILE:
// public/video/prewedding-mobile.mp4
//
// POSTER:
// public/video/poster.jpg
// ======================================================

export function useBackgroundVideo(isOpen: boolean) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Video autoplay waiting for interaction:', err);
      });
    }
  }, [isOpen]);

  return { videoRef };
}
