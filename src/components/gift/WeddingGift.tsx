import React, { useState } from 'react';
import { Gift, Copy, Check, MapPin, ExternalLink, CreditCard, Package } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

export const WeddingGift: React.FC = () => {
  const { gifts } = WEDDING_DATA;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const copyToClipboard = (text: string, type: 'bank' | 'address', idx?: number) => {
    navigator.clipboard.writeText(text);
    if (type === 'bank' && idx !== undefined) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2500);
    } else if (type === 'address') {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  return (
    <section
      id="gift"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8C7A5B] font-semibold mb-2">
            WEDDING GIFT & LOVE TOKENS
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2C2926] tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Tanda Kasih
          </h2>
          <div className="flex justify-center mb-4">
            <BotanicalOrnament variant="divider" className="w-28 h-6 text-[#8C7A5B]" />
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed">
            Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih berupa kado fisik maupun digital, kami haturkan terima kasih yang tak terhingga.
          </p>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* 1. DIGITAL TRANSFER (AMPLOP DIGITAL) */}
          <div className="flex flex-col justify-between p-8 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-xl border border-[#E8DFC8]/80 shadow-[0_15px_40px_-10px_rgba(80,70,50,0.1)]">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-[#8C7A5B]" />
                <h3
                  className="text-xl font-display text-[#2C2926] font-medium"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Transfer Bank / Digital
                </h3>
              </div>

              <div className="space-y-4">
                {gifts.bankAccounts.map((account, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/80 border border-[#E8DFC8]/80 shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A5B]">
                        {account.bankName}
                      </span>
                      <span className="text-[10px] text-[#7D766A]">Rekening Resmi</span>
                    </div>

                    <p className="text-xl font-mono tracking-wider font-semibold text-[#2C2926] my-1">
                      {account.accountNumber}
                    </p>
                    <p className="text-xs text-[#595246] mb-3">a.n. {account.accountHolder}</p>

                    <button
                      onClick={() => copyToClipboard(account.accountNumber, 'bank', idx)}
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs font-semibold text-[#2C2926] hover:bg-[#E8DFC8]/30 transition-all cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#2E6B45]" />
                          <span className="text-[#2E6B45]">NOMOR REKENING TERSALIN</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#8C7A5B]" />
                          <span>SALIN NO. REKENING</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#8C857B] italic mt-6 text-center">
              Mohon sertakan berita transfer untuk konfirmasi otomatis.
            </p>
          </div>

          {/* 2. PHYSICAL GIFT DELIVERY */}
          <div className="flex flex-col justify-between p-8 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-xl border border-[#E8DFC8]/80 shadow-[0_15px_40px_-10px_rgba(80,70,50,0.1)]">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-[#8C7A5B]" />
                <h3
                  className="text-xl font-display text-[#2C2926] font-medium"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Kirim Kado Fisik
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-[#E8DFC8]/80 shadow-sm space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#8C7A5B] font-semibold">
                    Penerima:
                  </p>
                  <p className="text-sm font-semibold text-[#2C2926]">
                    {gifts.physicalGift.recipientName}
                  </p>
                  <p className="text-xs text-[#595246]">{gifts.physicalGift.phoneNumber}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#8C7A5B] font-semibold">
                    Alamat Pengiriman:
                  </p>
                  <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed mt-0.5">
                    {gifts.physicalGift.fullAddress}
                  </p>
                </div>

                {gifts.physicalGift.note && (
                  <p className="text-[11px] text-[#8C7A5B] italic pt-2 border-t border-[#E8DFC8]/50">
                    * {gifts.physicalGift.note}
                  </p>
                )}

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => copyToClipboard(gifts.physicalGift.fullAddress, 'address')}
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs font-semibold text-[#2C2926] hover:bg-[#E8DFC8]/30 transition-all cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2E6B45]" />
                        <span className="text-[#2E6B45]">ALAMAT BERHASIL DISALIN</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8C7A5B]" />
                        <span>SALIN ALAMAT LENGKAP</span>
                      </>
                    )}
                  </button>

                  {gifts.physicalGift.googleMapsUrl && (
                    <a
                      href={gifts.physicalGift.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white border border-[#E8DFC8] text-xs font-medium text-[#595246] hover:text-[#2C2926] transition-all"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#8C7A5B]" />
                      <span>LIHAT ALAMAT DI GOOGLE MAPS</span>
                      <ExternalLink className="w-3 h-3 text-[#8C7A5B]/70" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#8C857B] italic mt-6 text-center">
              Paket kado dapat dikirimkan sebelum atau sesudah hari pernikahan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
