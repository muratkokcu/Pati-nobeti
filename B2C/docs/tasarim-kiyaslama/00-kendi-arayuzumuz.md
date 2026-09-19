# Kendi arayüzümüzün görsel denetimi

Tarih: 19 Eylül 2026 · Yöntem: `dist-preview` derlemesi 390×844 telefon görünümünde açıldı,
ekran görüntüleri alındı ve **gözle incelendi** (`ekranlar/` klasörü). Bu bir kod incelemesi değil,
görsel değerlendirmedir.

## Tek cümlelik yargı

Arayüz çalışıyor ve dürüst; ama **jenerik**. Sistem fontu, tek düz vurgu rengi, her yerde aynı
kalın ağırlık, devasa tipografi, düşük bilgi yoğunluğu, hazır ikon seti, sıfır illüstrasyon,
sıfır hareket, sıfır marka izi. Şablondan çıkmış gibi duruyor — sektörde ayırt edici bir görsel
kimliği yok. Kullanıcı testinde kimse "güzel" demedi; kimse "çirkin" de demedi, çünkü hatırlanacak
hiçbir şey yok.

## Ekran ekran bulgular

### Bugün (`ekranlar/01-bugun.png`)
- **Hiyerarşi ağırlıkla kuruluyor, ölçekle değil.** Başlık, gövde, buton, meta — hepsi kalın.
  Her şey bağırınca hiçbir şey öne çıkmıyor.
- **Yoğunluk çok düşük.** Telefon ekranına yalnız iki görev sığıyor; akşam bakımını görmek için
  kaydırmak gerekiyor. "Birkaç saniyede bak ve çık" vaadiyle çelişiyor.
- **İki özdeş koyu yeşil blok** (iki görevin butonları) ekranın ağırlık merkezini ele geçiriyor.
  Hangi görevin şu an önemli olduğu görsel olarak belli değil.
- **Demo şeridi** başlıkla yarışıyor: turkuaz blok, kalın yazı, ikon — asıl içerikten daha çok
  dikkat çekiyor ve her sekmede tekrar ediyor.
- **Kim yaptı bilgisi görsel değil.** "Deniz, 08:12'de yapıldı ekledi" düz metin; avatar, renk
  kodu veya baş harf yok. Ürünün tek varlık sebebi (kim/ne zaman) tipografik olarak sıradan.
- **Zaman çizelgesi rayı zayıf.** İnce gri çizgi + küçük halka; saat etiketi başlıkla optik
  hizalı değil. Fikir doğru, icra amatör.
- **Hayvan yok.** Luna yalnız bej bir daire içinde "L" harfi. Sektörün duygusal çapası olan
  hayvan fotoğrafı arayüzde hiç yok.
- **Plus kartı** turuncu blok olarak alt kenarda kesiliyor; hem satış hem içerik olarak yarım.

### Kayıt (`ekranlar/05-kayit.png`)
- Üç seçenek **birebir aynı görsel ağırlıkta**. Oysa vakaların çoğu "Yapıldı"; tasarım bunu
  bilmiyormuş gibi davranıyor.
- Açıklama metinleri gereksiz uzun ("'Yapıldı' olarak kullanıcı kaydı ekle").
- Ekranın alt yarısı tamamen boş. Tek elle kullanımda kritik olan başparmak bölgesi kullanılmıyor.
- Yeşil bilgi şeridi burada da tekrar ediyor.

### Geçmiş (`ekranlar/03-gecmis.png`)
- Tek kayıt, kocaman boş bej alanda yüzüyor. **Gün başlığı, gruplama, sayım, filtre yok.**
- Demo şeridi tek kayıttan daha büyük yer kaplıyor.
- "Yapıldı kaydı" rozeti tek durum rengi taşıyor; atlandı/emin değilim ile aynı dilde değil.
- Veterinere gösterilecek bir belge havası yok (Zeynep'in itirazının görsel karşılığı).

### Paywall (`ekranlar/06-paywall.png`)
- Soyut bir ikon + kalın başlık + üç tik + fiyat kutusu + tek yeşil buton. **Şablon.**
- Ürünün kendisinden tek bir görsel yok: ne ekran, ne hane, ne geçmiş örneği.
- "Planlanan:" ile başlayan üç madde satın alma anını zayıflatıyor; fiyat kutusu vaatten daha
  büyük görünüyor.

## Kök sebepler (tasarım sistemi seviyesinde)

1. **Tipografi sistemi yok.** Tek aile (sistem fontu), iki ağırlık, aşırı büyük boylar.
   Ölçek kademeleri arasındaki oran kontrolsüz; 34px başlıktan 13px meta'ya sert düşüş.
2. **Renk stratejisi tek boyutlu.** `primary` her yerde dolu blok olarak kullanılıyor; yüzey,
   vurgu, durum ve marka rolleri ayrışmamış. Turuncu hem "demo" hem "satış" hem "bekleyen"
   anlamına geliyor.
3. **Kimlik taşıyıcısı yok.** Logo, işaret, illüstrasyon, fotoğraf, doku, özel ikon — hiçbiri yok.
   "Ortak Hat" marka fikri (`B2C/docs/adr/0002`) arayüzde hiçbir yerde görünmüyor.
4. **Ritim ve yoğunluk kalibre edilmemiş.** `spacing` ölçeği var ama ekranlar sürekli en büyük
   değerleri kullanıyor; sonuç: az bilgi, çok kaydırma.
5. **Durum dili eksik.** Beş durum (yaklaşan, zamanı geldi, gecikti, kaydedildi, çakışma) var ama
   görsel karşılıkları yalnız küçük bir halka rengi.
6. **Hareket yok.** Kayıt anında hiçbir geri bildirim yok; ürünün tek duygusal anı ("tamam,
   yapıldı") sessiz geçiyor.

## Bu denetimin kabul ettiği şey

Bu arayüz "AI slop" tanımına uyuyor: güvenli, simetrik, tekdüze kalın, karar vermekten kaçınan,
hiçbir yerde risk almayan bir düzen. İşlevsel olarak doğru olması onu tasarım olarak iyi yapmıyor.
Aşağıdaki kıyaslama dosyaları, sektörün aynı sorunları nasıl çözdüğünü gösteriyor.
