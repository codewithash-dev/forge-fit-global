/**
 * ForgeFit Global theme — aligned with mockup + logo (gold, obsidian, cream, ember, sage, shabbat).
 */
export const COLORS = {
  // Primary accent (logo gold)
  primary: '#C9A84C',
  primaryLight: '#E8D48B',
  primaryDark: '#A07D2E',

  // Secondary accents (mockup section colors)
  ember: '#D4553A',
  emberLight: '#E8826E',
  sage: '#6B8F71',
  sageLight: '#9BC4A1',
  shabbat: '#7B6EC7',
  shabbatLight: '#A99EDB',

  // Legacy aliases for existing components (map to new palette)
  secondary: '#D4553A',   // ember
  accent: '#E8D48B',     // gold light

  // Backgrounds (mockup: obsidian, charcoal, slate)
  dark: '#0D0D0D',
  darker: '#0D0D0D',
  charcoal: '#1A1A1A',
  slate: '#2A2A2A',

  // Surfaces
  cardBg: '#1A1A1A',

  // Text
  white: '#F5F0E8',      // cream
  gray: 'rgba(245,240,232,0.5)',
  lightGray: 'rgba(245,240,232,0.7)',
};

/** Gradient glow for screens (gold tint, matches logo) */
export const GRADIENT_GLOW = ['rgba(201,168,76,0.28)', 'rgba(13,13,13,0)'] as const;
export const GRADIENT_GLOW_STRONG = ['rgba(201,168,76,0.38)', 'rgba(13,13,13,0)'] as const;
/** Gold → ember gradient for CTAs */
export const GRADIENT_PRIMARY = ['#C9A84C', '#A07D2E'] as const;

export const SIZES = {
  padding: 16,
  radius: 24,
  largeRadius: 32,
};
