# Görsel Tasarım Kıyaslaması — Evcil Hayvan Sektörü

**Hazırlayan:** araştırma ajanı · **Tarih:** 2026-09-19
**Kapsam:** PatiNöbeti (çok bakıcılı evcil hayvan bakım günlüğü) için görsel dil kıyaslaması.
**İncelenen:** 11pets, PetDesk, Rover, Wag!, Tractive, Whistle (kapandı), Pawp, DogLog, PawLog, DogNote + Türkiye (PetRoutine, Pet Takip, Pati Aşı Takip, CanDostum, Petinoks).

---

## ⚠️ METODOLOJİ VE GÜVENİLİRLİK UYARISI — ÖNCE BUNU OKU

Bu araştırma **yalnızca metin kaynaklarına** dayanır. Ekran görüntüsü görülmedi.

- Ortamda tarayıcı (Playwright/Chromium) kurulu değil (`Chromium distribution 'chrome' is not found`), bu yüzden mağaza ekran görüntüleri görsel olarak incelenemedi.
- Kullanılan kaynaklar: App Store / Google Play listeleme metinleri, kullanıcı yorumları (birebir alıntı), resmi pazarlama siteleri, basın haberleri.
- **Etiketleme sistemi:**
  - `[DOĞRULANDI]` = kaynakta birebir yazan metin/alıntı.
  - `[ÇIKARIM]` = metinden mantıken türetilmiş, gözle doğrulanmamış tahmin.
  - `[BULUNAMADI]` = arandı, kaynak bulunamadı. Uydurma yapılmadı.
- Renk hex kodları, tipografi kademe sayıları, ikon setleri ve boş durum ekranları metinden **kesin** çıkarılamaz. Bu alanların çoğu bilinçli olarak `[BULUNAMADI]` bırakıldı.
- **En zayıf alan boş durum (empty state) ekranlarıdır** — hiçbir uygulama için güvenilir kaynak bulunamadı. Bu, bir sonraki adımda cihazda elle incelenmesi gereken konudur.

---

## 1. PawLog — *PatiNöbeti'nin en yakın rakibi*

**Kaynak:** https://www.pawlog.pet/ · https://www.pawlog.pet/compare/shared-dog-care-apps

Bu, incelenen uygulamalar içinde PatiNöbeti'nin problemine **birebir** aynı problemi çözen uygulama. En dikkatli okunması gereken blok bu.

**Ana ekran kurgusu** `[DOĞRULANDI]`
Paylaşılan akış (shared feed), en yeni üstte kronolojik. Her satırda üç atom var:
- Saat (ör. `8:02 AM`)
- Aktivite tipi (`Walked`, `Potty`, `Fed`)
- **Kişi adı** (`Sam`, `You`)

Sitedeki demo satırı birebir: `"8:02 AM Walked Sam | 7:41 AM Potty You"`

Bu satır grameri, "kim hangi bakımı ne zaman yaptı" sorusunu **tek satırda** kapatıyor. PatiNöbeti'nin çözmeye çalıştığı sorunun kanonik çözümü bu.

**Kayıt etkileşimi** `[DOĞRULANDI]`
> "One or two taps and it is in the log, with the time and who did it."

Akış: önce kimin kaydettiği seçilir, sonra aktivite tipine dokunulur. Canlı güncellenir.
Haptik/animasyon geri bildirimi hakkında bilgi `[BULUNAMADI]`.

**Başlık metni (konumlandırma)** `[DOĞRULANDI]`
> "Everyone caring for your dog knows what's been done."
> "One shared log for meals, walks, potty, sleep, training, and health. Log it in seconds, and the whole household sees it, live."

Dikkat: başlık bir **özellik** değil, bir **huzur vaadi**. "Herkes biliyor" — yani asıl satılan şey "bir daha sormayacaksın".

**Görsel dil** `[ÇIKARIM]`
Temiz/minimal, bol beyaz alan. Maskot yok. Fonksiyonel UI öncelikli, karakter odaklı marka değil.
Marka rengi hex `[BULUNAMADI]`. Tipografi kademesi `[BULUNAMADI]`.

**Fotoğraf kullanımı** `[DOĞRULANDI]` — anlatım gücü yüksek
Yaşam tarzı fotoğrafı olarak: *"a dog waiting patiently beside an empty bowl in a sunlit kitchen"* (güneşli mutfakta boş kabın yanında sabırla bekleyen köpek).
Bu bir "mutlu köpek" fotoğrafı değil — **problemin kendisinin fotoğrafı**. Suçluluk duygusunu görselleştiriyor. Empty state / hero için çok güçlü bir fikir.

**Paywall dili** `[DOĞRULANDI]`
- Ücretsiz: `"€0/forever"` — `"Real value, never paywalled"`
- Plus: `"€19.99/year"` — `"about €1.67/month, save 44% vs monthly"`
- Deneme: `"Full Plus for 90 days, included."` (90 gün — sektörde çok uzun)
- **Vaat:** `"Family sharing is always free, on every plan."`
- Ücretsiz sınırı: `"one dog free, the pack on Plus"` → **hayvan sayısıyla** sınırlıyor, kişi sayısıyla değil.

