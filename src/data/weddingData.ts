// ============================================================================
// ⚠️ DO NOT MODIFY - CORE SYSTEM INTERFACES
// ============================================================================

export interface GroomBrideData {
  name: string;
  fullName: string;
  father: string;
  mother: string;
  instagram?: string;
  photo: string;
  bio?: string;
}

export interface EventDetail {
  title: string;
  subTitle?: string;
  dateStr: string;
  timeStr: string;
  timeZone: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  note?: string;
}

export interface StoryItem {
  year: string;
  title: string;
  description: string;
  photo: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface GalleryItem {
  id: string;
  title: string;
  photo: string;
  aspectRatio: 'portrait' | 'landscape' | 'square' | 'panorama';
  caption?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
}

export interface PhysicalGiftAddress {
  recipientName: string;
  phoneNumber: string;
  fullAddress: string;
  googleMapsUrl?: string;
  note?: string;
}

// ============================================================================
// 🔴 CUSTOMER DATA — TEMPLATE 10: WHITE VEIL CINEMATIC
// ============================================================================

export const WEDDING_DATA = {
  // General Info
  weddingTitle: "The Wedding of Alya & Fajar",
  invitationKicker: "THE SACRED MATRIMONY",
  dateFormatted: "12 . 12 . 2026",
  fullDate: "Sabtu, 12 Desember 2026",
  targetDate: "2026-12-12T08:00:00+07:00", // For countdown
  
  // Holy Quran / Bible / Wisdom Quote
  quote: {
    verse: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
    source: "QS. Ar-Rum: 21",
  },

  // 👰 The Bride
  bride: {
    name: "Alya",
    fullName: "Alya Nabila Putri, S.Ds.",
    father: "Bpk. Ir. H. Bambang Sutrisno",
    mother: "Ibu Hj. Ratna Dewi",
    instagram: "@alyanabilap",
    photo: "image/cwe.jpg",
    bio: "Putri sulung yang ramah dan penuh kasih dari keluarga besar Bpk. Bambang & Ibu Ratna.",
  } as GroomBrideData,

  // 🤵 The Groom
  groom: {
    name: "Fajar",
    fullName: "Fajar Rahmatulloh, S.T.",
    father: "Bpk. Hendra Gunawan",
    mother: "Ibu Siti Aminah",
    instagram: "@fajar.rahmatulloh",
    photo: "image/laki.jpg",
    bio: "Putra kedua yang bertanggung jawab dan penuh keteguhan dari keluarga Bpk. Hendra & Ibu Siti.",
  } as GroomBrideData,

  // 📅 Wedding Events
  events: {
    akad: {
      title: "Akad Nikah",
      subTitle: "Holy Matrimony",
      dateStr: "Sabtu, 12 Desember 2026",
      timeStr: "08:00 – 10:00",
      timeZone: "WIB",
      venueName: "Masjid Raya Al-Jabbar",
      venueAddress: "Jl. Cimincrang No.14, Cimenerang, Kec. Gedebage, Kota Bandung, Jawa Barat 40294",
      googleMapsUrl: "https://maps.google.com/?q=Masjid+Raya+Al-Jabbar+Bandung",
      note: "Diharapkan hadir 15 menit sebelum acara dan mengenakan busana sopan.",
    } as EventDetail,

    resepsi: {
      title: "Resepsi Pernikahan",
      subTitle: "Wedding Reception",
      dateStr: "Sabtu, 12 Desember 2026",
      timeStr: "11:00 – 14:00",
      timeZone: "WIB",
      venueName: "The Gaia Hotel Bandung — Grand Ballroom",
      venueAddress: "Jl. Dr. Setiabudi No. 430, Isola, Kec. Sukasari, Kota Bandung, Jawa Barat 40154",
      googleMapsUrl: "https://maps.google.com/?q=The+Gaia+Hotel+Bandung",
      note: "Dress code: Ivory, Champagne, Soft Sage, atau Pastel Elegance.",
    } as EventDetail,
  },

  // 📖 Love Story Timeline
  loveStory: [
    {
      year: "2021",
      title: "Pertemuan Pertama",
      description: "Berawal dari sebuah kebetulan di salah satu kegiatan sosial kampus. Sebuah sapaan sederhana menjadi gerbang percakapan panjang yang tak pernah henti hingga larut malam.",
      photo: "image/ring.jpg",
      aspectRatio: "landscape",
    },
    {
      year: "2023",
      title: "Menumbuhkan Komitmen",
      description: "Dua tahun berlalu dengan berbagai cerita, suka, dan duka. Kami belajar saling memahami, mendukung mimpi masing-masing, dan memantapkan niat suci menuju masa depan.",
      photo: "image/ring.jpg",
      aspectRatio: "portrait",
    },
    {
      year: "2025",
      title: "Momen Lamaran Khidmat",
      description: "Dikelilingi kehangatan kedua keluarga besar dan rintik embun sore hari, Fajar mengutarakan niatnya untuk meminang Alya. Dengan penuh haru dan syukur, lamaran tersebut diterima.",
      photo: "image/ring.jpg",
      aspectRatio: "square",
    },
    {
      year: "2026",
      title: "Ikrar Suci Pernikahan",
      description: "Kini, kami melangkah bersama mengikat janji suci di hadapan Sang Pencipta, orang tua, dan para sahabat terkasih untuk mengarungi bahtera rumah tangga yang abadi.",
      photo: "image/ring.jpg",
      aspectRatio: "landscape",
    },
  ] as StoryItem[],

  // 📷 Gallery items
  gallery: [
    {
      id: "gal-1",
      title: "The Whispering Veil",
      photo: "image/hutan kopel.jpg",
      aspectRatio: "landscape",
      caption: "Membawa doa dan ketenangan di bawah hembusan kain putih nan suci.",
    },
    {
      id: "gal-2",
      title: "Elegance of Alya",
      photo: "image/prewed 1.jpg",
      aspectRatio: "portrait",
      caption: "Pesona anggun dalam balutan sutra ivory dan buket mawar putih.",
    },
    {
      id: "gal-3",
      title: "Promise in Champagne",
      photo: "image/ring.jpg",
      aspectRatio: "portrait",
      caption: "Keteguhan hati untuk membimbing dan melindungi sepanjang hayat.",
    },
    {
      id: "gal-4",
      title: "Two Souls in Harmony",
      photo: "image/hutan kopel.jpg",
      aspectRatio: "landscape",
      caption: "Langkah berdampingan menyambut lembaran baru kehidupan.",
    },
    {
      id: "gal-5",
      title: "The Eternal Bands",
      photo: "image/lapangan.jpg",
      aspectRatio: "square",
      caption: "Simbol ikatan suci yang tak lekang oleh waktu dan zaman.",
    },
    {
      id: "gal-6",
      title: "Cinematic Stillness",
      photo: "/video/poster.jpg",
      aspectRatio: "landscape",
      caption: "Kedamaian jiwa saat dua hati bersatu dalam naungan rida-Nya.",
    },
  ] as GalleryItem[],

  // 🎁 Wedding Gifts
  gifts: {
    bankAccounts: [
      {
        bankName: "BCA",
        accountNumber: "8412948190",
        accountHolder: "Alya Nabila Putri",
      },
      {
        bankName: "Bank Mandiri",
        accountNumber: "1300098765432",
        accountHolder: "Fajar Rahmatulloh",
      },
    ] as BankAccount[],
    physicalGift: {
      recipientName: "Alya Nabila & Fajar Rahmatulloh",
      phoneNumber: "0812-3456-7890",
      fullAddress: "Jl. Dr. Setiabudi No. 430, Isola, Kec. Sukasari, Kota Bandung, Jawa Barat 40154 (Kediaman Keluarga Fajar & Alya)",
      googleMapsUrl: "https://maps.google.com/?q=The+Gaia+Hotel+Bandung",
      note: "Konfirmasi pengiriman kado fisik dapat dikirimkan melalui pesan WhatsApp.",
    } as PhysicalGiftAddress,
  },

  // 🎬 CUSTOMER VIDEO
  // ======================================================
  // TEMPLATE 10 — WHITE VEIL CINEMATIC
  // GANTI VIDEO CUSTOMER DI: public/video/prewedding.mp4
  // TIDAK PERLU MENGUBAH COMPONENT.
  // ======================================================
  video: {
    mp4: "/video/prewedding.mp4",
    webm: "/video/prewedding.webm",
    mobileMp4: "/video/prewedding-mobile.mp4",
    poster: "/video/poster.jpg",
  },

  // 🎵 CUSTOMER MUSIC
  // ======================================================
  // GANTI FILE: public/music/backsound.mp3
  // CUSTOMER TIDAK PERLU MENGUBAH COMPONENT.
  // ======================================================
  music: {
    src: "/music/backsound.mp3",
    title: "Canon in D — Acoustic Piano & Strings",
  },

  // Brand and Credits
  branding: {
    studioName: "T.M STUDIO",
    templateName: "TEMPLATE 10 — WHITE VEIL CINEMATIC",
  },
};
