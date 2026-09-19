# PatiNöbeti ajan ekip modeli

> **19 Eylül 2026 tazelemesi.** İlk roster denetçi ağırlıklıydı: on rolün yedisi kural yazıyor,
> ölçüyor ve veto ediyordu; hiçbirinin görevi "bu uygulama modern görünsün" değildi. Her kapı
> riski engelliyor, **hiçbiri sıradanlığı engellemiyordu** — sonuç, arayüzü inşa etmek yerine
> boyayan bir ekip oldu. Roster altı çekirdek + iki çağrılan role indirildi; her rol artık ya
> **üretir** ya da **üretilen zanaatı denetler**. Yalnız kural yazan rol kalmadı, ve yeni bir
> yetki eklendi: **sıradanlık vetosu** (`urun-yonu`).

Tarih: 19 Eylül 2026 · Kapsam: tüm proje (B2C öncelikli)

Bu belge, şirketin yürütme ekibi yalnızca ajanlardan oluştuğunda hangi rollerin var olması
gerektiğini tanımlar. Rol tanımları `.claude/agents/` altındadır; bu belge onların gerekçesidir.

## 1. Rol listesi nereden türetildi

Bir insan şirketinin organizasyon şeması kopyalanmadı. Üç kaynak kullanıldı:

1. **Ürünün ölme sebepleri.** `B2C/docs/09-mvp-ortak-inceleme.md` içindeki açık release
   blocker'ları ve `07-mvp-uygulama-durumu.md` beta kapısı.
2. **Bu projede gözlenen hata biçimleri.** 10 personalı kullanıcı testi
   (`B2C/docs/kullanici-testi/`) 60 bulgu üretti; bulguların kümelendiği yerler rol sınırlarını
   belirledi.
3. **Ajanların yapısal zaafları.** Bu projede gerçekten yaşananlar: bir ajanın "düzeltildi"
   demesi düzeldiği anlamına gelmedi; belgede "typecheck başarılı" yazarken typecheck aylardır
   kırıktı; bir inceleme turu kullanım kotasına takıldı ve iş yarıda kaldı.

### Rol sınırlarını belirleyen altı hata biçimi

| Gözlenen hata | Rol karşılığı |
|---|---|
| Ekran çift dozu gizledi, çakışma çözülemedi (B-01, B-02, B-03) | Kayıt bütünlüğü ajanı |
| Gün dönmedi; uygulama yanlış cevap verdi (B-07, B-08) | Zaman ve bildirim ajanı |
| Aktivasyon zinciri üründe yoktu (davet gönderilemiyor, B-16) | Ürün sözleşmesi bekçisi + deney ajanı |
| Belge ile gerçek ayrıştı ("typecheck başarılı" yazıyordu, kırıktı) | Sürüm kapısı + kanıt denetçisi |
| Persona iddiaları kodda doğrulanmadan kabul edilseydi yanlış iş yapılacaktı | Kanıt denetçisi |
| Bir rolün turu kotaya takıldı, iş yarım kaldı | Devam sözleşmesi kuralı (§6) |

## 2. Çekirdek ekip

Her rol bir **sahiplik alanı**, bir **çıktı**, bir **veto sınırı** ve bir **başarısızlık tanımı**
ile tanımlanır. Unvan taklidi (CTO ajanı, PM ajanı) kullanılmaz.

| # | Rol | Sahiplik alanı | Vetosu |
|---|---|---|---|
| 1 | **urun-yonu** | Ürün değişmezleri + görsel yön + kapsam | Değişmezi bozan iş **ve sıradan iş** |
| 2 | **arayuz-muhendisi** | Ekranlar, bileşenler, hareket, görsel varlıklar | — (üreten taraf) |
| 3 | **bakim-emniyeti** | Kayıt/çakışma semantiği + gün, saat dilimi, hatırlatıcı | `domain/`, `data/`, takvim ve bildirim mantığı |
| 4 | **veri-senkron** | Supabase şeması, RLS, outbox, realtime | Şema ve politika değişiklikleri |
| 5 | **bitirme-denetcisi** | Zanaat + doğruluk + erişilebilirlik + kapılar (yazma yetkisi yok) | Kanıtsız veya şablon iş |
| 6 | **persona-lab** | 10 kişilik popülasyon, harness, regresyon turu | Kararı kötüleşen persona |
| ç | **mahremiyet-kvkk** | Veri envanteri, rol sınırı, export/delete, özet sözleşmesi | Dışarı veri çıkaran iş |
| ç | **deney-olcum** | Aktivasyon hunisi, ürün olayları, fiyat testi | Ölçülemeyen deney |

