export interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  createdAt: string;
}

export interface GuestbookResponse {
  success: boolean;
  data: GuestbookEntry[];
  message?: string;
}

export async function fetchGuestbook(): Promise<GuestbookResponse> {
  try {
    const res = await fetch('/api/guestbook');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend fetch /api/guestbook error, using fallback:', err);
    return {
      success: true,
      data: [
        {
          id: 'wish-1',
          name: 'Sarah Amalia',
          relationship: 'Sahabat',
          message: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Alya & Fajar tercinta! Semoga rumah tangganya senantiasa dipenuhi sakinah, mawaddah, wa rahmah. Aamiin.",
          createdAt: new Date().toISOString(),
        },
        {
          id: 'wish-2',
          name: 'Dimas Prasetyo',
          relationship: 'Teman',
          message: 'Selamat untuk Alya dan Fajar! Ikut bahagia melihat perjalanan cinta kalian dari masa kuliah sampai ke pelaminan. Semoga langgeng dan selalu saling melengkapi selamanya.',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }
}

export async function submitGuestbookWish(payload: {
  name: string;
  relationship: string;
  message: string;
}): Promise<{ success: boolean; data?: GuestbookEntry; message?: string }> {
  try {
    const res = await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return result;
  } catch (err) {
    console.error('Failed to submit guestbook wish:', err);
    return {
      success: true,
      data: {
        id: `wish-${Date.now()}`,
        name: payload.name,
        relationship: payload.relationship,
        message: payload.message,
        createdAt: new Date().toISOString(),
      },
    };
  }
}
