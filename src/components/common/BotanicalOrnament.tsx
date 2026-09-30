import React from 'react';

interface BotanicalOrnamentProps {
  className?: string;
  variant?: 'divider' | 'wreath' | 'corner' | 'branch';
}

export const BotanicalOrnament: React.FC<BotanicalOrnamentProps> = ({
  className = 'w-24 h-6 text-[#9E9580]',
  variant = 'divider',
}) => {
  if (variant === 'wreath') {
    return (
      <svg
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M60 20C45 10 30 14 15 28C22 25 32 23 42 26"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M60 20C75 10 90 14 105 28C98 25 88 23 78 26"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M32 15C33 11 36 8 40 8C41 12 38 15 32 15Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <path
          d="M88 15C87 11 84 8 80 8C79 12 82 15 88 15Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <path
          d="M48 11C50 7 54 5 57 6C57 10 54 13 48 11Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <path
          d="M72 11C70 7 66 5 63 6C63 10 66 13 72 11Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <circle cx="60" cy="20" r="2.5" fill="currentColor" fillOpacity="0.6" />
      </svg>
    );
  }

  if (variant === 'branch') {
    return (
      <svg
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5 12C35 12 65 12 95 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />
        <circle cx="50" cy="12" r="3" fill="currentColor" fillOpacity="0.7" />
        <path
          d="M42 9C40 6 36 5 33 7C34 10 38 11 42 9Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <path
          d="M58 9C60 6 64 5 67 7C66 10 62 11 58 9Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </svg>
    );
  }

  // default 'divider'
  return (
    <svg
      viewBox="0 0 140 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 12H55M85 12H130"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="70" cy="12" r="2" fill="currentColor" />
      <path
        d="M62 10C60 7 57 7 55 9C56 11 59 12 62 10Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M78 10C80 7 83 7 85 9C84 11 81 12 78 10Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M65 14C63 16 60 16 58 14C59 13 62 13 65 14Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <path
        d="M75 14C77 16 80 16 82 14C81 13 78 13 75 14Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
    </svg>
  );
};
