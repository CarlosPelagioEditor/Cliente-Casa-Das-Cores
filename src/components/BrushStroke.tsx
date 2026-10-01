import React from 'react';

interface BrushStrokeProps {
  color?: string; // Tailwind color or CSS color
  className?: string;
  variant?: 'underline' | 'badge' | 'swatch' | 'swipe';
  opacity?: number;
}

export const BrushStroke: React.FC<BrushStrokeProps> = ({
  color = '#F59E0B',
  className = '',
  variant = 'underline',
  opacity = 0.85
}) => {
  if (variant === 'underline') {
    return (
      <svg
        className={`pointer-events-none ${className}`}
        viewBox="0 0 280 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Realistic brush stroke with textured bristles and wet paint look */}
        <path
          d="M3 13.5C28.5 7.8 92.2 4.1 146 6.8C202.5 9.6 258 13.2 277 15.5C265 17.5 198.5 19.8 141.5 18.2C81.2 16.5 24 19 4 21C2.5 19.2 1.5 15.5 3 13.5Z"
          fill={color}
          fillOpacity={opacity}
        />
        <path
          d="M12 9C45 6.2 110 5.1 162 7.2C218 9.5 264 12.8 274 13.8C250 14.8 185 15.8 132 15C76 14.2 30 16 12 17.5V9Z"
          fill={color}
          fillOpacity={Math.min(1, opacity + 0.15)}
        />
        <path
          d="M35 15C85 13.5 170 13 245 16.2C220 17 145 18 80 17C55 16.6 38 15.8 35 15Z"
          fill={color}
          fillOpacity={0.6}
        />
        {/* Paint bristles detail */}
        <line x1="272" y1="13" x2="279" y2="15" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.7} />
        <line x1="268" y1="16" x2="276" y2="17.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={0.6} />
        <line x1="2" y1="14" x2="8" y2="13" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      </svg>
    );
  }

  if (variant === 'badge') {
    return (
      <svg
        className={`pointer-events-none absolute inset-0 w-full h-full -z-10 ${className}`}
        viewBox="0 0 200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M5 24C4 12 12 5 24 4C65 2.5 140 3 182 5C194 5.8 198 14 197 24C196 35 191 43 178 44C136 46 58 45.5 20 43C8 42.2 6 34 5 24Z"
          fill={color}
          fillOpacity={opacity}
        />
        {/* Subtle bristle texture edges */}
        <path
          d="M2 18C4 10 10 7 20 6C58 4.5 145 5 184 7C192 7.5 197 12 198 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.5}
        />
      </svg>
    );
  }

  // Variant: swipe (horizontal painterly divider)
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 600 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M2 16C65 7 210 5 350 9C480 13 560 19 598 21C550 24 410 26 280 23C150 20 50 24 2 27V16Z"
        fill={color}
        fillOpacity={opacity}
      />
      <path
        d="M25 12C95 8 240 7 370 10C495 13 565 17 588 19C520 20 390 21 265 19C145 17 65 20 25 22V12Z"
        fill={color}
        fillOpacity={Math.min(1, opacity + 0.15)}
      />
      {/* Dry brush marks */}
      <line x1="592" y1="18" x2="600" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.6} />
      <line x1="585" y1="22" x2="596" y2="23" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
      <line x1="0" y1="17" x2="12" y2="15" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
    </svg>
  );
};
