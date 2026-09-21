# ADR 0002 — Görsel dünya: canlı kabarcık

Tarih: 21 Eylül 2026 · Durum: kabul edildi · Karar veren: kullanıcı (ürün sahibi)

## Bağlam

ADR-0001 fotoğraf öncelikli kompozisyonu kâğıt zemin + koyu botanik yeşil paletle kurmuştu.
Kullanıcı, `physical-health` deposundaki PulseCheck arayüzünü referans göstererek "VIP ve basit"
bir his istedi. PulseCheck'in sistemi grafit zemin üzerinde **renk neredeyse hiç harcanmayan**
bir "graphite plate" dünyası. Kullanıcı bunun zanaatını istedi ama üç sınır koydu:
karanlık istemiyorum · bu bir pet app, canlı renkler olmalı · kâğıt istemiyorum, bubble hissi olsun.

## Karar

PulseCheck'ten **zanaat** alınır, **renk felsefesi alınmaz**:

- **Alınan:** tek grotesk (Archivo, iki üründe ortak ses), tabular rakam disiplini, üç kademe
  metin lüminansı, hairline/plaka mantığı, tek ease ve süre kümesiyle sönümlü hareket tokenları,
  ölçülmüş kontrast eşikleri, sistem yüzeylerinin de temaya dahil olması.
- **Alınmayan:** grafit zemin, karanlık varsayılan, "renk yalnız uyarıya harcanır" kuralı.

Yeni dünya: **canlı kabarcık.** Açık ferah zemin (`#F4F9F6`), beyaz kabarcık yüzeyler, nane
yeşili (`#12D68B`) eylem rengi üzerinde koyu metin, doygun kişi renkleri, yarıçap ölçeği
12/18/24/30/36 + kapsül, hero fotoğrafı alt köşeleri yuvarlatılmış bir kabarcık.

## Sonuçlar

- `PRODUCT.md` marka taahhüdü güncellendi: "sakin" sıfatı kaldırıldı, canlı/kabarcık dünyası yazıldı.
- Kontrast eşiği K-05 (avatar baş harfi) 7,0'dan 4,5'e indirildi ve gerekçesi betiğe yazıldı:
  canlı kişi renkleri 7,0'da mümkün değildi; baş harf kimliğin yedek işareti, isim her zaman
  yanında yazılı (K-27). Diğer 253 ölçümün hepsi eşiğini koruyor.
- `DESIGN.md` bu kararla yeniden bayatladı; inşa edilmiş dünyadan yeniden yazılmalıdır.
- Karanlık şema tokenları duruyor ama varsayılan değil ve bağlı değil.

## Geri dönüş koşulu

Canlı palet, gerçek kullanıcı testinde ürünü "oyuncak" hissettiriyorsa doygunluk düşürülür;
kabarcık formu ve Archivo kalır. Karanlık tema yalnız kullanıcı isterse açılır.
