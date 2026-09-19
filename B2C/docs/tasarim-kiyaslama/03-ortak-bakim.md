# 03 — Ortak Bakım / Hane Koordinasyonu & Bebek Bakım Günlüğü: Görsel Tasarım Kıyaslaması

**Kapsam:** PatiNöbeti'nin çekirdek problemi olan *"kim yaptı, ne zaman yaptı, sıra kimde"* sorusunu görsel olarak çözmüş uygulamalar.
**Tarih:** 19 Eylül 2026
**Yöntem:** Web araştırması (App Store / Google Play listeleri, resmi siteler, tasarım vaka çalışmaları, UI breakdown siteleri, inceleme yazıları). Ekran görüntüleri görülmedi — bu yüzden her madde **[D] = doğrulandı (kaynaklı)** veya **[Ç] = çıkarım** olarak işaretlendi.

> ⚠️ **Metodolojik uyarı:** Bu dokümandaki tüm görsel bilgiler metin kaynaklarından türetilmiştir. Renk kodları (hex), tipografi ailesi, spacing değerleri gibi ölçülebilir görsel detaylar hiçbir kaynakta yayımlanmamıştır. Uygulamaya karar vermeden önce en az 3 uygulamanın gerçek ekran görüntüleriyle doğrulama yapılması önerilir.

---

## İncelenen uygulamalar

| # | Uygulama | Kategori | Bize en güçlü katkısı |
|---|----------|----------|----------------------|
| 1 | Huckleberry | Bebek bakım günlüğü | Gece modu ve "ikinci beyin" tonu |
| 2 | Nara Baby | Bebek bakım günlüğü | Katmanlı kart + renk/illüstrasyon ile aktivite ayrımı |
| 3 | Baby Daybook | Bebek bakım günlüğü | Bugün-zaman çizelgesi + hızlı kayıt aynı ekranda |
| 4 | Glow Baby | Bebek bakım günlüğü | Kronolojik timeline + bağlama duyarlı giriş bileşenleri |
| 5 | Cozi Family Organizer | Hane koordinasyonu | **Kişi = renk** sisteminin en olgun örneği |
| 6 | OurHome | Hane koordinasyonu | Oyunlaştırma — ve yetişkinler arası adalette başarısızlığı |
| 7 | Tody | Hane koordinasyonu | **FairShare** — suçlamayan adalet göstergesinin en iyi örneği |
| 8 | Maple | Hane koordinasyonu | "Zihinsel yük" çerçevelemesi ve Rutinler |
| 9 | **Pebbi** *(bonus — ortak bakım odaklı)* | Bebek bakım günlüğü | **QR ile davet** + **Catch-up (devir özeti)** |
| 10 | **NextSip** *(bonus — çakışma çözümü)* | Bebek bakım günlüğü | **Otomatik çift kayıt birleştirme** |

---

## 1. Huckleberry

