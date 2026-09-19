# Ekran haritası — mevcut, kısmi ve eksik ekranlar

Tarih: 19 Eylül 2026 · Kaynak: `apps/mobile/src/app/**` rota envanteri (16 dosya) + kullanıcı
testi bulguları (`kullanici-testi/01-bulgu-listesi.md`) + sektör kıyaslaması
(`tasarim-kiyaslama/04-sentez-ve-aksiyon.md`)

## 1. Tespit

Ürünün ekran portföyü **günlük döngüyü** kuruyor ama **kurulum, yönetim ve çıkış** akışları
eksik. Bugün/Planlar/Geçmiş/Hane dörtlüsü ve kayıt akışı var; hayvan eklemek, plan kurmak,
davet göndermek, ayar değiştirmek, veri çıkarmak için ekran yok. Kullanıcı ilk günü geçirebilir,
ikinci haftayı yönetemez.

## 2. Mevcut ekranlar

| Rota | İşi | Durum |
|---|---|---|
| `index.tsx` | Açılış yönlendirmesi (demo/production ayrımı) | tam |
| `auth.tsx` | Giriş + kayıt, tek form iki sekme | tam |
| `auth/callback.tsx` | E-posta doğrulama dönüşü | tam |
| `auth/reset.tsx` | Şifre sıfırlama | kısmi — e-posta deep link doğrulanmadı |
| `onboarding.tsx` | 3 adım: görünen ad → hane + hayvan → ilk plan | tam (ilk kurulum), sonradan düzenleme yok |
| `(tabs)/index.tsx` | Bugün: hero, ŞİMDİ kartı, günün satırları | tam (19 Eylül'de yeniden tasarlandı) |
| `(tabs)/plans.tsx` | Plan listesi | **iskele** — salt okunur, 27 satır |
| `(tabs)/history.tsx` | Kayıt geçmişi | **iskele** — düz liste, 15 satır, filtre/gruplama yok |
| `(tabs)/household.tsx` | Hane üyeleri | kısmi — liste var, yönetim yok |
| `record/[occurrenceId].tsx` | Durum kaydı + çakışma netleştirme | tam |
| `record/today/[planId].tsx` | Bildirimden gelen kayıt | tam |
| `invite/[token].tsx` | Daveti kabul etme (davet edilen taraf) | tam |
| `invite/new.tsx` | Davet oluşturma ve gönderme (davet eden taraf) | tam (QR ve rol/süre seçimi yok) |
| `paywall.tsx` | Plus önizlemesi | kısmi — 20 satır, üründen görsel yok |
| `design-system.tsx` | İç tasarım galerisi | tam (geliştirme aracı, mağazaya çıkmaz) |

## 3. Eksik ekranlar

**P0 — bunlar olmadan ürün 30 günlük deneyi ölçemez**

| Eksik ekran | Neyi çözüyor | Kapatacağı bulgu |
|---|---|---|
| ~~**Davet gönderme**~~ → `invite/new.tsx` **yapıldı** (19 Eyl) | İkinci bakım veren artık davet edilebiliyor; QR ve süreli/rol seçimi hâlâ yok | B-16 kapandı · B-20, B-21 açık |
| **Plan oluşturma / düzenleme / silme** | Kendi ilacını, saatini, tekrarını kuramıyor; herkes seed planıyla yaşıyor | B-24, B-25, B-26, B-27 |
| **Kayıt düzeltme / geri alma** | Yanlış kayıt kalıcı; tek çıkış toptan sıfırlama | B-10, B-13 |
| **Hatırlatıcı ve bildirim ayarları** (kişi başına) | Hatırlatıcı 20:00'ye sabit kodlu; kaçırılan bakım uyarısı yok | B-28…B-33 |

**P1 — ilk gerçek hanelerde hemen gerekecek**

| Eksik ekran | Neyi çözüyor | Kapatacağı bulgu |
|---|---|---|
| **Hayvan profili: ekleme, düzenleme, fotoğraf** | Onboarding dışında hayvan eklenemiyor; fotoğraf yükleme akışı yok | B-23 (kısmen), yeni hero'nun gerçek veriyle çalışması |
| **Üye yönetimi** (rol değiştirme, çıkarma, haneden ayrılma) | Hane ekranı salt okunur; yetkiler yazılı değil | B-18, B-19 |
| **Hesap ve profil ayarları** (ad, e-posta, şifre, çıkış) | Hiçbir ayar ekranı yok; `/settings` 404 | B-43 |
| **Gizlilik ve KVKK** (aydınlatma, veri dışa aktarma, hesap silme) | Beta kapısının 6. maddesi | B-43, beta kapısı |
| **Geçmiş: gün gruplama, tarih filtresi** | Geçmiş veterinere gösterilecek hâlde değil | B-38, B-09 |
| **Paylaşılabilir 30 günlük özet** (isimsiz, süreli link) | Paywall'da satılan özellik üründe yok | B-37, B-39, B-42 |

**P2 — sonraki dalga**

| Eksik ekran | Neyi çözüyor |
|---|---|
| Çoklu hayvan listesi ve geçişi | Aylin ve Zeynep'in terk şartı (B-23) |
| Bildirim izni açıklama ekranı (izin isteğinden önce) | İzin reddi sonrası kullanıcı ayarlara yönlendirilmiyor (B-30) |
| Abonelik yönetimi (mağaza durumu, iptal, geri yükleme) | Ödeme akışının kendisi |
| Çoklu hane geçişi / süreli bakıcı rolü | Sinem'in profesyonel akışı (B-21, B-22) |
| Yardım, hakkında, sürüm, destek | Ürün olgunluğu |

## 4. Durum ekranları — ayrı bir eksik kategori

Ekran listesinde görünmeyen ama tasarlanması gereken haller. Şu an çoğu ya boş bir metin ya hiç yok:

- **Boş durumlar:** hayvan yok · plan yok · bugün kayıt yok (var) · geçmiş boş (var) · hane tek kişi
- **Hata durumları:** bağlantı yok · eşitleme başarısız · oturum süresi doldu · davet süresi dolmuş/geçersiz · veritabanı açılamadı (19 Eylül'de eklendi)
- **Yükleniyor:** ilk açılış, yenileme, kayıt gönderimi (kısmen var)
- **İzin durumları:** bildirim reddedildi · fotoğraf erişimi reddedildi

## 5. Önerilen akış haritası

```
Açılış
 ├─ oturum yok ──> Giriş / Kayıt ──> E-posta doğrulama
 └─ oturum var ──> hane yok ──> Kurulum (ad → hane + hayvan → ilk plan)
                   └─ hane var ──> BUGÜN
                                    ├─ kayıt: Durum kaydı ─ (çakışma) ─> Netleştirme
                                    ├─ düzeltme: Kaydı düzelt        [EKSİK]
                                    ├─ PLANLAR ─> Plan ekle/düzenle  [EKSİK]
                                    │             └─ Hatırlatıcı ayarları [EKSİK]
                                    ├─ GEÇMİŞ ─> Gün detayı [EKSİK] ─> 30 günlük özet [EKSİK]
                                    └─ HANE ─> Davet gönder [EKSİK]
                                               ├─ Üye yönetimi [EKSİK]
                                               ├─ Hayvan profili [EKSİK]
                                               └─ Ayarlar [EKSİK] ─> KVKK / veri [EKSİK]
```

## 6. Sıra önerisi

1. ~~Davet gönderme~~ — **yapıldı** (19 Eylül).
2. **Plan oluşturma/düzenleme** — ürünü kullanıcının kendi gerçeğine bağlar.
3. **Kayıt düzeltme + geri alma** — 10/10 persona istedi, tasarımı tartışmada bitti.
4. **Hayvan profili + fotoğraf** — yeni hero gerçek veriyle ancak bununla çalışır.
5. **Bildirim ayarları** — Bugün ekranı artık doğru cevabı verdiği için bildirimin dayanacağı veri hazır.
6. **Ayarlar + KVKK + özet** — beta kapısının kalan maddeleri.

Her ekran, tasarım sistemine (`tasarim-kiyaslama/05-tasarim-sistemi.md`) ve erişilebilirlik kabul
listesine (`06-erisilebilirlik-kabul-listesi.md`) uyacak; sahibi `arayuz-muhendisi`, kapısı
`urun-yonu` (sıradanlık vetosu) ve `bitirme-denetcisi`.
