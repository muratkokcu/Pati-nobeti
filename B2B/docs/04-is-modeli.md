# İş modeli ve birim ekonomi

## Müşteri ve satın alan

- Kullanıcı: saha teknisyeni
- Şampiyon: operasyon/servis yöneticisi
- Ekonomik alıcı: firma sahibi veya operasyon direktörü
- İlk segment: 15–100 saha çalışanlı HVAC/tesis bakım firmaları

## Fiyat hipotezi

Bu rakamlar pazar gerçeği değil, pilotta test edilecek varsayımlardır.

- Global başlangıç: 3 aktif kullanıcı dahil 49 USD/ay
- Ek kullanıcı: 9 USD/ay
- Türkiye pilot bandı: KDV hariç 1.500–2.500 TL/ay
- Ücretsiz sonsuz plan yok; sınırlı rapor kotası veya 14 günlük deneme
- Medya/rapor kotası aşımı için kullanım paketi
- Yıllık ödemede yaklaşık iki aylık indirim

Türkiye fiyatı kur ve enflasyon nedeniyle sabit belge değeri değildir; üç ayda
bir yeniden değerlendirilir. Pilotlarda tek fiyat yerine ödeme isteği görüşmesi
ve gerçek tahsilat kaydı tutulur.

## Açık varsayımlı örnek birim ekonomi

Global bir müşteri için örnek senaryo:

| Kalem | Aylık varsayım |
|---|---:|
| ARPA | 59,00 USD |
| 4 kullanıcı x 20 rapor | 80 rapor |
| Transkripsiyon | 0,48 USD |
| Yapılandırılmış metin çıkarımı | 0,19 USD |
| Görsel işleme güvenlik payı | 1,25 USD |
| Veritabanı, medya, e-posta, PDF | 3,50 USD |
| Değişken destek/operasyon | 3,00 USD |
| Ağırlıklı ödeme/mağaza gideri (%6 varsayım) | 3,54 USD |
| Toplam değişken maliyet | 11,96 USD |
| Brüt katkı | 47,04 USD |
| Brüt marj | %79,7 |

Bu model vergi, kurucu maaşı, sabit mühendislik, satış seyahati ve hukuki
giderleri içermez. AI fiyatları ve mağaza kuralları değişkendir.

Varsayımsal 240 USD CAC ve aylık %3,5 logo churn ile basit brüt kâr LTV yaklaşık
1.344 USD, LTV:CAC 5,6 ve geri ödeme 5,1 aydır. Churn %7 olursa LTV:CAC yaklaşık
2,8'e düşer. Bu nedenle yatırım tezinin merkezinde daha fazla AI değil, tekrar
kullanım ve yıllık sözleşme vardır.

## Ölçülecek ticari metrikler

- Ücretli pilot / nitelikli görüşme oranı
- Satış döngüsü günü ve kanal bazlı CAC
- Aktif teknisyen ve firma başına haftalık rapor
- İlk değer anına kadar geçen süre
- Dört ve sekiz haftalık logo/aktif kullanıcı devamı
- Rapor başına değişken maliyet ve depolama büyümesi
- Firma başına destek ve özel uyarlama saati
- Rapor tamamlanmasından müşteri kabulüne/faturaya süre

## Dağıtım hipotezleri

1. HVAC ekipman/parça distribütörleri ve bakım ağı ortaklıkları
2. Sektörel dernekler ve teknik eğitim merkezleri
3. Gıda/tesis yönetimi ve OSGB benzeri danışman ağları değil, doğrudan HVAC
   operasyon yöneticileriyle kurucu satışı
4. Anonim örnek rapor ve süre-kazanımı vaka çalışmaları
5. Mevcut ERP/FSM'ye rakip değil, CSV/API ile bağlanan kanıt katmanı mesajı

## Mağaza ve ödeme yaklaşımı

B2B sözleşme web üzerinden kurulup mobil uygulama önceden satın alınmış hizmetin
companion'ı olarak dağıtılabilir. Uygulama içinde self-service dijital abonelik
satılırsa mağaza kesintisi ve ödeme kuralları ayrıca uygulanır. Yayından önce o
tarihteki Apple/Google politikaları yeniden doğrulanacaktır.
