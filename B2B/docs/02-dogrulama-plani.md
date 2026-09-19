# 30 günlük doğrulama planı

## Amaç

Kod hacmini değil şu üç riski azaltmak:

1. Raporlama sorunu gerçekten sık ve pahalı mı?
2. Ürün ölçülebilir zaman/kalite kazanımı sağlıyor mu?
3. Firma bu kazanım için bugün para ödüyor mu?

## Başarı kapısı

30 gün sonunda aşağıdakilerin tamamı aranır:

- 15 hedef firma görüşmesi ve en az 5 firmadan anonimleştirilmiş gerçek veri seti.
- En az 3 **ücretli** pilot; yalnız niyet mektubu veya ücretsiz deneme sayılmaz.
- Üç firmaya da dağılmış en az 200 gerçek saha işi.
- Medyan rapor hazırlama süresinde en az %50 azalma.
- Kritik alanlarda en az %98 alan doğruluğu; uydurma ölçüm, parça veya yapılan
  işlem toleransı sıfır.
- En az 3 firmanın ikinci ay ödemesi veya bağlayıcı devam taahhüdü.
- Firma başına özel uyarlama en fazla iki iş günü.
- İkinci haftadan sonra teknisyenlerin en az %70'inin yöneticinin birebir
  hatırlatması olmadan ürünü kullanmayı sürdürmesi.

Eşiklerin biri dahi belirgin biçimde kaçarsa yeni özellik eklenmez. Neden analiz
edilir; hipotez daraltılır, durdurulur veya `HazırDenetim` kontrol pilotuna
dönülür.

## Ölçüm tanımları

- **Rapor süresi:** Saha işi bittikten müşteriye hazır rapora kadar aktif emek
  dakikası. Mevcut süreç ve pilot aynı firma içinde karşılaştırılır.
- **Alan doğruluğu:** Önceden tanımlı ground-truth'a göre doğru kritik alan /
  toplam kritik alan. “Boş bırakıp insana sorma” yanlış üretmekten iyidir.
- **Aktif teknisyen:** Bir hafta içinde en az üç gerçek işte rapor tamamlayan
  kişi.
- **Özel uyarlama:** Bir müşterinin isteği için tasarım, geliştirme, veri taşıma
  ve eğitimde harcanan toplam ekip zamanı.
- **Ücretli pilot:** Tahsil edilmiş fatura/ödeme bulunan gerçek kullanım.

## Haftalık çalışma

### Gün 1–5 — Problem keşfi

- 50 firmalık hedef liste oluştur.
- Firma sahibi/operasyon yöneticisi ve teknisyen için ayrı görüşme formu hazırla.
- Son tamamlanan işi geriye anlattır; görüş yerine davranış kanıtı iste.
- Mevcut rapor, ses notu, fotoğraf, onay ve faturalama akışını zamanla.
- Kişisel veriler anonimleştirilmeden örnek toplama.

Çıkış: 10 görüşme, 3 saha gölgelemesi, ölçülmüş baz süre.

### Gün 6–10 — Concierge prototip

- Tıklanabilir mobil akış ve manuel arka-ofis süreç kur.
- Gerçek ses/fotoğraf setinden taslak raporu ekip gözetiminde üret.
- Yönetici ve teknisyenle aynı gün kullanılabilirlik testi yap.
- Ücretli pilot teklifini sun; “beğendiniz mi?” yerine ödeme iste.

Çıkış: 15 toplam görüşme, 5 veri seti, 3 ücretli pilot.

### Gün 11–20 — İnce pilot

- Yalnız veri yakalama, insan doğrulaması, imza ve rapor akışını kullan.
- Her kritik alanın kaynağını ve her düzeltmeyi kaydet.
- Günlük kullanım, süre, hata, destek ve altyapı maliyetini ölç.
- Yeni özellik taleplerini yapma; talep günlüğüne kaydet.

Çıkış: en az 100 gerçek rapor ve ara metrik raporu.

### Gün 21–30 — Tekrar kullanım ve ödeme

- Toplam 200 işe ulaş.
- Yönetici hatırlatmasını azaltarak organik kullanımı ölç.
- İkinci ay teklifini ve yıllık seçenekleri sun.
- Go / iterate / pivot kararı için veriyi dondur.

## Görüşme soruları

- Son eksik/geç servis raporunu gösterir misiniz? Sonucu ne oldu?
- İş bitişinden faturaya kadar hangi adımlar var ve kim bekliyor?
- Müşteri hangi alanlara itiraz ediyor veya geri gönderiyor?
- Teknisyen bugün hangi uygulamaları ve kâğıtları kullanıyor?
- Mevcut çözüm neden yetmiyor; değiştirmek için hangi koşul gerekir?
- Bu sorunu çözmek için bugün ne kadar zaman/para harcıyorsunuz?
- Pilot için bugün ödeme yapmanızı engelleyen somut konu nedir?

## Deney kaydı şablonu

Her deney şu alanlarla kaydedilir: tarih, hipotez, segment, örneklem, baz değer,
sonuç, kanıt bağlantısı, güven düzeyi, karar ve bir sonraki deney. Ham görüşme
notlarında kişisel veri tutulmaz; izinli kayıtlar sınırlı erişimde saklanır.
