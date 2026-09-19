# Simüle kullanıcı testi — 10 persona, yerel MVP

Tarih: 18 Eylül 2026

## Bu belge ne DEĞİLDİR

Bu bir gerçek kullanıcı görüşmesi değildir. On kullanıcı **simüle edilmiş personalardır**;
uygulamayı gerçekten çalıştırıp tıklamışlardır ama gerçek insan değildirler, gerçek ödeme
niyeti beyan etmemişlerdir. `02-dogrulama-plani.md` ve `07-mvp-uygulama-durumu.md` içindeki
beta kapısı eşikleri (beş hedef hane, üç gerçek ödeme niyeti) bu çalışmayla **karşılanmamıştır**.
Buradaki fiyat rakamları ve "öderim/ödemem" beyanları hipotez üretir, kanıt üretmez.

Kanıt değeri olan tek kısım: personaların uygulamayı kullanırken karşılaştığı ve **kaynak kodda
ayrıca doğrulanan** davranışlar (bölüm 2). Onlar gerçek hatalardır.

## 1. Yöntem

- Uygulama `expo export --platform web` ile derlendi, cross-origin izolasyon başlıklı yerel
  sunucuda servis edildi. Her persona kendi izole Chromium profilinde (390×844, tr-TR,
  Europe/Istanbul) çalıştı; verileri oturumlar arasında kaldı, "ertesi gün açtım" gerçekten test edildi.
- Her persona en az 2 oturum yaptı, ekran görüntüsü aldı, sonra grup turunda diğerlerinin
  bulgularına itiraz etti ve 30 günlük önceliklere oy verdi.
- Web'i çalıştırmak için gereken iki değişiklik: `apps/mobile/metro.config.js` (wasm + COOP/COEP)
  ve `src/data/repository.ts` içindeki `inTransaction()` — web'de `withExclusiveTransactionAsync`
  desteklenmiyor, uygulama açılışta kilitleniyordu.
- Ham çıktıların tamamı `kullanici-testi/` altındadır ve elenmemiştir: 10 bireysel rapor,
  10 tartışma cevabı, 203 ekran görüntüsü, persona künyeleri, harness ve tekrar çalıştırma
  yönergesi. Bu belge yalnızca özettir; geliştirme sırasında **`kullanici-testi/01-bulgu-listesi.md`**
  kullanılmalıdır (her bulgunun tekrar adımı, dosya:satır referansı ve kabul kriteri oradadır).

## 2. Kaynak kodda doğrulanan bulgular

| # | Bulgu | Yer | Etki |
|---|---|---|---|
| 1 | Çakışma yalnız **sonuçlar farklıysa** sayılıyor; iki kişinin de "yapıldı" demesi çakışma değil | `src/domain/care.ts:15` | Çift doz sessiz kalıyor — 10/10 persona bunu buldu |
| 2 | Bugün kartı yalnızca **son** kaydı gösteriyor; çakışmada ise kim/ne zaman bilgisini tümüyle gizliyor | `src/components/task-row.tsx:9,19` | Ekran, olan biteni kaydettikçe daha az gösteriyor |
| 3 | Günlük occurrence üretimi yok; `atToday()` sadece demo sıfırlanırken çalışıyor | `src/data/seed.ts:3` | Ertesi gün "Bugün" hâlâ dünkü "yapıldı"yı gösteriyor |
| 4 | `scheduledAt` cihaz saat diliminde biçimleniyor, Planlar ise `times[0]` dizesini ham gösteriyor | `src/components/task-row.tsx:11` / `src/app/(tabs)/plans.tsx:15` | Saat dilimi değişince aynı plan iki ekranda iki farklı saat |
| 5 | "Birini davet et" gönderme akışı değil, davet **edilenin** kabul ekranını açıyor | `src/app/(tabs)/household.tsx:12` | İkinci bakım veren hiç eklenemiyor — aktivasyon burada ölüyor |
| 6 | Plan ekleme/düzenleme yok; hatırlatıcı 20:00'ye sabit kodlu, bildirim metni sabit | `src/app/(tabs)/plans.tsx:15`, `src/services/reminders.ts` | Kendi ilacı/saati olan hiçbir hane ürünü kendine göre kuramıyor |
| 7 | Kayıt düzeltme/silme/geri alma yok; uygulamada tek bir giriş alanı yok (not, doz, gerçekleşen saat girilemiyor) | `src/app/record/[occurrenceId].tsx`, `src/app/(tabs)/history.tsx` | Yanlış kayıt kalıcı; "Emin değilim" gerekçesiz kalıyor |
| 8 | "Demoyu başlangıca döndür" onay sormadan tüm kayıtları siliyor, davet butonunun hemen altında | `src/app/(tabs)/household.tsx:12` | 4 persona kazara tetikledi |
| 9 | Çevrimiçiye dönüldüğünde "paylaşılmayı bekliyor" etiketi kalkmıyor | `src/data/repository.ts` (outbox boşaltma yok) | Demo sınırı, ama kullanıcıya bozuk görünüyor |
| 10 | Ölü şablon dosyaları silinmiş `/explore` rotasına referans veriyor, `npm run typecheck` kırık | `src/components/app-tabs.web.tsx:27`, `app-tabs.tsx` | Testten önce de vardı |