Kaldırılan/birleştirilen roller: `urun-sozlesmesi` + `marka-tasarim` → `urun-yonu`;
`kayit-butunlugu` + `zaman-bildirim` → `bakim-emniyeti`; `erisilebilirlik-dil` +
`kanit-denetcisi` + `surum-kapisi` → `bitirme-denetcisi`; `mobil-urun` → `arayuz-muhendisi`;
`tartisma-yoneticisi` kaldırıldı (karara bağlanmayan tören).

### Sıradanlık vetosu

`urun-yonu` bir ekranı şu testlerden biri düşerse gönderemez: **yan yana** (rakip ekranla
karşılaştırıldığında şablon duruyor mu), **görsel taşıyıcı** (ekranda içeriği taşıyan fotoğraf,
renk alanı veya veri görselleştirmesi var mı), **karar** (görsel bir karar mı, güvenli ortalama
mı), **anı** (hatırlanacak tek bir an var mı), **isim** (ekran görüntüsünden marka tanınıyor mu).

### 2.1 Ürün sözleşmesi bekçisi
- **Korur:** "Kayıt ile gerçeği karıştırma", tıbbi tavsiye yok, ilk sürümde AI yok, hane
  koordinasyonu dışına çıkma.
- **Çıktısı:** kapsam kararı + `docs/adr/` altında karar kaydı.
- **Başarısızlık tanımı:** ürün, kullanıcı testinde uyarılan yere kayarsa (ör. doz alanı eklenip
  tıbbi sorumluluk üstlenilmesi) veya paywall ürünün varlık sebebini kapatırsa.
- **Not:** Fiyat ve segment kararının *nihai* sahibi insandır; bu ajan seçenekleri ve sonuçlarını
  hazırlar.

### 2.2 Kayıt bütünlüğü ajanı
- **Değişmezleri:** hiçbir kayıt sessizce ezilmez; ikinci `done` çakışmadır; çakışma kim/ne/saat
  ile görünür; düzeltme iz bırakır; yıkıcı işlem onay ister; `synced` yalnız sunucu onayıyla yazılır.
- **Çıktısı:** değişmez listesi + `care`/`schedule` testleri.
- **Başarısızlık tanımı:** bir kullanıcı ekrana bakıp yapılmamış bakımı yapılmış sanabiliyorsa.

### 2.3 Mobil ürün ajanı
- **Kuralı:** sürümlü Expo dokümanını (`apps/mobile/AGENTS.md`) okumadan kod yazmaz.
- **Çıktısı:** çalışan ekran + gerçek uygulamada alınmış ekran görüntüsü.
- **Başarısızlık tanımı:** "çalışıyor" denip yalnız testte doğrulanmışsa.

### 2.4 Veri ve senkron ajanı
- **Sahipliği:** migration'lar, RLS politikaları, pgTAP sözleşmesi, outbox drain/retry/ack,
  idempotency, cursor, realtime invalidation.
- **Başarısızlık tanımı:** çalıştırılmamış SQL testini "geçti" saymak.

### 2.5 Zaman ve bildirim ajanı
- **Sahipliği:** günlük occurrence üretimi, saat dilimi ve DST, hatırlatıcı yaşam döngüsü
  (tekrar iptali), kaçırılan bakım uyarısı, kişi başına bildirim ayarı, iOS/Android matrisi.
- **Başarısızlık tanımı:** aynı planın iki ekranda iki farklı saat göstermesi; tekrarlayan
  hatırlatıcının çoğalması.

### 2.6 Persona laboratuvarı ajanı
- **Varlığı:** `B2C/docs/kullanici-testi/harness/` ve 10 künye. Bu, projenin kalıcı test varlığıdır.
- **Çıktısı:** her aday sürümde "bu sürümde kim üründen çıkıyor" raporu ve değişen kararlar.
- **Sınırı:** persona beyanları **kanıt değildir**; gerçek kullanıcı yerine geçmez. Bu ayrım
  `B2C/docs/kullanici-testi/00-yontem-ve-tekrar-calistirma.md` içinde yazılıdır ve korunmalıdır.

### 2.7 Erişilebilirlik ve Türkçe ajanı
- **Sahipliği:** tek elle kullanım, dokunma hedefleri, kontrast, Dynamic Type, ekran okuyucu
  etiketleri, tek hitap, terim sözlüğü ("nöbet", "prova", "eşitleme" gibi anlaşılmayanlar),
  dilbilgisi ayrıntıları (saat eki: 08:12'de, 18:59'da).
