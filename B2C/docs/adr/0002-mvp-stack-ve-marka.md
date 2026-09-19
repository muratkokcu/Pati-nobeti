# ADR 0002 — MVP stack ve marka yüzü

- Durum: Kabul edildi
- Tarih: 18 Eylül 2026

## Bağlam

İki bakım verenin ortak bakım devrini hızlı test eden, sonradan üretim sistemine dönüşebilen bir mobil MVP gerekiyor. Bildirim, offline davranış, rol izolasyonu ve mağaza ödemesi ürünün güven sınırlarıdır.

## Karar

Expo SDK 57 + React Native + TypeScript, Expo Router, SQLite repository ve outbox temeli kullanılacak. Uzak veri katmanı Supabase Postgres/Auth/Realtime olacak; RLS tenant sınırının zorunlu güvenlik katmanıdır. Abonelik için mağaza entitlement'larını tek sözleşmede birleştiren bir adaptör kullanılacak.

Marka yönü `PatiNöbeti · Ortak bakım kaydı`, görsel sistem `Ortak Hat` olacaktır. Sıcak kırık beyaz, koyu yeşil ve pirinç vurgu; evcil hayvan klişeleri veya tıbbi dashboard dili kullanılmayacaktır.

## Sonuçlar

- Yerel demo hızlı ve dürüst biçimde çalışır; production sync varmış gibi sunulmaz.
- UI veri sağlayıcısından bağımsız kalır.
- Native capability nedeniyle Expo Go yerine development build gerekir.
- Supabase, ödeme ve push entegrasyonları tamamlanana kadar ürün beta-ready değildir.
