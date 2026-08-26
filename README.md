# SETE — Landing Page

Deprem anında bina doluluğunu arama kurtarma ekiplerine bildiren sistemin tanıtım sayfası.
React + Tailwind CSS v4 + GSAP ScrollTrigger.

```bash
pnpm install
pnpm dev
```

## Sahne nasıl çalışıyor

`src/lib/beats.ts` sahnenin tek doğruluk kaynağı. Her adımın `at` / `until` değeri
doğrudan **videonun saniyesi**. `ScrollStage` içindeki GSAP zaman çizelgesi video
süresiyle birebir aynı uzunlukta kurulduğu için, bir kartı kaydırmak istediğinde
sadece bu saniyeleri değiştirmen yeterli — scroll matematiğine dokunmaya gerek yok.

Masaüstünde video tam ekran arka plandır; son adımda beyaz zemine oturan bir panele
çekilir, böylece tabletteki okuma kartın altında kalmaz. Dar ekranda video baştan
itibaren üstte sabit 16:9 paneldir, kartlar altında belirir.

## Sayfa yapısı

| Bölüm | Dosya | Not |
|---|---|---|
| Scroll sahnesi | `ScrollStage.tsx` | Video scrub + 3 adım kartı |
| Sorun | `Reality.tsx` | |
| Sistem | `System.tsx` | Üç bileşen, teknik satırlar |
| Kurtarma Paneli | `RescuePanel.tsx` | **Canlı ve etkileşimli** — kat seçimi, sarsıntı simülasyonu |
| Güvence | `Assurance.tsx` | Veri / süreklilik |
| Kurulum | `Deployment.tsx` | Dört adım |
| SSS | `Faq.tsx` | GSAP akordeon |
| İletişim | `Closing.tsx` | |

Bölüm giriş hareketleri `lib/useReveal.ts` içinde tek yerden yönetilir:
`data-reveal-title` (SplitText ile satır satır), `data-reveal-group` (çocuklar
sırayla), `data-reveal` (tek öğe), `data-reveal-line` (soldan sağa çizilen ayraç).

## Video değiştirilecekse

Scroll ile scrub edilen video **sık keyframe** ister; yoksa kaydırma takılır.
Kaynak videoyu `public/sete-scroll.mp4` olarak koymadan önce:

```bash
ffmpeg -i kaynak.mp4 -an -c:v libx264 -preset slow -crf 24 -g 4 -keyint_min 4 \
  -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/sete-scroll.mp4
```

Poster karesi:

```bash
ffmpeg -i public/sete-scroll.mp4 -frames:v 1 -q:v 4 public/poster.jpg
```

Süre değişirse `beats.ts` içindeki saniyeleri yeni videoya göre güncelle.

`SCENE_END` sahnenin durduğu karedir — mevcut video 10.04 saniye ama son yarım
saniyede görüntü kamera planına geri döndüğü için sahne 9.0'da duruyor.
`SCENE_TAIL` ise görüntü durduktan sonra son kartın oturması için bırakılan
kaydırma payı.
