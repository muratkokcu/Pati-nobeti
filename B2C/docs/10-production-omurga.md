# Production omurgası — 2. tur

Son güncelleme: 19 Eylül 2026

## Eklenen sözleşmeler

- Atomik `create_household`: ilk owner membership'i ve pet aynı transaction'da.
- Atomik `create_household_with_plan`: hane, pet ve ilk plan ya hep ya hiç kurulur.
- Kullanıcı profili yalnız kendisi tarafından yazılır; yalnız ortak hane üyeleri
  birbirinin görünen adını okuyabilir.
- Owner-only, 5 dakika–7 gün aralıklı, varsayılan 48 saatlik davet üretimi.
- Ham davet token'ı saklanmaz; SHA-256 digest tutulur ve token tek kez döner.
- `accept_household_invite` satırı kilitler; kabul/replay yarışında yalnız ilk
  geçerli işlem üyelik oluşturur.
- Son owner silinemez veya caregiver'a düşürülemez.
- Pet/plan/event hane ilişkisi composite foreign key ile zorlanır.
- Care event istemci UUID'si idempotency anahtarıdır; yalnız değişmez payload
  tamamen aynıysa tekrar başarıdır, farklı payload `idempotency_conflict` üretir.
- Expo Supabase istemcisi yalnız URL ve publishable key birlikte sağlanırsa oluşur.
- SQLite outbox retry sayısı, lease, üstel backoff, deneme zamanı ve hata metni
  tutar. Uzak ACK gelmeden kayıt `synced` olmaz; hata görünür `failed` durumuna geçer.
- SecureStore tabanlı parçalı native oturum saklama, demo/production yapılandırma
  ayrımı ve kararlı domain hata kodları eklendi.
- Production modunda e-posta/parola auth, üç adımlı onboarding, profil+hane+pet+ilk
  plan, ortak bugünü çekme, bakım kaydı, davet üretme/iptal ve kabul dikey akışı var.
- Production kayıtları önce kullanıcı+hane scope'lu SQLite cache/outbox'a stabil UUID
  ile yazılır. NetInfo, foreground ve aktif kullanımda 15 saniyelik drain aynı UUID'yi
  RPC'ye taşır; Realtime insert invalidation ve pull-to-refresh uzak görünümü yeniler.
- Plan timezone'u occurrence kimliğine ve mutlak zamana uygulanır; uzak görünüm son
  30 günlük kayıtları getirir.
- Davet alan caregiver kabulden önce hane/pet/bitış bilgisini doğrular ve görünen
  adını tamamlar. Onboarding sonunda owner doğrudan davet CTA'sının bulunduğu Hane'ye gider.
- Ham davet token'ı ekranda gösterilmez veya kalıcı istemci state'ine yazılmaz;
  hesap doğrulama devamlılığı için native SecureStore'da en fazla 7 gün tutulur,
  kabul/vazgeçme sonrası silinir. Web'de yalnız sessionStorage kullanılır.
- Native SQLite SQLCipher ile açılır; 256-bit rastgele anahtar SecureStore'dadır.
  Çıkışta kullanıcıya ait cache/outbox satırları temizlenir. SQLCipher Expo Go'da
  çalışmadığı için development/standalone build zorunludur.
- Sync drain process içinde mutex ile tekilleştirilir; her claim ayrı lease token
  taşır ve ACK/fail aynı token CAS'i olmadan kabul edilmez. Snapshot merge ve
  ACK/fail okumaları transaction içine alındı.
- Altı temel huni olayı (`owner_created`, `invite_shared`, `invite_accepted`,
  `shared_state_viewed`, `paywall_viewed`, `paywall_interest`) RLS korumalı
  append-only tabloya yazılır.
- PKCE e-posta doğrulama callback rotası, parola yenileme ve kalıcı pending-invite
  dönüşü eklendi.
- Eski pull yanıtı yerel ACK edilmiş append-only eventi silemez; eventler ID bazında
  monoton birleşir. Scope/generation lease ve çıkış bariyeri, eski kullanıcı işinin
  cache purge sonrasında DB/UI yazmasını engeller.
- Başarılı hane listesi kullanıcı scope'unda şifreli cihaz cache'ine alınır; çevrimdışı
  soğuk açılış ağ hatasını yanlışlıkla oturum kaybına dönüştürmez.

## Kanıt durumu

- Mobil: typecheck, uyarısız lint, 36/36 Jest testi ve web production export başarılı.
- Arayüz: yeni auth/onboarding/davet/hane yüzeylerinde Impeccable mekanik taraması
  bulgu üretmedi. Bu, fiziksel cihaz kullanılabilirlik testi yerine geçmez.
- SQL: 35 davranışsal pgTAP assertion yazıldı fakat bu makinede Docker/Supabase
  stack bulunmadığı için çalıştırılamadı. Dolayısıyla RLS henüz doğrulanmış değil.
- Gerçek proje URL'si, publishable key veya kullanıcı verisi eklenmedi.
- SQLite cache/outbox production'a bağlıdır ancak fiziksel iki cihaz, process-kill,
  response-loss ve gerçek ağ geçişi kanıtı henüz yoktur.

## Sonraki kapı

1. Docker erişimli CI veya geliştirme ortamında `supabase db reset`, `test db` ve
   `db lint` çalıştırmak.
2. SQL sonucuna göre migration'ı düzeltmek; Supabase tarafından üretilmiş TypeScript
   tiplerini commit edip drift kontrolü eklemek; ardından staging'e uygulamak.
3. Auth deep-link/e-posta doğrulamayı staging'de kanıtlamak ve verified Universal/App Link kurmak.
4. İki gerçek cihazlı davet →
   iki aktör kaydı → ortak geçmiş senaryosunu kanıtlamak.

Bu dört adım tamamlanmadan dış pilot kararı NO-GO'dur.
