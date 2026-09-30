import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, Loader2, Sparkles } from 'lucide-react';
import { fetchGuestbook, submitGuestbookWish, GuestbookEntry } from '../../services/guestbookService.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

export const Guestbook: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Sahabat');
  const [message, setMessage] = useState<string>('');

  const [wishes, setWishes] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successToast, setSuccessToast] = useState<boolean>(false);

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setIsLoading(true);
    const res = await fetchGuestbook();
    if (res.success) {
      setWishes(res.data);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage('Mohon lengkapi nama dan doa/ucapan Anda.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const res = await submitGuestbookWish({
      name: name.trim(),
      relationship,
      message: message.trim(),
    });

    setIsSubmitting(false);

    if (res.success) {
      setName('');
      setMessage('');
      setSuccessToast(true);
      loadWishes();
      setTimeout(() => setSuccessToast(false), 4000);
    } else {
      setErrorMessage(res.message || 'Gagal mengirim doa dan ucapan.');
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Baru saja';
    }
  };

  return (
    <section
      id="doa"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8C7A5B] font-semibold mb-2">
            PRAYERS & BLESSINGS
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2C2926] tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Kirim Doa & Ucapan
          </h2>
          <div className="flex justify-center mb-4">
            <BotanicalOrnament variant="divider" className="w-28 h-6 text-[#8C7A5B]" />
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed">
            Untaian kata doa restu dari Anda adalah hadiah paling berharga yang akan selalu kami kenang sepanjang hayat.
          </p>
        </div>

        {/* Content Layout: Form & Wishes List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-xl border border-[#E8DFC8]/80 shadow-[0_15px_40px_-10px_rgba(80,70,50,0.1)]">
            <h3
              className="text-xl font-display text-[#2C2926] font-medium mb-4 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <Heart className="w-4 h-4 text-[#8C7A5B]" />
              <span>Tuliskan Doa</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="doa-name" className="block text-xs font-semibold tracking-wider text-[#2C2926] uppercase mb-1">
                  Nama Anda
                </label>
                <input
                  id="doa-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama atau nama keluarga"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#E8DFC8] text-sm text-[#2C2926] placeholder-[#A8A092] focus:outline-none focus:border-[#8C7A5B] transition-all"
                  required
                />
              </div>

              {/* Relationship */}
              <div>
                <label htmlFor="doa-rel" className="block text-xs font-semibold tracking-wider text-[#2C2926] uppercase mb-1">
                  Hubungan
                </label>
                <select
                  id="doa-rel"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#E8DFC8] text-sm text-[#2C2926] focus:outline-none focus:border-[#8C7A5B] transition-all"
                >
                  <option value="Keluarga">Keluarga</option>
                  <option value="Sahabat">Sahabat</option>
                  <option value="Teman">Teman</option>
                  <option value="Rekan">Rekan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="doa-msg" className="block text-xs font-semibold tracking-wider text-[#2C2926] uppercase mb-1">
                  Doa / Ucapan
                </label>
                <textarea
                  id="doa-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa terbaik Anda untuk kedua mempelai..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#E8DFC8] text-sm text-[#2C2926] placeholder-[#A8A092] focus:outline-none focus:border-[#8C7A5B] transition-all resize-none"
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600">{errorMessage}</p>
              )}

              {successToast && (
                <div className="p-3 rounded-xl bg-[#EAF5EE] border border-[#C5E5D0] text-xs text-[#2E6B45]">
                  Doa dan ucapan Anda berhasil dikirimkan. Terima kasih!
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#2C2926] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#433E39] shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E8DFC8]" />
                    <span>MENGIRIMKAN...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#E8DFC8]" />
                    <span>KIRIM DOA & UCAPAN</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Wishes Feed Column */}
          <div className="lg:col-span-7 flex flex-col p-6 sm:p-8 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-xl border border-[#E8DFC8]/80 shadow-[0_15px_40px_-10px_rgba(80,70,50,0.1)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC8]/70 mb-4">
              <h3
                className="text-lg font-display text-[#2C2926] font-medium flex items-center gap-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <MessageSquare className="w-4 h-4 text-[#8C7A5B]" />
                <span>Untaian Doa Restu</span>
              </h3>
              <span className="text-xs font-semibold text-[#8C7A5B] tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/70 border border-[#E8DFC8]">
                {wishes.length} Ucapan
              </span>
            </div>

            {/* Scrollable list */}
            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
              {isLoading ? (
                <div className="text-center py-12 text-[#8C857B]">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#8C7A5B]" />
                  <p className="text-xs">Memuat ucapan doa...</p>
                </div>
              ) : wishes.length === 0 ? (
                <div className="text-center py-12 text-[#8C857B]">
                  <p className="text-sm font-serif italic">
                    Belum ada doa yang dikirim. Jadilah yang pertama memberikan doa restu!
                  </p>
                </div>
              ) : (
                wishes.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/80 border border-[#E8DFC8]/70 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#2C2926]">
                          {item.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C7A5B] font-medium">
                          · {item.relationship}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#A39B8F]">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-serif text-[#4A453E] leading-relaxed">
                      "{item.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
