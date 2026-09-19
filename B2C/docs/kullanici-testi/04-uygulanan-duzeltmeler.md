# Uygulanan düzeltmeler — B-01, B-02, B-03, B-07

Tarih: 18 Eylül 2026 · Kapsam: kullanıcı testinin "doğruluk paketi" (öncelik listesinin 1. maddesi)

Bu dört bulgu aynı veri modeli ve aynı ekran üzerinde durduğu için birlikte düzeltildi.
Testte ölçülen davranışın düzeldiği, aynı harness ile gerçek tarayıcıda doğrulandı;
kanıt ekranları `ekran-goruntuleri/duzeltme-dogrulama/` altındadır.

## Ne değişti

### B-01 · İkinci kayıt öncesi bilgi ekranı
Dolu bir bakıma tekrar kayıt eklemek artık doğrudan mümkün değil; önce ne olduğunu gösteren
bir ekran çıkıyor:

> **Bu bakım bugün kaydedildi**
> Deniz, 08:12’de “yapıldı” ekledi.
> [ **Tamam** ]  (büyük, varsayılan) · [ Yine de kayıt ekle ] (ikincil)

Tasarım tartışmada uzlaşılan hâliyle uygulandı: kilit yok, kırmızı ünlem yok,
"emin misin / tehlike / hata" kelimesi yok; varsayılan buton güvenli çıkış.
**Dokunuş maliyeti:** boş slota kayıt hâlâ 2 dokunuş (değişmedi); dolu slota ısrar 3 dokunuş.
Yani sürtünme yalnız üzerine yazan kullanıcıya biniyor — Barış'ın şartı korundu, Kerem'in
talebi karşılandı.

### B-02 · Kart artık hiçbir kaydı gizlemiyor
Bugün kartı o güne ait **tüm** kayıtları kim + saat + durum ile alt alta gösteriyor.
Önceden yalnız sonuncusu görünüyor, önceki kayıt ekrandan siliniyordu.

### B-03 · Çakışma görünür ve çözülebilir
- İki "yapıldı" artık çakışma sayılıyor: **"Bu bakım iki kez “yapıldı” olarak kaydedildi."**
  Farklı sonuçlar için mesaj ayrı: "Aynı bakım için farklı kayıtlar var."
- Çakışma mesajı kayıtların **yerine değil, üstünde** duruyor; kim ne dedi görünüyor.
- Kartın tamamı dokunulabilir.
- Kayıt ekranında **"Hangisi geçerli?"** bölümü var: seçilen durum `kind: 'resolution'` olan yeni
  bir kayıt olarak ekleniyor. Hiçbir kayıt silinmiyor; geçmişte "Netleştirme kaydı · önceki
  kayıtlar silinmedi" etiketiyle duruyor. Netleştirmeden sonra gelen yeni bir kayıt çelişirse
  çakışma yeniden doğuyor.

### B-07 · Gün dönüyor
- Görevler artık planlardan **her gün için** üretiliyor (`rollForward`), geçmiş günler geçmişte kalıyor.
- Bugün sekmesi yalnız bugünün görevlerini gösteriyor; kayıt yoksa "Bugün için kayıt yok",
  saat geçmişse "Planlanan 08:00 geçti · bugün kayıt yok".
- Eski sürümle oluşmuş cihazlar için göç var (`normalizeOccurrences`): eski `occ-morning` /
  `occ-evening` kayıtları günlük kimlik düzenine taşınıyor, çift satır oluşmuyor, hiçbir kayıt atılmıyor.