**Rakip paywall'ları hakkında iddiaları** `[DOĞRULANDI]` (PawLog'un kendi karşılaştırma sayfasından — taraflı kaynak, doğrulanmalı)
- PawPal: `"puts household sharing on its Household plan, AUD 4.99 a month"`
- Pawlo: `"puts unlimited household members behind a paid plan at USD 3.99 a month after a seven-day trial"`
- Pawlo `"publishes iOS only"` → Android'deki partner giremiyor.
- DogLog & DogNote: `"Free to download, no published limit"` on sharing.

**Kişilik:** Sakin, dürüst, hafif savunmacı ("never paywalled" bir rakip iğnelemesi). Klinik değil ama neşeli de değil — **güven veren düz konuşma**.

---

## 2. DogNote — *ikinci en yakın rakip, en iyi kayıt ergonomisi*

**Kaynak:** https://apps.apple.com/us/app/dognote-pet-journal-walks/id1527756855 · https://dognote.app/

**Mağaza kimliği** `[DOĞRULANDI]`
- Alt başlık: `"Dog Tracking & Puppy Training"`
- Kategori: Lifestyle
- IAP: `DogNote Premium (Monthly) $4.99` / `(Yearly) $44.99, $32.99, or $17.99 (promo)`

**Ana ekran** `[DOĞRULANDI]`
Hero = aktivite akışı. Sitede birebir: `"All logged events in one feed with notes and images"`, filtre: olay / zaman / **aile üyesi**.
Mağaza metninde: `"Filter & Search: Easily find activities by event type, member, or date."`

→ **`member` bazlı filtre**, "kim yaptı" sorusunu ekranın birinci sınıf vatandaşı yapıyor. PatiNöbeti için doğrudan alınacak kalıp.

**Kayıt etkileşimi** `[DOĞRULANDI]` — sektördeki en iyi
> "Quick logging: Add events using Apple Watch App, Siri Shortcuts, Widgets."

Yani kayıt, uygulamayı **açmadan** yapılabiliyor: saatten, widget'tan, sesle.
Kullanıcı yorumu:
> "the fact that you can log events while a walk is still in progress without stopping the timer is such a thoughtful feature!"

**Görsel dil** `[DOĞRULANDI]`
Sitede **hem karanlık hem aydınlık mod** ekran görüntüleri yan yana sunuluyor → dark mode sonradan eklenmiş bir ek değil, pazarlama argümanı.
İllüstrasyon değil, gerçek arayüz görselleri kullanılıyor. Maskot yok.
Marka rengi `[BULUNAMADI]`. Emoji kullanımı belirtilmemiş `[BULUNAMADI]`.

**Kullanıcı yorumları** `[DOĞRULANDI]`
> "Works well for both me and my boyfriend for our one pet. The interface looks modern, it's easy to add events"
> "having one shared place where everyone can see when she last ate, went potty, or had a walk makes everything so smooth"

**Başlıklar** `[DOĞRULANDI]`: `"Simplify Your Pet Care Coordination"` · `"Monitor Your Pet's Weight Progress"`
Ayrıca `"Create a Family Hub"` — grup için isim vermişler ("Family Hub"). İsimlendirme = kimlik.

**Kişilik:** Sakin, modern, araçsal. Oyunculuk yok; "koordinasyon" kelimesi merkezi.

---

## 3. DogLog — *en öğretici NEGATİF ders burada*

**Kaynak:** https://apps.apple.com/us/app/doglog-track-your-dogs-life/id1229529595 · https://www.doglogapp.com/

**Mağaza kimliği** `[DOĞRULANDI]`
- Alt başlık: `"Walk/activity track puppy"` (zayıf, anahtar kelime doldurması)
- Kategori: Lifestyle · `"+100,000 pet owners"` indirme
- IAP: `Monthly Premium $3.99` / `Annual Premium $39.99`

**Grup ismi** `[DOĞRULANDI]`
> "Form a 'pack' with your fellow dog caretakers"

"Pack" (sürü) — aile/grup için tematik isim. PatiNöbeti'nin "nöbet" metaforuyla aynı damardan.

**Kayıt taksonomisi** `[DOĞRULANDI]` — 12 tip
`Food, Water, Treat, Walk, Pee, Poop, Sleep, Teeth brushing, Grooming, Training, Medicine, Custom`

**🔴 KRİTİK BULGU — renk stratejisi hatası** `[DOĞRULANDI]`
Kullanıcı yorumu (LizH510, "Almost Perfect!", 08/12/2023):
> "I know the color coding is for activities and you can filter to one pet, but it would be great to have the activities on the main feed highlighted differently for each dog or even just the names show up in different colors."

