import React from 'react';
import { WEDDING_DATA } from '../../data/weddingData.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

export const Story: React.FC = () => {
  const { loveStory } = WEDDING_DATA;

  return (
    <section
      id="story"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8C7A5B] font-semibold mb-2">
            OUR SACRED JOURNEY
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2C2926] tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Kisah Cinta Kami
          </h2>
          <div className="flex justify-center mb-4">
            <BotanicalOrnament variant="divider" className="w-28 h-6 text-[#8C7A5B]" />
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed">
            Setiap detik yang kami lalui adalah untaian takdir indah yang menuntun dua jiwa bersatu dalam ikatan suci.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Subtle vertical center line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#E8DFC8] to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {loveStory.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge in center for desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] items-center justify-center shadow-sm z-10">
                    <span className="text-xs font-display font-bold text-[#8C7A5B]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Photo Side */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden bg-[#F0EAE1] border border-[#E8DFC8]/80 p-2 shadow-[0_10px_30px_-10px_rgba(80,70,50,0.1)]">
                      <img
                        src={item.photo}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Text Story Side */}
                  <div className="w-full md:w-1/2">
                    <div
                      className={`p-6 sm:p-8 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-md border border-[#E8DFC8]/70 shadow-sm ${
                        isEven ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <div className="inline-block text-xs font-semibold tracking-[0.25em] text-[#8C7A5B] uppercase mb-1 px-3 py-1 rounded-full bg-white/60 border border-[#E8DFC8]/50">
                        {item.year}
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-display text-[#2C2926] font-medium tracking-wide my-2"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#595246] leading-relaxed font-serif">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
