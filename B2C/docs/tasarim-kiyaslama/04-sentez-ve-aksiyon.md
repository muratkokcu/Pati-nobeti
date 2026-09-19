# Görsel kıyaslama sentezi ve aksiyon planı

Tarih: 19 Eylül 2026
Kapsam: 28 uygulama, üç kümede — evcil hayvan (11), ilaç takibi/adherence (9, TR dâhil),
ortak bakım ve bebek günlüğü (10). Küme dosyaları: `01-evcil-hayvan.md`, `02-ilac-takibi.md`,
`03-ortak-bakim.md`. Kendi arayüzümüzün denetimi: `00-kendi-arayuzumuz.md`.

**Kanıt seviyesi:** Hiçbir ajan rakip uygulamaların ekran görüntülerini göremedi; bulgular mağaza
metni, resmi site, kullanıcı yorumları, tasarım vaka çalışmaları ve akademik makalelerden geldi ve
küme dosyalarında `[D] doğrulandı` / `[Ç] çıkarım` / `bulunamadı` diye işaretlendi. Renk hex'leri,
font aileleri ve spacing değerleri hiçbir kaynakta yayımlanmamış — onlar cihazda elle
doğrulanmalıdır. Kendi arayüzümüze dair bulgular ise doğrudan gözle incelenmiş ekran
görüntülerine dayanır.

## 1. Başlangıç noktası: kendi durumumuz

Arayüzümüz jenerik. Sistem fontu, tek düz vurgu rengi, her yerde aynı kalın ağırlık, telefon
ekranına iki görev sığdıran düşük yoğunluk, hazır ikon seti, sıfır illüstrasyon/fotoğraf, sıfır
hareket, arayüzde hiç görünmeyen bir marka fikri. Ürünün tek varlık sebebi olan "kim yaptı"
bilgisi düz metin. Bu, tasarımın yapılmadığı değil, **kararların verilmediği** bir arayüz.
Ayrıntı: `00-kendi-arayuzumuz.md`.

## 2. Sektörden çıkan on dört karar

Bunlar seçenek değil, kıyaslamanın dayattığı kararlardır. Her birinin kaynağı parantezde.

