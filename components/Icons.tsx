import type { SVGProps } from "react";

// One consistent outline icon set, 1.5px stroke, 24px grid.
type Props = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 16, children, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Check = (p: Props) => (
  <Base {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Base>
);
export const ArrowUpRight = (p: Props) => (
  <Base {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </Base>
);
export const ArrowLeft = (p: Props) => (
  <Base {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Base>
);
export const ChevronDown = (p: Props) => (
  <Base {...p}>
    <path d="M6 9l6 6 6-6" />
  </Base>
);
export const Close = (p: Props) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);
export const Sun = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Base>
);
export const Moon = (p: Props) => (
  <Base {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </Base>
);
export const Mail = (p: Props) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </Base>
);
export const Calendar = (p: Props) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Base>
);
export const GitHub = (p: Props) => (
  <Base {...p}>
    <path d="M15.5 21v-3.2c0-.9-.3-1.5-.7-1.9 2.3-.3 4.7-1.1 4.7-5.2 0-1.1-.4-2.1-1.1-2.8.1-.3.5-1.4-.1-2.9 0 0-.9-.3-2.9 1.1a10 10 0 0 0-5.2 0C8.2 4.7 7.3 5 7.3 5c-.6 1.5-.2 2.6-.1 2.9-.7.8-1.1 1.7-1.1 2.8 0 4.1 2.4 4.9 4.7 5.2-.3.3-.6.8-.7 1.5V21" />
    <path d="M9.5 18c-2.5.8-3.7-.7-4.5-1.5" />
  </Base>
);
export const LinkedIn = (p: Props) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 10v7M8 7v.5M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
  </Base>
);
export const XLogo = (p: Props) => (
  <Base {...p}>
    <path d="M4 4l16 16M20 4L4 20" />
  </Base>
);
export const MapPin = (p: Props) => (
  <Base {...p}>
    <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </Base>
);
export const Terminal = (p: Props) => (
  <Base {...p}>
    <path d="M4 17l6-5-6-5M12 19h8" />
  </Base>
);
export const Palette = (p: Props) => (
  <Base {...p}>
    <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.8 2-1.7 0-.9-.6-1.3-.6-2.2 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5z" />
    <circle cx="7.5" cy="11" r="1" /><circle cx="10.5" cy="7.5" r="1" /><circle cx="15" cy="7.5" r="1" />
  </Base>
);
export const Instagram = (p: Props) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </Base>
);