Değişmemesi istenen tek şey dil oldu: teşhis/doz/skor iddiası yok, "tıbbi doğrulama sayılmaz"
uyarıları 10/10 persona tarafından doğru bulundu. Veteriner teknisyeni personası dâhil kimse
tıbbi sınırın aşıldığını söylemedi.

## 3. Persona sonuçları

| Persona | 1. tur kararı | ₺79,99/ay | Tartışma sonrası verdiği rakam |
|---|---|---|---|
| Elif — epilepsili köpek, eşiyle nöbetleşe | koşullu → **kurmam** (sertleşti) | ödemem | ₺49/ay, yıllık ₺449; özet de gelirse ₺79,99 |
| Barış — gönülsüz ikinci bakım veren | kullanmam | ödemem | ₺49/ay, yıllık ₺399 |
| Nuray — 63, kızının kedisi | kullanmam | ödemem | yılda ₺249, tek seferde (aylık abonelik istemiyor) |
| Sinem — pet-sitter, 6 hane | koşullu | müşteri öder → **hane ücretsiz olmalı** | profesyonel paket ₺249/ay (ilk 3 hane ₺149) |
| Can — öğrenci, 3 kişilik ev | koşullu | ödemem | yılda ₺149 |
| Aylin — geçici bakım, 3 hayvan | koşullu | dernek öderse | hayvan başına ₺25/ay veya ₺149/ay faturalı |
| Kerem — şekerli kedi, insülin | kullanmam | fayda yok | ₺149/ay |
| Deniz — boşanmış, köpek iki evde | koşullu | koşullu | ₺59/ay, **üyeler ayrı ayrı ödesin** |
| Zeynep — veteriner teknisyeni | koşullu, kliniğe önermem | koşullu | ₺79,99/ay (özet çıkarsa) |
| Onur — sık seyahat eden | koşullu, 2. ay iptal | koşullu | ₺79,99/ay, yıllık ₺799 |

## 4. Tartışmada uzlaşılan tasarım kararları

Bunlar 10/10 ya da 9/10 uzlaşma ile çıktı; ilk turda birbirine zıt duran talepler tartışmada
tek tasarımda birleşti.

1. **Kilit değil, bilgi.** Hız ilk kayıtta, sürtünme ikinci kayıtta. Slot boşsa tek dokunuş;
   slotta kayıt varsa "Bu bakımı Deniz 08:12'de 'yapıldı' işaretledi — yine de ekle?" ve
   varsayılan buton güvenli çıkış olsun. Kerem "sert kilit" talebini geri çekti, Barış
   "uyarı gereksiz" itirazını geri çekti.
2. **Silme yok, düzeltme var, iz kalır.** Kısa bir geri alma penceresi (60 sn–15 dk) kendi
   kaydın için; sonrası "düzeltildi" etiketli düzeltme, eski satır üstü çizili kalır.
   Nuray "sil" talebinden, Deniz "hiç değiştirilemesin" talebinden vazgeçti.