**Bu, tüm raporun en değerli tek bulgusu.**
DogLog renk kodunu **aktivite tipine** vermiş (yemek=x rengi, yürüyüş=y rengi). Kullanıcı ise rengin **hayvana/kişiye** verilmesini istiyor.
Mantık: kullanıcı akışa baktığında "bu bir yemek kaydı mı" sorusunu zaten **ikondan/metinden** anlıyor. Anlamadığı şey "bu **kimin/hangi hayvanın**" olduğu. Renk, en pahalı görsel kaynaktır; **metinle zaten çözülmüş** ayrıma değil, **çözülmemiş** ayrıma harcanmalı.
PatiNöbeti için: renk → **kişi** (bakıcı). İkon → aktivite tipi.

**Diğer yorum** `[DOĞRULANDI]`
> "The app is user friendly and I love that we could make our own custom events for symptoms or anything else we needed to track." (Kissa828, 2019)

**Görsel dil** `[ÇIKARIM]`
Site dosya adlarından: `DogLogIcon_Red.png`, `DogLogIconLarge_White.png` → **kırmızı + beyaz** marka rengi `[ÇIKARIM — dosya adından, gözle doğrulanmadı]`.
Material Design ikonları kullanılıyor (kamera, thumbs up, people, timeline, notifications) → **özel ikon seti değil, sistem/Material seti** `[ÇIKARIM]`.
Maskot yok. Tipografi `[BULUNAMADI]`.

**Sosyal katman** `[DOĞRULANDI]`
Akışta `"Like & Comment"` var, `"Photograph events and log your pet's life with photos"`.
→ Bakım günlüğünü bir mini sosyal akışa çevirmiş. Risk: her kayıt için beğeni beklentisi gürültü yaratır.

**Başlık** `[DOĞRULANDI]`: `"Track and coordinate your pet's activities and health"`

**Kişilik:** Fonksiyonel, biraz eski, hafif sosyal. Görsel iddia düşük.

---

## 4. 11pets — *en yoğun veri, en zor arayüz*

**Kaynak:** https://apps.apple.com/us/app/11pets-pet-care/id1232470530 · https://11pets.com/

**Mağaza kimliği** `[DOĞRULANDI]`
- Tanım: `"The most complete pet care app"`
- Kategori: **Health & Fitness** (Lifestyle değil — konumlandırma kararı)
- IAP: `$1.99` ve `$17.99`
- iPhone, iPad, Mac, Vision, Watch — çok platformlu

