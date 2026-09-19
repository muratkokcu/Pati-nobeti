import { Platform } from 'react-native';

export const palette = {
  canvas: '#F5F1E8', surface: '#FFFCF6', ink: '#1F2723', muted: '#64706A',
  primary: '#265847', primarySoft: '#DCE8E1', brass: '#B97822', brassSoft: '#F3E4CB',
  overdue: '#A43C2E', overdueSoft: '#F5DDD8', uncertain: '#555C83', uncertainSoft: '#E4E5F0',
  line: '#D9D4C9', white: '#FFFFFF',
};
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 10, md: 14, lg: 18 } as const;
export const touchTarget = Platform.OS === 'ios' ? 44 : 48;

