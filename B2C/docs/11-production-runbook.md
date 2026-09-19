# PatiNöbeti production runbook

Son güncelleme: 19 Eylül 2026

Bu belge hazır olmayan dış servisleri hazırmış gibi göstermez. Aşağıdaki kapılar
gerçek Supabase/EAS/store hesapları sağlandığında uygulanacaktır.

## Ortamlar

- `local`: `supabase/config.toml`, sahte kullanıcılar, gerçek kişisel veri yok.
- `staging`: ayrı Supabase proje ref'i, yalnız ekip test hesapları, production ile
  aynı migration ve RLS.
- `production`: ayrı proje, ayrı EAS secrets, en az ayrı owner onayıyla migration.

Mobil build'e yalnız `EXPO_PUBLIC_SUPABASE_URL` ve publishable key girer. Service
role, database password, store secret veya webhook secret hiçbir `EXPO_PUBLIC_*`
değişkeninde ve uygulama paketinde bulunmaz.

## CI kapısı

`.github/workflows/quality.yml` iki bağımsız job tanımlar:

1. Mobile: temiz `npm ci`, typecheck, Jest, lint, Android JS export.
2. Database: resmi Supabase CLI setup, local stack, migration reset, 35 pgTAP
   assertion, database lint ve local TypeScript type üretimi.

Bu workspace henüz GitHub'da çalıştırılmadığı için workflow dosyasının varlığı
yeşil CI kanıtı değildir. Merge korumasında iki job zorunlu yapılmalıdır.

## Staging'e ilk çıkış

1. `supabase start && supabase db reset && supabase test db && supabase db lint`.
2. `supabase gen types typescript --local` çıktısıyla elle yazılmış geçici mobil
   tipleri değiştir; CI'da drift diff'i zorunlu yap.
3. Staging proje ref'i ile `supabase link`, sonra `supabase db push --dry-run` ve
   owner incelemesi; ardından `supabase db push`.
4. Auth redirect allowlist'e `patinobeti://auth/callback` yalnız iç build için ekle.
   Dış davet öncesi gerçek alan adıyla HTTPS Universal Link/App Link kur; custom
   scheme daveti dış kullanıcıya gönderme.
5. EAS development build üret. SQLCipher Expo Go'da çalışmaz; native build'de
   veritabanı açılışı, yeniden başlatma ve SecureStore anahtar yaşam döngüsünü test et.

## İki cihazlı smoke matrisi

- Owner kayıt → e-posta doğrulama → atomik hane/plan → davet paylaşma.
- Caregiver app kill sonrası aynı pending davete dönme → profil → kabul.
- Caregiver offline kayıt → app kill → online → aynı UUID ile ACK.
- Owner açık ekranda Realtime, kapalı/yeniden açmada pull ile aynı kaydı görme.
- İki ayrı sonuçta conflict ve append-only resolution.
- RPC commit/response-loss tekrarında event ve hane çoğalmaması.
- Lease süresi aşan eski worker'ın yeni claim'i ACK/fail edememesi.
- İstanbul planı, farklı cihaz timezone'u ve DST sınırında aynı occurrence ID.
- Çıkışta kullanıcı cache/outbox purge; başka hesapla girişte veri sızıntısı olmaması.

## Gözlem ve alarm

- `product_events` yalnız huni olayı ve küçük properties nesnesi taşır; bakım notu,
  pet adı, e-posta veya davet token'ı analitiğe yazılmaz.
- İzlenecek oranlar: owner→invite share, share→accept, iki aktörlü ortak görünüm,
  D7/D14/D30 ve paywall view. Seed/demo olayları production metriklerine girmez.
- Auth hata oranı, RPC 5xx, outbox terminal failure, Realtime disconnect ve database
  kapasitesi için uyarı eşikleri staging ölçümünden sonra sayısallaştırılır.

## Olay müdahalesi ve rollback

- RLS şüphesinde yeni kayıt/davet trafiğini feature flag veya yeni build ile durdur;
  service-role anahtarını rotate et; etkilenen haneleri audit et.
- Migration rollback otomatik `down` dosyası değildir. Append-only ileri düzeltme
  migration'ı hazırlanır; veri silen SQL iki kişi onayı ve yedek doğrulaması olmadan çalışmaz.
- Mobil rollback mağaza phased release/halt ile; schema eski client'la en az bir sürüm
  geriye uyumlu tutulur.
- Ham davet token'ı, auth session veya SQLCipher anahtarı loglanmaz.

## Dış pilot öncesi hukuk ve kullanıcı kontrolü

- KVKK aydınlatma/işleme envanteri ve saklama süreleri hukuk incelemesinden geçer.
- Hane verisi export'u ve hesap silme sunucu tarafında uygulanıp test edilir.
- Son owner hesabı silerken hane silme/transfer kararı kullanıcıya açıkça sorulur.
- Store checkout/restore/entitlement ve fiyat yerelleştirmesi gerçek sandbox'ta
  geçmeden ödeme ekranı “önizleme” olmaktan çıkarılmaz.
