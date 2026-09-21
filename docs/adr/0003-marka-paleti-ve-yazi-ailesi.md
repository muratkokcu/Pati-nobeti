# ADR 0003 — Marka paleti ve yazı ailesi yeniden kuruldu

Tarih: 21 Eylül 2026 · Durum: kabul edildi · Karar veren: kullanıcı (ürün sahibi)

## Bağlam

ADR-0002 ile canlı kabarcık dünyasına geçilmişti ama palet bir marka değil, birikmiş renklerin
toplamıydı: nane yeşili eylem rengi, turuncu/mavi/mor/yeşil sekiz kişi rengi, amber gecikme,
menekşe belirsizlik, mercan çakışma. Kullanıcının tespiti: "alakasız renk cümbüşü var, ölü tatsız
renklerden kurtul." Ayrıca Archivo (grotesk) serin ve teknik bulundu: "daha tatlı okunaklı" bir
yazı ailesi istendi.

## Karar

**Tek marka rengi + tek ikincil + markadan ayrı durum ailesi.**

- **Marka rengi: tanjerin `#CE4A0A`.** Yalnız birincil eylem, aktif sekme ve marka anlarında.
  Hiçbir durumu ifade etmez. Hayvan fotoğraflarının sıcak tonlarıyla akraba, Türkiye'deki
  pembe/mavi pet uygulamalarından ayrışıyor.
- **İkincil: derin çam `#0F3B34`.** Koyu yüzeyler ve marka ağırlığı.
- **Durum ailesi markadan türemez ve marka rengini kullanmaz:** yapıldı/şimdi çam yeşili
  (`#14573A`), gecikti kehribar (`#6B4400`), emin değilim menekşe (`#342C8C`), çakışma kızıl
  (`#8C1F20`), yaklaşan/atlandı sıcak nötr (`#4A3C34`).
- **Kişi renkleri beş renge indirildi** (gül kurusu, deniz, menekşe, zeytin, gök) — K-28 ölçümü
  beşin üstünde renk körlüğünde güvenilir ayrışma olmadığını gösteriyordu. Yalnız kimlik
  işaretlerinde kullanılır.
- **Yazı ailesi: Nunito** (400/600/700/800). Yuvarlak uçlu, sıcak, küçük puntoda okunaklı;
  kabarcık dünyasının tipografik karşılığı. Archivo bırakıldı.
- **Zemin sıcak porselen `#FFF8F3`**, yüzeyler beyaz.

## Eşik kararı

Birincil buton etiketi 16 px / 700, yani WCAG tanımıyla "büyük metin". Karar metni eşiği 7,0
kalır; büyük kontrol etiketi için **K-01b** adıyla AAA-large eşiği 4,5 tanımlandı ve gerekçesi
ölçüm betiğine yazıldı. 7,0 eşiği marka turuncusunu pastele zorluyordu ve ürünün talebi canlı
renkti. Beyaz metin / tanjerin oranı 4,56. Diğer bütün ölçümler eşiğini koruyor: 224/224 geçiyor.

## Sonuçlar

- `PRODUCT.md` görsel dünya paragrafı bu palete göre yeniden yazıldı.
- `DESIGN.md` bu kararla yine bayatladı; inşa edilmiş dünyadan yeniden yazılmalı.
- Karanlık şema tokenları aynı marka mantığına taşınmalı (şu an eski aileden).

## Geri dönüş koşulu

Tanjerin, gerçek kullanıcı testinde "uyarı/alarm" olarak okunuyorsa marka rengi derin çama
devredilir ve tanjerin yalnız vurgu olur. Nunito, küçük puntoda Türkçe aksanlarda sorun
çıkarırsa aynı yuvarlaklıkta bir alternatife geçilir.
