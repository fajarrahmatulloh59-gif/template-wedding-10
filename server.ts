import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Persistent data directory
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const RSVP_FILE = path.join(DATA_DIR, 'rsvp.json');
const GUESTBOOK_FILE = path.join(DATA_DIR, 'guestbook.json');

// Initial seed data
const initialRsvps = [
  {
    id: 'rsvp-1',
    name: 'Sarah Amalia & Partner',
    guestCount: 2,
    status: 'HADIR',
    createdAt: '2026-09-28T09:15:00Z',
  },
  {
    id: 'rsvp-2',
    name: 'Dr. Dimas Prasetyo',
    guestCount: 1,
    status: 'HADIR',
    createdAt: '2026-09-28T11:42:00Z',
  },
  {
    id: 'rsvp-3',
    name: 'Reza Firmansyah',
    guestCount: 1,
    status: 'MASIH RAGU',
    createdAt: '2026-09-28T14:20:00Z',
  },
  {
    id: 'rsvp-4',
    name: 'Dian Kusumawardani',
    guestCount: 0,
    status: 'TIDAK HADIR',
    createdAt: '2026-09-29T08:05:00Z',
  },
  {
    id: 'rsvp-5',
    name: 'Keluarga Om Doni & Tante Rina',
    guestCount: 2,
    status: 'HADIR',
    createdAt: '2026-09-29T10:30:00Z',
  },
];

const initialGuestbook = [
  {
    id: 'wish-1',
    name: 'Sarah Amalia',
    relationship: 'Sahabat',
    message: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Alya & Fajar tercinta! Semoga rumah tangganya senantiasa dipenuhi sakinah, mawaddah, wa rahmah. Aamiin.",
    createdAt: '2026-09-28T09:20:00Z',
  },
  {
    id: 'wish-2',
    name: 'Dimas Prasetyo',
    relationship: 'Teman',
    message: 'Selamat untuk Alya dan Fajar! Ikut bahagia melihat perjalanan cinta kalian dari masa kuliah sampai ke pelaminan. Semoga langgeng dan selalu saling melengkapi selamanya.',
    createdAt: '2026-09-28T11:45:00Z',
  },
  {
    id: 'wish-3',
    name: 'Tante Rina & Om Doni',
    relationship: 'Keluarga',
    message: 'Selamat berbahagia ya ananda Alya & Fajar. Semoga menjadi keluarga yang sakinah mawaddah warahmah, dimudahkan rezekinya dan selalu dalam lindungan Allah SWT.',
    createdAt: '2026-09-29T10:35:00Z',
  },
  {
    id: 'wish-4',
    name: 'Aditya Pratama',
    relationship: 'Rekan',
    message: 'Happy Wedding Fajar & Alya! Semoga lancar sampai hari H dan sukses selalu dalam membangun bahtera rumah tangga yang harmonis.',
    createdAt: '2026-09-29T13:10:00Z',
  },
  {
    id: 'wish-5',
    name: 'Nabila Putri',
    relationship: 'Sahabat',
    message: 'MasyaAllah terharu banget melihat Alya dan Fajar akhirnya bersanding di pelaminan. Cantik dan ganteng serasi banget! Bahagia selalu selamanya ya!',
    createdAt: '2026-09-29T15:22:00Z',
  },
];

function getRsvps() {
  if (!fs.existsSync(RSVP_FILE)) {
    fs.writeFileSync(RSVP_FILE, JSON.stringify(initialRsvps, null, 2));
    return initialRsvps;
  }
  try {
    const raw = fs.readFileSync(RSVP_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return initialRsvps;
  }
}

function saveRsvps(data: any[]) {
  fs.writeFileSync(RSVP_FILE, JSON.stringify(data, null, 2));
}

function getGuestbook() {
  if (!fs.existsSync(GUESTBOOK_FILE)) {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(initialGuestbook, null, 2));
    return initialGuestbook;
  }
  try {
    const raw = fs.readFileSync(GUESTBOOK_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return initialGuestbook;
  }
}

function saveGuestbook(data: any[]) {
  fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(data, null, 2));
}

// --------------------------------------------------------------------
// API ROUTES
// --------------------------------------------------------------------

// RSVP Endpoints
app.get('/api/rsvp', (_req, res) => {
  const rsvps = getRsvps();
  const summary = {
    totalResponses: rsvps.length,
    attending: rsvps.filter((r: any) => r.status === 'HADIR').length,
    declined: rsvps.filter((r: any) => r.status === 'TIDAK HADIR').length,
    uncertain: rsvps.filter((r: any) => r.status === 'MASIH RAGU').length,
    totalGuests: rsvps.reduce((acc: number, r: any) => acc + (r.status === 'HADIR' ? (Number(r.guestCount) || 1) : 0), 0),
  };
  res.json({ success: true, data: rsvps, summary });
});

app.post('/api/rsvp', (req, res) => {
  const { name, guestCount, status } = req.body;
  if (!name || !status) {
    return res.status(400).json({ success: false, message: 'Nama dan status kehadiran wajib diisi.' });
  }

  const validStatuses = ['HADIR', 'TIDAK HADIR', 'MASIH RAGU'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Status kehadiran tidak valid.' });
  }

  const rsvps = getRsvps();
  const newEntry = {
    id: `rsvp-${Date.now()}`,
    name: String(name).trim(),
    guestCount: status === 'HADIR' ? Math.max(1, Math.min(5, Number(guestCount) || 1)) : 0,
    status,
    createdAt: new Date().toISOString(),
  };

  rsvps.unshift(newEntry);
  saveRsvps(rsvps);

  res.status(201).json({ success: true, data: newEntry });
});

// Guestbook (Kirim Doa) Endpoints
app.get('/api/guestbook', (_req, res) => {
  const guestbook = getGuestbook();
  res.json({ success: true, data: guestbook });
});

app.post('/api/guestbook', (req, res) => {
  const { name, relationship, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ success: false, message: 'Nama dan doa / ucapan wajib diisi.' });
  }

  const guestbook = getGuestbook();
  const newEntry = {
    id: `wish-${Date.now()}`,
    name: String(name).trim(),
    relationship: relationship || 'Teman',
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  guestbook.unshift(newEntry);
  saveGuestbook(guestbook);

  res.status(201).json({ success: true, data: newEntry });
});

// --------------------------------------------------------------------
// VITE DEV SERVER OR STATIC PRODUCTION SERVING
// --------------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