### Yan düzeltme · Türkçe saat eki
Kayıt cümlesindeki ek sabit `’de` idi ("18:59’de"). `clockSuffix()` eki okunuşa göre seçiyor:
08:12’**de**, 18:59’**da**, 18:14’**te**. (B-50'nin yalnız bu kalemi kapandı.)

## Dokunulan dosyalar

| Dosya | Değişiklik |
|---|---|
| `src/domain/care.ts` | `conflictReason()` (duplicate-done / disagreement), `standingEvents()`, `conflictNotice()`, `eventSentence()`, `clockSuffix()`, `resolutionAccessibleLabel()` |
| `src/domain/schedule.ts` | **yeni** — `localDayKey`, `occurrenceIdFor`, `scheduledAtFor`, `buildDayOccurrences`, `normalizeOccurrences`, `rollForward`, `occurrencesOn` |
| `src/domain/types.ts` | `CareEventKind = 'record' \| 'resolution'`, `CareEvent.kind` |
| `src/data/seed.ts` | Demo verisi artık plandan bugünün görevlerini üretiyor |
| `src/data/repository.ts` | `getSnapshot()` göç + gün üretimi yapıp kalıcılaştırıyor; `recordCare` `kind` alıyor |
| `src/state/app-context.tsx` | `recordCare(occurrenceId, outcome, kind)` |
| `src/components/task-row.tsx` | Tüm kayıtlar, çakışma bildirimi, kartın tamamı dokunulabilir, bugüne özgü boş durumlar |
| `src/app/(tabs)/index.tsx` | Yalnız bugünün görevleri + "bugün planlanmış bakım yok" durumu |
| `src/app/record/[occurrenceId].tsx` | Bilgi ekranı, "Yine de kayıt ekle", "Hangisi geçerli?" netleştirme |
| `src/app/(tabs)/history.tsx` | Netleştirme kaydı etiketi |
| `src/domain/care.test.ts`, `src/domain/schedule.test.ts` | 15 test (önce 4) |

## Doğrulama

- `npm test` → 15/15 başarılı · `npm run lint` → temiz · `npx tsc --noEmit` → yalnız B-58'in
  bilinen hatası (`app-tabs.web.tsx`, bu düzeltmelerle ilgisiz).
- Tarayıcıda, gerçek kullanım (harness, `verify.js` ve `verify-day.js`):
  1. Kayıtlı bakıma dokunma → bilgi ekranı çıktı (`b01-bilgi-ekrani.png`).
  2. Israr edip ikinci "Yapıldı" → kartta iki kayıt + "iki kez yapıldı" uyarısı (`b02-b03-cift-kayit.png`).
  3. Karta dokunma → "Hangisi geçerli?" (`b03-cozum-ekrani.png`) → netleştirme sonrası
     çakışma kalktı, üç kayıt da duruyor (`b03-netlestirildi.png`).
  4. Cihaz saati ertesi güne alındı → Bugün "Planlanan 08:00 geçti · bugün kayıt yok" dedi,
     dünkü kayıtlar Geçmiş'te kaldı (`b07-ertesi-gun.png`, `b07-gecmis.png`).
  5. Kerem'in eski sürümle dolmuş cihaz profili yeni sürümde açıldı: çift satır yok,
     dört kaydı da görünüyor, göç kayıpsız.

## Bu düzeltmelerin kapatmadığı komşu bulgular

- **B-10** (düzeltme/geri alma) açık: netleştirme yalnız çakışmayı çözer; yanlış tek kaydı
  düzeltmek hâlâ mümkün değil.
- **B-15** (onaysız toplu silme), **B-16** (davet), **B-24/B-25/B-28** (plan ve hatırlatıcı),
  **B-11** (not/doz/saat girişi) açık.
- **B-08** (saat dilimi) açık: plan saatleri hâlâ cihaz saat diliminde biçimleniyor, Planlar
  sekmesi ham dizeyi gösteriyor.
- **B-32/B-33** (kaçırılan bakım bildirimi, kişi başına ayar) açık — Bugün ekranı artık doğru
  cevabı verdiği için bu bildirimin dayanacağı veri hazır.

---

## Ek: web önizleme düzeltmeleri (19 Eylül 2026)

Kullanıcı testinden değil, önizlemenin tarayıcı konsolundan çıkan iki hata düzeltildi
(ayrıntı: `01-bulgu-listesi.md` bölüm L).

| Bulgu | Ne yapıldı | Dosya |
|---|---|---|
| B-61 · web'de açılışta çökme | Bildirim yanıtı kancası platform dosyalarına ayrıldı | `src/components/notification-navigator.tsx`, `.web.tsx`, `src/app/_layout.tsx` |
| B-62 · ikinci sekmede boş ekran | `SQLiteProvider.onError` yakalanıp okunur ekran gösteriliyor | `src/components/database-gate.tsx` |

Doğrulama: `npm run typecheck`, `npm run lint` temiz, `npm test` 36/36; yeniden derlenen
`dist-preview` üzerinde iki sekmeli senaryo harness ile koşuldu — ilk sekme sıfır hatayla açılıyor,
ikinci sekme "PatiNöbeti başka bir sekmede açık" mesajını gösteriyor.