**Site görsel dili** `[DOĞRULANDI/ÇIKARIM karışık]`
- Başlık: `"The most attentive pet-care platform"` `[DOĞRULANDI]`
- Ağırlıklı beyaz zemin + **mavi** vurgu (logo ve UI'da) `[ÇIKARIM]`
- Sans-serif, modern, çağdaş `[ÇIKARIM]`
- **Maskot yok** `[ÇIKARIM]`
- Minimal illüstrasyon: özellikleri temsil eden **basit SVG ikonlar** (ilaç, randevu, aile paylaşımı) `[ÇIKARIM]`
- Fotoğraf: stok evcil hayvan + aile fotoğrafları, hero'da uygulama arayüzü görselleri `[ÇIKARIM]`
- Dekoratif geometrik ve eğri şekiller `[ÇIKARIM]`
- Genel his: **oyunculuk değil, netlik ve güvenilirlik** `[ÇIKARIM]`

**Veri yoğunluğu** `[DOĞRULANDI]` (PawLog karşılaştırma sayfasından)
> "11pets keeps deworming, x-rays, blood work, allergies and surgeries"
Yani neredeyse bir **veteriner kayıt sistemi**. Mağaza metni "50+ özellik ve entegrasyon"dan bahsediyor.

**🔴 Yoğunluğun bedeli — kullanıcı yorumları** `[DOĞRULANDI]`
> "It does seem a little difficult to maneuver through the app at times"
> (güncelleme sonrası) "SEND button is 'hidden' behind the virtual keyboard, with no possibility of scrolling the screen to reach the 'SEND' button."
> "the only user friendly free app"

İkinci alıntı somut bir layout hatası: **klavye açılınca ana eylem butonu erişilemez oluyor ve ekran kaydırılamıyor.** PatiNöbeti'nin her form ekranında test edilmesi gereken bir tuzak.

**Kişilik:** Klinik / kurumsal / ciddi. "En eksiksiz" iddiası görsel sadelikten önce geliyor.

---

## 5. PetDesk — *en net blok yapısı*

**Kaynak:** https://apps.apple.com/us/app/petdesk/id631377773

**Mağaza kimliği** `[DOĞRULANDI]`
- Alt başlık: **`"Healthy pets, happy humans."`** — dört kelime, ritimli, hem hayvanı hem sahibini kapsıyor. Sektördeki en iyi alt başlık.
- Kategori: Lifestyle · Boyut: 39.3 MB · **IAP yok** (B2B2C: klinikler ödüyor)

**Ana ekran blok yapısı** `[ÇIKARIM — mağaza metnindeki büyük harfli başlıklardan]`
Tanım metni tam **5 büyük harfli blok** ile yazılmış:
1. `APPOINTMENTS` — "24/7 appointment request tool"
2. `REMINDERS, MESSAGES AND TO DO'S`
3. `PROVIDERS` — veteriner, kuaför, pansiyon, kreş
4. `LOYALTY` — harcama başına puan
5. `MEDICATION REQUESTS`

Mağaza metninin blok yapısı genelde uygulamanın bilgi mimarisini yansıtır `[ÇIKARIM]`. 5 blok = 5 kart/sekme.

**Kullanıcı yorumları** `[DOĞRULANDI]`
> "the app is very easy to navigate, very user friendly." (JacyBates, 11/09/2020)
> "I like that you can schedule appointments and have an easy place to organize most of your pet's information." (RagenS1, 04/20/2018)

**Renk / tipografi / ikonografi** `[BULUNAMADI]` — PetDesk'in kendi bloğunda veteriner pazarlamasında renk psikolojisi yazısı var (https://petdesk.com/blog/the-psychology-of-color-in-veterinary-marketing) ama kendi marka renklerini açıklamıyor.

**Kişilik:** Klinik-yakını, güven odaklı, ama alt başlıkta insani sıcaklık. "Healthy pets, happy humans" tam olarak **klinik ile neşeli arasındaki denge noktası**.

---

## 6. Rover — *ikonografi hatasının ders kitabı örneği*

**Kaynak:** https://apps.apple.com/us/app/rover-pet-sitters/id547320928

**Mağaza kimliği** `[DOĞRULANDI]`
- Alt başlık: `"Personalized care for your pet"`
- Kategori: **Travel** (!) — bakım değil, seyahat. Konumlandırma: "sen yokken".

**Görsel vaat** `[DOĞRULANDI]`
> "video and photo updates about your pet, so you'll always know how things are going"
> "detailed walk reports via report cards, which include GPS routes, walk details"

→ Ürünün görsel çekirdeği **fotoğraf + harita rotası**. Hayvanın fotoğrafı burada dekor değil, **ürünün teslim edilen değeri**.

**🔴 KRİTİK BULGU — etiketsiz ikon** `[DOĞRULANDI]`
"Great service, terrible app" başlıklı yorum:
> "The icon on the top left that you click to switch between 'Past/Archived' and 'Pending/Upcoming' doesn't make any sense!"

Yani milyar dolarlık bir üründe bile, **iki durum arasında geçiş yapan etiketsiz bir ikon** kullanıcıyı kilitliyor. "Geçmiş / Yaklaşan" ayrımı PatiNöbeti'nde de olacak. Ders: bu ayrım **ikonla değil, metinli segment kontrolüyle** yapılmalı.

**Marka rengi** `[ÇIKARIM — düşük güven]`
Bir UX vaka çalışması özetinde (Ana Fermin, Medium) şu iddia geçiyor: *"the brand, Rover, clearly represented by a green logo, was not cohesively maintained across the website or app."*
→ Rover'ın marka rengi **yeşil**; ve eleştiri, yeşilin web ile uygulama arasında tutarlı taşınmadığı yönünde.
**UYARI:** Bu, arama sonucu özetinden alınmıştır; makale sayfası çekilemedi (403). Doğrulanmadı.
Hex kodu `[BULUNAMADI]` — arama "Land Rover" sonuçlarıyla kirlendi, Rover.com'un kendisi 403 verdi. **Hex uydurulmadı.**

**Tipografi / ikon seti / boş durum** `[BULUNAMADI]`

**Kişilik:** Sıcak, komşuluk hissi, fotoğraf odaklı. Bir yorum tonu iyi özetliyor: `"Like Airbnb for dogs!"`

---

## 7. Wag! — *duyusal geri bildirimin uç örneği*

**Kaynak:** https://apps.apple.com/us/app/wag-dog-walkers-sitters/id940734609

**Mağaza kimliği** `[DOĞRULANDI]`
- Alt başlık: `"Book trusted pet care services"`
- Kategori: Travel · IAP yok

**Görsel/etkileşim vaadi** `[DOĞRULANDI]`
> "Wag! dog-walks are GPS-tracked in the app so you can follow along in real-time."
> "Receive live pee & poop notifications and a detailed report card at the end of every booking."

**"pee & poop notifications"** — yani çiş/kaka bile **gerçek zamanlı bildirim** olarak gönderiliyor. Bakım eylemi = anlık olay.

**🔴 KRİTİK BULGU — ses geri bildirimi marka oluyor** `[DOĞRULANDI]`
Kullanıcı yorumu (RC27372, 2017):
> "I use this app every day. This is the best app if you have a dog... **My favorite is the noises when dog poops.**"

Bir kullanıcının, bir uygulamada **en sevdiği şeyin bir ses efekti** olması çok nadir. Kaka bildirimine ses efekti koymak, sıradan bir olayı **anıya** çeviriyor.
PatiNöbeti için: "mama verildi" onayına küçük bir ses/haptik imza → tekrarlayan görevi ödüle çevirir.

**Negatif** `[DOĞRULANDI]` (skeqp, 2025)
> "App very glitchy... scheduling was nearly impossible... The problems arose from the app freezing several times which required me to re-enter all of my personal details"

**Renk / tipografi / boş durum** `[BULUNAMADI]`

**Kişilik:** Enerjik, oyuncu, "on-demand" aciliyeti. Ses efektleri ve çiş/kaka dilini utanmadan kullanıyor.

---

## 8. Tractive — *hiyerarşisini alt başlıkta ilan ediyor*

**Kaynak:** https://apps.apple.com/us/app/tractive-gps-for-dogs-and-cats/id921588809 · https://tractive.com/en · https://play.google.com/store/apps/details?id=com.tractive.android.gps

**🔴 Mağaza alt başlığı** `[DOĞRULANDI]`
> **`"Location. Health. Activity."`**

Üç kelime, üç nokta. Bu bir slogan değil — **bilgi mimarisinin kendisi**. Kullanıcı daha uygulamayı indirmeden ana ekranda kaç blok olduğunu ve hangi sırada olduğunu biliyor. Alt başlık = hiyerarşi sözleşmesi.

**Ana ekran** `[ÇIKARIM]`
Harita birinci, sağlık ikinci, aktivite üçüncü `[ÇIKARIM — alt başlık sırasından ve özellik metninden]`.
Mağaza metni: `"brings all your pet's location and health data from their tracker into one easy-to-use app"`
Özellikler: LIVE Tracking (birkaç saniyede bir güncelleme), Virtual Fences, Activity, Sleep, Resting Heart Rate, Resting Respiratory Rate, Bark, Separation Anxiety, Scratch, Danger Reports.

**Renk stratejisi** `[ÇIKARIM]`
- Marka rengi: **mavi** (Tractive Blue logo) `[ÇIKARIM — hex BULUNAMADI]`
- Aksan: **turuncu** belirgin şekilde kullanılıyor `[ÇIKARIM]`
- Donanım renkleri ayrı bir palet: mint yeşil, kahve, lavanta `[ÇIKARIM]`
→ Yani **marka rengi (mavi) ile ürün rengi (turuncu/donanım) ayrıştırılmış**.

**İkonografi & fotoğraf** `[ÇIKARIM]`
> Ağırlıklı **gerçek evcil hayvan fotoğrafı** — tracker takmış köpekler/kediler, doğal ortamda (suda, dışarıda, evde). **İllüstrasyon kullanılmıyor**; otantiklik görsel stratejinin merkezi.

Uygulama ekranları **gerçekçi cihaz mockup'ları** içinde, hayvanın yanında gösteriliyor — soyut özellik anlatımı yerine kullanım gösterimi `[ÇIKARIM]`.

**Kişilik** `[DOĞRULANDI — ton örneği]`
Oyuncu ama güven veren. Site metninden birebir: `"High-paw, you're in! 🙌"` (high-five → high-paw kelime oyunu + emoji).
Teknik özellikler klinik değil, sohbet dilinde anlatılıyor.

**Kullanıcı yorumları** `[DOĞRULANDI]`
> "The app is VERY user friendly." (GABuR_goO)
> "The GPS works great and is Very accurate!" (Go For Rusty!)

**Tipografi kademeleri / boş durum / paywall görseli** `[BULUNAMADI]`

---

## 9. Whistle — ⚠️ ARTIK İNCELENEBİLİR DEĞİL

**Kaynak:** https://www.engadget.com/wearables/whistle-pet-trackers-are-shutting-down-next-month-212828325.html

`[DOĞRULANDI]`
- Tractive, Whistle'ı (Mars iştiraki) satın aldı — **duyuru 28 Temmuz 2025**.
- Whistle tracker'ları **31 Ağustos 2025**'te çalışmayı durdurdu.
- Tractive, Whistle'ın backend altyapısını desteklemeyeceğini açıkladı → **uygulamaya bağlı tüm özellikler kapandı**.
- Kullanıcılar 30 Eylül 2025'e kadar değişim tracker'ı talep edebildi.

**Sonuç:** Whistle'ın güncel görsel dili incelenemez. Bugün bulunan "Whistle incelemesi" içerikleri arşiv niteliğindedir ve canlı ürün tasarımı olarak referans alınmamalıdır.
Kıyaslama listesinden **çıkarılmalı**; yerine DogNote ve PawLog konuldu (zaten PatiNöbeti'ye çok daha yakınlar).

---

## 10. Pawp — *kendini "Medical" kategorisine koyan uygulama*

**Kaynak:** https://apps.apple.com/us/app/pawp-24-7-vet-pet-care/id1594794194

**Mağaza kimliği** `[DOĞRULANDI]`
- Alt başlık: `"Live vet support by text/video"`
- **Kategori: Medical** — incelenen uygulamalar içinde tek "Medical". 11pets "Health & Fitness", diğerleri "Lifestyle"/"Travel".
- IAP listelenmemiş (üyelik web'den alınıyor). Fiyat **$19/ay** olarak ikincil kaynaklarda geçiyor (money.com, usnews.com) `[DOĞRULANDI — ikincil kaynak]`.

**Ton** `[DOĞRULANDI]`
> "Pawp is a modern vet clinic that puts an expert in your back pocket so you're never alone when it comes to your pet's health."
> "Pawp's care team uses **empathy and expertise**..."
> "Get a **second opinion that isn't the search engine**."

Son cümle çok iyi: rakibi Google aramasının kendisi olarak konumlandırıyor.

**Ana ekran** `[ÇIKARIM]`
Sohbet/görüntülü görüşme merkezli. Mağaza metni tam 4 blok: `CONNECT WITH A VET 24/7`, `GET UNLIMITED APPOINTMENTS`, `ASK A VET ANYTHING`, `GET PERSONALIZED & ACTIONABLE PLANS`.

**🔴 Negatif bulgu** `[DOĞRULANDI]`
> "The app itself is also confusing to navigate on how to speak to a vet, very limited on settings"

Ana eylemi (vetle konuşmak) olan bir uygulamada kullanıcı ana eylemi bulamıyor. **Tek işi olan ürünler, o tek işi ekranın en büyük öğesi yapmalı.**

**Renk / tipografi / boş durum** `[BULUNAMADI]`

**Kişilik:** Sakin-klinik ama empatik. "modern vet clinic" ifadesi tonun özeti: tıbbi güven + modern yumuşaklık.

---

## 11. TÜRKİYE — Yerel muadiller

### 11a. PetRoutine: Aşı Takip Asistanı `[DOĞRULANDI]`
**Kaynak:** https://apps.apple.com/tr/app/petroutine-aşı-takip-asistanı/id6751641467

- Alt başlık: `"Randevu takibini kolaylaştır"`
- Kategori: Yaşam Tarzı · Geliştirici: Hasan Can bakkalar · Yayın: **28.10.2025** (çok yeni, v1.0.1)
- **🔴 FİYAT ÇIPASI:** `Pro Aylık: ₺129,99` · `Pro Yıllık: ₺899,99`
  → Türkiye pazarında bir bakım takip uygulamasının kabul gören fiyat aralığı bu. Yıllık/aylık oranı ≈ 5.8 ay (yani yıllığa geçiş güçlü indirimli).
- Tanımda görsel dile dair birebir ifade: `"Akıllı takvim sistemi, otomatik hatırlatıcılar ve sade arayüzü sayesinde..."`
  → **"sade arayüz"** bir pazarlama argümanı olarak öne çıkarılıyor. TR pazarında sadelik satıyor.
- Özellik blokları: Takvim ile Kolay Takip, Otomatik Aşı Hatırlatıcısı, Randevu Yönetimi, Kişiselleştirilmiş Profil Deneyimi, Akıllı Bildirim Sistemi (5 blok)
- Kullanıcı yorumları: `"Eğlenceli ve oldukça kullanışlı bir uygulama"` · `"Kedimin aşı takvimini daha rahat takip edebiliyorum"` · `"Harika bir uygulama büyük kolaylık"`
- Renk/tipografi/ikon `[BULUNAMADI]`

### 11b. Pet Takip `[DOĞRULANDI]`
**Kaynak:** https://pettakip.app/

- **Görsel strateji: tamamen illüstrasyon (vektör), fotoğraf yok** `[ÇIKARIM — site içeriğinden]`
  Örnek görsel adları: "Kedi, köpek, kuş aşı ve sağlık profili mobil ekranı", "Veteriner onaylı 26 farklı karma ve kuduz aşı protokolü otomatik hesaplama listesi"
- **Yoğun emoji kullanımı:** 🐱 🔔 📍 🩺 ☁️ 🛡️ `[ÇIKARIM]`
  → TR pazarında emoji, ikon setinin yerini tutuyor. Ucuz ama sıcak.
- Onboarding kurgusu: **`"3 Adımda Kolay Takip"`** → 1) Profil oluştur 2) Takvim seç 3) Bildirim al. Her adımda illüstrasyon.
- Yerelleşme argümanı: `"Karma, kuduz, Bordetella, Lyme, Leishmania, Coronavirus — TR vet standartlarında aşı takvimi"` ve `"tek dokunuşla sonraki tarih hesaplanır"`
- **Fiyat:** `"Evet. Pet Takip tamamen ücretsizdir, reklam içermez ve hekim portalı veterinerler için de ücretsizdir."`
  → Ücretsiz + reklamsız. PetRoutine'in ₺129,99/ay'ına karşı sert bir rekabet baskısı.
