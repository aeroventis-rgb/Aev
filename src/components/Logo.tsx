export function Logo({ className = "h-24 w-24" }: { className?: string }) {
  const ink = "#000E31";
  const blue = "#0A5BAA";
  const blueLight = "#0C67B8";

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="aero-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={blueLight} />
          <stop offset="100%" stopColor={blue} />
        </linearGradient>
        <linearGradient id="aero-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E3E3E3" />
          <stop offset="50%" stopColor={blueLight} />
          <stop offset="100%" stopColor={ink} />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="53" fill="#ffffff" stroke="url(#aero-ring)" strokeWidth="3.6" />

      <g stroke={blue} strokeWidth="2" strokeLinecap="round" transform="translate(60 26)">
        <line x1="0" y1="-8" x2="0" y2="8" />
        <line x1="-7" y1="-4" x2="7" y2="4" />
        <line x1="-7" y1="4" x2="7" y2="-4" />
      </g>

      <text
        x="60"
        y="81"
        textAnchor="middle"
        fill={ink}
        fontSize="38"
        fontWeight="900"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="-0.06em"
      >
        AV
      </text>

      <path
        d="M26 96 Q42 88 60 94 Q78 88 94 96"
        fill="none"
        stroke="url(#aero-wave)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M32 102 Q48 96 60 99 Q72 96 88 102"
        fill="none"
        stroke={blueLight}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
