import React, { useState, useEffect } from 'react';
import { CheckCircle2, UserCheck, Users, HelpCircle, XCircle, Send, Loader2 } from 'lucide-react';
import { fetchRsvpList, submitRsvp, RsvpRecord, RsvpSummary } from '../../services/rsvpService.ts';
import { BotanicalOrnament } from '../common/BotanicalOrnament.tsx';

export const Rsvp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [status, setStatus] = useState<'HADIR' | 'TIDAK HADIR' | 'MASIH RAGU'>('HADIR');

  const [rsvpList, setRsvpList] = useState<RsvpRecord[]>([]);
  const [summary, setSummary] = useState<RsvpSummary>({
    totalResponses: 0,
    attending: 0,
    declined: 0,
    uncertain: 0,
    totalGuests: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    loadRsvpData();
  }, []);

  const loadRsvpData = async () => {
    setIsLoading(true);
    const res = await fetchRsvpList();
    if (res.success) {
      setRsvpList(res.data);
      setSummary(res.summary);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Mohon cantumkan nama lengkap Anda.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const res = await submitRsvp({
      name: name.trim(),
      guestCount: status === 'HADIR' ? guestCount : 0,
      status,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setName('');
      setGuestCount(1);
      loadRsvpData();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } else {
      setErrorMessage(res.message || 'Gagal mengirim konfirmasi kehadiran.');
    }
  };

  return (
    <section
      id="rsvp"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8C7A5B] font-semibold mb-2">
            RESERVATION
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2C2926] tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Konfirmasi Kehadiran
          </h2>
          <div className="flex justify-center mb-4">
            <BotanicalOrnament variant="divider" className="w-28 h-6 text-[#8C7A5B]" />
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-[#595246] leading-relaxed">
            Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran demi kelancaran jamuan dan protokol acara.
          </p>
        </div>

        {/* Attendance Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E8DFC8]/70 text-center">
            <UserCheck className="w-5 h-5 text-[#4D7A58] mx-auto mb-1" />
            <span className="text-2xl font-display font-medium text-[#2C2926] tabular-nums">
              {summary.attending}
            </span>
            <p className="text-[10px] tracking-wider uppercase text-[#7D766A] mt-0.5">HADIR</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E8DFC8]/70 text-center">
            <Users className="w-5 h-5 text-[#8C7A5B] mx-auto mb-1" />
            <span className="text-2xl font-display font-medium text-[#2C2926] tabular-nums">
              {summary.totalGuests}
            </span>
            <p className="text-[10px] tracking-wider uppercase text-[#7D766A] mt-0.5">TOTAL TAMU</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E8DFC8]/70 text-center">
            <HelpCircle className="w-5 h-5 text-[#B8860B] mx-auto mb-1" />
            <span className="text-2xl font-display font-medium text-[#2C2926] tabular-nums">
              {summary.uncertain}
            </span>
            <p className="text-[10px] tracking-wider uppercase text-[#7D766A] mt-0.5">RAGU-RAGU</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E8DFC8]/70 text-center">
            <XCircle className="w-5 h-5 text-[#8C7A5B]/70 mx-auto mb-1" />
            <span className="text-2xl font-display font-medium text-[#2C2926] tabular-nums">
              {summary.declined}
            </span>
            <p className="text-[10px] tracking-wider uppercase text-[#7D766A] mt-0.5">BERHALANGAN</p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF7F2]/85 backdrop-blur-xl border border-[#E8DFC8]/80 shadow-[0_20px_50px_-15px_rgba(80,70,50,0.12)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Name */}
            <div>
              <label htmlFor="rsvp-name" className="block text-xs font-semibold tracking-wider text-[#2C2926] uppercase mb-2">
                Nama Lengkap
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bpk. Muhammad Rifki & Istri"
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E8DFC8] text-sm text-[#2C2926] placeholder-[#A8A092] focus:outline-none focus:border-[#8C7A5B] focus:ring-1 focus:ring-[#8C7A5B] transition-all"
                required
              />
            </div>

            {/* Attendance Status */}
            <div>
              <label className="block text-xs font-semibold tracking-wider text-[#2C2926] uppercase mb-2">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { id: 'HADIR', label: 'HADIR', desc: 'Akan hadir' },
                  { id: 'MASIH RAGU', label: 'MASIH RAGU', desc: 'Belum pasti' },
                  { id: 'TIDAK HADIR', label: 'TIDAK HADIR', desc: 'Berhalangan' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setStatus(option.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      status === option.id
                        ? 'border-[#8C7A5B] bg-white text-[#2C2926] shadow-sm ring-1 ring-[#8C7A5B]/30'
                        : 'border-[#E8DFC8]/70 bg-white/40 text-[#7D766A] hover:bg-white/70'
                    }`}
                  >
                    <p className="text-xs font-semibold">{option.label}</p>
                    <p className="text-[11px] opacity-75">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Guests (Only if HADIR) */}
            {status === 'HADIR' && (
              <div>
                <label htmlFor="rsvp-count" className="block text-xs font-semibold tracking-wider text-[#2C2926] uppercase mb-2">
                  Jumlah Tamu
                </label>
                <select
                  id="rsvp-count"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E8DFC8] text-sm text-[#2C2926] focus:outline-none focus:border-[#8C7A5B] focus:ring-1 focus:ring-[#8C7A5B] transition-all"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                  <option value={5}>5 Orang</option>
                </select>
              </div>
            )}

            {/* Error & Success Messages */}
            {errorMessage && (
              <p className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                {errorMessage}
              </p>
            )}

            {submitSuccess && (
              <div className="flex items-center gap-2 text-xs text-[#2E6B45] bg-[#EAF5EE] p-3 rounded-xl border border-[#C5E5D0]">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B45] shrink-0" />
                <span>Terima kasih! Konfirmasi kehadiran Anda telah tersimpan di sistem kami.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#2C2926] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#433E39] shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E8DFC8]" />
                  <span>MENGIRIM KONFIRMASI...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#E8DFC8]" />
                  <span>KIRIM KONFIRMASI RSVP</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