- Minimalist, modern sans-serif `[ÇIKARIM]`. Marka rengi `[BULUNAMADI]`.

### 11c. Diğer TR uygulamaları `[DOĞRULANDI — varlık düzeyinde]`
- **Pati Aşı Takip** — https://play.google.com/store/apps/details?id=com.tahir.patiasitakip — Karma, Kuduz, Lösemi, İç/Dış Parazit takibi.
- **CanDostum: Takip ve Hatırlatıcı** — https://play.google.com/store/apps/details?id=com.turanpetracker.petrackerapp
- **ePetim** — https://epetim.com/ — "dijital kimlik" konumlandırması.
- **Furli** — https://furli.app/ — "Aşı Takvimi & AI".
- **Petinoks** — https://petinoks.app/ — ⚠️ **Aslında bir PET TAKSİ / hizmet uygulaması**, bakım günlüğü değil. Başlık: "Patili Dostunuz İçin Güvenli Pet Taksi" (İstanbul). Logo **turuncu + beyaz** `[ÇIKARIM]`; illüstrasyon + hayvan fotoğrafı karışık. Kıyaslama için **uygun değil**, listeden düşürüldü.
- **Veterian / eveterinerim.com** — klinik tarafı B2B.

**🔴 TR pazarı için en kritik boşluk:** İncelenen TR uygulamalarının **hiçbiri "çok bakıcılı paylaşımlı günlük"** konumlandırmasında değil. Hepsi **tek sahipli aşı/randevu hatırlatıcısı**. PatiNöbeti'nin "kim yaptı" ekseni TR'de boş. `[ÇIKARIM — 6 uygulamanın tanım metinlerinden]`

