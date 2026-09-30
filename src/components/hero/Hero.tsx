import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Clock } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(WEDDING_DATA.targetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const coupleSec = document.getElementById('couple');
    if (coupleSec) {
      coupleSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center"
    >
      {/* Veil Glass Center Panel */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-12 py-14 sm:py-18 rounded-3xl bg-[#FAF7F2]/75 backdrop-blur-md border border-[#E8DFC8]/60 shadow-[0_15px_50px_-10px_rgba(80,70,50,0.12)]">
        {/* Botanical top ornament */}
        <div className="flex justify-center mb-6">
          <BotanicalOrnament variant="wreath" className="w-32 h-8 text-[#8C7A5B]" />
        </div>

        {/* Kicker */}
        <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#7D766A] font-medium mb-4">
          {WEDDING_DATA.invitationKicker}
        </p>

        {/* Couple Title */}
        <div className="my-2">
          <h1
            className="text-5xl sm:text-7xl font-display text-[#2C2926] tracking-wide leading-none"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {WEDDING_DATA.bride.name}
          </h1>
          <span
            className="block text-4xl sm:text-5xl my-2 text-[#8C7A5B]"
            style={{ fontFamily: "'Alex Brush', cursive" }}
          >
            &
          </span>
          <h1
            className="text-5xl sm:text-7xl font-display text-[#2C2926] tracking-wide leading-none"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {WEDDING_DATA.groom.name}
          </h1>
        </div>

        {/* Date banner */}
        <div className="my-6">
          <div className="inline-block text-sm sm:text-base tracking-[0.3em] font-medium text-[#4A453E] border-y border-[#E8DFC8]/80 py-2 px-8">
            {WEDDING_DATA.dateFormatted}
          </div>
          <p className="text-xs sm:text-sm text-[#7D766A] font-serif italic mt-2">
            Bandung, Jawa Barat
          </p>
        </div>

        {/* Sacred Quote */}
        <div className="max-w-lg mx-auto my-6 px-4">
          <p className="text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed">
            "{WEDDING_DATA.quote.verse}"
          </p>
          <p className="text-[11px] uppercase tracking-widest text-[#8C7A5B] font-semibold mt-2">
            — {WEDDING_DATA.quote.source} —
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mt-8 pt-6 border-t border-[#E8DFC8]/60">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#7D766A] font-medium mb-3">
            COUNTING DOWN TO OUR BLESSED DAY
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { label: 'HARI', value: timeLeft.days },
              { label: 'JAM', value: timeLeft.hours },
              { label: 'MENIT', value: timeLeft.minutes },
              { label: 'DETIK', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white/70 border border-[#E8DFC8]/70 shadow-sm"
              >
                <span className="text-xl sm:text-3xl font-display font-medium text-[#2C2926] tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] tracking-widest uppercase text-[#8C7A5B] mt-1 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button
        onClick={scrollToNext}
        type="button"
        className="relative z-10 mt-10 inline-flex flex-col items-center gap-1 text-[#7D766A] hover:text-[#2C2926] transition-colors cursor-pointer"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
          SCROLL
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#8C7A5B]" />
      </button>
    </section>
  );
};