3. **Toplu sıfırlama onaysız ve izsiz olmasın.**
4. **Özet isimsiz olsun.** Dışa çıkan 30 günlük özet rol bazlı ("bakım veren 1/2"), süreli ve
   iptal edilebilir link, "kayıt girilmemiş gün" ayrı sütun, skor/yüzde yok. Zeynep özetten
   isimleri çıkardı, Deniz özetin varlığına itirazını çekti.
5. **Bildirim ayarı hane değil kişi başına.** Birine günlük saat bildirimi gerekli, diğerine
   yalnızca "kaçırıldı" bildirimi spam olmayan tek kurgu.
6. **"Birden fazla bakım veren" ücretsiz olmalı.** 10/10. Ürünün tek sebebi paywall'ın
   arkasındayken kimse ikinci kişiyi davet etmiyor; ücretsiz sürümün sınırı da hiçbir yerde yazmıyor.

## 5. Çözülmeyen çatışmalar

1. **Bildirimden tek dokunuş.** Barış, Onur ve Elif bunu şart koşuyor. Nuray ("telefon cepte,
   farkında olmadan dokunuyorum") ve Deniz ("o dokunuş kayıt değil refleks, kimin dokunduğu
   belli değil") karşı çıkıyor. Karar gerekiyor: tek dokunuş yalnız boş slotta + kimin
   dokunduğunu doğrulayan bir yol (cihaz sahibi eşlemesi) mı, yoksa hiç mi?
2. **Derinlik mi genişlik mi.** 8/10 "önce tek hanede derinlik" dedi. Ama Aylin (çoklu hayvan)
   ve Zeynep (evinde iki kedi) çoklu hayvan olmazsa ürünü terk edeceklerini söylüyor.
   Çoklu hayvan bir özellik değil, bu iki segment için varlık şartı.
3. **Kim öder.** Sinem hane aboneliği modelinden döndü: "hane ücretsiz olmalı, ödeyen
   profesyonel taraf". Aylin dernek faturası, Deniz üyelerin ayrı ayrı ödemesi istiyor
   (ortak abonelik onun için yeni kavga konusu). Mevcut "hane aboneliği" varsayımı
   10 kişiden hiçbiri tarafından savunulmadı.

## 5b. Uygulanan düzeltmeler (18 Eylül 2026)

Öncelik listesinin 1. maddesi olan **doğruluk paketi** yapıldı: B-01 (ikinci kayıt öncesi bilgi
ekranı), B-02 (kart artık hiçbir kaydı gizlemiyor), B-03 (çakışma görünür ve "Hangisi geçerli?"
ile çözülebilir, kayıt silinmeden), B-07 (görevler her gün üretiliyor, Bugün yalnız bugünü
gösteriyor, eski cihazlar için kayıpsız göç). Ayrıntı, dokunulan dosyalar ve tarayıcıdaki
doğrulama: `kullanici-testi/04-uygulanan-duzeltmeler.md`. Testler 4'ten 15'e çıktı.

B-10 kayıt sonrası geri alma, B-15 sıfırlama onayı ve B-32/33'ün yerel günlük
hatırlatıcı/dedupe/gün devri kısmı da sonraki ortak inceleme turunda kapatıldı. B-16 gerçek davet,
B-24 plan kurma ve kişi başına production bildirim tercihleri açık; sıra aşağıdaki gibi devam ediyor.

## 6. 30 günlük öncelik — oylarla

Personalara "30 günde sadece 3 şey yapılacak" diye soruldu; aşağıdaki sıra oyların toplamıdır.

1. **Bugün kartı bilgi gizlemeyi bıraksın + ikinci kayıt uyarısı** (8/10) — iki "yapıldı" da
   çakışma sayılsın, çakışan kartta her iki kayıt kim/saat ile görünsün, kart tıklanabilsin.
2. **Gün mantığı** (3 doğrudan oy, ayrıca 4 kişi "bu düzelmeden ödemem" dedi) — günlük
   occurrence üretimi, "Bugün" yalnız bugünü göstersin, kayıt yoksa "bugün kayıt yok" desin.
3. **Düzeltme + geri alma + iz + onaylı sıfırlama** (4/10 oy, tasarımda 10/10 uzlaşma).
4. **Davet gerçekten gönderilsin** (3/10) — paylaşılabilir link/kod. Aktivasyon hunisinin
   ölçülebilmesi için ön koşul.
5. **Bildirim** (3/10, üç kişinin "olmazsa olmaz"ı) — kişi başına ayar, kaçırılan bakım uyarısı,
   boş slotta bildirimden tek dokunuş (çatışma 1 karara bağlanırsa).
6. **Kendi planını kurma** (4/10 dağınık) — ilaç adı, saat, tekrar; hatırlatıcı plana bağlansın.

Sonraki dalga: çoklu hayvan (iki personanın terk şartı), isimsiz 30 günlük özet (ücretlendirmenin
çapası), kişi başı kayıt sayacı, çoklu hane / süreli bakıcı rolü (ayrı ürün kararı).

## 7. Fiyat ve paketleme hipotezi

Mevcut ₺79,99/ay tek paket, 10 kişiden 8'i tarafından reddedildi; kabul edenler (Zeynep, Onur)
bunu ancak özet + doğruluk düzeltmeleri geldikten sonra kabul etti. Tartışmadan çıkan paketleme:

- **Ücretsiz:** 1 hayvan, sınırsız bakım veren, 30 günlük geçmiş, çakışma uyarısı, düzeltme.
- **Ücretli (₺49–59/ay ya da ₺449–499/yıl):** paylaşılabilir isimsiz özet, sınırsız arşiv,
  çoklu hayvan, kaçırılan bakım bildirimi.
- **Profesyonel (₺249/ay):** çoklu hane, süreli bakıcı rolü, kendi kayıtlarının dökümü.
  Bu ayrı bir ürün hipotezidir; B2C doğrulaması bitmeden açılmamalı.
- Yıllık tek ödeme, aylık abonelikten belirgin biçimde daha kabul edilebilir bulundu (Nuray, Can, Elif).

## 8. Ayrıntılı belgeler

| Dosya | İçerik |
|---|---|
| `kullanici-testi/README.md` | Klasör kılavuzu, nereden başlanacağı |
| `kullanici-testi/00-yontem-ve-tekrar-calistirma.md` | Yöntem, testin statüsü, harness, testi tekrar çalıştırma, doğrulanamayanlar |
| `kullanici-testi/01-bulgu-listesi.md` | 60 bulgunun tamamı: ciddiyet, tekrar adımları, kod referansı, kabul kriteri |
| `kullanici-testi/02-persona-kunyeleri.md` | 10 persona künyesi (birebir) + kapsanmayan profiller |
| `kullanici-testi/03-oylar-fiyat-ve-oncelik.md` | Oy dökümü, fiyat beyanları, paketleme, fikir değiştirenler |
| `kullanici-testi/raporlar/` | 1. tur bireysel raporlar (birebir) |
| `kullanici-testi/tartisma/` | 2. tur brifi ve 10 tartışma cevabı (birebir) |
| `kullanici-testi/ekran-goruntuleri/` | 203 ekran görüntüsü, persona başına |
| `kullanici-testi/harness/` | `app.js`, `serve-web.js`, `KIT.md`, kullanım kılavuzu |

## 9. Doğrulama planına etkisi

- Beta kapısı (`07-mvp-uygulama-durumu.md`) değişmedi: bu çalışma gerçek hane testinin yerine geçmez.
- Ama sıradaki gerçek deney **bugünkü haliyle ölçülemez**: huninin ikinci adımı (davet gönderme)
  üründe yok, dördüncü adımı (iki ayrı kişinin kayıt eklemesi) tek kullanıcı varsayımına takılıyor.
  Gerçek hanelerle huni ölçülmeden önce en azından 6. bölümdeki 1., 2. ve 4. maddeler gerekiyor.
- Ücretsiz sürümün sınırının hiçbir ekranda yazmaması, fiyat testini şimdiden geçersiz kılıyor.
