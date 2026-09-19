import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';
import { useAppTheme } from '@/design/theme';
import { typography } from '@/design/tokens';

export function DisplayText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text accessibilityRole="header" style={[styles.display, { color: t.ink }, style]} {...props}>{children}</Text>; }
export function TitleText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text accessibilityRole="header" style={[styles.title, { color: t.ink }, style]} {...props}>{children}</Text>; }
export function BodyText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text style={[styles.body, { color: t.ink }, style]} {...props}>{children}</Text>; }
export function BodyStrongText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text style={[styles.bodyStrong, { color: t.ink }, style]} {...props}>{children}</Text>; }
export function MetaText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text style={[styles.meta, { color: t.muted }, style]} {...props}>{children}</Text>; }
export function MetaStrongText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text style={[styles.metaStrong, { color: t.muted }, style]} {...props}>{children}</Text>; }
export function LabelText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text style={[styles.label, { color: t.muted }, style]} {...props}>{children}</Text>; }
/** Saat ve süre: tabular rakam, sütun hâlinde hizalı kalsın. */
export function ClockText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text style={[styles.clock, { color: t.ink }, style]} {...props}>{children}</Text>; }
export function ClockLeadText({ children, style, ...props }: PropsWithChildren<TextProps>) { const t = useAppTheme(); return <Text style={[styles.clockLead, { color: t.ink }, style]} {...props}>{children}</Text>; }

const styles = StyleSheet.create({
  display: typography.display,
  title: typography.title,
  body: typography.body,
  bodyStrong: typography.bodyStrong,
  meta: typography.meta,
  metaStrong: typography.metaStrong,
  label: typography.label,
  clock: typography.clock,
  clockLead: typography.clockLead,
});
