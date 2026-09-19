# Bulgu listesi — geliştirme için

Bu dosya testte çıkan **tüm** bulguları içerir; hiçbiri elenmedi. Her bulgu kaynak kodda
doğrulandı veya doğrulanamadıysa açıkça öyle işaretlendi.

Sınıflandırma:
- **[Ü] Ürün eksiği** — backend/gerçek hesap olmadan da düzelebilir, tasarım veya istemci kodu meselesi.
- **[D] Demo sınırı** — yerel demo olduğu için yok; gerçek sürümde zaten planlı.
- **[H] Harness sınırı** — web üzerinden test edildiği için doğrulanamadı, native'de test edilmeli.

Ciddiyet 1-5, personaların verdiği ciddiyetlerin en yükseği alındı.

## Öncelik özeti

| Sıra | ID | Bulgu | Ciddiyet | Kaç persona | Durum |
|---|---|---|---|---|---|
| 1 | B-01 | İkinci "yapıldı" uyarısız kaydediliyor | 5 | 10/10 | **düzeltildi** (18 Eyl 2026) |
| 2 | B-02 | Bugün kartı önceki kaydı gizliyor | 5 | 7/10 | **düzeltildi** (18 Eyl 2026) |
| 3 | B-03 | Çakışma kartı kim/ne zaman bilgisini gizliyor, çözülemiyor | 5 | 10/10 | **düzeltildi** (18 Eyl 2026) |
| 4 | B-07 | Gün dönmüyor: ertesi gün hâlâ dünkü kayıt görünüyor | 5 | 1 bulan, 4 destekleyen | **düzeltildi** (18 Eyl 2026) |
| 5 | B-10 | Kayıt düzeltme / silme / geri alma yok | 5 | 10/10 | açık |
| 6 | B-15 | "Demoyu başlangıca döndür" onaysız ve izsiz siliyor | 5 | 4/10 | açık |
| 7 | B-16 | "Birini davet et" davet edilenin ekranını açıyor | 5 | 10/10 | açık |
| 8 | B-24 | Plan ekleme/düzenleme yok | 5 | 10/10 | açık |
| 9 | B-28 | Hatırlatıcı 20:00'ye sabit kodlu | 4 | 4/10 | açık |
| 10 | B-11 | Uygulamada hiç metin girişi yok (not/doz/saat) | 4 | 5/10 | açık |

Düzeltilen dördünün ne yapıldığı, nerede durduğu ve nasıl doğrulandığı: `04-uygulanan-duzeltmeler.md`.

Kalan bulgular aşağıda temalara göre, aynı ayrıntı seviyesinde.

---

## A. Çift kayıt ve çakışma

