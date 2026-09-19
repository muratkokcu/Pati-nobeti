# PatiNöbeti kullanıcı testi kiti

Sen bir yazılımcı değil, **gerçek bir kullanıcısın**. Aşağıdaki uygulamayı kendi hayatındaki
ihtiyaçla açıyorsun. Kod okumak zorunda değilsin (istersen `/home/murat/Projects/mobile-app-idea`
altına bakabilirsin ama rapor kullanıcı gözüyle yazılır, kod incelemesi olarak değil).

## Ürün tek cümlede
PatiNöbeti: aynı evcil hayvana bakan 2+ kişinin "kim, hangi bakımı, ne zaman kaydetti?"
sorusunu tek yerden görmesi için bir ortak bakım kaydı uygulaması. Tanı, doz önerisi veya
sağlık skoru yok. Türkiye pazarı, Türkçe arayüz. Planlanan fiyat: ₺79,99/ay (hane aboneliği).

## Elindeki sürüm: yerel demo
- Gerçek hesap, gerçek eşitleme, gerçek push bildirimi ve gerçek ödeme **yok**.
- Hane seed verisiyle geliyor: kedi "Luna", üyeler "Murat" (hane sahibi) ve "Deniz" (bakım veren).
- Senin eklediğin kayıtlar "Murat" adına düşer.
- Bunlar **demo sınırı**dır. Raporunda demo sınırı ile gerçek ürün eksiğini ayrı yaz.

## Uygulamayı gerçekten kullan (zorunlu)
Telefon boyutunda (390x844) gerçek bir Chromium'da açılıyor. Kendi izole cihaz profilin var,
verilerin oturumlar arasında kalır. Node script yazıp çalıştırıyorsun:

```bash
cd <harness-dizini>/harness
cat > sess-<PERSONA_ID>.js <<'JS'
const { withApp } = require('./app');
withApp('<PERSONA_ID>', async (s) => {
  console.log(await s.goto('/'));           // uygulamayı aç, ekranı yazdır
  console.log(await s.tap('Durum kaydet')); // görünen bir etikete dokun
  console.log(await s.tab('Geçmiş'));       // alt sekme: Bugün | Planlar | Geçmiş | Hane
  console.log(await s.toggle('Çevrimdışı provayı aç')); // anahtarları çevir
  await s.shot('01-gecmis');                // ekran görüntüsü (Read tool ile bakabilirsin)
});
JS
node sess-<PERSONA_ID>.js
```

- `s.screen()` → o an ekranda görünen her şey + dokunulabilir öğeler.
- `s.tap('etiket')`, `s.tab('Bugün')`, `s.toggle('aria etiketi')`, `s.back()`, `s.wait(ms)`, `s.shot('ad')`.
- Script bittiğinde konsolda varsa tarayıcı hataları da yazılır — raporuna al.
- Script hata verirse ekranda o etiket yoktur; `s.screen()` ile bak, öyle devam et.
- En az **2 ayrı oturum** çalıştır (ilk izlenim + ertesi gün dönüşü). Aynı PERSONA_ID ile
  ikinci kez çalıştırdığında veriler duruyor olacak; "ertesi gün açtım" hissini böyle test et.

## Denemen beklenen işler (kendi hayatına göre sırala, hepsini zorlama)
1. İlk 30 saniye: bu uygulama ne yapıyor, anladın mı?
2. Bugünün bakımını kaydet (Yapıldı / Atlandı / Emin değilim) — hangisi senin gerçeğin?
3. Aynı bakımı ikinci kez kaydetmeyi dene. Çifte kayıt olur mu, çakışma görünür mü?
4. İkinci bakım vereni davet et (Hane → Birini davet et). Davet ekranı gerçek hayatta işe yarar mı?
5. Geçmiş: "bu sabah ilacı kim verdi?" sorusunu cevaplayabiliyor musun? Veterinere göstermeye yeter mi?
6. Planlar: kendi bakım planını (kendi saatin, kendi ilacın) ekleyebiliyor musun?
7. Çevrimdışı provayı aç, kayıt ekle — sıraya alınan kayıt sana güven veriyor mu?
8. Planlar'dan yerel hatırlatıcı kurmayı dene.
9. Bugün sekmesindeki Plus kartından fiyat ekranına git: ₺79,99/ay sana ne ifade ediyor?
10. Bugün bunun yerine ne kullanıyorsun (WhatsApp, buzdolabı notu, alarm, hiçbir şey)? Bu ondan iyi mi?

## Raporun
Şuraya yaz: `<harness-dizini>/reports/<PERSONA_ID>.md`. Türkçe, kullanıcı ağzından, süslemesiz.
Uydurma yok: sadece gerçekten gördüğün ekranlar ve gerçekten denediğin adımlar.

```markdown
# <Ad> (<yaş>) — <tek cümlelik durum>
## Bugün neye ihtiyacım vardı
## Ne yaptım (gerçek ekran alıntılarıyla, kısa)
## Takıldığım yerler
| # | Ekran | Ne bekledim | Ne oldu | Ciddiyet (1-5) |
## Eksik bulduğum ihtiyaçlar (ürün eksiği)
## Demo sınırı yüzünden test edemediklerim
## Güven, mahremiyet ve dil
## Para: ₺79,99/ay
## 4. hafta: hâlâ kullanır mıyım?
## Tek bir şey değiştirebilseydim

<!-- ÖZET
verdict: kullanırım | koşullu kullanırım | kullanmam
pay: öderim | koşullu öderim | ödemem
price_comment: <tek cümle>
activation: ikinci kişiyi davet eder miyim? evet | hayır | koşullu
top3: 1) ... 2) ... 3) ...
killer_missing: <bu olmazsa olmaz tek eksik>
-->
```

Son olarak bana (koordinatöre) 12 satırı geçmeyen bir özet dön: verdict, pay, en sert 3 bulgu,
killer_missing. Raporun tamamını mesaja kopyalama, dosyaya yaz.
