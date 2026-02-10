import { lightColors, darkColors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';

export const lightTheme = {
  colors: lightColors,
  spacing,
  radius,
  mode: 'light' as const,
};

export const darkTheme = {
  colors: darkColors,
  spacing,
  radius,
  mode: 'dark' as const,
};

export type AppTheme = typeof lightTheme;
