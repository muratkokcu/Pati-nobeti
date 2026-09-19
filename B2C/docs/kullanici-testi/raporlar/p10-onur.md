# Onur (44) — ayda 10-12 gün yolda olan satış müdürü; yaşlı köpeği Maya'nın kalp ilacını evdekiler veriyor, ben uzaktan "verildi mi" diye bilmek istiyorum

## Bugün neye ihtiyacım vardı
Tek bir şey: uçaktan inip telefonu açtığımda, eşime mesaj atmadan, "Maya bugün ilacını aldı mı?"
sorusunun cevabını görmek. Eşim sorunca alınıyor ("kontrol mü ediyorsun"), ben sormayınca da
içim rahat etmiyor. İkinci ihtiyacım: verilmediyse benim haberim olsun — ben sormadan.
Üçüncüsü: haftada 2 gün gelen temizlik görevlisini de bu işe katabileyim.

## Ne yaptım (gerçek ekran alıntılarıyla, kısa)
**1. oturum (İstanbul, saat 18:10)**
- Uygulamayı açtım, **hiç dokunmadan** ilk ekranda gördüm: "08:00 Sabah bakımı — Deniz, 08:12'de
  'yapıldı' ekledi." Bu tam istediğim şey. Sıfır dokunuş, ~2-3 saniye.
- Planlar'a girdim: sadece hazır iki plan var, "08:00 Sabah bakımı", "20:00 Akşam bakımı".
  **Yeni plan ekleme butonu yok**, plan satırlarına dokunulmuyor. Maya'nın ilacı 09:00'da, bunu
  giremedim. Hayvan da ekleyemedim, uygulamada kedi "Luna" var, Maya yok.
- "20:00 için yerel hatırlatıcı kur"a bastım → "Bildirim izni verilmedi. Cihaz ayarlarından daha
  sonra açabilirsin." Sonra izinli olarak tekrar denedim: **hiçbir şey olmadı** — "kuruldu" yazısı
  yok, kurulu hatırlatıcı listesi yok, iptal yok. İki kez bastım, ikisinde de sessizlik
  (konsolda hata düşüyor: `Notifications.scheduleNotificationAsync is not available on web`).
- Hane: "Murat — Hane sahibi", "Deniz — Bakım veren". **Hiçbir ayar ekranı yok.** Bildirim ayarı
  aradım, yok. /settings ve /notifications adreslerini de denedim: "Unmatched Route".
- "Birini davet et"e bastım → beni **davet edilen kişinin** ekranına attı: "Daveti değerlendir /
  Demo hanesine katıl". Kod "demo-invite" yazıyor ama kopyala/WhatsApp'tan paylaş butonu yok.
- Akşam bakımına "Durum kaydet" → "Yapıldı / Atlandı / Emin değilim". Üç seçenek çok iyi,
  özellikle "Emin değilim" — eşim emin değilse bunu koyabilir.
- **Aynı bakıma ikinci kez "Yapıldı" kaydettim: hiç uyarı çıkmadı.** Bugün ekranında sadece son
  kayıt (18:13) göründü, 18:12'deki kayboldu. Geçmiş'te ikisi de duruyor ama Bugün'e bakan adam
  çifte kaydı fark etmiyor. Kalp ilacında benim en büyük korkum bu.
- Çevrimdışı provayı açıp "Emin değilim" kaydettim: "Aynı görev için farklı kayıtlar var." +
  "Bu cihazda kayıtlı · paylaşılmayı bekliyor". Çakışma uyarısı burada **var** — yani uygulama
  farklı durumu uyarıyor, aynı durumun iki kez girilmesini uyarmıyor. Tutarsız.
  Ayrıca çakışma çıkınca satırdan **"Deniz, 08:12'de yapıldı ekledi" bilgisi kayboldu** — bana en
  lazım olan cümle.
- Gerçek uçak modu: uygulama açıkken sekmeler geziliyor. Ama uygulamayı kapatıp açınca
  (sayfa yenileme) `ERR_INTERNET_DISCONNECTED` — hiç açılmadı.
- Plus: ₺79,99/ay. Üç madde: sınırsız geçmiş, birden fazla bakım veren, paylaşılabilir özet.

