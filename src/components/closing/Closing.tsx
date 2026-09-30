import React from 'react';
import { WEDDING_DATA } from '../../data/weddingData.ts';

export const Closing: React.FC = () => {
  return (
    <footer className="relative z-10 py-16 px-4 text-center border-t border-[#E8DFC8]/60 bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="max-w-md mx-auto space-y-4">
        {/* Couple wordmark */}
        <h4
          className="text-2xl sm:text-3xl font-display text-[#2C2926] tracking-widest"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {WEDDING_DATA.bride.name} & {WEDDING_DATA.groom.name}
        </h4>

        <p
          className="text-2xl text-[#8C7A5B]"
          style={{ fontFamily: "'Alex Brush', cursive" }}
        >
          Thank You
        </p>

        {/* Brand credit */}
        <div className="pt-6 border-t border-[#E8DFC8]/40">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8C857B] font-medium">
            DESIGNED & CRAFTED BY {WEDDING_DATA.branding.studioName}
          </p>
          <p className="text-[9px] tracking-wider text-[#A8A092] mt-1">
            {WEDDING_DATA.branding.templateName}
          </p>
        </div>
      </div>
    </footer>
  );
};
