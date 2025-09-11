// Amana Living Design Tokens
// Based on the official Amana Living website styling

export const colors = {
  // Primary brand colors
  amana: {
    blue: {
      50: '#F0F8FF',
      100: '#E0F2FE',
      200: '#BAE6FD',
      300: '#7DD3FC',
      400: '#38BDF8',
      500: '#00AEEF', // Primary blue accent
      600: '#0284C7',
      700: '#0369A1',
      800: '#075985',
      900: '#0C4A6E',
    },
    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#E5734F', // Primary orange
      600: '#FF6600', // Bright orange
      700: '#EA580C',
      800: '#C2410C',
      900: '#9A3412',
    },
    // Background colors
    background: {
      light: '#BED1E3', // Light blue-grey background (matches Amana Living website)
      primary: '#BED1E3', // Primary blue background for sections
      white: '#FFFFFF',
      offwhite: '#F8FAFC',
    },
    // Text colors
    text: {
      primary: '#1A202C', // Very dark blue/black
      secondary: '#333333', // Dark grey
      muted: '#6B7280', // Light grey
      light: '#9CA3AF',
    },
  },
} as const;

export const typography = {
  fontFamily: {
    sans: ['Lato', 'Arial', 'Helvetica', 'sans-serif'],
    system: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
} as const;

export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Component-specific tokens
export const components = {
  button: {
    primary: {
      background: colors.amana.orange[500],
      backgroundHover: colors.amana.orange[600],
      color: colors.amana.background.white,
      borderRadius: borderRadius.md,
      padding: `${spacing.sm} ${spacing.lg}`,
      fontWeight: typography.fontWeight.semibold,
    },
    secondary: {
      background: 'transparent',
      backgroundHover: colors.amana.orange[500],
      color: colors.amana.orange[500],
      colorHover: colors.amana.background.white,
      border: `2px solid ${colors.amana.orange[500]}`,
      borderRadius: borderRadius.md,
      padding: `${spacing.sm} ${spacing.lg}`,
      fontWeight: typography.fontWeight.semibold,
    },
  },
  card: {
    background: colors.amana.background.white,
    borderRadius: borderRadius.lg,
    shadow: shadows.md,
    shadowHover: shadows.lg,
    padding: spacing.xl,
  },
  section: {
    heading: {
      color: colors.amana.text.primary,
      fontWeight: typography.fontWeight.bold,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
  },
} as const;

// Export all tokens as a single object for easy access
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  components,
} as const;