**2. oturum (Dubai'ye indim, sonra Londra, sonra "ertesi gün")**
- Telefon saat dilimini Dubai yaptım: Bugün ekranı **"09:00 Sabah bakımı", "21:00 Akşam bakımı"**
  gösterdi. Plan saatleri benim bulunduğum yere göre kaydı. Halbuki ilacı veren eşim İstanbul'da.
- Londra'ya geçtim: Bugün ekranı **"06:00 / 18:00"**, ama Planlar sekmesi aynı anda **"08:00 / 20:00"**
  diyor ve buton "20:00 için yerel hatırlatıcı kur". **Aynı uygulama, iki sekme, iki farklı saat.**
- Telefonu ertesi güne aldım (19 Eylül): başlık "Bugünün nöbeti — 19 Eylül Cumartesi" oldu, ama
  satırlar hâlâ **dünkü** kaydı gösterdi: "Murat, 18:13'de 'yapıldı' ekledi."
  4 gün ileri gittim (22 Eylül Salı): yine aynı — "20:00 Akşam bakımı / Murat, 18:13'de yapıldı
  ekledi". Geçmiş sekmesi o kaydın tarihini doğru veriyor: "18 Eyl 2026 18:13".
- Demoyu sıfırlayıp geç saatte (22:40) açtım: **"20:00 Akşam bakımı — Planlanan saat geçti · kayıt
  bulunmuyor"** çıktı. Yani kaçırılmışlık göstergesi var, ama sadece uygulamayı açarsam.
  "Atlandı" kaydettim, düzgün düştü: "Murat, 22:55'de 'atlandı' ekledi."

## Takıldığım yerler
| # | Ekran | Ne bekledim | Ne oldu | Ciddiyet (1-5) |
|---|-------|-------------|---------|----------------|
| 1 | Bugün (ertesi gün) | Yeni gün = boş satır, "bugün kayıt yok" | Başlık 19/22 Eylül oldu ama dünkü "yapıldı" kaydı bugünmüş gibi duruyor; 4 gün sonra bile | 5 |
| 2 | Bugün vs Planlar (Londra) | Her yerde aynı saat | Bugün "06:00/18:00", Planlar "08:00/20:00" — aynı anda | 5 |
| 3 | Bugün (Dubai) | Plan saati hanenin saatinde sabit kalır | 08:00 → 09:00'a kaydı; ben ve eşim farklı saat görüyoruz | 5 |
| 4 | Durum kaydı | "Bu bakım zaten kaydedilmiş, emin misin?" | İkinci "Yapıldı" sessizce eklendi, Bugün'de öncekini sakladı | 4 |
| 5 | Bugün (çakışma) | Kimin ne kaydettiği hâlâ görünsün | "Deniz, 08:12'de yapıldı" cümlesi kayboldu, yerine "Aynı görev için farklı kayıtlar var" | 4 |
| 6 | Planlar | Kendi saatimi/ilacımı ekleyeyim (09:00, Maya) | Ekleme yok, plan satırı dokunulmuyor, saat değişmiyor | 4 |
| 7 | Her yer | Bildirim ayarları (kaç bildirim, sessiz saat) | Hiç ayar ekranı yok; /settings "Unmatched Route" | 4 |
| 8 | Bugün (kaçırıldı) | "Deniz'e hatırlat" gibi bir dürtme | Hiçbir buton yok, sadece ben kaydedebiliyorum | 4 |
| 9 | Planlar | "Hatırlatıcı kuruldu ✓", listesi, iptali | Butona bastım, hiçbir geri bildirim yok (konsolda hata) | 3 |
| 10 | Davet | Link/kod üretip WhatsApp'tan yollayayım | Davet EDİLEN kişinin ekranı açıldı; kopyala/paylaş yok | 3 |
| 11 | Durum kaydı | Saat düzeltme, "Deniz verdi" diyebilme, not | Sadece 3 buton; her kayıt bana yazılıyor, saat "şimdi" | 3 |
| 12 | Geçmiş | Veterinere gönderilecek özet/PDF | Sadece liste; dışa aktarma, tarih filtresi, not yok | 2 |

## Eksik bulduğum ihtiyaçlar (ürün eksiği)
- **Gün mantığı bozuk.** Bir kaydın hangi güne ait olduğu Bugün ekranında tutulmuyor. Uzaktan bakan
  biri için bu, uygulamanın tek işinde yanlış cevap vermesi demek: ilaç 3 gündür verilmemiş olabilir,
  ben ekranda "yapıldı" görüp içim rahat eder. Bu tek başına uygulamayı kullanılmaz yapıyor.
- **Saat dilimi.** Plan saati haneye ait olmalı, telefonuma değil. Bugün/Planlar'ın farklı saat
  göstermesi ise düpedüz hata. Ben Dubai'deyken "09:00" görüp eşime "9'da verdin mi" diye yazarsam
  tam da kaçınmak istediğim tartışma çıkar.
- **Kaçırılınca bana haber.** "Planlanan saat geçti · kayıt bulunmuyor" ekranda var ama kimse bana
  söylemiyor. Bana lazım olan tek bildirim bu: "20:00 geçti, kayıt yok." Günlük "hatırlatma"
  bildirimi istemiyorum — o spam. Yani ayar şart: sadece kaçırılınca, günde en fazla 1-2 kez.
- **Çifte kayıt uyarısı.** Aynı bakıma ikinci "Yapıldı" girilirken uyarmalı. Farklı durumu uyarıp
  aynısını uyarmamak ters; ilaçta iki kişinin de "verdim" demesi asıl tehlike.
- **Kendi planım.** 09:00, kalp ilacı, köpek Maya. Hiçbirini giremedim. Hazır 08:00/20:00 ile
  kullanamam.
- **Davet eden tarafı.** Kopyalanabilir kod/link + "WhatsApp'tan gönder". Temizlik görevlisine
  uygulama kurdurup hesap açtırmak zaten zor; davet adımı bir dokunuş olmalı.
- **Başkası adına/geçmişe kayıt.** Eşim bana yazdığında ("verdim") ben not düşemiyorum; düşersem
  benim adıma ve yanlış saatle düşüyor, geçmiş kirleniyor.

## Demo sınırı yüzünden test edemediklerim
- Gerçek push bildirimi yok — "verilmedi" uyarısının telefonuma düşüp düşmediğini göremedim.
- Gerçek eşitleme yok: eşimin telefonundan giren kaydın bana kaç saniyede geldiğini göremedim.
  Çevrimdışı kuyruğu "paylaşılmayı bekliyor"da kaldı, çevrimiçiye dönünce de boşalmadı — bunu
  demo sınırı sayıyorum, ama gerçek sürümde "X kayıt bekliyor / şimdi gönder" görmek isterim.
- Gerçek davet gönderimi ve hesap açma yok.
- Yerel hatırlatıcı web'de çalışmıyor (`scheduleNotificationAsync is not available on web`) —
  zamanlamanın doğru olup olmadığını test edemedim. Ama "kuruldu" geri bildiriminin olmaması
  web sınırı değil, tasarım eksiği.
- Uygulama kapalıyken internetsiz açılmıyor; bunu web sürümünün sınırı sayıyorum, fakat gerçek
  telefon sürümünde uçakta/metroda mutlaka denenmeli — benim için tek başına karar verici konu.
- Ödeme yok, ₺79,99'u gerçekten ödeme akışında görmedim.

## Güven, mahremiyet ve dil
Dil sakin ve dürüst; bu hoşuma gitti. "Tıbbi doğrulama sayılmaz", "Ne yapılacağını değil, ne zaman
kayıt beklendiğini" gibi cümleler doz/teşhis işine girmediğini net söylüyor — benim de beklentim
bu, ilaç tavsiyesi istemiyorum. "Emin değilim" seçeneği ev içi suçlama dilini yumuşatıyor, bu
akıllıca: eşim "vermedim" demek zorunda kalmıyor.
Mahremiyette rahatsız edici bir şey görmedim, izin isteme dışında hiçbir şey talep etmedi.
Ama rollerde eksik var: temizlik görevlisine "sadece kayıt girsin, geçmişi görmesin" diyemiyorum;
tek bir "Bakım veren" rolü var.

## Para: ₺79,99/ay
Para benim için sorun değil, ayda bir akşam yemeği bile değil. Sorun şu: ödediğim üç şey
"sınırsız geçmiş, birden fazla bakım veren, paylaşılabilir özet". Benim derdim geçmiş arşivi değil,
**anlık güvence**. Paranın karşılığı bende tek cümle: "Maya bugün 09:00 ilacını aldı, 09:07'de
Deniz kaydetti" ve almadıysa telefonuma düşen tek bir uyarı. İkisi de bugün tam çalışmıyor.
"Birden fazla bakım veren"in ücretli olması mantıklı — zaten tek kişiyse bu uygulamaya gerek yok —
ama o yüzden ücretsiz sürümde işi hiç deneyemiyorum, körlemesine ödemem gerekiyor.

## 4. hafta: hâlâ kullanır mıyım?
Bugünkü haliyle hayır. İlk hafta heyecanla kurarım, eşime kurdururum. İkinci haftada Dubai'de
uygulamayı açıp "yapıldı" yazısını görürüm, sonra eşim "bugün veremedim" der — o an uygulamaya
olan güvenim biter. Yanlış "verildi" bilgisi, hiç bilgi vermemekten daha kötü. **2. ay iptal ederim.**
Şu üçü düzelirse tersine döner ve yıllık alırım: (1) gün mantığı, (2) saat dilimi/hane saati,
(3) "saat geçti, kayıt yok" bildiriminin gerçekten telefonuma düşmesi + sadece o bildirimin.

## Tek bir şey değiştirebilseydim
Bugün ekranının en üstüne, hanenin kendi saatiyle, tek satır: "Maya — 09:00 ilacı: bugün kayıt yok
(2 saat geçti)". Ve bu satır ekrandayken telefonuma da bir kere düşsün. Gerisini silin, ben yine
öderim.

<!-- ÖZET
verdict: koşullu kullanırım
pay: koşullu öderim
price_comment: ₺79,99 benim için ucuz ama ödediğim üç madde (sınırsız geçmiş, çok kullanıcı, özet) benim aldığım değeri değil, arşivi anlatıyor.
activation: ikinci kişiyi davet eder miyim? koşullu
top3: 1) Ertesi gün açınca dünkü "yapıldı" kaydı bugünmüş gibi görünüyor (4 gün sonra bile) — uygulamanın tek işi yanlış cevap veriyor 2) Saat dilimi değişince plan saati kayıyor ve Bugün ile Planlar aynı anda farklı saat gösteriyor (Londra: 06:00 vs 08:00) 3) Aynı bakıma ikinci "Yapıldı" kaydı hiç uyarı vermeden ekleniyor, Bugün ekranında öncekini gizliyor — çifte doz riski
killer_missing: "Planlanan saat geçti, kayıt yok" durumunun ben uygulamayı açmadan telefonuma bildirim olarak düşmesi (ve sadece bunun düşmesi)
-->
