import React, { useState } from 'react';
import { Opening } from './components/opening/Opening.tsx';
import { BackgroundVideo } from './components/backgroundVideo/BackgroundVideo.tsx';
import { MusicControl } from './components/music/MusicControl.tsx';
import { Navigation } from './components/navigation/Navigation.tsx';
import { Hero } from './components/hero/Hero.tsx';
import { Couple } from './components/couple/Couple.tsx';
import { Event } from './components/event/Event.tsx';
import { Story } from './components/story/Story.tsx';
import { Gallery } from './components/gallery/Gallery.tsx';
import { Rsvp } from './components/rsvp/Rsvp.tsx';
import { Guestbook } from './components/guestbook/Guestbook.tsx';
import { WeddingGift } from './components/gift/WeddingGift.tsx';
import { LastPage } from './components/lastPage/LastPage.tsx';
import { Closing } from './components/closing/Closing.tsx';

import { useActiveSection } from './hooks/useActiveSection.ts';
import { useMusic } from './hooks/useMusic.ts';
import { useBackgroundVideo } from './hooks/useBackgroundVideo.ts';

const SECTION_IDS = [
  'home',
  'couple',
  'event',
  'story',
  'gallery',
  'rsvp',
  'doa',
  'gift',
];

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { videoRef } = useBackgroundVideo(isOpen);
  const { isPlaying, play: playMusic, toggle: toggleMusic } = useMusic();
  const activeSection = useActiveSection(SECTION_IDS);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Start background video
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Video playback warning:', err);
      });
    }
    // Start background music
    playMusic();
  };

  return (
    <div className="relative min-h-screen text-[#2C2926] bg-[#FAF7F2] font-sans overflow-x-hidden selection:bg-[#E8DFC8]">
      {/* 1. Global Persistent Video Background */}
      <BackgroundVideo videoRef={videoRef} />

      {/* 2. Floating Music Controller */}
      {isOpen && (
        <MusicControl isPlaying={isPlaying} toggleMusic={toggleMusic} />
      )}

      {/* 3. Opening Curtain / Invitation Envelope */}
      <Opening isOpen={isOpen} onOpenInvitation={handleOpenInvitation} />

      {/* 4. Main Invitation Flow */}
      {isOpen && (
        <main className="relative z-10">
          {/* Hero / Home */}
          <Hero />

          {/* Couple */}
          <Couple />

          {/* Event */}
          <Event />

          {/* Story */}
          <Story />

          {/* Gallery */}
          <Gallery />

          {/* RSVP */}
          <Rsvp />

          {/* Kirim Doa */}
          <Guestbook />

          {/* Wedding Gift */}
          <WeddingGift />

          {/* Last Page */}
          <LastPage />

          {/* Closing */}
          <Closing />

          {/* Bottom Dock Navigation */}
          <Navigation activeSection={activeSection} />
        </main>
      )}
    </div>
  );
}
