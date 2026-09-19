# PatiNöbeti Supabase sözleşmesi

Bu klasör production veritabanı sözleşmesini ve davranışsal RLS testlerini içerir.
Henüz bağlı bir Supabase projesine uygulanmamıştır.

## Yerelde doğrulama

Supabase CLI ve çalışan Docker gerektirir:

```bash
supabase start
supabase db reset
supabase test db
supabase db lint
```

`rls_negative.sql` 35 davranışsal assertion ile gerçek JWT claim bağlamlarında
owner, caregiver ve outsider davranışlarını; paylaşılan profil görünürlüğünü,
invite replay/revoke akışını, atomik hane+plan kurulumunu, pet türünü, son owner
bootstrap response-loss tekrarını, ürün olayı izolasyonunu, invariant'ları ve
cross-tenant foreign key'i sınar. Yalnız politika isimlerini
kontrol etmek güvenlik kanıtı sayılmaz.

## Güvenlik sınırları

- `anon` hiçbir uygulama tablosuna erişemez.
- Hane bootstrap ve davet kabulü doğrulanmış kullanıcı gerektiren, girdilerini
  kontrol eden RPC'lerdir.
- Davet token'ının yalnız SHA-256 özeti tutulur; ham token tek kez döner.
- Care event ID'si istemci UUID'sidir ve idempotency anahtarıdır.
- Audit event'leri update/delete edilemez; düzeltme yeni `resolution` event'idir.
- `private` içindeki membership yardımcıları sabit, boş `search_path` kullanır.

Bir projeye bağlamadan önce migration ve testleri yerel stack'te çalıştırın; test
geçmeden production anahtarı veya gerçek kullanıcı verisi eklemeyin.
