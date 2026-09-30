import React from 'react';
import {
  Home,
  Heart,
  Calendar,
  Clock,
  Image,
  CheckSquare,
  MessageCircle,
  Gift,
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'couple', label: 'COUPLE', icon: Heart },
  { id: 'event', label: 'EVENT', icon: Calendar },
  { id: 'story', label: 'STORY', icon: Clock },
  { id: 'gallery', label: 'GALLERY', icon: Image },
  { id: 'rsvp', label: 'RSVP', icon: CheckSquare },
  { id: 'doa', label: 'DOA', icon: MessageCircle },
  { id: 'gift', label: 'GIFT', icon: Gift },
];

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Undangan Pernikahan Navigation"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[94vw] sm:max-w-none px-2 py-1.5 rounded-full bg-[#FAF7F2]/85 backdrop-blur-xl border border-[#E8DFC8]/70 shadow-[0_8px_32px_rgba(80,70,50,0.12)] transition-all duration-300"
    >
      <div className="flex items-center gap-1 sm:gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-[#2C2926] bg-white/90 shadow-sm font-semibold'
                  : 'text-[#7D766A] hover:text-[#2C2926] hover:bg-white/40 font-medium'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                  isActive ? 'scale-110 text-[#8C7A5B]' : 'opacity-80'
                }`}
              />
              <span className="text-[9px] sm:text-[10px] tracking-wider mt-0.5 leading-none">
                {item.label}
              </span>

              {/* Active soft champagne indicator dot */}
              {isActive && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#8C7A5B]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
