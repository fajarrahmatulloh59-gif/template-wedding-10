import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../data/weddingData.ts';

interface PhotoViewerProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onNext, onPrev]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo Viewer Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 transition-all duration-300"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Tutup peninjau foto"
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Foto sebelumnya"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Foto selanjutnya"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center Image Container with object-fit: contain */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh] flex items-center justify-center">
          <img
            src={currentItem.photo}
            alt={currentItem.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full object-contain filter drop-shadow-2xl rounded-lg animate-in fade-in duration-300"
          />
        </div>

        {/* Caption */}
        <div className="text-center mt-4 max-w-xl px-4">
          <h4
            className="text-lg sm:text-xl font-display text-white tracking-wide mb-1"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {currentItem.title}
          </h4>
          {currentItem.caption && (
            <p className="text-xs sm:text-sm font-serif italic text-white/80">
              {currentItem.caption}
            </p>
          )}
          <p className="text-[11px] tracking-widest text-[#E8DFC8] uppercase mt-2">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>
  );
};
