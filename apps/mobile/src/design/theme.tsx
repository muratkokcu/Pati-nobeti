import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import { schemes, type Scheme } from '@/design/tokens';

export type SchemeName = 'light' | 'dark';

/**
 * Koyu mod tokenları hazırdır ama uygulama henüz sistem temasını takip etmez:
 * ekranlar düz `palette` kullandığı sürece yarı koyu bir arayüz çıkardı.
 * Ekranlar `useAppTheme()`e taşındığında (T-3) kök sağlayıcı `useColorScheme()`e bağlanır.
 * O güne kadar varsayılan açık temadır; koyu tema yalnız açıkça istenince verilir.
 */
const ThemeContext = createContext<{ scheme: SchemeName; theme: Scheme }>({ scheme: 'light', theme: schemes.light });

export function AppThemeProvider({ children, scheme = 'light' }: PropsWithChildren<{ scheme?: SchemeName }>) {
  const value = useMemo(() => ({ scheme, theme: schemes[scheme] }), [scheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): Scheme {
  return useContext(ThemeContext).theme;
}

export function useSchemeName(): SchemeName {
  return useContext(ThemeContext).scheme;
}
