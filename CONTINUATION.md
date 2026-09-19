# PatiNöbeti devam sözleşmesi

Bu dosya kota/oturum kesintisinden sonra işi aynı noktadan sürdürmek içindir.

## Kalıcı görev

`B2C/docs/09-mvp-ortak-inceleme.md` içindeki açık release blocker'larını sırayla kapat. Her anlamlı MVP sonrasında marka/tasarım, mobil ürün ve teknik mimari rollerini aynı kod üzerinde yeniden incelemeye çağır. Ortak karar yerel demo için GO, dış pilot için ise yalnız gerçek iki cihazlı akış ve güvenlik kapıları geçtiğinde GO olmalıdır. Dokümantasyonu, testleri ve karar kayıtlarını her turda güncelle. Uydurma kullanıcı, ödeme, eşitleme veya test sonucu üretme.

## Yeniden başlama kontrol listesi

1. `B2C/docs/07-mvp-uygulama-durumu.md` ve `09-mvp-ortak-inceleme.md` dosyalarını oku.
2. `cd apps/mobile && npm run typecheck && npm test && npm run lint` çalıştır.
3. Başarısız testi düzelt; ardından en yüksek riskli açık blocker'a geç.
4. Çalışmayan harici servisleri çalışıyormuş gibi gösterme.
5. Her tur sonunda dokümantasyonu ve beta GO/NO-GO kararını güncelle.

## 19 Eylül 2026 kontrol noktası

- Production dikey akışı auth, profil, atomik hane+pet+ilk plan, ortak snapshot,
  kullanıcı+hane scoped offline outbox, Realtime invalidation, 30 günlük geçmiş,
  kayıt ve davet üretme/önizleme/iptal/kabul seviyesine geldi.
- Mobil kalite kapısı: typecheck/uyarısız lint, 31 Jest testi ve Android export yeşil.
- SQL sözleşmesi 35 pgTAP assertion'a çıktı ancak Docker/Supabase olmadığı için
  hâlâ çalıştırılmadı; bunu geçmiş sayma.
- Sıradaki en yüksek teknik risk: SQL'i gerçek local/staging Supabase'da çalıştırmak,
  üretilmiş tipleri almak ve iki gerçek cihazda offline/response-loss/outbox/realtime
  senaryosunu kanıtlamak.
- Ardından parola kurtarma/e-posta deep link'i, verified Universal/App Link,
  analytics, export/delete/KVKK ve store sandbox gelir.

## Zamanlanmış görev prompt'u

ChatGPT masaüstü uygulamasındaki aynı sohbeti kullanan Programlanmış görev için:

> `/home/murat/Projects/mobile-app-idea` projesinde PatiNöbeti geliştirmesine devam et. Önce `CONTINUATION.md` dosyasını ve aktif goal durumunu oku. Kota uygunsa testleri çalıştırıp açık release blocker'larındaki en yüksek riskli işi uygula; üç uzman rolün ortak inceleme döngüsünü koru. Kota hâlâ sınırlıysa dosya değiştirme ve bir sonraki çalıştırmada tekrar dene.