### B-01 · Aynı bakıma ikinci "yapıldı" uyarısız kaydediliyor · [Ü] · 5
**Kim buldu:** 10/10.
**Tekrar:** Bugün → "Durum kaydet" → "Yapıldı". Aynı satırda "Yeni kayıt ekle" → "Yapıldı".
**Şu an:** Hiçbir uyarı yok, ikinci kayıt sessizce ekleniyor. Kerem üst üste 3 kez kaydetti.
`hasConflict` yalnızca farklı sonuçlar varsa çakışma sayıyor, iki "yapıldı" çakışma değil.
**Kod:** `src/domain/care.ts:15` (`new Set(events.map(e => e.outcome)).size > 1`).
**Uzlaşılan beklenen davranış (tartışma Ç1, 10/10):** Slot doluyken kayıt ekranı açılırken bilgi
gösterilsin: "Luna'nın 08:00 bakımı bugün yapıldı. Deniz, 08:12." Varsayılan ve büyük buton
güvenli çıkış ("Tamam"), ikincil küçük buton "Yine de kayıt ekle". Kilit değil, engel değil.
Kırmızı ünlem ve "emin misin/tehlike/hata" kelimeleri kullanılmasın (Nuray'ın şartı).
**Kabul kriteri:** Aynı occurrence'a aynı gün ikinci kayıt denendiğinde bilgi ekranı çıkar;
doğru davranan kullanıcı için 1 dokunuş, ısrar eden için 2 dokunuş olur; iki "yapıldı" da
ekranda ayrı ayrı görünür.
**Durum: düzeltildi (18 Eylül 2026).** Bkz. `04-uygulanan-duzeltmeler.md`.

### B-02 · Bugün kartı yalnızca son kaydı gösteriyor, öncekini gizliyor · [Ü] · 5
**Kim buldu:** Elif, Kerem, Onur, Deniz, Can, Aylin, Barış.
**Tekrar:** Seed'de Deniz 08:12 "yapıldı" kaydı var. Sabah bakımına kendi kaydını ekle.
**Şu an:** Kart "Murat, 18:10'da yapıldı ekledi" diyor; Deniz'in kaydı karttan kayboluyor.
Yani ekran, veri arttıkça daha az gösteriyor. Elif'in ifadesiyle: "çifte dozun kanıtını saklıyor".
**Kod:** `src/components/task-row.tsx:9` (`const latest = occurrence.events.at(-1)`).
**Beklenen:** O güne ait tüm kayıtlar kartta kim + saat + durum ile alt alta görünsün.
**Kabul kriteri:** İki kayıt varsa kartta iki satır görünür; hiçbir kayıt gizlenmez.
**Durum: düzeltildi (18 Eylül 2026).** Bkz. `04-uygulanan-duzeltmeler.md`.

### B-03 · Çakışma kartı bilgi gizliyor, tıklanamıyor, çözülemiyor · [Ü] · 5
**Kim buldu:** 10/10.
**Tekrar:** Bir bakıma "Yapıldı", sonra aynı bakıma "Atlandı" kaydet.
**Şu an:** Kart tek satıra düşüyor: "Aynı görev için farklı kayıtlar var." Kim ne dedi görünmüyor,
kart tıklanmıyor, çözme yolu yok. Nuray: "uygulamayı açma sebebim olan soru cevapsız kaldı."
**Kod:** `src/components/task-row.tsx:19` (conflict dalı `latest` bilgisini tamamen değiştiriyor).
**Beklenen:** Çakışan kartta her iki beyan da kim/ne/saat ile görünsün; karta dokunulabilsin;
"hangisi geçerli?" seçimi yapılabilsin ve seçim düzeltme kaydı olarak iz bıraksın.
**Durum: düzeltildi (18 Eylül 2026).** Bkz. `04-uygulanan-duzeltmeler.md`.

### B-04 · Çakışma yalnız Bugün ekranında, Geçmiş'te yok · [Ü] · 3 · kısmen açık
**18 Eylül 2026 notu:** Geçmişte netleştirme kayıtları artık "Netleştirme kaydı · önceki kayıtlar
silinmedi" etiketiyle görünüyor; çakışmanın kendisi hâlâ yalnız Bugün ekranında işaretleniyor.
**Kim buldu:** Zeynep.
**Şu an:** Geçmiş düz liste; çelişen kayıtlar yan yana ama işaretsiz.
**Kod:** `src/app/(tabs)/history.tsx:12`.
**Beklenen:** Geçmişte de çakışma/çözüm durumu görünsün.

### B-05 · Zamanı gelmemiş doz "yapıldı" işaretlenebiliyor · [Ü] · 3
**Kim buldu:** Kerem (20:00 dozunu 18:10'da işaretledi, itiraz yok).
**Beklenen:** En azından "planlanan saatten 1s50d önce" uyarısı; kayıt yine de serbest kalsın.

### B-06 · (Olumlu) Kaydetme sırasında çift gönderim engelli
`saving` durumu butonları devre dışı bırakıyor; Kerem doğruladı. Korunmalı.
**Kod:** `src/app/record/[occurrenceId].tsx` (`disabled={saving !== null}`).

---

## B. Tarih, saat ve gün mantığı

### B-07 · Gün dönmüyor: ertesi gün hâlâ dünkü kayıt görünüyor · [Ü] · 5
**Kim buldu:** Onur bulup ölçtü (cihaz saatini 1 ve 4 gün ileri aldı); Elif, Kerem, Can, Barış
tartışmada bunu kendi maddelerinin üstüne koydu.
**Tekrar:** Bir kayıt gir, cihaz saatini ertesi güne al, uygulamayı aç.
**Şu an:** Başlık "19 Eylül Cumartesi" oluyor ama satır hâlâ "Murat, 18:13'te yapıldı ekledi"
diyor. 4 gün ileride bile aynı. Geçmiş sekmesi kaydın tarihini doğru veriyor.
**Sebep:** Günlük occurrence üretimi hiç yok; `atToday()` yalnızca demo sıfırlanırken çalışıyor
ve snapshot SQLite'a yazılıp bir daha yenilenmiyor.
**Kod:** `src/data/seed.ts:3-27`, `src/data/repository.ts` (`getSnapshot` yalnız kayıtlı snapshot'ı okuyor).
**Beklenen:** Planlardan her gün için occurrence üretilsin; Bugün yalnız bugünün occurrence'larını
göstersin; kayıt yoksa "bugün kayıt yok", saat geçmişse "20:00 geçti, kayıt yok" densin.
**Neden kritik:** Ürünün tek işi "bugün verildi mi" sorusunu doğru cevaplamak. Bu hâliyle
üç gün ilaç verilmese de ekran "yapıldı" diyor. Kerem: "yanlış güne yazan defter, hiç tutulmayan
defterden tehlikelidir."
**Durum: düzeltildi (18 Eylül 2026).** Bkz. `04-uygulanan-duzeltmeler.md`.

### B-08 · Saat dilimi değişince Bugün ile Planlar farklı saat gösteriyor · [Ü] · 4
**Kim buldu:** Onur (Dubai +1, Londra -2 denemesi).
**Şu an:** Londra'da Bugün "06:00/18:00", Planlar aynı anda "08:00/20:00", buton hâlâ
"20:00 için hatırlatıcı kur".
**Sebep:** `scheduledAt` ISO damgası cihaz saat diliminde biçimleniyor; Planlar ise `times[0]`
dizesini ham gösteriyor.
**Kod:** `src/components/task-row.tsx:11` ↔ `src/app/(tabs)/plans.tsx:15`.
**Beklenen:** Plan saatleri hanenin saat dilimine sabitlensin (ilacı veren kişi nerede yaşıyorsa),
seyahat eden kullanıcıya "hane saati 20:00 · senin saatinle 18:00" gibi tek bir çeviri gösterilsin.

### B-09 · Geçmiş kayıt saatine göre sıralı; gün başlığı ve planlanan saat yok · [Ü] · 3
**Kim buldu:** Barış, Zeynep.
**Şu an:** Sabah bakımı akşam kaydedilince listede akşam kaydının üstünde/altında karışıyor;
planlanan saat hiç gösterilmediği için sapma görünmüyor.
**Kod:** `src/app/(tabs)/history.tsx:12` (`sort((a,b) => b.event.recordedAt...)`).
**Beklenen:** Gün başlıkları, "planlanan 20:00 · kaydedilen 18:10" sapma satırı.

---

## C. Kayıt bütünlüğü ve düzeltme

### B-10 · Kayıt düzeltme, silme, geri alma yok · [Ü] · 5
**Kim buldu:** 10/10. Nuray, Sinem ve Elif yanlış kayıtla kilitli kaldı.
**Şu an:** Geçmiş satırları tıklanmıyor; tek çıkış yolu toptan sıfırlama (B-15).
**Uzlaşılan tasarım (tartışma Ç3; Nuray "sil" talebinden, Deniz "hiç değişmesin" talebinden vazgeçti):**
- Silme yok.
- Kısa geri alma penceresi: kendi kaydın için 1-15 dk (öneriler: Kerem 60 sn, Barış 2 dk, Can 5 dk, Deniz 15 dk).
- Sonrası düzeltme: eski satır üstü çizili/soluk kalır, altında "Nuray 18:12'de düzeltti" yazar.
- Kendi kaydını düzeltirsin, başkasınınkini düzeltemezsin (Deniz).
- Bugün ekranında tek geçerli cevap görünür, eski hâl geçmişte açılabilir durur (Nuray'ın şartı).
**Kabul kriteri:** Yanlış kayıt 3 dokunuşta düzeltilebilir; geçmişte düzeltme izi ve düzelteni
görünür; hiçbir kayıt izsiz kaybolmaz.

### B-11 · Uygulamada hiç metin/sayı girişi yok (not, doz/ünite, gerçekleşen saat) · [Ü] · 4
**Kim buldu:** Kerem (DOM'da 0 input doğruladı), Zeynep, Aylin, Nuray, Onur.
**Şu an:** Kayıt ekranında yalnız üç buton var; ne verildiği, ne kadar verildiği, gerçekte saat
kaçta verildiği yazılamıyor. "Emin değilim" gerekçesiz kalıyor, klinikte işe yaramıyor (Zeynep).
**Uzlaşı:** Not **zorunlu olmasın**; yalnız "Atlandı" ve "Emin değilim" seçilince 40 karakterlik
isteğe bağlı kutu çıksın (Zeynep'in önerisi, Barış kabul etti). Doz/ünite alanı kronik hasta
haneleri için isteğe bağlı iki küçük kutu (Kerem).
**Not:** Doz alanı eklenirken ürünün "tıbbi doğrulama sayılmaz" duruşu korunmalı — Can bu konuda
uyardı: doz kutusu koyup sorumluluk almamak çelişki yaratır.

### B-12 · Geçmiş satırları tıklanmıyor · [Ü] · 3 — B-10'un parçası.

### B-13 · Geriye dönük kayıt girilemiyor · [Ü] · 3
Kayıt saati her zaman butona basılan an. Barış ve Onur "sabah verdim, akşam giriyorum" vakasını
kaydedemedi.

### B-14 · Başkası adına kayıt girilemiyor · [Ü] · 2
Onur: "eşim verdi, ben giremiyorum." Tartışmada öncelik verilmedi; not düşülüyor.

### B-15 · "Demoyu başlangıca döndür" onaysız, izsiz, tehlikeli yerde · [Ü] · 5
**Kim buldu:** Nuray, Deniz, Zeynep, Elif (dördü de kazara tetikledi).
**Şu an:** Hane ekranında "Birini davet et"in hemen altında; tek dokunuşta tüm kayıtları siliyor,
onay sormuyor, geri bildirim vermiyor, izi kalmıyor.
**Kod:** `src/app/(tabs)/household.tsx:12` (`onPress={resetDemo}`).
**Beklenen:** Onay diyaloğu ("Bu 4 kaydı silmek üzeresin, geri gelmez" — Nuray'ın metni),
tehlikeli eylem görsel olarak ayrışsın, davet butonunun yanından kalksın; gerçek sürümde toplu
silme tüm üyelerin onayına bağlansın (Deniz) ve iz bıraksın.

---

## D. Davet, hane ve roller

### B-16 · "Birini davet et" gönderme akışı değil, kabul ekranı · [Ü] · 5
**Kim buldu:** 10/10.
**Şu an:** Buton `router.push('/invite/demo-invite')` yapıyor; açılan ekran davet **edilenin**
göreceği "Luna'nın hanesine katıl / Demo hanesine katıl" ekranı. İsim/telefon alanı, kopyalanacak
kod, paylaş düğmesi yok. "Demo hanesine katıl"a basınca sessizce ana ekrana dönüyor, hane listesi
değişmiyor.
**Kod:** `src/app/(tabs)/household.tsx:12`, `src/app/invite/[token].tsx`.
**Beklenen:** Gönderen tarafta davet linki/kodu üretilsin, tek butonla WhatsApp'a düşsün (Barış'ın
3. oyu), davetin durumu (gönderildi/kabul edildi) hanede görünsün.
**Neden kritik:** `../07-mvp-uygulama-durumu.md`'deki aktivasyon hunisinin 2. adımı üründe yok;
bu hâliyle huni ölçülemez.

### B-17 · Davet kodu sabit (`demo-invite`) · [D] · 2 — gerçek sürümde tek kullanımlık token planlı.

### B-18 · Üye satırları tıklanmıyor: rol değiştirme, çıkarma, haneden ayrılma yok · [Ü] · 4
**Kim buldu:** Deniz, Sinem, Can.

### B-19 · Rol yetkileri hiçbir yerde yazılı değil · [Ü] · 3
**Kim buldu:** Deniz. Hane başlığı "Bakımı paylaşan kişiler ve yetkileri" diyor ama tek yetki
cümlesi yok; yetkilerin tek tanımı davet ekranındaki cümle: "Yeni kayıt ekleyebilirsin; hane
sahibi ayarlarını değiştiremezsin."
**Beklenen:** Hane ekranında kimin neyi yapabildiği (kayıt ekleme, düzeltme, üye çıkarma, dışa
aktarma, toplu silme) açıkça yazsın.

### B-20 · 3 ve üzeri üye eklenemiyor · [Ü] · 4 — Can'ın 3 kişilik evi kurulamıyor.

### B-21 · Süreli / bitiş tarihli bakıcı rolü yok · [Ü] · 4
**Kim buldu:** Sinem. İş bitince erişimin kendiliğinden kapanması gerekiyor.
**Sinem'in mahremiyet sınırı (Deniz'le uzlaşılan):** Bakıcı yalnız bakacağı hayvanı, planını ve
kendi başlangıç tarihinden sonraki kayıtları görsün; önceki geçmişi, hane üyelerinin notlarını,
diğer hayvanları ve ev sahibinin kişisel bilgilerini görmesin; bitişte erişim asimetrik kapansın
(hane her şeyi tutar, bakıcıda yalnız kendi girdiği kayıtların dökümü kalır).

### B-22 · Çoklu hane yok · [Ü] · 4 (Sinem) — tartışmada 31. güne bırakıldı.

### B-23 · Çoklu hayvan yok; hane tek hayvan varsayıyor · [Ü] · 4
**Kim buldu:** Aylin (3 hayvan), Zeynep (2 kedi). İkisi de "olmazsa üründen çıkarım" dedi.
**Kod:** `src/domain/types.ts` — `AppSnapshot` tek `pet` tutuyor; başlık "Luna'nın hanesi" sabit.
**Aylin'in uyarısı:** Derinlik tek hayvan varsayımıyla kurulursa sonradan çoğaltmak baştan yazmak olur.

---

## E. Planlar ve hatırlatıcılar

### B-24 · Plan ekleme/düzenleme yok · [Ü] · 5
**Kim buldu:** 10/10. Planlar ekranı tamamen salt okunur, kartlar tıklanmıyor.
**Kod:** `src/app/(tabs)/plans.tsx:15`.
**Beklenen:** Plan adı (ilaç adı dâhil), saat(ler), tekrar, başlangıç/bitiş.

### B-25 · Planda ilaç adı ve talimat kullanıcıya ait değil · [Ü] · 4
"Sabah bakımı / Akşam bakımı" sabit. Nuray: "Akşam bakımı bana bir şey demiyor, veterinere hiç
demiyor." Zeynep: kronik hastaya yetmez.

### B-26 · Esnek tekrar yok · [Ü] · 3
Can: "günde 1 kez, saati fark etmez" kurulamıyor; sabit 08:00/20:00 düzensiz yaşayanda her gün
suçluluk üretiyor.

### B-27 · Süreli tedavi (bitiş tarihli) ve tamamlandı durumu yok · [Ü] · 4
Aylin: "10 gün, günde 2 doz" tanımlanamıyor, 7/20 sayacı ve "tamamlandı" damgası yok.

### B-28 · Hatırlatıcı 20:00'ye sabit kodlu; 08:00 için yok · [Ü] · 4
**Kim buldu:** Elif, Nuray, Kerem, Onur. Elif'in asıl derdi sabah dozu.
**Kod:** `src/app/(tabs)/plans.tsx:15` (`scheduleDemoReminder(20)`), `src/services/reminders.ts`.

### B-29 · Hatırlatıcı geri bildirimi ve yönetimi yok · [Ü] · 3
Onur: kuruldu mu belli değil, kurulmuş hatırlatıcıların listesi ve iptali yok.

### B-30 · Bildirim izni reddedilince kullanıcı ayarlara yönlendirilmiyor · [Ü] · 2 (Nuray)

### B-31 · Bildirim metni sabit ve genel · [Ü] · 3
"Luna için planlanan bakım zamanı yaklaşıyor." Hangi bakım olduğu yazmıyor — Nuray'ın
"neyi onayladığımı bilmiyorum" itirazının kaynağı. **Kod:** `src/services/reminders.ts`.

### B-32 · Kaçırılan bakım bildirimi yok · [Ü] · 4
Onur'un ve Elif'in "olmazsa olmaz"ı: planlanan saat geçti ve kayıt yoksa telefona bildirim düşsün.
Elif ayrıca doz saatinde **iki kişiye birden** hatırlatma istiyor.

### B-33 · Bildirim ayarı kişi başına değil · [Ü] · 3
Onur'un tartışmada değiştirdiği görüş: eşine günlük saat bildirimi gerekli, kendisine yalnız
kaçırılma bildirimi. Hane geneli tek ayar ikisinden birini kaybettirir.

### B-34 · Bildirimden tek dokunuşla kayıt — ÇÖZÜLMEMİŞ ÇATIŞMA · [Ü] · 4
**İsteyen:** Barış (1. oyu, ürünü kullanmasının tek şartı), Onur (2. oyu), Elif (Barış'ın tarafına geçti).
**Karşı çıkan:** Nuray ("telefon önlük cebimde, farkında olmadan dokunuyor; gece yarısı verilmiş
görünen verilmemiş ilaç demek"), Deniz ("o dokunuş kayıt değil refleks; telefon masada, kilidi
açık, kim dokundu belli değil").
**Kısmi uzlaşı:** Tek dokunuş yalnız slot boşken çalışsın; slotta kayıt varsa bildirim o kişiye
hiç gitmesin ya da tek dokunuş uygulamayı açsın.
**Karar gereken:** Kimin dokunduğunu doğrulayan bir yol (cihaz-üye eşlemesi) olmadan bu özellik
Deniz ve Nuray için kayıt güvenilirliğini düşürüyor. Ürün kararı verilmeli.

---

## F. Eşitleme ve çevrimdışı

### B-35 · Çevrimiçiye dönünce "paylaşılmayı bekliyor" etiketi kalkmıyor · [D]+[Ü] · 3
**Kim buldu:** 8 persona. Aylin: "güven kıran tek şey bu."
**Şu an:** Kuyruk boşalması demo sınırı (uzak eşitleme yok) ama **"gönderildi ✓" durumu hiç
tasarlanmamış** (Sinem) — bu kısım ürün eksiği. Etiket kullanıcıya bozuk görünüyor.
**Kod:** `src/data/repository.ts` (outbox'a yazılıyor, boşaltan kod yok).

### B-36 · Çevrimdışı açılış native'de test edilmedi · [H] · —
Tarayıcıda uygulama kapalıyken internetsiz açılmıyor (`ERR_INTERNET_DISCONNECTED`).
Onur ve Sinem için karar verici; native sürümde mutlaka test edilmeli.

---

## G. Geçmiş, özet ve paylaşım

### B-37 · Dışa aktarma / paylaşma / PDF yok · [Ü] · 5 (Zeynep için), 4 (Sinem, Aylin, Nuray)
Paywall'da "Paylaşılabilir bakım özeti" satılıyor ama üründe hiçbir yerde yok.
Zeynep: "var olmayana ödemem." Zeynep'in verdiği kliniğe öneri şartı bu.

### B-38 · Tarih filtresi, 30 günlük görünüm, gün başlığı yok · [Ü] · 4 (Zeynep)

### B-39 · "Kayıt girilmemiş gün" ile "atlandı" ayrımı yok · [Ü] · 4
Zeynep'in özet tasarımı şartı: özet, kayıt girilmemiş günleri ayrı sütunda göstermeli, atlanmış
gibi saymamalı. Aksi hâlde klinik yanlış okur.

### B-40 · Geçmişte hane/hayvan adı geçmiyor · [Ü] · 3 (Sinem; çoklu hanede kanıt değeri yok)

### B-41 · Kişi başı sayaç / adalet göstergesi yok · [Ü] · 3
Can'ın 2. oyu: "Son 7 gün: Can 12 · Ege 3 · Melis 1". Paylaşımlı evlerde ürünün kullanılma sebebi.

### B-42 · Özetin mahremiyet tasarımı — uzlaşılan sözleşme
Zeynep ve Deniz tartışmada aynı tasarımda buluştu; geliştirilirken uyulacak kurallar:
- Özet **isimsiz**: "bakım veren 1 / bakım veren 2".
- İçerir: tarih aralığı, planlı doz sayısı, yapıldı/atlandı/emin değilim sayımı, atlanan tarihler,
  planlanan saate göre sapma, kayıt girilmemiş günler, çelişkili kayıtların listesi.
- İçermez: konum, cihaz bilgisi, kişisel iletişim bilgisi, not metinleri, kişi bazlı başarı
  tablosu, yüzde veya "uyum skoru".
- Elle üretilir, süreli ve iptal edilebilir link (7 gün), üretildiği an geçmişe iz düşer ve
  diğer üyeye bildirilir (Deniz'in şartı).

---

## H. Mahremiyet, ayarlar ve KVKK

### B-43 · Ayar ekranı yok; /settings /privacy /export /kvkk 404 · [Ü]+[D] · 4
Deniz ve Onur doğruladı. Gizlilik metni, veri dışa aktarma, hesap/veri silme ekranı yok.
`../07-mvp-uygulama-durumu.md`'de beta kapısının 6. maddesi bu.

### B-44 · Kayıt saatleri davranış izi üretiyor · [Ü] · 2
Deniz: ayrı evlerde yaşayan iki kişi için kayıt saatleri "ne zaman evdeydi" bilgisini sızdırıyor;
"saati gizle / yalnız sabah-akşam göster" seçeneği yok.

### B-45 · (Olumlu) Ekranlarda konum, e-posta, telefon sızıntısı yok — Deniz doğruladı.

### B-46 · "Hane" kavramı iki ayrı evde çalışmıyor · [Ü] · 3
Deniz: nöbet ataması yok, "bugün köpek kimde" sorusu cevaplanmıyor. Ürün kararı gerektirir.

---

## I. Dil ve erişilebilirlik

### B-47 · (Olumlu) Tıbbi sınır dili 10/10 onaylandı
Teşhis, doz önerisi, sağlık skoru, rozet yok; "tıbbi doğrulama sayılmaz" uyarıları doğru yerde.
Veteriner teknisyeni personası dâhil kimse sınırın aşıldığını söylemedi. **Bu korunmalı.**

### B-48 · (Olumlu) Punto ve dokunma hedefleri 63 yaş için yeterli — Nuray doğruladı.

### B-49 · Kontrast sorunları · [Ü] · 3 (Nuray)
- Krem zemin üzerine gri açıklama yazıları soluk.
- Küçük turuncu BÜYÜK HARF eyebrow ("İKİNCİ BAKIM VEREN SONRASI") zor okunuyor.
- Turuncu Plus kartı alt şeritte kesiliyor.

### B-50 · Anlaşılmayan kelimeler · [Ü] · 4 (Nuray)
**18 Eylül 2026 notu:** Kayıt cümlesindeki Türkçe saat eki düzeltildi ("18:59'de" → "18:59'da");
`clockSuffix()` eki okunuşa göre seçiyor. Listedeki kelimeler hâlâ açık.
"nöbet" (hasta hayvan bağlamında "nöbet geçirdi" diye okunuyor — **uygulama adının kendisi**),
"prova", "eşitleme / uzak eşitleme", "Plus önizlemesi", "backend bağlantısıyla etkinleşir",
"bakım hattı", "PLANLANAN FİYAT TESTİ", "görünür kıl".
Anlaşılan ve iyi bulunan: "Bu cihazda kayıtlı · paylaşılmayı bekliyor", "sıraya alınır" (kısmen).

### B-51 · Hitap tutarsızlığı · [Ü] · 2
Saygılı ve senli benli dil karışıyor (Nuray). Tek bir hitap seçilmeli.

### B-52 · Üçüncü "geri"de boş ekran · [Ü] · 3 (Nuray)
Geri yığını tükenince beyaz/boş ekran kalıyor; kullanıcı "bozdum" sanıyor.

### B-53 · Ekran okuyucu ile kullanım test edilmedi · [H] · —
TalkBack/VoiceOver ve Dynamic Type native'de test edilmeli.

---

## J. Fiyat ve paketleme (üründe görünen hâliyle)

### B-54 · "Birden fazla bakım veren" Plus özelliği olarak listeleniyor · [Ü] · 5
**Kim itiraz etti:** 10/10. Ürünün tek varlık sebebi paywall'ın arkasında.
**Kod:** `src/app/paywall.tsx`.

### B-55 · Ücretsiz sürümün sınırı hiçbir yerde yazmıyor · [Ü] · 4
Can 10 kayıt attı, hiçbir limit uyarısı görmedi; Nuray "bedavada ne kalıyor" sorusuna cevap bulamadı.
Bu hâliyle fiyat testi geçersiz: kullanıcı neyin parasını verdiğini bilmiyor.

### B-56 · Paywall'da satılan "Paylaşılabilir bakım özeti" üründe yok · [Ü] · 4 (Zeynep, Sinem)

### B-57 · Hane aboneliği modelini hiçbir persona savunmadı · [ürün kararı]
Ayrıntı ve rakamlar: `03-oylar-fiyat-ve-oncelik.md`.

---

## K. Kod hijyeni (testten bağımsız, testte ortaya çıktı)

### B-58 · Ölü şablon dosyaları typecheck'i kırıyor · [Ü] · 3
`src/components/app-tabs.web.tsx:27` ve `src/components/app-tabs.tsx`, silinmiş `src/app/explore.tsx`
rotasına referans veriyor; Expo starter şablonundan kalma, ürün rotaları bunları kullanmıyor.
`npm run typecheck` bu yüzden başarısız (testten önce de öyleydi; `../07-mvp-uygulama-durumu.md`
"başarılı" diyor, güncellenmeli).

### B-59 · (Olumlu) Tarayıcı konsolunda hata ve çökme yok
10 personanın hiçbiri oturumlarında `console.error`/`pageerror` görmedi (metro.config ve
repository düzeltmelerinden sonra). Veriler oturumlar arasında kalıcı.

### B-60 · (Olumlu) Deep link çalışıyor
Barış `/record/occ-morning` adresini doğrudan açtı, kayıt ekranı geldi — teknik altyapı var ama
kullanıcıya hiç sunulmuyor (kısayol, widget, bildirim aksiyonu yok).
