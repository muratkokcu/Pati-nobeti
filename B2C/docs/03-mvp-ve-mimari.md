# MVP ve teknik mimari

## MVP kapsamı

- Bir hane, iki pet ve üç bakım verene kadar erişim
- Bakım/ilaç planını sahibin manuel eklemesi
- “Yapıldı / atlandı / emin değilim” ve yapan kişi/zaman kaydı
- Gerçek zamanlı ortak güncel durum
- Gecikmiş görev ve kontrollü bildirim
- Bakıcı daveti ve süreli pet-sitter rolü
- Son 30 gün zaman çizelgesi ve veteriner için PDF
- Pet pasaportu/aşı belgesi fotoğrafı
- Abonelik, veri dışa aktarma ve hesap silme

## İlk sürümde yok

- Doz, tedavi, teşhis veya sağlık skoru önerisi
- Fotoğraftan hastalık analizi
- Veteriner randevu pazaryeri veya klinik sistemi entegrasyonu
- Sosyal akış, yorum veya herkese açık pet profili
- GPS takibi
- Mama/ürün e-ticareti
- AI/OCR; pilot verisi gerekçelendirmeden eklenmez

## Güvenlik ürün sözleşmesi

- “Kaydedildi”, “gerçekten uygulandı” anlamına gelmez; arayüz bunu açık söyler.
- İşletim sistemi bildirimi kritik sağlık garantisi olarak sunulmaz.
- Kullanıcının veteriner talimatını uygulama değiştirmez veya yorumlamaz.
- Plan değişiklikleri, tamamlanma kayıtları ve yetki değişiklikleri audit izine
  yazılır.
- Aynı göreve eşzamanlı kayıt gelirse sessizce üzerine yazılmaz; çakışma
  gösterilir.
- Acil durumda uygulama yerine veteriner/acil hizmetle iletişim yönlendirmesi
  bulunur.

## Mimari

- **Mobil:** React Native + Expo, iOS ve Android.
- **Yerel durum:** Şifreli SQLite, offline-first event log ve outbox.
- **Backend:** TypeScript API, PostgreSQL; tenant birimi `household`.
- **Senkronizasyon:** İdempotent event kimliği, optimistic UI ve çakışma
  çözümleme.
- **Bildirim:** APNs/FCM ve tekrar çalıştırılabilir reminder worker. Teslim ve
  açılma telemetrisi yalnız gerekli minimum veriyle tutulur.
- **Davet:** Kısa ömürlü, tek kullanımlık token; owner/caregiver/sitter rolleri.
- **Dosya:** Şifreli object storage, kısa ömürlü signed URL ve yaşam döngüsü.
- **Ödeme:** StoreKit/Play Billing ve sunucu taraflı entitlement doğrulaması.
- **Rapor:** Deterministik PDF; tıbbi yorum üretmez.

## Mahremiyet

- Public profil ve reklam SDK'sı yok.
- Ev adresi, konum ve gereksiz sahip bilgisi toplanmaz.
- Mikroçip, belge ve bakıcı verisi yalnız açık işlev için saklanır.
- Sitter erişimi varsayılan süreli ve en düşük yetkilidir.
- Bildirim önizlemesinde ilaç/hastalık adını gizleme seçeneği bulunur.
- Dışa aktarma, silme ve hane ayrılma akışları ilk sürümde tasarlanır.
- Üçüncü taraf servislerin veri işleme ve yurt dışı aktarım koşulları gerçek veri
  öncesinde KVKK açısından incelenir.

## Sekiz haftalık geliştirme taslağı

Bu takvim yalnız 30 günlük ödeme kapısı geçilirse uygulanır.

1. Hafta: event modeli, hane/rol ve tehdit modellemesi
2. Hafta: pet, plan ve görev veri modeli; offline temel
3. Hafta: bakım kayıt akışı ve senkronizasyon
4. Hafta: davet/roller ve gerçek zamanlı güncelleme
5. Hafta: reminder worker, push ve saat dilimi testleri
6. Hafta: sitter erişimi, zaman çizelgesi ve PDF
7. Hafta: ödeme, export/delete, güvenlik testleri
8. Hafta: kapalı beta, mağaza hazırlığı ve gözlemleme

