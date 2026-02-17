import { Theme } from '../types';

const THEMES: Record<Theme, { container: string; glass: string; textPrimary: string; textSecondary: string; buttonPrimary: string }> = {
  [Theme.SOFT_PINK]: {
    container: 'bg-gradient-to-b from-pink-100 via-rose-100 to-purple-100',
    glass: 'bg-white/60 border-white/70',
    textPrimary: 'text-rose-900',
    textSecondary: 'text-rose-700',
    buttonPrimary: 'bg-rose-600 text-white hover:bg-rose-700'
  },
  [Theme.OLED]: {
    container: 'bg-black', glass: 'bg-white/10 border-white/10', textPrimary: 'text-white', textSecondary: 'text-white/70', buttonPrimary: 'bg-white text-black'
  },
  [Theme.CYBERPUNK]: {
    container: 'bg-gradient-to-b from-fuchsia-900 to-cyan-900', glass: 'bg-black/30 border-cyan-400/30', textPrimary: 'text-cyan-200', textSecondary: 'text-cyan-100', buttonPrimary: 'bg-cyan-500 text-black'
  },
  [Theme.MINIMALIST]: {
    container: 'bg-gray-50', glass: 'bg-white border-gray-200', textPrimary: 'text-gray-900', textSecondary: 'text-gray-600', buttonPrimary: 'bg-gray-900 text-white'
  }
};

export function getThemeStyles(theme: Theme) {
  return THEMES[theme] ?? THEMES[Theme.SOFT_PINK];
}