- **Başarısızlık tanımı:** 63 yaşındaki bakım verenin ekranda ne yapacağını bilememesi.

### 2.8 Mahremiyet ve KVKK ajanı
- **Sahipliği:** veri envanteri, minimizasyon, rol sınırlarının sunucuda uygulanması, süreli
  paylaşım linki, özet sözleşmesi (isimsiz, sayım, "kayıt yok" sütunu), export/delete.
- **Başarısızlık tanımı:** uygulamadan çıkan bir belgenin kişi bazlı başarı tablosuna dönüşmesi.

### 2.9 Kanıt denetçisi
- **İşi:** başka ajanların iddialarını bağımsız tekrarlamak: repro adımını koşmak, gerçek
  uygulamada doğrulamak, belgedeki durum satırlarını gerçekle karşılaştırmak.
- **Yetkisi:** kanıtı olmayan hiçbir madde "kapandı" olarak işaretlenemez.
- **Neden zorunlu:** bu projede hem persona raporlarında hem durum belgesinde gerçekle
  uyuşmayan ifadeler çıktı.

### 2.10 Sürüm kapısı ajanı
- **Sahipliği:** `.github/workflows/quality.yml`, typecheck/lint/test/export, EAS build,
  bağımlılık denetimi, sürüm notu, mağaza metası.
- **Başarısızlık tanımı:** belgede "yeşil" yazarken boru hattının kırık olması.

## 3. Çağrıldığında çalışan roller

- **Marka ve tasarım ajanı** — her anlamlı MVP turunda ortak incelemeye katılır (mevcut üç rollü
  inceleme döngüsünün parçası). Kotaya takılırsa turu atlanmış saymaz, yeniden çağrılır.
- **Deney ve ölçüm ajanı** — aktivasyon huni olaylarını tanımlar, seed verisinin aktivasyon
  sayılmamasını garanti eder, fiyat/paket testini kurar.
- **Destek triyaj ajanı** — gerçek kullanıcı çıktığında geri bildirimi bulgu listesine çevirir.
- **Maliyet ajanı** — Supabase/push maliyeti ve ücretsiz katmanın sürdürülebilirliği.
- **Tartışma yöneticisi** — çelişen talepler biriktiğinde süreli bir tur yürütür (kullanıcı
  testindeki 2. tur gibi), sonunda karar kaydı üretir. Süresiz komite kurulmaz.

## 4. İnsanda kalan işler

Ajan ekibi bu işlerin girdisini hazırlar, kararını veremez:

- Gerçek kullanıcı görüşmesi ve gerçek ödeme niyeti (simüle persona beyanı kanıt değildir).
- Veteriner, pet-sitter ve dernek ortaklıkları.
- Mağaza hesabı, yasal kimlik, KVKK'da veri sorumlusu sıfatı, aydınlatma metninin sorumluluğu.
- Marka adı, fiyat ve hangi segmentten vazgeçileceğinin nihai onayı.
- Para harcama ve üçüncü taraf sözleşmeleri.

## 5. İş akışı

```
bulgu (persona lab / kullanıcı / CI)
  → bulgu listesine ID ile girer (B-xx)
  → sahibi olan role atanır
  → değişiklik + test
  → ilgili kapı ajanı onayı (emniyet / mahremiyet / zaman)
  → kanıt denetçisi gerçek uygulamada doğrular
  → belge güncellenir (bulgu listesi durumu + varsa karar kaydı)
  → sürüm kapısı boru hattını yeşil görür
```

## 6. Ekibi çalışır kılan beş kural

1. **Tek yazar.** Her dosyanın bir sahibi vardır; diğer roller öneri getirir, doğrudan yazmaz.
2. **Kapı = veto.** Emniyet, mahremiyet ve zaman ajanlarının onayı olmadan ilgili değişiklik
   birleşmez.
3. **Kanıtsız kapanış yok.** Her madde tekrar adımı + gerçek uygulamada doğrulama ile kapanır.
   Çalıştırılmamış test "geçti" sayılmaz.
4. **Her sürümde popülasyon koşar.** 10 persona regresyon turu; kararı değişen persona tek
   başına sürüm sinyalidir.
5. **Devam sözleşmesi.** Kota veya oturum kesintisi işi yarıda bırakabilir; `CONTINUATION.md`
   her turun sonunda güncellenir, eksik kalan tur "yapılmış" gibi gösterilmez.

## 7. Bugünkü açık blocker'lar ve sahipleri

`B2C/docs/09-mvp-ortak-inceleme.md` listesinin rol karşılığı:

| Blocker | Sahip | Kapı |
|---|---|---|
| İki gerçek hesap/cihazla davet ve ortak bugün görünümü | Veri ve senkron + mobil ürün | Kanıt denetçisi (iki cihaz kanıtı) |
| Supabase repository, outbox drain/retry/ack, idempotency, cursor | Veri ve senkron | Kayıt bütünlüğü |
| Gerçek iki kullanıcıyla RLS izolasyon testleri, güvenli RPC | Veri ve senkron | Mahremiyet ve KVKK |
| Şifreli yerel veri ve anahtar yaşam döngüsü | Veri ve senkron | Mahremiyet ve KVKK |
| Server-side ürün olayları, cohort, store sandbox checkout | Deney ve ölçüm + sürüm kapısı | Ürün sözleşmesi bekçisi |
| Export/delete, KVKK metinleri, fiziksel cihaz erişilebilirlik matrisi | Mahremiyet ve KVKK + erişilebilirlik | Kanıt denetçisi |

## 8. Ekibin kendi ölçümü

- **Bulgu isabeti:** kanıt denetçisinin doğruladığı bulgu / toplam bulgu.
- **Geri dönüş:** "kapandı" denip tekrar açılan madde sayısı.
- **Belge-gerçek sapması:** belgede yazan durum ile boru hattının söylediği arasındaki fark
  (hedef: sıfır).
- **Persona kararı değişimi:** sürümler arasında "kullanmam"dan "kullanırım"a geçen persona sayısı.
- **Tur maliyeti:** bir inceleme turunun kaç ajan çağrısı ve ne kadar kota harcadığı.

## 9. Anti-desenler

- Unvan taklidi roller (CEO/CTO/PM ajanı) — sahiplik ve veto üretmez.
- Aynı işi yapan çok sayıda ajan; paralellik ancak farklı sahiplik alanlarında değer üretir.
- Sonu karar kaydına bağlanmayan tartışma turları.
- "Ajan öyle dedi" ile kapanan madde; kanıt denetçisinden geçmeyen hiçbir iddia kabul edilmez.
- Simüle persona beyanını pazar kanıtı sayma.
- Kotaya takılan turu sessizce atlama.

## 10. Kurulum

Rol tanımları `.claude/agents/*.md` altındadır; her dosya rolün tetikleyicisini, araç iznini,
çıktısını ve veto sınırını taşır. Claude Code bu dosyaları proje düzeyinde okur ve kullanıcı
düzeyindeki (`~/.claude/agents/`) aynı adlı tanımları geçersiz kılar. `claude plugin validate
.claude/agents/` ile doğrulanır (19 Eylül 2026: 13 tanım geçerli).

| Rol | Dosya | Model | Not |
|---|---|---|---|
| Ürün sözleşmesi bekçisi | `.claude/agents/urun-sozlesmesi.md` | inherit | ADR yazar |
| Kayıt bütünlüğü | `.claude/agents/kayit-butunlugu.md` | inherit | emniyet kapısı |
| Mobil ürün | `.claude/agents/mobil-urun.md` | inherit | sürümlü Expo dokümanı zorunlu |
| Veri ve senkron | `.claude/agents/veri-senkron.md` | inherit | RLS + outbox |
| Zaman ve bildirim | `.claude/agents/zaman-bildirim.md` | inherit | saat kaydırarak sınar |
| Persona laboratuvarı | `.claude/agents/persona-lab.md` | inherit | harness'ı işletir |
| Erişilebilirlik ve Türkçe | `.claude/agents/erisilebilirlik-dil.md` | sonnet | metin kapısı |
| Mahremiyet ve KVKK | `.claude/agents/mahremiyet-kvkk.md` | inherit | özet sözleşmesi |
| Kanıt denetçisi | `.claude/agents/kanit-denetcisi.md` | inherit | **yazma yetkisi yok** (`disallowedTools`) |
| Sürüm kapısı | `.claude/agents/surum-kapisi.md` | sonnet | CI ve build |
| Deney ve ölçüm | `.claude/agents/deney-olcum.md` | inherit | çağrıldığında |
| Marka ve tasarım | `.claude/agents/marka-tasarim.md` | inherit | ortak inceleme turu |
| Tartışma yöneticisi | `.claude/agents/tartisma-yoneticisi.md` | inherit | en fazla iki tur |

Kanıt denetçisinin yazma araçları bilinçli olarak kapalıdır: denetleyen, denetlediği şeyi
düzeltemez.

Minimum başlangıç ekibi (bugünkü işe göre): kayıt bütünlüğü, mobil ürün, veri ve senkron,
persona laboratuvarı, kanıt denetçisi.
