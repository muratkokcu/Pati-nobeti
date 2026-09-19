# Ekip sorumlulukları ve operasyon

## Ana ajan — ürün sahibi

- Kapsam, deney ve go/kill kararları
- Kanıtların doğrulanmış/çıkarım/varsayım olarak ayrılması
- Dokümantasyon ve karar günlüğü
- Güvenlik iddialarının sınırlandırılması

## Pazar stratejisti

- Veteriner, pet-sitter ve kronik pet topluluğu kanal testi
- Rakip/fiyat takibi
- Ücretli pilot teklifi, funnel ve CAC ölçümü
- 40 nitelikli hanenin bulunması

## Ürün araştırmacısı

- Son gerçek bakım olayı görüşmeleri
- İkinci bakım veren onboarding ve kullanılabilirlik
- Yanlış güven, bildirim yorgunluğu ve churn araştırması
- D7/D14/D30 davranış analizi

## Teknik/finans

- Offline event log, güvenilir bildirim ve çakışma tasarımı
- Hane izolasyonu, rol ve davet güvenliği
- Abonelik doğrulama ve birim maliyet
- Yedek/geri yükleme, gözlemleme ve olay planı

## Dokümantasyon kuralları

- Her görüşme ve deney tarih, segment, hipotez, sonuç, kanıt ve kararla tutulur.
- Kişisel/pet sağlık ayrıntıları genel dokümana yazılmaz.
- Rakip fiyatı ve platform politikası doğrulama tarihiyle kaydedilir.
- Yeni özellik, en az üç nitelikli hanede tekrarlanan davranış olmadan eklenmez.
- Her kapsam veya strateji değişikliği yeni ADR ile kaydedilir.

## Sürekli geliştirme

Doğrulama sonrası Git tabanlı küçük değişiklikler, otomatik test, staging,
geri alınabilir production dağıtımı, günlük yedek ve alarmlar kurulur. VPS ancak
veri yerleşimi, maliyet ve operasyon gereksinimi yönetilen servislerden daha iyi
olduğunda seçilir. Token/oturum yenilenmesi ürün altyapısının garantisi değildir;
devamlılık depodaki belgeler, backlog, CI/CD ve gözlemleme ile sağlanır.

