# Ekip sorumlulukları ve çalışma düzeni

## Roller

### Ana ajan — kurucu/ürün sahibi

- Nihai öncelik ve kapsam kararı
- Kanıt standardı ve karar günlüğü
- Haftalık metrik sentezi
- Çakışan uzman görüşlerinde karar kapısı
- Kullanıcıya ilerleme ve risk raporu

### Pazar stratejisti — satış ve rekabet

- 50 firmalık hedef hesap listesi
- Rakip ve fiyat değişikliklerinin takibi
- Görüşme/pilot teklifi ve kanal deneyleri
- CAC, satış döngüsü ve ödeme itirazları kaydı
- İlk vaka çalışmasının ekonomik anlatısı

### Ürün araştırmacısı — problem ve kullanım

- Firma sahibi, yönetici ve teknisyen görüşmeleri
- Saha gölgelemesi ve mevcut akış haritası
- Concierge prototip ve kullanılabilirlik testleri
- Aktivasyon/retention ve nitel geri bildirim
- Kill kriterlerinin tarafsız değerlendirilmesi

### Teknik/finans — mimari, güvenlik ve ekonomi

- İnce pilot mimarisi ve veri modeli
- Doğruluk eval'i, maliyet telemetrisi ve güvenlik kapıları
- Brüt marj, depolama ve destek maliyeti
- Mağaza/ödeme ve altyapı kararları
- Üretim hazırlığı, yedek/geri yükleme ve olay planı

## Çalışma ilkeleri

- Her iddia `doğrulanmış`, `çıkarım` veya `varsayım` olarak sınıflandırılır.
- Güncel pazar, mevzuat, fiyat ve platform politikası birinci kaynaktan
  doğrulanır; doğrulama tarihi kaydedilir.
- Kararlar ADR belgesiyle, deneyler standart deney kaydıyla tutulur.
- Yeni özellik ancak birden çok müşteride tekrarlanan kanıt ve metrik hedefiyle
  backlog'a girer.
- Kişisel veri ham ürün dokümanına veya açık issue'ya yazılmaz.
- Kullanıcı onayı gerektiren harici işlem, satın alma, hesap açma, gerçek müşteri
  iletişimi veya üretim dağıtımı yetki alınmadan yapılmaz.

## Sürekli geliştirme ortamı

Doğrulama kapısı geçilirse hedef çalışma düzeni:

- Git tabanlı trunk akışı, küçük PR'lar ve zorunlu inceleme
- Her committe format, lint, type-check, unit ve tenant izolasyon testleri
- Staging'e otomatik; production'a onaylı ve geri alınabilir dağıtım
- Veritabanı migration kontrolü ve günlük şifreli yedek
- Hata, kuyruk gecikmesi, maliyet, depolama ve uptime alarmı
- Haftalık ürün metriği, iki haftada bir güvenlik/maliyet incelemesi
- Her sürüm için changelog ve karar bağlantısı

VPS veya bulut hesabı seçimi; pilot hacmi, veri yerleşimi, bütçe ve operasyon
kapasitesi görüldükten sonra alınır. Kesintisiz geliştirme, yalnız çalışan bir
sunucu değil; test, gözlemleme, yedekleme, geri alma ve açık sahiplik gerektirir.

## Ajan sürekliliği hakkında operasyonel gerçek

Ajanlar görevleri ve belgeleri üzerinden kaldığı yerden devam edebilir; bu depo
kalıcı hafızanın ana kaynağıdır. Ancak token kotasının ne zaman yenileneceği veya
bir oturumun kendi kendine yeniden başlayacağı uygulama altyapısının kontrolündedir
ve proje taahhüdü gibi varsayılamaz. Devamlılık; güncel belgeler, açık backlog,
CI/CD ve dışarıdan izlenebilir üretim sistemiyle sağlanacaktır.

## İlk backlog

1. Görüşme formu ve hedef hesap seçim ölçütü
2. Deney/kanıt kayıt şablonu
3. Anonim örnek veri sözleşmesi ve izin metni
4. Tıklanabilir mobil prototip
5. Concierge rapor üretim deneyi
6. Ücretli pilot teklifi ve başarı eki
7. Pilot veri sözlüğü ve doğruluk eval'i
8. Go / pivot karar raporu