**Kim yaptı bilgisi:**
[D] Çoklu bakıcı desteği var — "cross-device syncing", "add a caregiver" özelliği mevcut ([The Mother Network](https://www.themothernetwork.com/mother-resources/huckleberry)).
[D] **Kritik zayıflık:** Pebbi'nin karşılaştırmasına göre Huckleberry "partnerinize kendi hesabıyla davet göndermek yerine hesap giriş bilgilerinizi vermenizi gerektiriyor" — bu ayrı hesap olmadığı için **kayıt bazında atıf (attribution) mümkün değil** ([Pebbi karşılaştırma](https://pebbi.co/blog/best-baby-tracker-apps-2026)).
[Ç] Dolayısıyla timeline'da avatar/isim etiketi taşıyan bir atıf sistemi büyük ihtimalle yok.

**Zaman çizelgesi:**
[D] Özelleştirilebilir widget'lı bir ana ekran ("users can easily customize which tracking widgets appear") + Summary sekmesinde "clear, easy-to-read graphs and averages" ([screensdesign UI breakdown](https://screensdesign.com/showcase/huckleberry-baby-child)).
[D] Haftalık özet ("weekly summary") 7 günlük trendleri temiz bir görünümde sunuyor ([Huckleberry resmi](https://explore.huckleberrycare.com/app/)).
[D] Lock screen'de Live Activities ve Widget'lar — devam eden aktivite telefonu açmadan görünüyor ([The Mother Network](https://www.themothernetwork.com/mother-resources/huckleberry)).

**Devir/nöbet:** [D] Doğrudan bir "sıra kimde" göstergesi kaynaklarda bulunamadı. SweetSpot® *zamanı* tahmin ediyor, *kişiyi* değil.

**Adalet göstergesi:** [D] Yok. Kaynaklarda kişi bazlı katkı istatistiği geçmiyor.

**Çakışma:** [D] Bilgi bulunamadı. [Ç] Paylaşılan tek hesap modeli olduğu için çift kayıt riski yüksek — nitekim genel sektör analizi "iki kişinin tek hesaba iki telefondan girmesi çift kayıt üretir" diyor ([pixykid/Pebbi bulgusu](https://pebbi.co/blog/how-to-share-baby-tracker-with-partner)).

**Renk/tipografi/kişilik:**
[D] **Gece modu (dark mode)** var ve bu bilinçli bir karar: "many loggings are done at night, when baby is nursing or sleeping" ([The Mother Network](https://www.themothernetwork.com/mother-resources/huckleberry)).
[D] Tek elle kullanım için tasarlanmış: "easy logging on the go, even when juggling a baby in the other arm."
[D] Ton: uzman + güven veren. Kendini "second brain" olarak konumlandırıp "mental load of parenthood"ı azalttığını söylüyor ([Huckleberry resmi](https://explore.huckleberrycare.com/app/)).

**Boş durum / ilk kurulum:**
[D] **18 adımlık onboarding** + "extremely long" bir onboarding sonrası anket. Ama akıllı bir karar var: temel uyku bilgisiyle başlayıp **anında değer** üretiyor ([screensdesign](https://screensdesign.com/showcase/huckleberry-baby-child)).
[D] Ana ekranda özellik tanıtımı için "a sequence of pop-ups" ve bağlamsal tooltip'ler.
[D] **Eleştiri:** "initial onboarding, while functional, feels a bit dated in its visual design compared to the polished main app" — yani onboarding ile ana ürün arasında görsel dil kopukluğu var. **Bizim için ders: kaçınılacak hata.**

**Bildirim:** [D] Beslenme ve uyku için hatırlatmalar ("helpful notifications") + SweetSpot uyarı tabanlı planlama.

---

## 2. Nara Baby

**Kim yaptı bilgisi:**
[D] "Family" sekmesi üzerinden e-posta ile davet; davet edilen kişi **kendi hesabını** oluşturuyor ([Nara resmi FAQ](https://nara.com/pages/nara-baby-app-faqs)).
[D] Yetki modeli düz: "Once you add someone to your family, they have 100% full access in the app the same way that you do." Rol hiyerarşisi yok.
[D] **Kayıt bazında kimin girdiği gösteriliyor mu, resmi FAQ'da belirtilmiyor.** [Ç] Görsel atıf muhtemelen zayıf veya yok.

**Zaman çizelgesi:**
[D] **"Layered card" (katmanlı kart) konsepti** — kullanıcı "aktivite sekmesinden çıkmadan birden fazla veri tipini hızlıca girip geri alabiliyor" ([Everyday Industries vaka çalışması](https://everydayindustries.com/casestudy/mobile-app-ui-design-case-study/)).
[D] History sekmesi: **son bir haftanın renk kodlu grafiği** ("a color-coded chart of all activities tracked over the past week").
[D] Trends: üç görünüm — grafik, takvim, detaylı kayıt listesi.
[D] Uygulama içinde 14 günlük trend sınırı var; daha geriye gitmek için dışa aktarım gerekiyor ([Nara FAQ](https://nara.com/pages/nara-baby-app-faqs)).

**Devir/nöbet:** [D] Yok.

**Adalet göstergesi:** [D] Yok.

**Çakışma:** [D] Bilgi bulunamadı.

**Renk/tipografi/ikon — en zengin kaynak burada:**
[D] "A vibrant color palette for light and dark mode" — ve bu palet açıkça **uykusuz ebeveynin gece erişilebilirliği** için optimize edilmiş.
[D] "A simple typography hierarchy" — hedef: **taranabilirlik** ("easy to scan"), okunabilirlik değil. Yorgun kullanıcı bilgiyi *arıyor*, *okumuyor*.
[D] **"Playful illustrations"** her aktivite tipini ayırt ediyor. Kritik cümle: *"Color and illustrations distinguish different activity types throughout the app, helping tired parents quickly locate and review the information they've added."* → **Renk + illüstrasyon = çift kodlama**, tek başına renge güvenilmiyor.
[D] "Easy-to-tap buttons and large inputs that quickly expand" — büyük dokunma hedefleri.
[D] Ton: kart tabanlı arayüz "karmaşık takip görevlerini sezgisel bir deneyime indirgiyor."
[D] Kullanıcı algısı: "simple, well designed, and functional"; başka bir kaynak "calm and operational" diyor ([BabyLog karşılaştırma](https://babylog.com.au/blog/babylog-vs-nara-baby)).
[D] Metrik: 2019'dan beri **günlük ortalama 20 dakika** etkileşim — yani bu görsel dil gerçekten yapışıyor.

**Boş durum / davet:** [D] Vaka çalışması bu ekranları belgelemiyor. Davet akışı e-posta tabanlı (yukarıda).

**Bildirim:** [D] "The app sends notifications throughout the day when it's time to start each nap" — gün içine yayılmış uyku hatırlatmaları.

---

## 3. Baby Daybook

**Kim yaptı bilgisi:**
[D] "Family sync" ile partner, büyükanne/baba veya bakıcı ile paylaşım; "Many caregivers can enter data and everyone will see what is going on in real time" ([Baby Daybook resmi](https://babydaybook.app/)).
[D] **Ayrı bakıcı profilleri oluşturulabiliyor**; ana hesap sahibi ayarları kontrol ediyor, ek bakıcı profilleri veri girip logları görebiliyor ([Parenting Hack incelemesi](https://parentinghack.substack.com/p/review-newborn-tracking-app-baby)).
[D] Bağlı bakıcılar Premium özelliklerine de erişiyor — **ayrı satın alma gerekmiyor**. (Davet sürtünmesini azaltan iş modeli kararı; bizim için de geçerli.)
[Ç] Kayıt bazında avatar/isim etiketi olup olmadığı hiçbir kaynakta doğrulanamadı.

**Zaman çizelgesi:**
[D] **"Agenda benzeri grafik" formatı** — "what your child is doing at all hours of the day", günler yan yana karşılaştırılabiliyor ("see each day's activities side by side") ([Parenting Hack](https://parentinghack.substack.com/p/review-newborn-tracking-app-baby)).
[D] **Tek ekran prensibi:** "favorite trackers, today's timeline, and quick logging all on the same screen" — geçmişi kontrol etme, desen inceleme ve yeni kayıt aynı yerde ([Pebbi karşılaştırma](https://pebbi.co/blog/best-baby-tracker-apps-2026)).

**Devir/nöbet:** [D] Yok.
**Adalet göstergesi:** [D] Yok.
**Çakışma:** [D] Bilgi bulunamadı.

**Renk/tipografi/ikon:**
[D] Her aktivite tipi için **özel çizilmiş ikonlar** (beslenme, uyku, bez, büyüme, diş takibi) ([Baby Daybook resmi](https://babydaybook.app/)).
[D] Temiz, modern estetik; ebeveyn+bebek yaşam tarzı fotoğrafları pazarlamada kullanılıyor.
[D] Ton: **stres azaltıcı** ("Say goodbye to the stress") ve basitlik odaklı ("just a few taps"). Klinik değil, destekleyici.
[D] Estetik olarak "deliberately minimal" ve "fast learning curve" ([Pebbi](https://pebbi.co/blog/best-baby-tracker-apps-2026)).

**⚠️ En önemli görsel eleştiri:**
[D] "**Bright orange banner-style ads on every non-logging page**" — ücretsiz sürümde her kayıt dışı sayfada parlak turuncu premium banner'ları var. İnceleme yazarı bunları "annoying" ve "intrusive" buluyor ([Parenting Hack](https://parentinghack.substack.com/p/review-newborn-tracking-app-baby)). **Bizim için ders: sakin bir ürünün içine agresif renkte bir upsell koymak, kurulan tüm güveni bozar.**

**Bildirim:**
[D] Akıllı hatırlatmalar (beslenme, randevu), **Android sticky notification** (kilit ekranından erişim), Apple Watch, ana ekran ve kilit ekranı widget'ları.

---

## 4. Glow Baby

**Kim yaptı bilgisi:**
[D] Çoklu bakıcı destekleniyor, "accommodating multiple caregivers who can log activities seamlessly."
[D] Ama Pebbi'nin analizi: "doesn't emphasize multi-caregiver coordination as a core function" — koordinasyon çekirdek değil, yan özellik.

**Zaman çizelgesi:**
[D] Ana dashboard **"chronological timeline"** düzeni kullanıyor, desen tanıma için "at-a-glance" tasarlanmış ([screensdesign UI breakdown](https://screensdesign.com/showcase/glow-baby-tracker-growth-app)).
[D] "Baby Timeline" tüm verileri tek yerde toplar, **14 log tipi**.
[D] Aktiviteler farklı renklerle ve günlük grafik üzerinde gösteriliyor.
[D] Grafikler **pinch-to-zoom** ve **tap-for-details** destekliyor — interaktif veri görselleştirme.

**Bağlama duyarlı giriş bileşenleri (çok öğretici):**
[D] Emzirme kayıtlarında **sol/sağ ayrı zamanlayıcılar**; formül kaydında **görsel biberon slider'ı**; katı gıdada reaksiyon takipli geniş yiyecek kütüphanesi. Yani **her aktivite tipi kendi giriş metaforunu alıyor**, jenerik form yok.

**Devir/nöbet:** [D] Yok.
**Adalet göstergesi:** [D] Yok. Bunun yerine **Glow kullanıcı popülasyonuyla karşılaştırma** yapıyor: "Insights screens often compare" bebeğin metriklerini genel ortalamalarla. Bu, *kişiler arası* değil *dış norma karşı* kıyaslama — suçlayıcılığı dışarı taşıyan ilginç bir hamle.
**Çakışma:** [D] Bilgi bulunamadı.

**Boş durum / ilk kurulum — kaçınılacak örnek:**
[D] "Coachmarked onboarding" (tooltip'lerle yönlendirme) var ama **zorunlu kayıt ve paywall ana uygulamadan önce geliyor** ve onboarding "quite long" — kaynak bunun "could deter some users" dediğini belirtiyor.
[D] Paywall tasarımı: **swipeable carousel** ile premium özellikler + yıllık indirim / 3 günlük deneme arasında geçiş yapan belirgin bir **toggle**.
[D] **Sistem bildirim izni istemi, açıklayıcı bir "warm-up" ekranı olmadan** gösteriliyor — kabul oranını düşüren klasik hata.

**Kişilik:** [Ç] Veri-odaklı, "meticulous" ebeveyn için; topluluk forumu entegre. Sakin değil, kapsamlı.

---

## 5. Cozi Family Organizer — *kişi = renk* sisteminin referansı

**Kim yaptı / kim ilgili bilgisi — bu kategorideki en olgun sistem:**
[D] **Her aile üyesine benzersiz bir renk atanıyor**, 12 üyeye kadar; her üyenin kendi adı ve rengi var ([Cozi resmi](https://www.cozi.com/getting-started-with-cozi-calendar/)).
[D] Görsel birim: **renk noktası (color dot) + isim**. "Each person's events will display with their name and color dot."
[D] **Birden fazla kişi dahilse:** çoklu isim ve renk noktası birlikte gösteriliyor.
[D] **Herkes dahilse:** özel bir **"All" (Hepsi) tanımı ve rengi** var. → Yani "ortak" da bir *kimlik*, atıfsızlık değil.
[D] Ay görünümünde renk noktaları "kimin nerede olacağını" bir bakışta veriyor.
[D] Renkler **Ayarlar'dan değiştirilebiliyor** — kişiselleştirme kullanıcıda.
[D] Hesap dışı doğum günleri **mavi** ile gösteriliyor — "sistem dışı" olaylar için ayrı bir renk kanalı ([Cozi mobil takvim yenilemesi](https://www.cozi.com/blog/mobile-month-makeover/)).

**Yoğunluk yönetimi (bizim timeline'ımız için doğrudan uygulanabilir):**
[D] Etkinlikte **ilk iki katılımcının renk noktası + "+" işareti** gösteriliyor, gerisi taşmıyor.
[D] Günde **en fazla 4 etkinlik** görünüyor; fazlası varsa **günün altında üç küçük mavi nokta** taşma göstergesi oluyor.
[D] Bir güne dokununca **yarım ekran pop-up** açılıp o günün tamamını kaydırmalı gösteriyor.

**Tipografi ve okunabilirlik kararı:**
[D] Yenilemede metin büyütüldü — resmi gerekçe: *"you'll squint less; we've made the text larger so it's easier to read."*
[D] **Aylar arasına boşluk eklendi** "so you can more clearly distinguish between them" → **zaman bloklarını boşlukla ayırma** kararı.
[D] Ay seçici artık ayın ilk haftasına konumlanıyor, böylece tüm ay ekranda.

**Devir/nöbet:** [D] Yok — Cozi bir takvim, nöbet devri kavramı içermiyor.
**Adalet göstergesi:** [D] Yok.
**Çakışma:** [D] Bilgi bulunamadı.

**Genel estetik — dürüst değerlendirme:**
[D] "Standard system components without much custom design flair"; "slightly dated" ([screensdesign](https://screensdesign.com/showcase/cozi-family-organizer)). **Sistem güçlü, kabuk zayıf.** Biz sistemi alıp kabuğu yenileyebiliriz.

**İlk kurulum / davet — çok öğretici:**
[D] **5 zorunlu adımlık** onboarding ve kritik karar: kullanıcıyı **aile üyesi eklemeye ve ilk etkinliği oluşturmaya zorluyor** ("forces users to add family members and a first event"). Yani ürün, *boş halde* asla görülmüyor.
[D] İlk eylemden sonra **"Hooray!" onay ekranı** — pozitif pekiştirme.
[D] Alışveriş listesinde: **büyük harfle yazmak otomatik kategori başlığı oluşturuyor** — "a smart, low-friction way to enable powerful organization." Gizli ama keşfedilebilir bir görsel kural.
[D] "Shopping Mode": tamamlananlar listenin **altına iniyor**, aktifler üstte kalıyor → görsel dağınıklık azalıyor.

---

## 6. OurHome — oyunlaştırmanın sınırı

**Kim yaptı bilgisi:**
[D] Her aile üyesi için **ayrı hesap/profil** oluşturulabiliyor (isim, e-posta) ([Little Day Out incelemesi](https://www.littledayout.com/parent-review-ourhome-app-for-home-organisation-and-behaviour-management/)).
[D] Görevler belirli kişilere atanabiliyor.
[Ç] Kaynaklarda avatar kullanımı doğrulanamadı — "colorful and engaging for children" ötesinde detay yok.

**Adalet göstergesi — puan ve liderlik tablosu:**
[D] Her göreve puan değeri atanıyor; zamanında tamamlayan puanı kazanıyor ve **ödül dükkanından** harcıyor.
[D] **Liderlik tablosu (leaderboard)** ile ilerleme görülüyor; **ilerleme çubukları (progress bars)** ve **ödül dükkanı** görevleri "bir emirden çok oyun gibi" hissettiriyor ([Homsy karşılaştırma](https://gethomsy.com/blog/comparisons/homsy-vs-ourhome)).

**⚠️ PatiNöbeti için en kritik uyarı — bu bulgu tasarım yönümüzü belirlemeli:**
[D] Homsy'nin analizi net: OurHome "primarily designed as a parent-to-child chore system" ve yetişkinler arasındaki **"invisible labor, the mental load, the uneven distribution of work"** sorununa **hiç değinmiyor**. Puan-ödül çerçevesi "**awkward in an adult-to-adult context**" — yetişkinden yetişkine bağlamda garip kaçıyor.
[D] Parlak, çocuğa dönük estetik "roughly five to twelve" yaş için çalışıyor ama diğer hane üyeleri için sınırlayıcı.

→ **Ders:** İki yetişkin ev arkadaşı / çift arasında **puan ve liderlik tablosu kullanmamalıyız.** Rekabet metaforu yetişkinler arası bakım paylaşımında güveni zedeliyor. (Tody'nin çözümüne bakınız.)

**Zaman çizelgesi:** [D] Takvim + görev listesi; tekrar eden programlar, son tarihler, geç kalma cezaları.
**Devir/nöbet:** [D] Atama var, otomatik devir/rotasyon kaynaklarda doğrulanamadı.
**Çakışma:** [D] Bilgi bulunamadı.
**Kısıt:** [D] Sadece mobil, web erişimi yok.

---

## 7. Tody — **adalet göstergesinin en iyi örneği**

Bu, tüm listedeki en değerli uygulama. "Kim ne kadar yaptı"yı suçlamadan gösterme problemini açıkça çözmüş.

**Kim yaptı bilgisi:**
[D] Hane üyeleri planı cihazlar arası senkronize ediyor; üyeler **"check-in to claim credit for their actions"** — yani kredi *talep ediliyor*, atanmıyor ([App Store](https://apps.apple.com/us/app/tody/id595339588)).
[D] "Anyone can check off a task" — herhangi biri herhangi bir görevi işaretleyebiliyor; katı sahiplik yok.

**Zaman çizelgesi / ana görsel metafor — tarih değil *ihtiyaç*:**
[D] Tody kendini "tarih bazlı değil **ihtiyaç bazlı**" planlama olarak konumluyor — geleneksel kontrol listesi değil, "smarter to-do list."
[D] **Renk kodlu "dueness" (vadesi gelme) göstergesi**: yeşil = beklenebilir, kırmızı = gecikmiş, aralarda "bugün" ve gelecek durumları ([Tody resmi](https://todyapp.com/)).
[D] Kullanıcı davranışı bunu doğruluyor: insanlar günlük olarak **"in the red"** olanları tarıyor.
[D] **Kart/döşeme (tile) tabanlı düzen**: her oda bir kart (Mutfak, Oturma Odası, Banyo, Yatak Odası); kartlar içinde küçük görevler ve kendi frekansları.
[D] Görev panelinde **insan diliyle zaman**: "5 days overdue", "Due in 8 days" — mutlak tarih değil, göreli aciliyet.

**Kirlilik görselleştirmesi:**
[D] "Tody visualizes dirtiness to motivate cleaning and **visualizes the effect of cleaning** to enhance satisfaction" — hem sorunu hem çözümün etkisini gösteriyor.
[D] Kullanıcılar bunu "super helpful for actually seeing what needs to be cleaned" buluyor ([Apartment Therapy incelemesi](https://www.apartmenttherapy.com/tody-cleaning-app-review-37282867)).
[D] **Karakter: "Dusty"** — ihmal edildikçe cesaretlenen kendini beğenmiş bir toz tavşanı. Şakacı sataşmalar yapıyor ("You ruined the kitchen!").
[D] Çerçeveleme: hane **Dusty'ye karşı birleşiyor** ("unites your household against Dusty") → **düşman dışarıda, partner değil.**

**⭐ FairShare — adalet göstergesi (bizim için altın standart):**
[D] FairShare, hanenin **sorumlulukların nasıl paylaşılacağı konusunda anlaşmasını** sağlıyor; "clear, explicit goals that make it easier to avoid misunderstandings and those **subtle feelings of imbalance**."
[D] Örnek olarak verilen senaryo: biri evden çalışıyor, diğerinin uzun yolu var → **60/40 anlaşması** yapılabiliyor. **Eşitlik değil, üzerinde anlaşılmış hakkaniyet.**
[D] Anlaşılan oran **her üye için aylık hedefe** dönüşüyor; her tamamlanan görev sayılıyor — böylece **"effort gets seen, not assumed"** (emek varsayılmıyor, görülüyor).
[D] Ürün vaadi tam olarak bizim problemimiz: "**nobody has to be the one who notices, plans, and delegates everything**."
[D] Aylık "Race" arayüzü: üye sıralaması ve yüzdelik katkı.

**Suçlayıcı olmamayı nasıl kuruyor — mekanizma analizi:**
1. [D] Hedef **önceden birlikte belirleniyor** → sonradan yargı değil, önceden mutabakat.
2. [D] Ölçüt **kişiye özel** (60/40) → eşit olmamak başarısızlık değil.
3. [D] Ortak düşman **Dusty** → gerilim partnerden kirliliğe kaydırılıyor.
4. [Ç] "Anlaşılan hedefe göre ilerleme" çerçevesi, "sen benden az yaptın" karşılaştırmasının yerini alıyor.

**Kişilik ve ton:**
[D] "Tody puts you in control of your cleaning routines instead of cleaning routines controlling you" — kontrol ve esneklik vurgusu.
[D] Kullanıcı yorumları **yargılayıcı olmayan** bir ton bildiriyor; özellikle **ADHD ve depresyon** ile başa çıkan kullanıcılara hitap ediyor.
[D] Empatik mesajlaşma "mental load" ve hane içi adalet kaygılarını doğrudan adlandırıyor.

**Eleştiri:** [D] İlk kurulum zaman alıcı; bazı kullanıcılar için "a bit gamified/gimmicky."
**Fiyat modeli (referans):** [D] Premium+ hane büyüklüğüne göre: Duo (2 kişi) $25, Family (6) $40, Team (12) $80 / yıl.

---

## 8. Maple Family Organizer

> ⚠️ [D] **Not:** Maple, Wander tarafından satın alındı ve **31 Aralık 2026'da kapanıyor.** Ürün olarak takip edilmemeli, ama çerçevelemesi öğretici.

**Kim yaptı bilgisi:**
[D] Görevler aile üyelerine atanabiliyor; kullanıcılar "assign tasks to family members and get them off their mental load" diyor.
[Ç] Üye bazlı renk/avatar sistemi kaynaklarda doğrulanamadı.

**Zaman çizelgesi:**
[D] **"Agenda" özelliği**: takvimler, rutinler ve görevlerden **otomatik derlenen** haftanın tamamının ortak görünümü. Pazartesi sabahından önce "her gün planlanmış" oluyor.

**Devir/nöbet:**
[D] **"Routines"** özelliği tekrar eden işleri belirlenen programda otomatik yapıyor. Maple'ın tezi: *"Most of the mental load is the work that repeats."* → Tekrar eden işi otomatikleştirmek = zihinsel yükü almak.

**Adalet göstergesi:** [D] Kaynaklarda kişi bazlı katkı ölçümü bulunamadı.
**Çakışma:** [D] Bilgi bulunamadı.

**Görsel dil (Family Hub):**
[D] **Kart tabanlı** hub: üstte profil fotoğrafı alanı, **"Family Photo Shuffle"** (dönen aile fotoğrafı karuseli), aile yönetimi bölümü, hızlı erişim kısayolları, özelleştirme alanı ([Maple blog](https://www.growmaple.com/blog-posts/introducing-the-new-family-hub-in-maple)).
[D] Minimalist navigasyon (hamburger ikonu), ikon tabanlı kontroller.
[D] Ton: sıcaklık + fayda dengesi. "truly making maple feel like yours" (kişiselleştirme) + "No more hunting around—just tap and go" (eylem odaklı).
[D] Kapsayıcı çerçeveleme: "keep everyone connected and included."
[Ç] Fotoğraf karuseli, koordinasyon aracını **duygusal bir aile nesnesine** dönüştürme denemesi — soğuk bir görev listesi olmaktan çıkarma taktiği.

---

## 9. Pebbi *(bonus — ortak bakım odaklı bebek takibi)*

Bu uygulama doğrudan bizim problem tanımımızla aynı yerden başlıyor: paylaşımlı bakım.

**Kim yaptı bilgisi:**
[D] **Her bakıcı kendi güvenli senkronize erişimini alıyor** ("each caregiver gets their own secure synced access") — kimlik bilgisi paylaşımı yok ([App Store](https://apps.apple.com/app/id6756668942)).
[D] Ücretsiz 2 bakıcı, Premium ile 10'a kadar.
[D] Sektör ilkesi olarak: paylaşılan tek giriş kullanıldığında **"you cannot tell who logged what"** — ayrı hesap, atıfın önkoşulu ([Pebbi rehberi](https://pebbi.co/blog/how-to-share-baby-tracker-with-partner)).

**Zaman çizelgesi:**
[D] Tek birleşik **"Timeline view"** — "all your baby's logs in one place"; "everyone sees the same timeline in real time."
[D] Çevrimdışı kayıt destekli, bağlantı gelince senkronize oluyor. Senkron beklentisi: ~30 saniye.

**⭐ Devir/nöbet görselleştirmesi — "Catch-ups":**
[D] Ücretsiz **"Catch-ups"** özelliği: **son kontrolünüzden bu yana kaydedilen bakımı özetliyor**, böylece tüm timeline'ı eşelemeden son durumu görüyorsunuz.
[D] Filtre seçenekleri: **son 6, 12 veya 24 saat** ya da **bir önceki kontrolünüzden beri**.
[D] Premium'da **"AI handover summaries for nanny, co-parent and shift handovers"** — dadı, ortak ebeveyn ve vardiya devri için yapay zeka özetleri.

→ Bu, "nöbet devri"nin timeline üstüne kurulmuş en somut görsel çözümü: **ayrı bir devir ekranı değil, timeline'ın "senin görmediklerin" dilimi.**

**Adalet göstergesi:** [D] **Yok** — açıkça belirtiliyor: "doesn't showcase fairness/workload distribution analytics or visual contribution comparisons."
**Çakışma:** [D] Otomatik çözüm yok. Pebbi bunu "**coordination habit rather than an app problem**" olarak çerçeveliyor ve davranışsal kural öneriyor: "bakımı yapan kişi hemen kaydeder" + kaydetmeden önce bir bakış at.

**⭐ Davet akışı — QR kod (en düşük sürtünme):**
[D] *"QR CODE SHARING - SET UP IN UNDER 2 MINUTES. No email invites. One caregiver generates a QR code, the other scans it. Both are synced instantly."*
[D] Adım adım: Ebeveyn A ayarlardan "Add caregiver"a dokunur → Pebbi QR üretir → Ebeveyn B uygulamayı indirip QR'ı tarar. Şifre veya hesap kurulumu yok.

**Ton:** [D] Ebeveyn merkezli ve **kaygı giderici**: *"No more 'when did she last eat?' No more missed medication doses."* Gizlilik bir sonradan eklenti değil, temel değer olarak konumlanmış.
[D] Görsel: "clean with emphasis on **calm coordination**."

---

## 10. NextSip *(bonus — çakışma çözümünün tek somut örneği)*

**⭐ Çakışma / çift kayıt:**
[D] **"If two people record the same feed at once, NextSip spots it and merges the duplicate for you."** Pazarlama vaadi tek kelimeyle: **"Never double-logged"** ([Google Play](https://play.google.com/store/apps/details?id=app.nextsip.tracker)).

→ Araştırılan 10 uygulama içinde **çakışmayı otomatik çözdüğünü açıkça iddia eden tek uygulama bu.** Diğerlerinin hepsi ya sessiz ya da davranışsal kurala havale ediyor. **Bu, PatiNöbeti için gerçek bir farklılaşma alanı.**

**Sektörün genel durumu (bizim fırsatımız):**
[D] Çift kayıt "iki kişi aynı günü aynı anda görmediğinde" oluşuyor; tek hesabı iki telefonda kullanmak **kesinlikle** çift kayıt üretiyor.
[D] Yaygın öneri hâlâ manuel: *"If you end up with duplicates, just delete the extra."*

---

## Karşılaştırma matrisi

| | Kim yaptı görseli | Timeline tipi | Devir/nöbet | Adalet göstergesi | Çakışma | Kişilik |
|---|---|---|---|---|---|---|
| **Huckleberry** | ✗ (ortak hesap) | Widget dashboard + haftalık özet | ✗ | ✗ | ✗ | Uzman, güven veren, gece modlu |
| **Nara Baby** | Ayrı hesap var, kayıt atıfı ✗/? | Katmanlı kart + renkli haftalık grafik | ✗ | ✗ | ? | Sakin, taranabilir, illüstratif |
| **Baby Daybook** | Ayrı profiller, kayıt atıfı ? | Agenda grafik, günler yan yana | ✗ | ✗ | ? | Destekleyici — ama turuncu reklam gürültüsü |
| **Glow Baby** | Zayıf (çekirdek değil) | Kronolojik + zoom'lanabilir grafik | ✗ | Popülasyona kıyas | ? | Veri-odaklı, uzun onboarding |
| **Cozi** | ⭐ **Renk noktası + isim, 12 kişi, "All"** | Ay/gün takvimi, 4+taşma noktası | ✗ | ✗ | ? | Fonksiyonel ama görsel olarak eskimiş |
| **OurHome** | Profiller + puan | Takvim + görev listesi | Atama var | ⚠️ Puan/liderlik (yetişkinde ters tepiyor) | ? | Çocuk odaklı, renkli, oyunsu |
| **Tody** | Check-in ile kredi talebi | ⭐ İhtiyaç bazlı, yeşil→kırmızı dueness | Otomatik rotasyon | ⭐⭐ **FairShare (60/40 hedefi)** | ? | ⭐ Yargılamayan, mizahi, "Dusty"ye karşı birlik |
| **Maple** | Görev ataması | Otomatik derlenen haftalık agenda | Routines (otomasyon) | ✗ | ? | Sıcak + minimal, aile fotoğraflı |
| **Pebbi** | ⭐ Ayrı hesap, ortak timeline | ⭐ Gerçek zamanlı tek timeline | ⭐⭐ **Catch-ups (6/12/24s)** | ✗ | Davranışsal kural | Sakin koordinasyon, kaygı giderici |
| **NextSip** | ? | ? | ✗ | ✗ | ⭐⭐ **Otomatik birleştirme** | "Never double-logged" |

---

## Sektörün doldurulmamış boşlukları (PatiNöbeti'nin fırsatı)

1. **Hiçbir bebek bakım uygulamasında adalet göstergesi yok.** FairShare sadece temizlik uygulamasında var. Bakım + adalet birleşimi boş.
2. **Devir/nöbet görselleştirmesi neredeyse yok.** Sadece Pebbi (Catch-ups) çözmüş, o da "sıra kimde" değil "ne kaçırdın" sorusunu çözüyor. **"Sıra kimde" sorusunu görsel olarak çözen kimse yok.**
3. **Çakışma çözümü tek bir uygulamada (NextSip).** Geri kalanı kullanıcıya havale ediyor.
4. **Kayıt bazında "kim yaptı" atıfı zayıf.** Cozi bunu takvimde çözmüş ama bakım uygulamaları çözmemiş. **Cozi'nin renk-nokta sistemini bakım timeline'ına taşımak boş bir alan.**
5. **Yetişkinler arası oyunlaştırma çözülmemiş.** OurHome çocuk için çalışıyor, yetişkinde ters tepiyor; Tody'nin ortak-düşman modeli tek işleyen alternatif.

---

# PatiNöbeti'ye uygulanabilir 8 somut görsel ders

### 1. Kişi = renk + avatar, ve bunu ASLA tek kanala bırakma
Cozi'nin sistemi olgun: her üyeye benzersiz renk, görsel birim **renk noktası + isim** (sadece renk değil), çoklu kişide iki nokta + "+", ve herkes için ayrı bir **"Hepsi" rengi/kimliği**. Renkler ayarlardan değiştirilebilmeli. Nara Baby'nin dersini de ekle: **renk + illüstrasyon çift kodlaması** — "color and illustrations distinguish different activity types." Bizde iki eksen var: **kişi** ve **aktivite tipi**. Öneri: **aktivite tipi = ikon/illüstrasyon, kişi = renk + avatar baş harfi**. Böylece renk körlüğü ve gece karanlığında bile ayrım hayatta kalır.
*Kaynak: Cozi, Nara Baby*

### 2. Timeline'ı "ihtiyaç"a göre renklendir, tarihe göre değil
Tody'nin en güçlü fikri: yeşil (bekleyebilir) → kırmızı (gecikmiş) sürekli bir "dueness" skalası ve **insan diliyle zaman** ("5 gün gecikti", "8 gün sonra"). PatiNöbeti'de "Mama saati geldi mi?" sorusu tam olarak budur. Geçmiş ile bugün ayrımını da bu skalayla kur: **bugün canlı/doygun renk, geçmiş düşük doygunluk + Cozi'nin boşlukla ayırma tekniği** ("added spacing in between months so you can more clearly distinguish between them"). Mutlak saat yerine göreli aciliyet, uykusuz/aceleci kullanıcıda daha hızlı okunuyor.
*Kaynak: Tody, Cozi*

### 3. "Sıra kimde"yi Catch-up dilimi olarak kur, ayrı ekran olarak değil
Pebbi'nin Catch-ups'ı doğru mimari: ayrı bir "devir" ekranı yok, timeline'ın **"sen son baktığından beri"** dilimi var — 6/12/24 saat veya son kontrolden beri filtrelenebiliyor. PatiNöbeti'ye uyarlama: ana timeline'ın üstünde ince bir **"Sen yokken" şeridi**, içinde diğer kişinin yaptıkları kendi rengiyle. Nöbet devri ayrı bir özellik değil, timeline'ın bir görünümü olmalı. Üzerine ekleyebileceğimiz ve sektörde boş olan parça: **"Şimdi sıra: [avatar] Ayşe"** bandı.
*Kaynak: Pebbi (Catch-ups, AI handover summaries)*

### 4. Adalet göstergesini "anlaşılan hedefe ilerleme" olarak kur — asla liderlik tablosu olarak
Bu, tüm araştırmanın en net bulgusu. OurHome'un puan/liderlik modeli yetişkinler arasında **"awkward in an adult-to-adult context"** ve "invisible labor, mental load, uneven distribution between adults" sorununa hiç değinmiyor. Tody'nin FairShare'i doğru yolu gösteriyor: (a) **oran önceden birlikte kararlaştırılıyor** (örn. 60/40, eşit olmak zorunda değil), (b) **aylık kişisel hedefe** dönüşüyor, (c) amaç **"effort gets seen, not assumed"**. PatiNöbeti'de: iki halka yan yana, her biri *kendi* hedefine göre dolu — birbirine göre değil. Sayı karşılaştırması ve sıralama yok.
*Kaynak: Tody FairShare, OurHome (negatif örnek)*

### 5. Gerilimi partnerden dışarı taşı — ortak bir "karşı taraf" yarat
Tody haneyi **Dusty'ye karşı birleştiriyor** ("unites your household against Dusty") ve ton olarak yargılamıyor; kullanıcıları ADHD/depresyonla baş edenler dahil. Glow Baby ise kıyası **popülasyon ortalamasına** taşıyor. İkisi de aynı prensip: **kıyas ekseni partner olmasın.** PatiNöbeti'de doğal ortak taraf **evcil hayvanın kendisi** — "Boncuk bugün nasıl?" çerçevesi, "sen mi ben mi?" çerçevesinin yerini almalı. Eksik bir bakım, bir kişinin hatası değil, Boncuk'un ihtiyacı olarak görselleşmeli.
*Kaynak: Tody (Dusty), Glow Baby*

### 6. Daveti QR ile 2 dakikaya indir ve ürünü asla boş gösterme
Pebbi: *"No email invites. One caregiver generates a QR code, the other scans it. Both are synced instantly"* — 2 dakikanın altında, şifresiz. Cozi ise onboarding'de kullanıcıyı **aile üyesi eklemeye ve ilk kaydı oluşturmaya zorluyor**, sonra **"Hooray!"** onay ekranı veriyor — ürün hiçbir zaman boş görülmüyor. Bu ikisini birleştir: ilk kurulumda ikinci kişiyi davet et adımını **atlanabilir ama varsayılan** yap, QR göster, davet kabul edilince iki avatarın timeline'da yan yana belirdiği küçük bir kutlama anı koy. Ayrıca Baby Daybook'un iş modeli kararını kopyala: **davet edilen bakıcı ayrı ödeme yapmadan premium'a erişiyor** — davet sürtünmesinin büyük kısmı burada eriyor.
*Kaynak: Pebbi, Cozi, Baby Daybook*

### 7. Gece modunu birincil tasarım bağlamı say — sonradan eklenen bir tema değil
Huckleberry'nin gece teması bilinçli: "many loggings are done at night." Nara Baby daha da ileri gidiyor — paleti **hem açık hem koyu mod için** ve uykusuz ebeveynin erişilebilirliği için tasarlamış, tipografisini **okunabilirlik değil taranabilirlik** için kurmuş ("a simple typography hierarchy… easy to scan"), dokunma hedeflerini büyütmüş ("easy-to-tap buttons and large inputs"). Huckleberry ayrıca tek elle kullanımı ("juggling a baby in the other arm") ve **kilit ekranı Live Activities/widget'ları** ekliyor. PatiNöbeti'de: gece 3'te ilaç kaydı tek elle, ekran açmadan, göz kısmadan yapılabilmeli.
*Kaynak: Nara Baby (Everyday Industries vaka çalışması), Huckleberry*

### 8. Çakışmayı sessizce çöz, kullanıcıyı suçlayan bir uyarı gösterme
NextSip araştırılan tek uygulama olarak çakışmayı otomatikleştiriyor: *"If two people record the same feed at once, NextSip spots it and merges the duplicate for you"* — vaat: "Never double-logged." Diğerlerinin tamamı ya sessiz ya da kullanıcıya davranışsal kural veriyor. PatiNöbeti'de görsel çözüm önerisi: aynı aktivite, kısa bir pencere içinde iki kişi tarafından kaydedilirse **tek karta birleştir ve iki avatarı yan yana göster** — bir hata diyaloğu değil, *"ikiniz de ilgilendiniz"* okuması veren nötr bir kart. Ayrıca kayıt ekranını açarken Pebbi'nin davranışsal ipucunu görsele çevir: yeni kayıt formunun üstünde **"Son 30 dk: Ali mama verdi"** satırı, çakışmayı oluşmadan önler.
*Kaynak: NextSip, Pebbi*

---

## Ek: kaçınılacak görsel hatalar (kaynaklı)

- [D] **Onboarding ile ana ürün arasında görsel dil kopukluğu** — Huckleberry: onboarding "feels a bit dated compared to the polished main app."
- [D] **Aşırı uzun onboarding** — Huckleberry 18 adım + "extremely long" anket; Glow Baby "quite long" ve "could deter some users."
- [D] **Ana ürünü görmeden paywall** — Glow Baby zorunlu kayıt + paywall'ı uygulama öncesine koyuyor.
- [D] **Açıklamasız bildirim izni istemi** — Glow Baby sistem istemini "warm-up" ekranı olmadan gösteriyor.
- [D] **Sakin ürüne agresif renkli upsell** — Baby Daybook'un "bright orange banner-style ads on every non-logging page"i "intrusive" bulunuyor.
- [D] **Yetişkinler arasında puan/liderlik tablosu** — OurHome'un modeli "awkward in an adult-to-adult context."
- [D] **Hesap paylaştırarak "paylaşım"** — Huckleberry'nin modeli hem atıfı imkânsız kılıyor hem ayrılmış ebeveyn/bakıcı senaryosunda "awkward"; ayrıca çift kayıt üretiyor.

---

## Kaynaklar

**Resmi ürün kaynakları**
- Huckleberry: https://explore.huckleberrycare.com/app/ · https://apps.apple.com/us/app/huckleberry-baby-tracker/id1169136078
- Nara Baby FAQ: https://nara.com/pages/nara-baby-app-faqs
- Baby Daybook: https://babydaybook.app/ · https://babydaybook.app/premium/
- Cozi — Başlangıç: https://www.cozi.com/getting-started-with-cozi-calendar/
- Cozi — Mobil takvim yenilemesi: https://www.cozi.com/blog/mobile-month-makeover/
- Cozi — Aile geneli görünürlük: https://www.cozi.com/blog/the-parents-guide-to-family-wide-visibility-with-cozi/
- Tody: https://todyapp.com/ · https://apps.apple.com/us/app/tody/id595339588
- Maple — Family Hub: https://www.growmaple.com/blog-posts/introducing-the-new-family-hub-in-maple
- Pebbi: https://apps.apple.com/app/id6756668942
- NextSip: https://play.google.com/store/apps/details?id=app.nextsip.tracker
- Glow Baby: https://apps.apple.com/us/app/glow-baby-tracker-growth-app/id1077177456

**Tasarım vaka çalışmaları ve UI analizleri**
- Everyday Industries — Nara Baby UI tasarım vaka çalışması: https://everydayindustries.com/casestudy/mobile-app-ui-design-case-study/
- ScreensDesign — Huckleberry UI breakdown: https://screensdesign.com/showcase/huckleberry-baby-child
- ScreensDesign — Cozi UI breakdown: https://screensdesign.com/showcase/cozi-family-organizer
- ScreensDesign — Glow Baby UI breakdown: https://screensdesign.com/showcase/glow-baby-tracker-growth-app

**İnceleme ve karşılaştırma yazıları**
- Pebbi — En iyi bebek takip uygulamaları 2026: https://pebbi.co/blog/best-baby-tracker-apps-2026
- Pebbi — Partnerle bebek takibi paylaşımı rehberi: https://pebbi.co/blog/how-to-share-baby-tracker-with-partner
- Parenting Hack — Baby Daybook incelemesi: https://parentinghack.substack.com/p/review-newborn-tracking-app-baby
- Apartment Therapy — Tody incelemesi: https://www.apartmenttherapy.com/tody-cleaning-app-review-37282867
- Homsy — Homsy vs OurHome: https://gethomsy.com/blog/comparisons/homsy-vs-ourhome
- Little Day Out — OurHome ebeveyn incelemesi: https://www.littledayout.com/parent-review-ourhome-app-for-home-organisation-and-behaviour-management/
- The Mother Network — Huckleberry: https://www.themothernetwork.com/mother-resources/huckleberry
- BabyLog — BabyLog vs Nara Baby: https://babylog.com.au/blog/babylog-vs-nara-baby
- pixykid — Her iki ebeveyn için bebek takibi: https://www.pixykid.com/blog/baby-tracker-for-both-parents

---

## Sonraki adım önerisi

Bu doküman metin kaynaklarına dayanıyor. Karar öncesi doğrulanması gereken 3 şey:
1. **Cozi'nin renk noktası + isim bileşeninin** gerçek boyut/kontrast değerleri (ekran görüntüsü gerekli).
2. **Tody FairShare'in** ilerleme göstergesinin gerçek formu (halka mı, çubuk mu, sayı mı) — bizim adalet göstergemizin doğrudan referansı.
3. **Pebbi Catch-ups** ekranının timeline'a nasıl oturduğu — nöbet devri tasarımımızın doğrudan referansı.