---

## ÖZET TABLO

| Uygulama | Kategori | Ana ekran ekseni | Renk stratejisi | Fotoğraf/İllüstrasyon | Kişilik |
|---|---|---|---|---|---|
| PawLog | — | Paylaşılan akış (saat+fiil+kişi) | `[BULUNAMADI]` | Yaşam tarzı fotoğrafı | Dürüst, sakin |
| DogNote | Lifestyle | Aktivite akışı + üye filtresi | Dark+light mod `[D]` | Gerçek arayüz görseli | Modern, araçsal |
| DogLog | Lifestyle | Akış + sosyal (like/comment) | Kırmızı/beyaz `[Ç]`, renk=aktivite ❌ | Material ikon `[Ç]` | Fonksiyonel, eski |
| 11pets | Health & Fitness | Yoğun tıbbi kayıt | Beyaz + mavi `[Ç]` | Stok fotoğraf + SVG ikon | Klinik, kurumsal |
| PetDesk | Lifestyle | 5 blok (randevu/hatırlatma/sağlayıcı/sadakat/ilaç) | `[BULUNAMADI]` | `[BULUNAMADI]` | Klinik + sıcak |
| Rover | Travel | Fotoğraf + harita rotası | Yeşil `[Ç] düşük güven` | Hayvan fotoğrafı merkezde | Sıcak, komşuluk |
| Wag! | Travel | Canlı GPS + report card | `[BULUNAMADI]` | `[BULUNAMADI]` | Enerjik, oyuncu (ses!) |
| Tractive | Lifestyle | Harita → Sağlık → Aktivite | Mavi marka + turuncu aksan `[Ç]` | **Sadece gerçek fotoğraf** | Oyuncu + güvenilir |
| Pawp | **Medical** | Sohbet/video | `[BULUNAMADI]` | `[BULUNAMADI]` | Empatik-klinik |
| PetRoutine (TR) | Yaşam Tarzı | Takvim | `[BULUNAMADI]` | `[BULUNAMADI]` | "Sade arayüz" |
| Pet Takip (TR) | — | 3 adımlı onboarding | `[BULUNAMADI]` | **Tamamen illüstrasyon + emoji** `[Ç]` | Sıcak, yerel |

