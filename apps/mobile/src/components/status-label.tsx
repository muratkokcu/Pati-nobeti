import { StatusChip } from './status-chip';
import type { CareOutcome } from '@/domain/types';

const RECORD_LABEL: Record<CareOutcome, string> = { done: 'Yapıldı kaydı', skipped: 'Atlandı kaydı', uncertain: 'Emin değilim' };

/** Geçmiş listesindeki kayıt rozeti. Görsel dili `StatusChip` belirler; buradaki fark yalnız metindir. */
export function StatusLabel({ outcome }: { outcome: CareOutcome }) {
  return <StatusChip label={RECORD_LABEL[outcome]} size="sm" status={outcome} />;
}
