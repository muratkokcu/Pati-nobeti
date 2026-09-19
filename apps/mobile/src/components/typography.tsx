import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';
import { palette } from '@/design/tokens';

export function DisplayText({ children, style, ...props }: PropsWithChildren<TextProps>) { return <Text accessibilityRole="header" style={[styles.display, style]} {...props}>{children}</Text>; }
export function TitleText({ children, style, ...props }: PropsWithChildren<TextProps>) { return <Text accessibilityRole="header" style={[styles.title, style]} {...props}>{children}</Text>; }
export function BodyText({ children, style, ...props }: PropsWithChildren<TextProps>) { return <Text style={[styles.body, style]} {...props}>{children}</Text>; }
export function MetaText({ children, style, ...props }: PropsWithChildren<TextProps>) { return <Text style={[styles.meta, style]} {...props}>{children}</Text>; }
const styles = StyleSheet.create({
  display: { color: palette.ink, fontSize: 34, lineHeight: 40, fontWeight: '700', letterSpacing: -0.7 },
  title: { color: palette.ink, fontSize: 21, lineHeight: 27, fontWeight: '700', letterSpacing: -0.2 },
  body: { color: palette.ink, fontSize: 16, lineHeight: 23, fontWeight: '400' },
  meta: { color: palette.muted, fontSize: 13, lineHeight: 18, fontWeight: '600' },
});