`[D]` = Doğrulandı · `[Ç]` = Çıkarım

---

## PATİNÖBETİ'YE UYGULANABİLİR 8 SOMUT GÖRSEL DERS

1. **Akış satırının grameri `SAAT → FİİL → KİŞİ` olsun ve üçü de tek satırda okunsun** — PawLog'un demo satırı birebir bu: `"8:02 AM Walked Sam"`, yani ürünün tüm vaadi bir satıra sığdırılmış. *(PawLog)*

2. **Rengi aktivite tipine değil KİŞİYE ayır; aktiviteyi ikonla, kişiyi renkle göster** — DogLog kullanıcısı tam olarak bunu istiyor: *"it would be great to have the activities on the main feed highlighted differently... or even just the names show up in different colors"*, çünkü "ne yapıldı" zaten metinde yazıyor, çözülmemiş ayrım "kim yaptı". *(DogLog)*

3. **Mağaza alt başlığını üç kelimelik bir hiyerarşi sözleşmesi yap** — Tractive'in `"Location. Health. Activity."`ı ana ekranın blok sırasını indirmeden önce ilan ediyor; PatiNöbeti için karşılığı `"Kim. Ne. Ne zaman."` tarzı bir üçlü olabilir. *(Tractive)*

4. **Kaydı uygulamayı açmadan yapılabilir kıl: widget + Apple Watch + Siri kısayolu** — DogNote bunu birinci sınıf özellik olarak pazarlıyor (`"Quick logging: Add events using Apple Watch App, Siri Shortcuts, Widgets"`), çünkü mama veren kişinin elinde mama kabı var, telefon değil. *(DogNote)*

5. **Aile/ortak bakıcı paylaşımını asla paywall'un arkasına koyma; ücretsiz sınırı HAYVAN sayısıyla çiz** — PawLog bunu marka vaadine çevirmiş (`"Family sharing is always free, on every plan."`, `"one dog free, the pack on Plus"`) ve rakiplerini tam bu noktadan vuruyor. *(PawLog)*

