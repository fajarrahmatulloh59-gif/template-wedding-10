import React from 'react';
import { WEDDING_DATA } from '../../data/weddingData.ts';

// ======================================================
// 🎬 CUSTOMER VIDEO
//
// TEMPLATE 10 — WHITE VEIL CINEMATIC
//
// GANTI VIDEO CUSTOMER DI:
//
// public/video/prewedding.mp4
//
// CUSTOMER CUKUP MENGGANTI FILE VIDEO.
//
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

interface BackgroundVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoRef }) => {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Underlying Prewedding Video Element (Persistent Global Instance) */}
      <video
        ref={videoRef}
        poster={WEDDING_DATA.video.poster}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[0.98] transition-opacity duration-1000"
      >
        <source src={WEDDING_DATA.video.webm} type="video/webm" />
        <source src={WEDDING_DATA.video.mp4} type="video/mp4" />
      </video>

      {/* 2. Soft Ivory Readability Overlay */}
      <div className="absolute inset-0 bg-[#FAF7F2]/75 backdrop-blur-[2.5px] mix-blend-normal transition-opacity duration-700" />

      {/* 3. Subtle Champagne & Sage Ambient Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/60 to-[#FAF7F2]/95 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 25%, rgba(245, 238, 222, 0.4) 0%, rgba(240, 244, 238, 0.2) 50%, rgba(250, 247, 242, 0.8) 100%)',
        }}
      />

      {/* 4. Translucent Veil Silk Texture & Soft Vignette */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, transparent 40%, rgba(230, 222, 206, 0.5) 100%)`,
        }}
      />
    </div>
  );
};
