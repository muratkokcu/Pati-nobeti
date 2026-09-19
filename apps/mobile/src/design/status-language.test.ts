import { STATUS_LANGUAGE, careStatusOf, eventVerb, outcomeWord } from './status-language';
import type { CareEvent, TaskOccurrence } from '@/domain/types';

const event = (over: Partial<CareEvent>): CareEvent => ({
  id: 'e1', occurrenceId: 'o1', outcome: 'done', actorId: 'u1', actorName: 'Deniz',
  recordedAt: '2026-09-19T05:12:00.000Z', syncState: 'synced', ...over,
});

const occurrence = (events: CareEvent[], scheduledAt = '2026-09-19T05:00:00.000Z'): TaskOccurrence => ({
  id: 'o1', planId: 'p1', petId: 'pet', title: 'Sabah bakımı', instruction: '', scheduledAt, events,
});

const NOW = new Date('2026-09-19T06:00:00.000Z');

describe('durum dili', () => {
  it('her durumun ikonu, etiketi ve cümlesi vardır — renk tek taşıyıcı değildir', () => {
    for (const status of ['upcoming', 'due', 'overdue', 'done', 'skipped', 'uncertain', 'conflict'] as const) {
      expect(STATUS_LANGUAGE[status].label.length).toBeGreaterThan(0);
      expect(STATUS_LANGUAGE[status].icon.length).toBeGreaterThan(0);
      expect(STATUS_LANGUAGE[status].sentence.length).toBeGreaterThan(0);
    }
  });

  it('etiketler benzersizdir', () => {
    const labels = Object.values(STATUS_LANGUAGE).map((item) => item.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('ikonlar benzersizdir: gri tonda silüet ayırt eder', () => {
    const icons = Object.values(STATUS_LANGUAGE).map((item) => item.icon);
    expect(new Set(icons).size).toBe(icons.length);
  });
});

describe('careStatusOf', () => {
  it('kayıt yoksa ve saat geçmişse gecikti der', () => {
    expect(careStatusOf(occurrence([]), NOW)).toBe('overdue');
  });

  it('planlanan saat gelmediyse yaklaşıyor der', () => {
    expect(careStatusOf(occurrence([], '2026-09-19T09:00:00.000Z'), NOW)).toBe('upcoming');
  });

  it('planlanan saate girildiyse şimdi der', () => {
    expect(careStatusOf(occurrence([], '2026-09-19T06:10:00.000Z'), NOW)).toBe('due');
  });

  it('son kaydın sonucunu gösterir', () => {
    expect(careStatusOf(occurrence([event({ outcome: 'skipped' })]), NOW)).toBe('skipped');
  });

  it('iki farklı kayıt çakışmadır', () => {
    const events = [event({ id: 'e1', outcome: 'done' }), event({ id: 'e2', outcome: 'skipped', actorId: 'u2', actorName: 'Murat' })];
    expect(careStatusOf(occurrence(events), NOW)).toBe('conflict');
  });

  it('netleştirmeden sonra geçerli kayıt gösterilir', () => {
    const events = [
      event({ id: 'e1', outcome: 'done' }),
      event({ id: 'e2', outcome: 'skipped', actorId: 'u2', actorName: 'Murat' }),
      event({ id: 'e3', outcome: 'done', kind: 'resolution' }),
    ];
    expect(careStatusOf(occurrence(events), NOW)).toBe('done');
  });
});

describe('kayıt cümlesi parçaları', () => {
  it('fiil kökü tırnaksızdır', () => {
    expect(outcomeWord('done')).toBe('yapıldı');
    expect(outcomeWord('skipped')).toBe('atlandı');
    expect(outcomeWord('uncertain')).toBe('emin değilim');
  });

  it('netleştirme kaydı ayrı fiil alır', () => {
    expect(eventVerb(event({}))).toBe('ekledi');
    expect(eventVerb(event({ kind: 'resolution' }))).toBe('olarak netleştirdi');
  });
});
