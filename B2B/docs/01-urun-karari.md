# Ürün kararı

Tarih: 18 Eylül 2026

## Karar

Ekip, **SahaKanıt / FieldProof** fikrini 30 günlük doğrulama hakkı verilecek tek
aday olarak seçti.

İlk müşteri profili, 15–100 saha çalışanı bulunan HVAC ve tesis bakım
firmalarıdır. İlk ürün yalnızca şu zinciri çözer:

`ses + fotoğraf + ölçüm + kontrol listesi -> insan doğrulaması -> müşteri imzası -> değişiklik izli PDF/link`

Takvim, rota, stok, CRM, teklif, tahsilat, muhasebe ve geniş bakım yönetimi ilk
ürünün parçası değildir. Bunlar ancak doğrulanmış müşteriler aynı ihtiyacı
tekrar tekrar gösterirse sonraki karar konusu olur.

## Neden bu fikir?

1. Servis raporu müşteri kabulü, SLA, uyuşmazlık ve faturalama hızına bağlıdır;
   fayda para ve zamanla ölçülebilir.
2. Kamera, mikrofon, imza ve çevrimdışı kullanım nedeniyle mobil uygulama
   ürünün doğal çalışma yüzeyidir.
3. Rapor şablonları, cihaz geçmişi ve kanıt zinciri zamanla geçiş maliyeti
   oluşturabilir.
4. Türkiye'de Türkçe saha jargonu ve yerel iş akışıyla başlanıp aynı çekirdek
   farklı ülke ve bakım dikeylerine taşınabilir.
5. AI maliyeti ekonomik modelin baskın kalemi değildir; asıl risk satış,
   onboarding, entegrasyon beklentisi ve kullanıcı alışkanlığıdır.

## Ekip tartışmasının özeti

İlk turda pazar ve teknik/finans rolleri saha servis ürününü, ürün araştırması
rolü ise `HazırDenetim` adlı gıda güvenliği kayıt ürününü seçti. İkinci turda
ortak puan kartı kullanıldı. Pazar ve ürün rolleri SahaKanıt'a; teknik/finans
rolü HazırDenetim'e oy verdi. Teknik/finans rolü aşağıdaki sınırlar ve objektif
başarı kapısıyla karara katıldı. Böylece karar oybirliğiyle, fakat koşullu
alındı.

## Kırmızı çizgiler

- İlk 30 günde tam saha yönetimi ürünü yapılmayacak.
- AI hiçbir kritik alanı teknisyen onayı olmadan kesin gerçek olarak yazmayacak.
- Ölçüm, cihaz/parça ve yapılan işlem alanları kaynak kanıtla ilişkilendirilecek.
- Müşteriye özel kod dalı açılmayacak; uyarlama şablon/konfigürasyonla olacak.
- Firma başına iki iş gününü aşan özel çalışma ürün-pazar uyumsuzluğu sinyalidir.
- Tenant izolasyonu, erişim kaydı, saklama/silme ve maliyet ölçümü ilk günden
  tasarlanacak.

## Alternatiflerin elenme gerekçesi

### HazırDenetim

2–10 şubeli restoran/kafe/pastanelerde sıcaklık, temizlik, SKT ve düzeltici
aksiyon kaydı güçlü bir günlük iş akışıdır. Pilot erişimi daha kolay ve teknik
kapsam daha küçüktür. Buna rağmen küçük işletmelerde ödeme isteği, çalışanların
formu gerçekten uygulayıp uygulamayacağı ve genel kontrol-listesi ürünlerinden
farklılaşma belirsizdir. SahaKanıt doğrulama kapısını geçemezse birinci pivot
budur.

### Tekstil dijital ürün pasaportu

Yüksek sözleşme değeri ve mevzuat kaynaklı ihtiyaç potansiyeli vardır; ancak
standartların olgunlaşma takvimi, enterprise satış süresi ve entegrasyon yükü
ilk ekip için fazladır.

### Aile bakım koordinasyonu

İhtiyaç yapısaldır; fakat ödeyen kişi ile günlük kullanıcı farklıdır. Sağlık
verisi, güven ve yanlış güven hissi riski dağıtım ve uyum maliyetini yükseltir.

## Kararın geçerlilik koşulu

Bu belge “fikre âşık olma” izni değildir. [Doğrulama planındaki](02-dogrulama-plani.md)
eşikler geçilmezse geliştirme genişletilmez; karar pivot veya durdurma olarak
güncellenir.
