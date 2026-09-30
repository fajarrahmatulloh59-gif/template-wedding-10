import React, { useState, useEffect } from 'react';
import { MailOpen, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

interface OpeningProps {
  onOpenInvitation: () => void;
  isOpen: boolean;
}

export const Opening: React.FC<OpeningProps> = ({ onOpenInvitation, isOpen }) => {
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to') || params.get('u');
      if (to) {
        setGuestName(to.replace(/\+/g, ' '));
      }
    }
  }, []);

  const handleOpen = () => {
    setIsFading(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 800);
  };

  if (isOpen && !isFading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-1000 ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#FAF7F2',
      }}
    >
      {/* Background cinematic imagery / subtle video preview with veil overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={WEDDING_DATA.video.poster}
          alt="White Veil Background"
          className="w-full h-full object-cover filter brightness-90 contrast-[0.95] scale-105 transition-transform duration-1000"
        />
        {/* Ivory & Veil Soft Scrims */}
        <div className="absolute inset-0 bg-[#FAF7F2]/80 backdrop-blur-[6px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-[#FAF7F2]/80" />
      </div>

      {/* Main Glass Veil Invitation Envelope Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto text-center px-6 sm:px-10 py-10 sm:py-14 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-2xl border border-[#E8DFC8]/70 shadow-[0_20px_60px_-15px_rgba(80,70,50,0.18)]">
        {/* Subtle decorative veil flourish */}
        <div className="flex justify-center mb-4">
          <BotanicalOrnament variant="wreath" className="w-28 h-8 text-[#8C7A5B]" />
        </div>

        {/* Kicker */}
        <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#7D766A] font-medium mb-3">
          The Wedding Invitation
        </p>

        {/* Couple Names */}
        <div className="mb-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-[#2C2926] font-display tracking-tight leading-none"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {WEDDING_DATA.bride.name}
          </h1>
          <span
            className="block text-3xl sm:text-4xl my-1 text-[#8C7A5B]"
            style={{ fontFamily: "'Alex Brush', cursive" }}
          >
            &
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-[#2C2926] font-display tracking-tight leading-none"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {WEDDING_DATA.groom.name}
          </h1>
        </div>

        {/* Date */}
        <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.25em] text-[#7D766A] font-medium my-4 py-1.5 px-4 rounded-full border border-[#E8DFC8]/60 bg-white/40">
          <span>{WEDDING_DATA.dateFormatted}</span>
        </div>

        {/* Guest Greeting Box */}
        <div className="my-6 px-4 py-3 rounded-2xl bg-white/60 border border-[#E8DFC8]/50 backdrop-blur-sm">
          <p className="text-[11px] uppercase tracking-wider text-[#7D766A] mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-base sm:text-lg font-serif text-[#2C2926] font-semibold truncate">
            {guestName}
          </p>
          <p className="text-[10px] text-[#8C857B] mt-0.5 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* BUKA UNDANGAN BUTTON */}
        <button
          onClick={handleOpen}
          type="button"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#2C2926] text-[#FAF7F2] text-xs sm:text-sm tracking-[0.2em] uppercase font-medium shadow-[0_10px_25px_-5px_rgba(44,41,38,0.3)] hover:bg-[#433E39] hover:shadow-[0_15px_30px_-5px_rgba(44,41,38,0.4)] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden"
        >
          {/* Subtle champagne shimmer hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          <MailOpen className="w-4 h-4 text-[#E8DFC8] transition-transform group-hover:scale-110" />
          <span>BUKA UNDANGAN</span>
        </button>

        {/* Warm closing note */}
        <p className="text-[11px] text-[#8C857B] mt-5 italic">
          Buka untuk memutar lantunan musik dan video sinematik
        </p>
      </div>
    </div>
  );
};
