/**
 * DS2 Theme Configuration
 * Centralized opacity and style tokens for consistent theming.
 * All text uses white with varying opacity levels.
 */

export const theme = {
  // Text opacity levels (applied as text-white/{value})
  text: {
    primary: 'text-white/95',        // headings, main titles
    secondary: 'text-white/80',      // sub-headings, emphasized text
    body: 'text-white/70',           // body paragraphs, descriptions
    muted: 'text-white/65',          // secondary descriptions, subtitles
    subtle: 'text-white/60',         // metadata, labels
    faint: 'text-white/50',          // category labels, numbering
    ghost: 'text-white/45',          // decorative text, panel labels
    whisper: 'text-white/35',        // panel decorative text (BRIDGE.LINK etc.)
  },

  // Interactive text (default / hover)
  interactive: {
    link: 'text-white/65 hover:text-white/90',
    nav: 'text-white/70 hover:text-white/90',
    button: 'text-white/70 hover:text-white/95',
    social: 'text-white/55 hover:text-white/80',
  },

  // Section labels (e.g. "// Profile", "// Tech Stack")
  sectionLabel: 'text-white/70 text-[11px] tracking-[0.4em] uppercase font-light',
  sectionLine: 'flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left',

  // Corner bracket decorations
  corner: {
    border: 'border-white/[0.18]',    // corner bracket border color
    size: {
      sm: 'w-4 h-4',                  // small corners (skill cards)
      md: 'w-5 h-5',                  // medium corners (projects, contact)
      lg: 'w-6 h-6',                  // large corners (about frame)
    },
  },

  // Card/panel borders
  border: {
    subtle: 'border-white/[0.08]',
    light: 'border-white/[0.12]',
    medium: 'border-white/[0.18]',
    hover: 'hover:border-white/25',
  },

  // Image/icon opacity
  icon: {
    default: 'opacity-75',
    muted: 'opacity-60',
  },

  // Placeholder text
  placeholder: 'placeholder:text-white/30',

  // Form input text
  input: 'text-white/85',
} as const;
