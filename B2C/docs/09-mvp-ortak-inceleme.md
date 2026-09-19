# MVP ortak inceleme

Tarih: 18 Eylül 2026

## Katılımcı kararları

- Mobil ürün: yerel etkileşim prototipi için GO; gerçek kullanıcı/pazar pilotu için NO-GO.
- Teknik mimari: iç demo için koşullu GO; gerçek veri ve public beta için NO-GO.
- Marka/tasarım ajanının inceleme turu kullanım kotasına takıldı. Marka görüşü eksikmiş gibi gizlenmedi; kota yenilendiğinde aynı tur yeniden çalıştırılacak.

## Bu turda uygulanan notlar

- Aynı occurrence üzerindeki ikinci `done` kaydı artık çift bakım çakışmasıdır.
- Çakışma sessizce ezilmez; tüm kayıtlar ve sonradan eklenen netleştirme olayı görünür kalır.
- Gün değişiminde occurrence kimlikleri yeniden üretilir; dünün kaydı bugün görünmez.
- Gerçek sunucu onayı olmayan olaylar artık `synced` diye sunulmaz: çevrimiçi demo kaydı `local`, çevrimdışı kayıt `queued` olur; outbox her iki durumda da `queued` kalır.
- Kayıt yazma hatası kullanıcıya gösterilir. Başarılı yeni kayıt modal içinde doğrulanır ve geri alınabilir.
- Hatırlatıcı aynı plan için önceki schedule'ı iptal ederek tekrarları önler; kilit ekranında pet adı göstermez ve occurrence rotasını taşır.
- Tekrarlayan hatırlatıcı sabit gün kimliği taşımaz; plan kimliğiyle açılır ve dokunma anında bugünün occurrence'ını çözer.
- Banner yerel hatırlatıcı ile uzak push ayrımını doğru söyler.
- Supabase şemasında pet→hane ve plan→hane ilişkileri composite foreign key ile zorlandı.
- Mobile README demo/production sınırı ve doğrulama komutlarıyla değiştirildi.

## Açık release blocker'ları

1. İki gerçek hesap/cihazla server-backed davet ve ortak bugün görünümü
2. Supabase repository, outbox drain/retry/ack, idempotency ve cursor
3. Gerçek iki kullanıcıyla RLS izolasyon testleri ve güvenli hane/davet RPC'leri
4. Şifreli yerel veri ve anahtar yaşam döngüsü
5. Server-side ürün olayları, cohort raporu ve gerçek store sandbox checkout
6. Export/delete, KVKK metinleri ve fiziksel cihaz erişilebilirlik matrisi

Bu engeller kapanmadan “pazar doğrulandı”, “ödeme doğrulandı” veya “beta hazır” denmeyecektir.

## Production dikey akış ortak incelemesi — 19 Eylül 2026

Üç rol aynı worktree'yi iki tur inceledi. İlk turdaki ortak P0, uzak RPC yazımı
başarılı fakat snapshot yenilemesi başarısız olduğunda UI'nin “verin değişmedi”
demesi ve retry'ın yeni UUID üretebilmesiydi. İkinci turdan önce şu düzeltmeler yapıldı:

- Production kayıtları kullanıcı+hane scope'lu SQLite outbox'a stabil UUID ile
  önce yerel olarak yazılıyor; ACK sonrası `synced` oluyor.
- NetInfo, AppState, 15 saniyelik aktif drain, Realtime invalidation ve pull-to-refresh var.
- Drain mutex'i ve lease token CAS'i eski worker ACK/fail yarışını engelliyor;
  snapshot merge/ACK/fail transaction içinde ilerliyor.
- Onboarding bootstrap'ı SecureStore'da korunan `operation_id` ile idempotent;
  uzak yanıt kaybında “Kurulumu kontrol et”, commit sonrası refresh kaybında
  “Haneye git” ayrı eylem olarak görünüyor.
- Plan timezone'u occurrence kimliği ve mutlak saate uygulanıyor; production'da
  legacy cihaz-local normalizasyon kapalı. Farklı timezone'da yanlış yerel alarm
  kurmak yerine alarm reddedilip nedeni açıklanıyor.
- 30 günlük geçmiş, caregiver görünen adı, davet önizleme/retry, onboarding sonrası
  doğrudan davet CTA'sı ve owner+iki üye teklif kapısı eklendi.
- Pending davet native SecureStore'da süreli korunuyor; PKCE e-posta callback sonrası
  aynı davete dönülüyor.
- Native SQLite SQLCipher'a geçirildi; çıkışta kullanıcı cache/outbox'ı temizleniyor.
- RLS korumalı beş temel aktivasyon/teklif olayı eklendi.

### İkinci tur kararları

- Marka/tasarım: kod tabanının production doğrulamasına devam için GO; dış pilot NO-GO.
- Mobil ürün: hassas veri içermeyen iç/concierge kullanılabilirlik testi için GO;
  gerçek verili dış pilot NO-GO.
- Teknik mimari: önceki kayıt P0'ı kapandı, güncel statik incelemede yeni kesin P0
  yok; dış pilot NO-GO.

### Kararın nedeni

NO-GO artık bilinen ana dikey akışın kodlanmamış olmasına değil, dış kanıt ve
operasyon kapılarına dayanır:

1. Migration ve 35 pgTAP assertion gerçek Supabase/Postgres üzerinde çalışmadı.
2. Staging URL/key, CLI-generated tipler ve drift kontrolü yok.
3. İki gerçek hesap/fiziksel cihazla offline → retry → ACK → Realtime/pull → conflict,
   process-kill, response-loss ve timezone matrisi kanıtlanmadı.
4. Davet hâlâ custom scheme taşır; gerçek HTTPS alan adı seçilip verified
   Universal Link/App Link kurulmadı.
5. KVKK metni, kullanıcı veri export'u, sunucu hesabı silme ve olay müdahale/runbook
   akışları tamamlanmadı.
6. Ücretli pilot için store checkout/restore/entitlement yok; mevcut paywall açıkça
   yalnız teklif önizlemesidir.

Mobil kalite kanıtı: typecheck, uyarısız lint, 31/31 Jest testi, Expo config
çözümlemesi ve Android JS production export başarılı. SQLCipher native binary ve
gerçek cihaz davranışı henüz derlenip kanıtlanmadı.

## Yerel MVP kapısı

Üç rol de son turda P0 kalmadığını belirterek yerel MVP'ye **GO** verdi. Mobil ürünün bulduğu son P0 olan ertesi gün hatırlatıcısının dünkü göreve gitmesi; AppState resume yenilemesi, güncel-gün çözümleme rotası, teslimat-bazlı response tekilleştirmesi ve 17. domain testiyle kapatıldı.

Ortak karar yalnız açıkça beyan edilen cihaz-içi demo içindir. Gerçek veri kullanan dış pilot ve production için karar **NO-GO** olarak kalır.
