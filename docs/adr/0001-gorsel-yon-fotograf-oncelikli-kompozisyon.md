# ADR 0001 — Görsel yön: fotoğraf öncelikli kompozisyon, marka paleti içinde

Tarih: 19 Eylül 2026 · Durum: kabul edildi · Karar veren: kullanıcı (ürün sahibi), uygulayan: ajan ekibi

## Bağlam

Arayüz, 28 uygulamalık sektör kıyaslaması (`B2C/docs/tasarim-kiyaslama/`) ve kendi ekranlarımızın
gözle denetimi sonunda "jenerik" bulundu: sistem fontu, tek düz vurgu rengi, her yerde aynı kalın
ağırlık, metin duvarı, hayvanlarla ilgili bir üründe **tek bir hayvan görseli yok**. Kullanıcı bunu
"AI slop" olarak adlandırdı ve referans olarak fotoğraf öncelikli pet uygulamaları paylaştı.

Gerilim: referanslar doygun renkli, oyuncu bir pazaryeri dili kullanıyor; `PRODUCT.md` marka
taahhüdü ise "jenerik pembe/mavi pet uygulaması gibi görünmemeli, sakin ve gündelik olmalı" diyor.

## Karar

Referansların **kompozisyon seviyesi** alınır, **görsel dili** alınmaz:

1. Hayvanın gerçek fotoğrafı arayüzün taşıyıcısıdır. Bugün ekranında tam genişlik hero, ekranın
   üst üçte biri. Metin fotoğrafın üstünde yüzmez; koyu panelin içinde durur.
2. İçerik yüzeyi hero'nun üstüne binerek yükselir (kavisli sheet), navigasyon yüzen pill olur.
3. Palet değişmez: kâğıt tuval + koyu botanik yeşil + pirinç. Doygun turuncu/turkuaz alınmaz.
4. Renk kimliğe ayrılır (kişi renkleri), durum ikon + Türkçe etiket + renk üçlüsüyle anlatılır.
5. Süsleme yerine veri: ekrandaki her görsel öğe gerçek bir ürün verisini taşır.
6. Oyunlaştırma, seri sayacı, yüzde halkası ve sosyal akış alınmaz (kıyaslamanın negatif dersleri).

## Sonuçlar

- `DESIGN.md` inşa edilmiş üründen yeniden yazılır; eski dünya belgesi geçersizdir.
- Paketlenmiş her raster kaynağını ve lisansını taşır (`assets/images/pets/KAYNAK.md`).
- Ekipte **sıradanlık vetosu** kurulur: bir ekran, rakip ekranla yan yana konduğunda şablon
  duruyorsa gönderilmez (`docs/ajan-ekip-modeli.md`).
- Diğer ekranlar (Planlar, Hane, onboarding, auth) bu dünyaya taşınana kadar tutarsızlık borç olarak
  kalır; Bugün, Geçmiş, Paywall ve davet ekranı taşındı.

## Geri dönüş koşulu

Gerçek kullanıcı testinde fotoğraf öncelikli hero, günlük işi (birkaç saniyede kayıt) yavaşlatıyorsa
hero küçültülür; palet kararı ise ancak `PRODUCT.md` marka taahhüdü değişirse yeniden açılır.
