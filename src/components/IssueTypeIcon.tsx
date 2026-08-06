type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: "100%",
  height: "100%",
};

export function IconPothole({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <ellipse cx="12" cy="13" rx="8" ry="4.5" />
      <ellipse cx="12" cy="12.3" rx="5.2" ry="2.6" />
    </svg>
  );
}

export function IconGraffiti({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 19c3-6 5-9 8-9s5 3 8 9" />
      <circle cx="12" cy="6" r="2" />
    </svg>
  );
}

export function IconDumping({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 9h14l-1.4 9.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 9Z" />
      <path d="M3 9h18" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export function IconPlayground({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3v18" />
      <path d="M6 21c0-4 3-5 6-5s6 1 6 5" />
      <path d="M4 9h16" />
    </svg>
  );
}

export function IconStreetlight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M10 21h4" />
      <path d="M12 21V9" />
      <path d="M8 9h8l-1.5-4a1 1 0 0 0-.9-.6h-3.2a1 1 0 0 0-.9.6L8 9Z" />
    </svg>
  );
}

export function IconVegetation({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 21V10" />
      <path d="M12 12c-3-1-5-3-5-6 3 0 5 2 6 4 1-2 3-4 6-4 0 3-2 5-5 6" />
    </svg>
  );
}

export function IconWaterLeak({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z" />
    </svg>
  );
}

export function IconFootpath({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 20 12 4l8 16" />
      <path d="M8 12h8" />
      <path d="M6.5 16h11" />
    </svg>
  );
}