import React from 'react';
import { Instagram } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

export const Couple: React.FC = () => {
  const { bride, groom } = WEDDING_DATA;

  return (
    <section
      id="couple"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8C7A5B] font-semibold mb-2">
            GROOM & BRIDE
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2C2926] tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Mempelai Bahagia
          </h2>
          <div className="flex justify-center mb-4">
            <BotanicalOrnament variant="divider" className="w-28 h-6 text-[#8C7A5B]" />
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed">
            Dengan memohon rahmat dan rida Allah SWT, kami mengundang kehadiran Bapak/Ibu/Saudara/i untuk menyaksikan ikrar suci pernikahan putra-putri kami:
          </p>
        </div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {/* 1. BRIDE CARD */}
          <div className="flex flex-col items-center text-center p-6 sm:p-10 rounded-3xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E8DFC8]/70 shadow-[0_15px_45px_-12px_rgba(80,70,50,0.12)]">
            {/* Photo frame with object-fit: contain */}
            <div className="relative w-full max-w-xs aspect-[3/4] mb-8 rounded-2xl overflow-hidden bg-[#F0EAE1] border border-[#E8DFC8]/80 flex items-center justify-center p-2 shadow-inner">
              <img
                src={bride.photo}
                alt={bride.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 hover:scale-[1.02]"
              />
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2926]/10 via-transparent to-white/20 pointer-events-none" />
            </div>

            {/* Bride Details */}
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#8C7A5B] font-semibold mb-1">
              THE BRIDE
            </p>
            <h3
              className="text-2xl sm:text-3xl font-display text-[#2C2926] font-medium tracking-wide mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {bride.fullName}
            </h3>

            <div className="text-xs sm:text-sm text-[#595246] leading-relaxed mb-4 max-w-xs">
              <p className="font-medium text-[#3A352F]">Putri tercinta dari:</p>
              <p>{bride.father}</p>
              <p className="text-[11px] text-[#7D766A]">&</p>
              <p>{bride.mother}</p>
            </div>

            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs text-[#595246] bg-white/70 border border-[#E8DFC8]/70 hover:bg-white hover:text-[#2C2926] transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-[#8C7A5B]" />
                <span>{bride.instagram}</span>
              </a>
            )}
          </div>

          {/* 2. GROOM CARD */}
          <div className="flex flex-col items-center text-center p-6 sm:p-10 rounded-3xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E8DFC8]/70 shadow-[0_15px_45px_-12px_rgba(80,70,50,0.12)]">
            {/* Photo frame with object-fit: contain */}
            <div className="relative w-full max-w-xs aspect-[3/4] mb-8 rounded-2xl overflow-hidden bg-[#F0EAE1] border border-[#E8DFC8]/80 flex items-center justify-center p-2 shadow-inner">
              <img
                src={groom.photo}
                alt={groom.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 hover:scale-[1.02]"
              />
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2926]/10 via-transparent to-white/20 pointer-events-none" />
            </div>

            {/* Groom Details */}
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#8C7A5B] font-semibold mb-1">
              THE GROOM
            </p>
            <h3
              className="text-2xl sm:text-3xl font-display text-[#2C2926] font-medium tracking-wide mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {groom.fullName}
            </h3>

            <div className="text-xs sm:text-sm text-[#595246] leading-relaxed mb-4 max-w-xs">
              <p className="font-medium text-[#3A352F]">Putra tercinta dari:</p>
              <p>{groom.father}</p>
              <p className="text-[11px] text-[#7D766A]">&</p>
              <p>{groom.mother}</p>
            </div>

            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs text-[#595246] bg-white/70 border border-[#E8DFC8]/70 hover:bg-white hover:text-[#2C2926] transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-[#8C7A5B]" />
                <span>{groom.instagram}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
