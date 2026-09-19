# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Stack

Expo SDK 57, React Native ve TypeScript; cihazda SQLite + SecureStore, uzakta
Supabase Auth/Postgres/RLS/RPC. Bakım olayları append-only, istemci UUID'siyle
idempotent; offline gönderimler lease/backoff kullanan outbox üzerinden ilerler.
Bu seçim iOS/Android ortak kodu, küçük ekip sürdürülebilirliği ve mağaza dağıtımı
için üç uzman rolün ortak kararıdır. Push ve abonelik sağlayıcısı doğrulama
kapılarından önce production bağımlılığı sayılmaz.

## Users

Bir evcil hayvana iki veya daha fazla kişinin baktığı; hayvanın düzenli ilaç
veya en az 30 günlük bakım planı bulunduğu haneler. Birincil kullanıcı bakım
planını yöneten sahip, ikinci kullanıcı eş/aile üyesi veya süreli pet-sitter'dır.

## Product Purpose

PatiNöbeti, aynı bakımın unutulması veya birden fazla kişi tarafından yapılması
belirsizliğini azaltmak için bakım planını, kullanıcı kayıtlarını ve ortak güncel
durumu tek yerde toplar. Başarı; iki bakım verenli aktif hane, düzenli kayıt,
dördüncü hafta devamı ve gerçek ödeme ile ölçülür.

## Positioning

Genel pet profili veya veteriner tavsiye uygulaması değil; ortak bakım devrini
“kim, neyi, ne zaman kaydetti?” seviyesinde görünür kılan hane koordinasyonudur.

## Operating Context

Ürün evde, dışarıda ve pet-sitter devrinde çoğunlukla tek elle ve birkaç saniye
içinde kullanılır. Kullanıcılar veterinerin verdiği planı manuel ekler; görevleri
bildirimden açar; bakım sonrasında yapıldı, atlandı veya emin değilim kaydı girer.
Veteriner görüşmesinde son 30 günlük özet paylaşılabilir.

## Capabilities and Constraints

- Ortak bakım planı, kullanıcı/zaman kaydı ve gerçek zamanlı hane durumu
- Offline-first kullanım, güvenilir senkronizasyon ve çakışma gösterimi
- Owner, caregiver ve süreli sitter rolleri
- Bildirim, zaman çizelgesi, PDF dışa aktarma ve abonelik
- İlk sürümde teşhis, doz önerisi, sağlık skoru, fotoğraftan hastalık analizi,
  sosyal akış, GPS veya veteriner pazaryeri yoktur
- “Kaydedildi”, bakımın gerçekten veya doğru biçimde uygulandığı garantisi değildir
- AI ilk sürümün çekirdek bağımlılığı değildir

## Brand Commitments

Çalışma adı Türkiye'de **PatiNöbeti**, globalde **PetShift**. Marka oyuncakçı,
veteriner hastanesi veya jenerik pembe/mavi pet uygulaması gibi görünmemeli.
Sakin, güvenilir ve gündelik olmalı; sağlık garantisi veya korku pazarlaması
yapmamalı.

## Evidence on Hand

- Ürün kararı ve kullanıcı hipotezi: `B2C/docs/01-urun-karari.md`
- Doğrulama eşikleri: `B2C/docs/02-dogrulama-plani.md`
- İlk teknik sınırlar: `B2C/docs/03-mvp-ve-mimari.md`
- İş modeli: `B2C/docs/04-is-modeli.md`
- Araştırma kaynakları: `B2C/docs/06-kaynaklar.md`
- Gerçek kullanıcı görüşmesi, testimonial, klinik ortaklığı, logo veya fotoğraf
  varlığı henüz yoktur; bunlar uydurulmayacaktır.

## Product Principles

1. Kayıt ile gerçeği birbirine karıştırma.
2. İkinci bakım verenin katılımını ilk değer anı yap.
3. Kritik günlük işi birkaç saniyede tamamlat.
4. Sağlık tavsiyesi vermeden netlik ve koordinasyon sağla.
5. Mahremiyet, rol sınırı ve veri taşınabilirliğini ilk sürümde kur.

## Accessibility & Inclusion

Tek elle kullanım, büyük dokunma hedefleri, Dynamic Type/font scaling, ekran
okuyucu etiketleri, renk dışı durum göstergeleri, azaltılmış hareket ve açık
Türkçe desteklenecek. iOS ve Android kendi navigasyon ve geri davranışlarını
koruyacaktır.
