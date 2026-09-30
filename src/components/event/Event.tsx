import React from 'react';
import { MapPin, Calendar, Clock, ExternalLink, CalendarPlus } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

export const Event: React.FC = () => {
  const { akad, resepsi } = WEDDING_DATA.events;

  const createGoogleCalendarLink = (title: string, date: string, details: string, location: string) => {
    // 20261212T010000Z to 20261212T070000Z
    const startDate = '20261212T010000Z';
    const endDate = '20261212T070000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;
  };

  return (
    <section
      id="event"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8C7A5B] font-semibold mb-2">
            WEDDING CEREMONY & CELEBRATION
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2C2926] tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Rangkaian Acara
          </h2>
          <div className="flex justify-center mb-4">
            <BotanicalOrnament variant="divider" className="w-28 h-6 text-[#8C7A5B]" />
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* 1. AKAD NIKAH */}
          <div className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-md border border-[#E8DFC8]/75 shadow-[0_15px_40px_-10px_rgba(80,70,50,0.1)] hover:border-[#D4AF37]/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7A5B] font-semibold px-3 py-1 rounded-full bg-white/60 border border-[#E8DFC8]/50">
                  {akad.subTitle || 'SACRED VOW'}
                </span>
                <Calendar className="w-5 h-5 text-[#8C7A5B]" />
              </div>

              <h3
                className="text-2xl sm:text-3xl font-display text-[#2C2926] font-medium tracking-wide mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {akad.title}
              </h3>

              {/* Schedule Info */}
              <div className="space-y-4 text-xs sm:text-sm text-[#4A453E]">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2C2926]">{akad.dateStr}</p>
                    <p className="text-[#7D766A]">Pukul {akad.timeStr} {akad.timeZone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2C2926]">{akad.venueName}</p>
                    <p className="text-[#6B6358] text-xs leading-relaxed mt-0.5">
                      {akad.venueAddress}
                    </p>
                  </div>
                </div>

                {akad.note && (
                  <p className="text-[11px] text-[#8C7A5B] italic pt-2 border-t border-[#E8DFC8]/50">
                    * {akad.note}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-[#E8DFC8]/60 flex flex-wrap gap-3">
              <a
                href={akad.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2C2926] text-[#FAF7F2] text-xs tracking-wider uppercase font-medium hover:bg-[#433E39] shadow-sm transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E8DFC8]" />
                <span>LIHAT LOKASI</span>
                <ExternalLink className="w-3 h-3 text-[#E8DFC8]/70" />
              </a>

              <a
                href={createGoogleCalendarLink(
                  `Akad Nikah: ${WEDDING_DATA.weddingTitle}`,
                  akad.dateStr,
                  `Akad Nikah Alya & Fajar di ${akad.venueName}`,
                  akad.venueAddress
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/70 border border-[#E8DFC8]/80 text-xs text-[#2C2926] hover:bg-white transition-all"
                title="Simpan ke Google Calendar"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#8C7A5B]" />
                <span className="hidden sm:inline">Ingatkan Saya</span>
              </a>
            </div>
          </div>

          {/* 2. RESEPSI PERNIKAHAN */}
          <div className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-md border border-[#E8DFC8]/75 shadow-[0_15px_40px_-10px_rgba(80,70,50,0.1)] hover:border-[#D4AF37]/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7A5B] font-semibold px-3 py-1 rounded-full bg-white/60 border border-[#E8DFC8]/50">
                  {resepsi.subTitle || 'RECEPTION'}
                </span>
                <Clock className="w-5 h-5 text-[#8C7A5B]" />
              </div>

              <h3
                className="text-2xl sm:text-3xl font-display text-[#2C2926] font-medium tracking-wide mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {resepsi.title}
              </h3>

              {/* Schedule Info */}
              <div className="space-y-4 text-xs sm:text-sm text-[#4A453E]">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2C2926]">{resepsi.dateStr}</p>
                    <p className="text-[#7D766A]">Pukul {resepsi.timeStr} {resepsi.timeZone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2C2926]">{resepsi.venueName}</p>
                    <p className="text-[#6B6358] text-xs leading-relaxed mt-0.5">
                      {resepsi.venueAddress}
                    </p>
                  </div>
                </div>

                {resepsi.note && (
                  <p className="text-[11px] text-[#8C7A5B] italic pt-2 border-t border-[#E8DFC8]/50">
                    * {resepsi.note}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-[#E8DFC8]/60 flex flex-wrap gap-3">
              <a
                href={resepsi.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2C2926] text-[#FAF7F2] text-xs tracking-wider uppercase font-medium hover:bg-[#433E39] shadow-sm transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E8DFC8]" />
                <span>LIHAT LOKASI</span>
                <ExternalLink className="w-3 h-3 text-[#E8DFC8]/70" />
              </a>

              <a
                href={createGoogleCalendarLink(
                  `Resepsi: ${WEDDING_DATA.weddingTitle}`,
                  resepsi.dateStr,
                  `Resepsi Pernikahan Alya & Fajar di ${resepsi.venueName}`,
                  resepsi.venueAddress
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/70 border border-[#E8DFC8]/80 text-xs text-[#2C2926] hover:bg-white transition-all"
                title="Simpan ke Google Calendar"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#8C7A5B]" />
                <span className="hidden sm:inline">Ingatkan Saya</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