6. **"Geçmiş / Yaklaşan" gibi durum geçişlerini etiketsiz ikonla yapma, metinli segment kontrolü kullan** — Rover'da bu tek ikon kullanıcıyı kilitliyor: *"The icon on the top left that you click to switch between 'Past/Archived' and 'Pending/Upcoming' doesn't make any sense!"* *(Rover)*

7. **Kayıt onayına küçük bir ses + haptik imza koy; tekrarlayan görevi ödüle çevirir** — Wag! kullanıcısının uygulamada en sevdiği şey bir ses efekti: *"My favorite is the noises when dog poops."* *(Wag!)*

8. **Boş durum ve hero görselinde mutlu hayvan değil, PROBLEMİN kendisini göster** — PawLog'un yaşam tarzı fotoğrafı *"a dog waiting patiently beside an empty bowl in a sunlit kitchen"*, yani "acaba mamasını verdiler mi?" suçluluğunu doğrudan görselleştiriyor. *(PawLog)*

### Bonus — kaçınılacak 3 somut tuzak
- **Klavye açılınca ana eylem butonu erişilemez olmasın ve ekran kaydırılabilsin** — 11pets yorumu: *"SEND button is 'hidden' behind the virtual keyboard, with no possibility of scrolling"*. *(11pets)*
- **Tek işi olan ekranda o iş en büyük öğe olsun** — Pawp'ta ana eylem vetle konuşmak ama yorum: *"confusing to navigate on how to speak to a vet"*. *(Pawp)*
- **Bakım günlüğünü sosyal akışa çevirme (like/comment), gürültü yaratır** — DogLog'un `"Like & Comment"` katmanı bakım kaydının operasyonel netliğini bulandırma riski taşıyor `[ÇIKARIM]`. *(DogLog)*

### TR'ye özel 2 not
- **Fiyat çıpası:** PetRoutine `₺129,99/ay` – `₺899,99/yıl`; ama Pet Takip **tamamen ücretsiz ve reklamsız**. PatiNöbeti ücretli katmanı "kim yaptı" değerinin üzerine kurmalı, aşı hatırlatıcısının üzerine değil. `[DOĞRULANDI]`
- **Boş pazar konumu:** İncelenen TR uygulamalarının hiçbiri çok-bakıcılı paylaşımlı günlük değil; hepsi tek sahipli aşı/randevu hatırlatıcısı. `[ÇIKARIM]`

---

## SONRAKİ ADIMDA ELLE DOĞRULANMASI GEREKENLER

Bu rapor metin kaynaklıdır. Aşağıdakiler **cihazda/ekran görüntüsüyle** doğrulanmalı:
1. Tüm uygulamaların **boş durum (empty state)** ekranları — hiçbiri için kaynak bulunamadı, en büyük boşluk bu.
2. Renk hex kodları (özellikle Rover yeşili, Tractive mavisi, DogLog kırmızısı).
3. Tipografi kademe sayıları ve özel font kullanımı — **hiçbir uygulama için bulunamadı**.
4. Paywall ekranlarının görsel dili (PawLog ve PetRoutine hariç fiyat metinleri var, görsel kurgu yok).
5. Haptik/animasyon geri bildirimi — sadece Wag!'ın ses efekti dolaylı olarak doğrulandı.
6. İlk kullanım (onboarding) akışları — sadece Pet Takip'in "3 Adımda Kolay Takip" kurgusu bulundu.

## KAYNAKLAR
- 11pets: https://apps.apple.com/us/app/11pets-pet-care/id1232470530 · https://11pets.com/
- PetDesk: https://apps.apple.com/us/app/petdesk/id631377773
- Rover: https://apps.apple.com/us/app/rover-pet-sitters/id547320928
- Wag!: https://apps.apple.com/us/app/wag-dog-walkers-sitters/id940734609
- Tractive: https://apps.apple.com/us/app/tractive-gps-for-dogs-and-cats/id921588809 · https://tractive.com/en
- Whistle kapanışı: https://www.engadget.com/wearables/whistle-pet-trackers-are-shutting-down-next-month-212828325.html
- Pawp: https://apps.apple.com/us/app/pawp-24-7-vet-pet-care/id1594794194
- DogLog: https://apps.apple.com/us/app/doglog-track-your-dogs-life/id1229529595 · https://www.doglogapp.com/
- PawLog: https://www.pawlog.pet/ · https://www.pawlog.pet/compare/shared-dog-care-apps
- DogNote: https://apps.apple.com/us/app/dognote-pet-journal-walks/id1527756855 · https://dognote.app/
- PetRoutine (TR): https://apps.apple.com/tr/app/petroutine-aşı-takip-asistanı/id6751641467
- Pet Takip (TR): https://pettakip.app/
- Pati Aşı Takip (TR): https://play.google.com/store/apps/details?id=com.tahir.patiasitakip
- CanDostum (TR): https://play.google.com/store/apps/details?id=com.turanpetracker.petrackerapp
- Petinoks (TR, pet taksi): https://petinoks.app/