1. **Renk kimliğe ayrılır, duruma değil.** Her hane üyesi bir renk + avatar + isim alır; aktivite
   ikonla anlatılır. (Cozi'nin 12 renkli "kişi = renk + isim" sistemi; DogLog kullanıcısının
   "renk aktiviteye değil kişiye ayrılmalı" şikâyeti; Apple Health'in kimlik/durum ayrımı.)
2. **Durum asla tek başına renkle anlatılmaz:** ikon + Türkçe etiket + renk üçlüsü.
   (MyTherapy: "color is never used as a sole conveyor of information", App Store erişilebilirlik
   etiketleri.)
3. **Kesin saat yerine zaman penceresi:** "Sabah · 07:00–10:00". Kaçırıldı damgası pencere
   kapanınca basılır. (Round Health: pencereler "staying healthy" stresini azaltıyor.) Bu, iki
   bakıcı arasındaki "sen mi verdin ben mi" gerilimini azaltan en güçlü tek karardır.
4. **Ana ekran eşit bloklardan değil, tek "şimdi" kartından oluşur;** kalan görevler sıkışık
   satırdır. (Medisafe'in açık kapaklı bölmesi, Baby Daybook'un tek ekran agenda'sı.)
5. **Her kayıt satırında kalıcı imza:** `SAAT → FİİL → KİŞİ` grameri, kişi rengi noktasıyla.
   (PawLog: "8:02 AM Walked Sam | 7:41 AM Potty You".)
6. **Kaçırma amber ve nötr;** kırmızı yalnız kullanıcının kritik işaretlediği bakımda. Ceza metni
   değil tek eylem sunulur. (Apple Health "Taken/Skipped" eşit ağırlık; MediLog TR: "utandırmadan".)
7. **Seri (streak) sayacı yok;** yerine son 7 günün 7 noktası. (Akademik: 17 yaşlı kullanıcıdan
   %63 halka yerine çubuk istedi, seri görselini %35 beğendi, çoğunluk "dikkat dağıtıcı" dedi;
   paylaşılan sorumlulukta seri sıfırlaması suçlamaya dönüşür.)
8. **Uyum özetinin sırası:** önce düz geçmiş akışı, sonra haftalık çubuk, en sonda aylık ısı
   haritası. Yüzde halkası yapılmaz. (Messner 2025: "tracking history was identified as the most
   desired and most important feature".)
9. **Çift kayıt sessizce birleştirilir ve iki avatar yan yana gösterilir** ("ikiniz de
   ilgilendiniz"); kayıt ekranının üstünde "Son 30 dk: Deniz mama verdi" satırı bulunur.
   (NextSip'in "never double-logged" vaadi — sektörde bunu iddia eden tek uygulama.)
10. **Adalet göstergesi anlaşılan hedefe ilerlemedir, liderlik tablosu değildir.** (Tody FairShare:
    oran önceden birlikte kararlaştırılır, amaç "emek varsayılmasın, görülsün"; OurHome'un puan ve
    sıralaması yetişkinler arasında "garip" bulunuyor.)
11. **İkinci bakım veren asla ücretli değildir;** ücretsiz sınır hayvan sayısıyla çizilir, davet
    QR ile iki dakikanın altında tamamlanır. (PawLog: "Family sharing is always free, on every
    plan"; Pebbi: QR daveti, e-posta/şifre yok; Baby Daybook: davet edilen ücretsiz premium alıyor.)
12. **Hayvanın gerçek fotoğrafı arayüzün duygusal çapasıdır;** illüstrasyon ve maskot yerine
    fotoğraf. Kıyas ekseni partner değil hayvanın kendisidir: "Boncuk bugün nasıl?" (Tractive:
    sıfır illüstrasyon, yalnız gerçek hayvan fotoğrafı.)
13. **Gece birincil bağlamdır:** koyu mod birinci sınıf, tek el, göz kısmadan, kilit ekranından
    kayıt. (Huckleberry gece modu; DogNote widget + Watch + Siri.)
14. **Ciddiyet zamanlamaya, sıcaklık tipografiye yüklenir.** Ciddiyet = pencere, takip uyarısı,
    kritik uyarı; sıcaklık = tipografi, boşluk, animasyon hızı, hayvan fotoğrafı. Süslemeyle değil
    tonla ısıtılır. (MediLog TR: "klinik soğukluk olmadan".)

## 3. Kaçınılacaklar (kıyaslamadan çıkan negatif dersler)

| Tuzak | Kaynak |
|---|---|
| Puan, rozet, liderlik tablosu — yetişkinler arasında garip | OurHome |
| Bakım günlüğünü sosyalleştirmek (beğeni/yorum akışı) | DogLog |
| Yüzde halkası ve not karnesi hissi | akademik bulgu |
| Düz yetki modeli: davet edilen her şeyi silebiliyor, iptal uygulamada bile değil | CareZone |
| İkinci kullanıcıyı paywall arkasına koymak | Dosecast |
| Klavyenin altında kalan gönder butonu | 11pets |
| Ücretsiz sürümde her sayfada reklam bandı | Baby Daybook |
| Ana üründen önce zorunlu kayıt ve paywall | Glow Baby |
| Paylaşılan tek hesap (kim ne girdi belli değil) | Huckleberry |

## 4. Konumlandırma bulgusu

Türkiye'de incelenen evcil hayvan uygulamalarının hiçbiri çok bakıcılı ortak günlük değil; hepsi
tek sahipli aşı/randevu hatırlatıcısı. İlaç tarafındaki TR uygulamaları ise "tek kullanıcı, çok
özne" (ben + annem + çocuğum) kurgusunda. PatiNöbeti'nin ihtiyacı "**tek özne, çok kullanıcı**"
(aynı hayvan, iki bakıcı) ve bu boşluk TR'de doldurulmamış. Global tarafta PawLog ve DogNote aynı
işi iyi yapıyor — yani fikir doğrulanmış, TR'de rakip yok. Bu, görsel kimliğin neden önemli
olduğunun da cevabı: ürün fikri savunulabilir değil, **icra savunulabilir.**

## 5. Aksiyon planı — kim, ne, kabul kriteri

Roller `docs/ajan-ekip-modeli.md` ve `.claude/agents/` ile tanımlıdır.

| # | Aksiyon | Sahip | Kabul kriteri |
|---|---|---|---|
| T-1 | **Tasarım yönü ve token sistemi**: tipografi ölçeği (ağırlık kontrastı, tabular rakam), kişi renk paleti (6-8, erişilebilir), kimlik/durum renk ayrımı, yüzey kademeleri, yoğunluk ritmi, koyu mod | `marka-tasarim` | `src/design/tokens.ts` tek kaynak; hiçbir ekranda tek seferlik renk/boy kalmayacak |
| T-2 | **Bileşen seti**: `PersonBadge` (avatar+renk+isim), `StatusChip` (ikon+etiket+renk), `TaskCard` (şimdi / sıradaki varyantları), `EventLine` (saat→fiil→kişi) | `marka-tasarim` + `mobil-urun` | Bugün, Geçmiş ve kayıt ekranı aynı bileşenleri kullanacak |
| T-3 | **Bugün ekranının yeniden kurgusu**: "şimdi" kartı büyük, kalan görevler sıkışık satır; demo şeridi tek sessiz satıra iner; son 7 gün 7 nokta | `mobil-urun` | Telefon ekranında kaydırmadan en az 4 bilgi bloğu; ekran görüntüsüyle kanıt |
| T-4 | **Kim yaptı görselleştirmesi**: her kayıt satırında kişi rengi + avatar + isim; çakışmada iki avatar yan yana | `mobil-urun` | Kayıt satırı renk olmadan da (gri tonda) okunabilir olacak |
| T-5 | **Zaman penceresi modeli**: plan saatleri pencereye dönüşür, kaçırıldı damgası pencere kapanınca | `zaman-bildirim` + `kayit-butunlugu` | Domain testleriyle; mevcut çakışma kuralları bozulmayacak |
| T-6 | **Erişilebilirlik kabul listesi**: kontrast oranları, dinamik tip, basılı-buton ayrımı, yavaşlatılmış animasyon, renk dışı durum göstergesi | `erisilebilirlik-dil` | Liste yazılmadan T-1..T-4 birleşmez |
| T-7 | **Hayvan fotoğrafı**: profil fotoğrafı ekleme ve ekranlarda kullanımı | `mobil-urun` + `mahremiyet-kvkk` | Fotoğraf yerel kalır; paylaşılan özete girmez |
| T-8 | **Paywall yeniden kurgusu**: üründen gerçek görsel, "ikinci kişi ücretsiz" vaadi açık, ücretsiz sınır hayvan sayısında | `urun-sozlesmesi` + `marka-tasarim` | Fiyat kutusu vaatten büyük görünmeyecek |
| T-9 | **Davet akışının görsel kurgusu**: QR + link, iki dakikanın altında | `mobil-urun` | B-16 kapanmadan tasarım uygulanamaz (bağımlılık) |
| T-10 | **Doğrulama**: her ekranın öncesi/sonrası ekran görüntüsü, persona turu tekrarı | `kanit-denetcisi` + `persona-lab` | Nuray ve Kerem personalarının kararı kötüleşmeyecek |

**Sıra:** T-6 (kabul listesi) → T-1 → T-2 → T-3/T-4 → T-10. T-5, T-7, T-8, T-9 ikinci dalga;
T-9 ürün tarafındaki B-16'ya bağlı.

**Kapsam dışı (bilinçli):** oyunlaştırma, sosyal akış, yüzde halkası, maskot/illüstrasyon
sistemi, özel font satın alma. Bunlar kıyaslamada ya zarar verdiği görüldüğü ya da 30 günlük
doğrulamayı yavaşlattığı için alınmadı.
