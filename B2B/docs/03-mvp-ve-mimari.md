# MVP ve teknik mimari

## MVP kullanıcı akışı

1. Teknisyen atanmış işi veya boş rapor şablonunu açar.
2. Çevrimdışıyken dahi fotoğraf çeker, sesli not bırakır ve ölçüm girer.
3. Sistem sesi metne çevirir; yalnız desteklenen alanlar için yapılandırılmış
   taslak çıkarır.
4. Her alan kaynak ses bölümü, fotoğraf veya manuel girişle gösterilir.
5. Teknisyen taslağı doğrular/düzeltir; onaysız alanlar final olamaz.
6. Müşteri cihaz üzerinde imzalar veya güvenli bağlantıdan onaylar.
7. Değişiklik izi bulunan PDF/link üretilir ve paylaşılır.

## MVP'de var

- Organizasyon, kullanıcı ve rol yönetimi
- Sürümlü rapor şablonu
- Offline-first ses, fotoğraf, ölçüm ve not yakalama
- Kesintiye dayanıklı medya yükleme
- Transkripsiyon ve şema-kısıtlı alan çıkarımı
- Kaynak gösterimi ve insan doğrulama ekranı
- Müşteri imzası/onayı
- Deterministik PDF üretimi
- Değişiklik/audit kaydı
- Basit kullanım ve maliyet telemetrisi
- Veri dışa aktarma ve silme talebi akışı

## MVP'de yok

- Rota/dispatch ve canlı çalışan konumu
- Stok, parça satın alma ve muhasebe
- Teklif, ödeme ve tahsilat
- Tam CRM veya ERP
- Serbest biçimli “arıza teşhisi”
- AI tarafından otomatik final/onay
- Her müşteri için özel kod

## Önerilen mimari

- **Mobil:** Flutter; kamera, ses, imza ve çevrimdışı kullanım.
- **Yerel veri:** Şifreli SQLite ve outbox tabanlı idempotent senkronizasyon.
- **Yönetim paneli:** React/Next.js.
- **API:** TypeScript + Fastify veya NestJS.
- **Veri:** PostgreSQL; her tabloda tenant kimliği, sıkı yetkilendirme ve tenant
  izolasyon testleri.
- **Medya:** AB bölgesinde S3 uyumlu nesne depolama, kısa ömürlü imzalı URL,
  EXIF temizleme ve yaşam döngüsü politikası.
- **İş kuyruğu:** Transkripsiyon, alan çıkarımı ve PDF için tekrar çalıştırılabilir
  worker görevleri.
- **AI:** Sağlayıcı adaptörü; ses -> metin -> JSON Schema. Model doğrudan PDF
  veya serbest gerçek üretmez.
- **Gözlemleme:** PII içermeyen yapılandırılmış log, hata izleme, maliyet ve
  gecikme metrikleri.

## Doğruluk sözleşmesi

Kritik alanlar ilk pilotta: cihaz/seri no, ölçüm ve birimi, kullanılan parça,
yapılan işlem, tarih/saat ve müşteri onayıdır.

- Model emin değilse alanı boş ve “doğrulama gerekli” bırakır.
- Bir alanın kaynağı gösterilemiyorsa otomatik doldurulamaz.
- Ground-truth veri seti insan tarafından iki kez kontrol edilir.
- Genel %98 metriğine ek olarak uydurma kritik değer sayısı ayrıca raporlanır ve
  hedef sıfırdır.
- Prompt/model sürümü her çıktı ile kaydedilir; regresyon eval seti tutulur.

## Güvenlik ve mahremiyet

- Minimum veri toplama; sürekli GPS yok.
- Uçuşta ve depoda şifreleme; sırlar kaynak kodda tutulmaz.
- Rol bazlı erişim, kısa oturum, audit log ve periyodik erişim kontrolü.
- Fotoğraflarda EXIF temizleme; yüz/plaka bulanıklaştırma gereksinimi pilotta
  ölçülür.
- Saklama süresi sözleşmede belirlenir; otomatik silme ve müşteri dışa aktarma
  desteklenir.
- Yurt dışı veri aktarımı için KVKK rol/sözleşme analizi tamamlanmadan gerçek
  kişisel veri üçüncü taraf AI servisine gönderilmez.
- AI sağlayıcısına minimum metin/medya gönderilir; mümkün olan çağrılarda
  saklama kapatılır.
- Tenant izolasyonu ve yetkisiz nesne erişimi testleri yayın kapısıdır.

## Dağıtım aşamaları

1. Concierge prototip: manuel arka ofis, gerçek ödeme doğrulaması.
2. Kapalı pilot: yönetilen bulut, davetli üç firma.
3. Beta: iOS/Android companion uygulama + web üzerinden B2B sözleşme.
4. Üretim: CI/CD, ayrı staging/production, otomatik yedek ve geri yükleme testi,
   uptime/iş kuyruğu alarmları.

VPS, ancak yönetilen servislerin maliyeti veya veri yerleşimi bunu haklı
çıkarırsa seçilir. İlk günden tek VPS üzerinde veritabanı, medya ve uygulamayı
birleştirmek gereksiz operasyon riski yaratır.
