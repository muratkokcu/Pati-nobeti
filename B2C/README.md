# PatiNöbeti / PetShift

İki veya daha fazla kişinin baktığı, düzenli ilaç ya da en az 30 günlük bakım
planı bulunan evcil hayvanlar için ortak bakım devir uygulaması.

> Kimin, hangi bakımı, ne zaman kaydettiğini herkes görür; diğer bakım verenler
> aynı işi yaptığını varsaymak zorunda kalmaz.

## Durum

- Aşama: 30 günlük B2C doğrulama
- Hedef: iki aktif bakım verenli kronik/uzun süreli bakım hanesi
- İş modeli: hane aboneliği; paylaşım ücretli değerin merkezidir
- AI: ilk sürümde yok
- Birinci dağıtım kanalı: veteriner çıkışı ve pet-sitter/foster ağı

## Belgeler

- [Ürün kararı](docs/01-urun-karari.md)
- [30 günlük doğrulama](docs/02-dogrulama-plani.md)
- [MVP ve güvenlik](docs/03-mvp-ve-mimari.md)
- [İş modeli](docs/04-is-modeli.md)
- [Ekip ve operasyon](docs/05-ekip-ve-operasyon.md)
- [Kaynaklar](docs/06-kaynaklar.md)
- [MVP uygulama durumu](docs/07-mvp-uygulama-durumu.md)
- [MVP ortak inceleme](docs/09-mvp-ortak-inceleme.md)
- [Production omurgası](docs/10-production-omurga.md)
- [Simüle kullanıcı testi bulguları](docs/08-kullanici-testi-bulgulari.md)
- [Karar kaydı](docs/adr/0001-patinobeti-secimi.md)
- [Stack ve marka kararı](docs/adr/0002-mvp-stack-ve-marka.md)

## Uygulamayı çalıştırma

```bash
cd apps/mobile
npm install
npm run typecheck
npm test
npm run android
```

Native SQLite ve bildirim davranışları için development build kullanılmalıdır.
