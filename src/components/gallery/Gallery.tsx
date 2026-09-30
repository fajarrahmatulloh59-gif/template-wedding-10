import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { WEDDING_DATA, GalleryItem } from '../../data/weddingData.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';
import { PhotoViewer } from './PhotoViewer.tsx';

export const Gallery: React.FC = () => {
  const { gallery } = WEDDING_DATA;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % gallery.length);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + gallery.length) % gallery.length);
    }
  };

  const getAspectClass = (ratio: GalleryItem['aspectRatio']) => {
    switch (ratio) {
      case 'portrait':
        return 'aspect-[3/4] md:row-span-2';
      case 'landscape':
        return 'aspect-[16/10] md:col-span-2';
      case 'panorama':
        return 'aspect-[21/9] md:col-span-2';
      case 'square':
      default:
        return 'aspect-square';
    }
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8C7A5B] font-semibold mb-2">
            MOMENTS IN WHITE VEIL
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2C2926] tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Galeri Prewedding
          </h2>
          <div className="flex justify-center mb-4">
            <BotanicalOrnament variant="divider" className="w-28 h-6 text-[#8C7A5B]" />
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed">
            Potret kebahagiaan dan kehangatan cinta kami yang terabadikan dalam setiap hembusan rasa.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px]">
          {gallery.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`group relative rounded-2xl overflow-hidden bg-[#F0EAE1] border border-[#E8DFC8]/80 p-2 shadow-[0_8px_25px_-5px_rgba(80,70,50,0.08)] hover:shadow-lg transition-all duration-300 cursor-pointer ${getAspectClass(
                  item.aspectRatio
                )}`}
              >
                {/* Image container using object-fit: contain */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-white/40">
                  <img
                    src={item.photo}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Veil Scrim */}
                  <div className="absolute inset-0 bg-[#2C2926]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/80 text-[#2C2926] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Subtle caption bar on bottom */}
                <div className="absolute bottom-4 left-4 right-4 px-3 py-1.5 rounded-lg bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E8DFC8]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="text-xs font-serif text-[#2C2926] truncate font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox PhotoViewer */}
      <PhotoViewer
        items={gallery}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
