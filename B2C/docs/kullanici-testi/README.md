# Kullanıcı testi — 10 persona, yerel MVP (18 Eylül 2026)

On simüle persona `apps/mobile` yerel demo MVP'sini kendi izole cihaz profilinde gerçekten
kullandı, sonra birbirlerinin bulgularına itiraz edip 30 günlük önceliklere oy verdi.
**Gerçek kullanıcı görüşmesi değildir** — statü ve sınırlar: `00-yontem-ve-tekrar-calistirma.md`.

## Nereden başlamalı

| Ne arıyorsan | Dosya |
|---|---|
| Ne geliştireceğim, hangi sırayla | `01-bulgu-listesi.md` → öncelik özeti |
| Hangi bulgular düzeltildi, nasıl doğrulandı | `04-uygulanan-duzeltmeler.md` |
| Bir bulgunun tekrar adımı, kod yeri, kabul kriteri | `01-bulgu-listesi.md` (B-01…B-60) |
| Oylar, fiyat beyanları, paketleme, çözülmeyen çatışmalar | `03-oylar-fiyat-ve-oncelik.md` |
| Testin nasıl yapıldığı, neyin kanıt sayılmadığı, tekrar çalıştırma | `00-yontem-ve-tekrar-calistirma.md` |
| Personaların kim olduğu (tekrar testte aynısı kullanılmalı) | `02-persona-kunyeleri.md` |
| Bir kullanıcının ham deneyimi | `raporlar/<persona>.md` |
| Kimin kime neden itiraz ettiği, kimin fikrini değiştirdiği | `tartisma/` |
| Ekranın o an nasıl göründüğü | `ekran-goruntuleri/<persona>/` |
| Bir bulgunun hangi adımlarla üretildiği | `harness/oturum-scriptleri/<persona>.js` |
| Yönetici özeti | `../08-kullanici-testi-bulgulari.md` |

## Üç cümlede sonuç

1. Ürünün tek işi "bugün verildi mi" sorusunu doğru cevaplamaktı ve test sırasındaki sürüm bu
   soruya yanlış cevap verebiliyordu; **bu dört bulgu (B-01, B-02, B-03, B-07) 18 Eylül 2026'da
   düzeltildi** (`04-uygulanan-duzeltmeler.md`).
2. Aktivasyon zinciri üründe kopuk: ikinci bakım veren davet edilemiyor, kendi planı kurulamıyor.
3. Dil ve tıbbi sorumluluk sınırı 10/10 onay aldı — değiştirilmemeli.

## Kritik ayrım

Her bulgu `[Ü] ürün eksiği`, `[D] demo sınırı` veya `[H] harness sınırı` olarak işaretlendi.
Yalnızca **[Ü]** olanlar backend olmadan da düzelir ve 30 günlük listeye girer.
