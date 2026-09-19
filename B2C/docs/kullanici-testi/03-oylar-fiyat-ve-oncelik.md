# Oylar, fiyat beyanları ve öncelik sırası

## 1. "30 günde sadece 3 şey yapılacak" — herkesin oyu

| Persona | 1. oy | 2. oy | 3. oy |
|---|---|---|---|
| Elif | Kayıt ekranında "bu dozu Deniz 08:12'de verdi — yine de ekle?" + iki "yapıldı"da çifte kayıt görünsün, gizleme kalksın | İki kişiye de 08:00/20:00 bildirimi, bildirimden tek dokunuş, 30 dk sonra kayıt yoksa ikinci uyarı | Gün/saat hatası: Bugün ertesi gün dünkü kaydı göstermesin |
| Barış | Bildirimden/kilit ekranından tek dokunuşla "Yapıldı" | Aynı slota ikinci "yapıldı"da satır içi uyarı + diğer kişiye anlık bilgi | Davet gerçekten gönderilsin (tek butonla WhatsApp'a link) |
| Nuray | Geri al + düzelt (izli) | Çakışan kart tıklanabilsin ve çözülsün + toptan silme onay istesin | Planda ilacın adı yazsın |
| Sinem | Süreli davet: link/kod + bitiş tarihi + erişimin kendiliğinden kapanması | Hane değiştirici ("hanelerim") | Çift kayıt uyarısı + düzeltme kaydı |
| Can | Hane'ye gerçek üye ekleme + paylaşılabilir davet linki (3 kişi) | "Son 7 gün: Can 12 · Ege 3 · Melis 1" sayacı | Plan ekleme + esnek tekrar + kendi görevini yazma |
| Aylin | Çoklu hayvan (liste + hayvan başına plan) | Bitiş tarihli tedavi (10 gün/2 doz, 7/20 sayacı, "tamamlandı") | Geçmişten paylaşılabilir özet |
| Kerem | Çift doz kilidi + Bugün kartının bilgi gizlemeyi bırakması | Gün mantığı (Onur'un tarih bulgusu) | Kayda ünite ve gerçekleşen saat girişi |
| Deniz | Düzeltme + 15 dk geri alma + silme yok + değişiklik defteri | Toptan silme onaysız/izsiz olmasın | Çakışma kartı açılsın, ikinci "yapıldı"da uyarı |
| Zeynep | Kendi planını kur (isim, saat, tekrar) + çoklu hayvan | Kayıt düzeltme + izli "düzeltildi" + silmeye onay | 30 günlük özet ekranı (isimsiz, "kayıt yok" sütunlu) |
| Onur | Bugün yalnız bugünü göstersin ("bugün kayıt yok" / "20:00 geçti, kayıt yok") | O satırın bildirim olarak düşmesi + bildirimden tek dokunuş | Kayıt varken ikinci kayıtta onay + kartta iki kaydın görünmesi |

### Tema bazında toplam

| Tema | Oy | Kimler |
|---|---|---|
| Çift kayıt görünürlüğü + ikinci kayıt uyarısı (B-01, B-02, B-03) | **8** | Elif, Barış, Sinem, Can, Kerem, Deniz, Onur, (Aylin Ç1'de) |
| Düzeltme + geri alma + iz + onaylı silme (B-10, B-15) | **5** | Nuray ×2, Deniz ×2, Zeynep, Sinem, Can |
| Bildirim (kişi başına, kaçırılan bakım, tek dokunuş) (B-32, B-33, B-34) | **4** | Barış, Elif, Onur ×2 |
| Gün/tarih doğruluğu (B-07) | **3** | Onur, Kerem, Elif |
| Davet gönderme akışı (B-16) | **3** | Barış, Can, Sinem |
| Plan kurma / ilaç adı / esnek tekrar (B-24, B-25, B-26) | **4** | Nuray, Can, Zeynep, (Aylin süreli tedavi) |
| Çoklu hayvan (B-23) | **2** | Aylin, Zeynep |
| Paylaşılabilir özet (B-37) | **2** | Aylin, Zeynep |
| Çoklu hane / süreli rol (B-21, B-22) | **2** | Sinem ×2 |
| Adalet sayacı (B-41) | **1** | Can |
| Doz/ünite girişi (B-11) | **1** | Kerem |

**Not:** Gün/tarih doğruluğu 3 oy almasına rağmen dört kişi ("bu düzelmeden ödemem": Elif, Can,
Kerem, Onur) bunu ön koşul ilan etti. Oy sayısı bu maddenin ağırlığını olduğundan düşük gösteriyor.

## 2. Önerilen 30 günlük sıra

Oylar + ciddiyet + bağımlılıklar birlikte değerlendirildi.

1. **Doğruluk paketi (B-07, B-02, B-03, B-01).** Gün dönsün; Bugün yalnız bugünü göstersin; kart
   hiçbir kaydı gizlemesin; iki "yapıldı" da çakışma sayılsın; ikinci kayıt öncesi bilgi ekranı.
   *Neden önce:* Bunlar aynı ekranın aynı veri modelinde duruyor; ayrı ayrı yapmak iki kez yazmak olur.
   Ayrıca özet (B-37) ve bildirim (B-32) bu doğruluğun üstüne kuruluyor — Onur'un uyarısı:
   "önce doğruluk, sonra çıktı."
2. **Kayıt bütünlüğü paketi (B-10, B-15).** Düzeltme + kısa geri alma + iz + onaylı/izli toplu silme.
   *Neden burada:* 10/10 uzlaşma var, tasarım tartışmada bitti, backend gerektirmiyor.
3. **Davet gönderme (B-16).** Aktivasyon hunisinin ölçülebilmesi için ön koşul.
4. **Plan kurma (B-24, B-25, B-28).** Kendi ilacı/saati olmayan hiçbir hane ürünü kendine göre
   kuramıyor; hatırlatıcı da plana bağlanmalı.
5. **Bildirim (B-32, B-33)** — kaçırılan bakım uyarısı ve kişi başına ayar.
   B-34 (bildirimden tek dokunuş) ayrı bir ürün kararına bağlı, bkz. bölüm 4.

Sonraki dalga: çoklu hayvan (B-23 — iki personanın terk şartı), isimsiz özet (B-37, B-42 —
ücretlendirmenin çapası), adalet sayacı (B-41), çoklu hane ve süreli rol (B-21, B-22 — ayrı ürün kararı).

## 3. Fiyat beyanları (hipotez, kanıt değil)

| Persona | Bugünkü ₺79,99/ay | Koşullu teklifi | Şartı |
|---|---|---|---|
| Elif | ödemem | ₺49/ay veya ₺449/yıl; vet özeti de gelirse ₺79,99 | İkinci kişi ücretsiz kalacak |
| Barış | ödemem | ₺49/ay, ₺399/yıl | Bildirimden tek dokunuş + davet linki |
| Nuray | ödemem | **yılda ₺249, tek seferde** | Aylık abonelik istemiyor; düzeltme + özet |
| Sinem | hane ödemesin | **₺249/ay profesyonel** (ilk 3 hane ₺149/ay) | Çoklu hane + süreli davet + dışa aktarma |
| Can | ödemem | **yılda ₺149** (hane başına) | "Birden fazla bakım veren" ücretsiz kalacak |
| Aylin | cebimden ödemem | hayvan başına ₺25/ay veya ₺149/ay sınırsız | **Dernek adına fatura** şart |
| Kerem | ödemem (fiyat değil, fayda yok) | ₺149/ay, yıllık peşin ₺1.500 | Çift doz + gün mantığı + doz alanı + düzeltme |
| Deniz | koşullu | ₺59/ay | **Her üye kendi hesabından ayrı ödesin** |
| Zeynep | koşullu | ₺79,99/ay (özet gelirse), yoksa ₺39,99 | İsimsiz 30 günlük özet |
| Onur | koşullu | ₺79,99/ay, ₺799/yıl | Doğruluk + bildirim + plan kurma |

**Okuma:**
- Bugünkü tek paket ₺79,99/ay'ı 8/10 reddetti; kabul eden ikisi de "şu özellikler gelirse" dedi.
- Hane tarafı ₺49–79/ay veya ₺399–449/yıl bandında toplanıyor; yıllık tek ödeme aylıktan
  belirgin biçimde daha kabul edilebilir (Nuray, Can, Elif).
- Profesyonel taraf (Sinem ₺249/ay, Aylin ₺149/ay faturalı) hane fiyatının 3-5 katını ödemeye hazır.

## 4. Uzlaşılan paketleme önerisi

**Ücretsiz:** 1 hayvan, **sınırsız bakım veren**, 30 günlük geçmiş, çakışma uyarısı, düzeltme.
10/10 persona "birden fazla bakım veren ücretli olamaz" dedi — ürünün tek sebebi o.

**Ücretli (hane):** paylaşılabilir isimsiz özet, sınırsız arşiv, çoklu hayvan, kaçırılan bakım
bildirimi. Fiyat bandı ₺49–59/ay ya da ₺449–499/yıl; yıllık seçenek mutlaka olmalı.

**Profesyonel (ayrı ürün hipotezi):** çoklu hane, süreli bakıcı rolü, kendi kayıtlarının dökümü,
₺149–249/ay, kurum/dernek faturası. B2C doğrulaması bitmeden açılmamalı (Onur ve Can bu yönde
uyardı: ürün erken dallanırsa tek evde bile doğru cevap veremeden bakıcı CRM'ine döner).

## 5. Çözülmeyen üç çatışma (ürün kararı gerekiyor)

1. **Bildirimden tek dokunuşla kayıt (B-34).** Barış'ın üründe kalma şartı ↔ Nuray ve Deniz'e
   göre kaydın güvenilirliğini bitiriyor. Kısmi uzlaşı "yalnız boş slotta" ama "kim dokundu"
   sorusu açık.
2. **Derinlik mi genişlik mi.** 8/10 "önce tek hanede derinlik" dedi; Aylin ve Zeynep çoklu hayvan
   olmazsa ürünü terk edeceklerini söyledi. Yani çoklu hayvan bir özellik değil, iki segment için
   varlık şartı. Aylin ayrıca teknik uyarı yaptı: derinlik tek hayvan varsayımıyla kurulursa
   çoğaltma baştan yazma olur.
3. **Kim öder.** Mevcut "hane aboneliği" varsayımını hiçbir persona savunmadı. Sinem hane
   ücretsiz + profesyonel öder diyor; Aylin kurum faturası; Deniz üyelerin ayrı ayrı ödemesi
   (ortak abonelik boşanmış hanede yeni kavga konusu); Can yıllık düşük tutar.

## 6. Tartışmada fikir değiştirenler

Bu tablo, tek başına yapılan testin neyi kaçıracağını gösteriyor: yedi persona başkalarını
okuduktan sonra pozisyon değiştirdi.

| Persona | Önce | Sonra | Sebep |
|---|---|---|---|
| Kerem | "Sert kilit, iki adımlı onay" | "Sert"i geri çekti: ek dokunuş ısrar edene binsin, varsayılan buton güvenli çıkış olsun | Nuray'ın "kilit varsa telefonu kızıma veririm" itirazı |
| Nuray | "Yanlış kaydı silebilmeliyim" | "Silinmesin, üstü çizilsin" | Deniz'in kayıt bütünlüğü savunması |
| Deniz | "Kayıt hiç değiştirilemesin" | "Sessiz silinmezlik": düzeltme serbest, iz zorunlu | Nuray'ın "bu beni suçlu gösteriyor" itirazı |
| Zeynep | Özette "kim kaydetti" olsun | Özetten isimleri çıkardı (rol bazlı) | Deniz'in "isimli belge aile mahkemesine gider" itirazı |
| Sinem | "Parayı müşteri öder" | "Müşteri hiç ödemesin, ödeyen ben olmalıyım; hane ücretsiz" | Grubun 5 kişisinin "ödemem" demesi |
| Barış | "Kayıt tutmak fazladan iş" | "Kayıt tutmaya gerek yok kısmında haksızmışım" | Onur'un tarih bulgusu (kendi WhatsApp yönteminin de aynı hatayı yaptığını gördü) |
| Elif | "koşullu kullanırım" | "Bugün ücretsiz olsa bile kurmam" (sertleşti) | Onur'un tarih bulgusu: "yanlış bilgi, hiç bilgi görmemekten kötü" |
| Onur | "Günlük bildirim spam'dır" | "Bildirim ayarı hane değil kişi başına olmalı" | Barış'ın kullanım biçimi |
| Aylin | Çift kaydı düşük ciddiyetle geçmişti | Gerçek tehlike kabul etti (çözüm kilit değil uyarı) | Kerem'in insülin örneği |
| Can | "Uyarı yeter" | "Asıl sorun ekranın eskiyi gizlemesi" | Nuray ve Onur'un raporları |
