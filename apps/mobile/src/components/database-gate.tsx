import { SQLiteProvider } from 'expo-sqlite';
import { useState, type PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BodyText, MetaText, TitleText } from './typography';
import { migrateDatabase } from '@/data/migrations';
import { palette, radius, spacing } from '@/design/tokens';

const DATABASE_NAME = Platform.OS === 'web' ? ':memory:' : 'patinobeti-v2.db';

// Web'de SQLite dosya kilidini tek sekme tutar; ikinci sekme bu hatayı alır.
function isSingleTabLock(error: Error) {
  return Platform.OS === 'web' && /NoModificationAllowedError|Access Handles cannot be created/i.test(`${error.name} ${error.message}`);
}

export function DatabaseGate({ children }: PropsWithChildren) {
  const [error, setError] = useState<Error | null>(null);
  if (!error) return <SQLiteProvider databaseName={DATABASE_NAME} onError={setError} onInit={migrateDatabase}>{children}</SQLiteProvider>;
  return <View style={styles.root}>
    <TitleText>{isSingleTabLock(error) ? 'PatiNöbeti başka bir sekmede açık' : 'Kayıt veritabanı açılamadı'}</TitleText>
    <BodyText style={styles.body}>{isSingleTabLock(error)
      ? 'Tarayıcı önizlemesi aynı anda tek sekmede çalışır. Diğer sekmeyi kapatıp bu sayfayı yenile.'
      : 'Uygulama bu cihazdaki kayıtları açamadı. Uygulamayı kapatıp yeniden açmayı dene. Kayıtların silinmedi; bu cihazda duruyor.'}</BodyText>
    <MetaText style={styles.detail}>{error.message}</MetaText>
  </View>;
}
const styles = StyleSheet.create({
  root: { backgroundColor: palette.canvas, flex: 1, gap: spacing.md, justifyContent: 'center', padding: spacing.xl },
  body: { color: palette.ink }, detail: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, padding: spacing.md },
});
