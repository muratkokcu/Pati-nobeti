# PatiNöbeti devam sözleşmesi

Bu dosya kota/oturum kesintisinden sonra işi aynı noktadan sürdürmek içindir.

## Kalıcı görev

`B2C/docs/09-mvp-ortak-inceleme.md` içindeki açık release blocker'larını sırayla kapat. Her anlamlı MVP sonrasında marka/tasarım, mobil ürün ve teknik mimari rollerini aynı kod üzerinde yeniden incelemeye çağır. Ortak karar yerel demo için GO, dış pilot için ise yalnız gerçek iki cihazlı akış ve güvenlik kapıları geçtiğinde GO olmalıdır. Dokümantasyonu, testleri ve karar kayıtlarını her turda güncelle. Uydurma kullanıcı, ödeme, eşitleme veya test sonucu üretme.

## Yeniden başlama kontrol listesi

0. `git pull --rebase origin main` ile başla; çalışma ağacı temiz değilse önce onu çöz.
1. `B2C/docs/07-mvp-uygulama-durumu.md` ve `09-mvp-ortak-inceleme.md` dosyalarını oku.
2. `cd apps/mobile && npm run typecheck && npm test && npm run lint` çalıştır.
3. Başarısız testi düzelt; ardından en yüksek riskli açık blocker'a geç.
4. Çalışmayan harici servisleri çalışıyormuş gibi gösterme.
5. Her tur sonunda dokümantasyonu ve beta GO/NO-GO kararını güncelle.
6. Turu commit + push ile kapat; yarım bırakılan işi commit mesajında ve bu dosyada yaz.

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

## Sürüm kontrolü — 19 Eylül 2026'dan itibaren

- Proje artık **tek bir git deposudur** ve `git@github.com:muratkokcu/Pati-nobeti.git`
  adresine bağlıdır; çalışma dalı `main`. Depo kökü `/home/murat/Projects/mobile-app-idea`.
- `apps/mobile` artık ayrı bir depo **değildir**. Eski Expo şablonu geçmişi silinmedi,
  ağacın dışına taşındı: `/home/murat/Projects/.patinobeti-mobile-git-yedek` (`c35050e Initial commit`).
  `apps/mobile` içinde ayrı git komutu çalıştırma.
- Kök `.gitignore` var: `node_modules/`, `.expo/`, `dist/`, `dist-*/`, `web-build/`, `.env`
  (ama `.env.example` dahil), `*.keystore`, loglar. Üretilen artefaktları commit etme.
- **Commit öncesi sır taraması zorunlu:** staged içerikte `service_role`, `SUPABASE_SERVICE`,
  `-----BEGIN`, `PRIVATE KEY`, JWT görünümlü uzun stringler ve gerçek `.env` dosyası ara.
  Şüphe varsa commit etme.
- **Bu depoda birden fazla oturum çalışıyor** (bu zamanlanmış görev ve Claude Code oturumları).
  Bu yüzden: tura `git pull --rebase origin main` ile başla, turu commit + push ile bitir,
  uzun süre commit'siz çalışma. Force push ve geçmiş yeniden yazma yasak.
- İlk sürüm commit'i `0d2011f`; 384 dosya. Kullanıcı testinin 210 ekran görüntüsü depoda tutulur.

## Ajan rolleri

- Yürütme ekibinin rol tanımları `.claude/agents/` altındadır; gerekçesi ve veto sınırları
  `docs/ajan-ekip-modeli.md` içindedir. `claude plugin validate .claude/agents/` ile doğrulanır.
- Üç rollü ortak inceleme döngüsü (marka/tasarım, mobil ürün, teknik mimari) korunur; bu roller
  artık sırasıyla `marka-tasarim`, `mobil-urun` ve `veri-senkron` + `kayit-butunlugu` tanımlarına
  karşılık gelir.
- Bir maddeyi "kapandı" saymadan önce `kanit-denetcisi` rolüyle doğrulat: çalıştırılmamış test,
  görülmemiş ekran ve okunmamış çıktı kanıt değildir.
- Kullanıcı testi popülasyonu ve harness'ı `persona-lab` rolüne aittir
  (`B2C/docs/kullanici-testi/`). Simüle persona beyanı pazar veya ödeme kanıtı sayılmaz.

## Zamanlanmış görev prompt'u

ChatGPT masaüstü uygulamasındaki aynı sohbeti kullanan Programlanmış görev için:

> `/home/murat/Projects/mobile-app-idea` projesinde PatiNöbeti geliştirmesine devam et. Önce `CONTINUATION.md` dosyasını ve aktif goal durumunu oku, ardından `git pull --rebase origin main` çalıştır. Kota uygunsa testleri çalıştırıp açık release blocker'larındaki en yüksek riskli işi uygula; üç uzman rolün ortak inceleme döngüsünü koru. Turu commit + push ile kapat. Kota hâlâ sınırlıysa dosya değiştirme ve bir sonraki çalıştırmada tekrar dene.
