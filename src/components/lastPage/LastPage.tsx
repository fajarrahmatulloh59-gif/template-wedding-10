import React from 'react';
import { WEDDING_DATA } from '../../data/weddingData.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

export const LastPage: React.FC = () => {
  return (
    <section
      id="last-page"
      className="relative min-h-[85vh] py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center"
    >
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-12 py-16 rounded-3xl bg-[#FAF7F2]/80 backdrop-blur-xl border border-[#E8DFC8]/80 shadow-[0_20px_50px_-15px_rgba(80,70,50,0.12)]">
        <div className="flex justify-center mb-6">
          <BotanicalOrnament variant="wreath" className="w-32 h-8 text-[#8C7A5B]" />
        </div>

        <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#7D766A] font-medium mb-3">
          WITH UTMOST GRATITUDE
        </p>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2C2926] tracking-tight leading-snug mb-6"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Thank You For Being Part Of Our Special Day
        </h2>

        <div className="max-w-md mx-auto space-y-4 text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed mb-8">
          <p>
            Kehadiran, doa restu, dan kehangatan yang Bapak/Ibu/Saudara/i berikan adalah anugerah tak ternilai dalam babak baru perjalanan hidup kami.
          </p>
          <p>
            Semoga Allah SWT senantiasa membalas kebaikan serta melimpahkan rahmat, kebahagiaan, dan keberkahan bagi kita semua.
          </p>
        </div>

        <div className="pt-6 border-t border-[#E8DFC8]/70">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8C7A5B] font-semibold mb-2">
            KAMI YANG BERBAHAGIA
          </p>
          <h3
            className="text-3xl sm:text-4xl font-display text-[#2C2926]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {WEDDING_DATA.bride.name} & {WEDDING_DATA.groom.name}
          </h3>
          <p className="text-xs text-[#7D766A] font-serif mt-2">
            Beserta Keluarga Besar Kedua Mempelai
          </p>
        </div>
      </div>
    </section>
  );
};
