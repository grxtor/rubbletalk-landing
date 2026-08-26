/**
 * Sahnenin tek doğruluk kaynağı.
 *
 * `at` ve `until` değerleri doğrudan videonun saniyeleridir; GSAP zaman çizelgesi
 * de video süresiyle birebir aynı uzunlukta kurulduğu için metinler her zaman
 * görüntüdeki doğru anın üzerine gelir.
 *
 * Videodaki anlar:
 *   0.0 - 2.2  havadan geniş plan, konut kompleksi
 *   3.0 - 5.6  giriş kamerası, geçen insanlar, sayım kutuları
 *   6.0 - 8.5  cepheden akan veri hatları, buluta yükseliş
 *   8.3 - 9.0  sahadaki tablette bina doluluk bilgisi
 */

export const VIDEO_SRC = '/sete-scroll.mp4'
export const VIDEO_POSTER = '/poster.jpg'
export const VIDEO_DURATION = 10.04

/**
 * Sahnenin durduğu video saniyesi.
 *
 * Kaynak 10.04 saniye, ama son yarım saniyede görüntü kamera planına geri
 * dönüyor; 9.3 civarında da itfaiyecinin eli tabletteki sayının üstüne geliyor.
 * Sahnenin son karesi tablet okuması olsun diye 9.0'da duruyoruz.
 */
export const SCENE_END = 9.0

/** Görüntü durduktan sonra son metnin oturması için bırakılan kaydırma payı. */
export const SCENE_TAIL = 0.9

export type Side = 'left' | 'right'

export type Beat = {
  id: string
  title: string
  body: string
  side: Side
  /** Metnin belirdiği video saniyesi */
  at: number
  /** Metnin çekildiği video saniyesi */
  until: number
  readout?: { value: string; caption: string }
}

export const BEATS: Beat[] = [
  {
    id: 'tespit',
    title: 'Binayı izlemez.\nSayar.',
    body: 'Giriş ve çıkışlardaki görüntü işleme birimleri kimlik verisi tutmaz. Yalnızca kaç kişinin girdiğini ve kaç kişinin çıktığını hesaplar.',
    side: 'right',
    at: 3.1,
    until: 5.5,
    readout: { value: '±%2', caption: 'sayım sapması' },
  },
  {
    id: 'bulut',
    title: 'Hat koparsa\nsusmaz.',
    body: 'Sayım şifreli olarak buluta akar. Elektrik ya da internet kesildiğinde sistem yedek hatta ve yerel belleğe geçer; son bilinen durum kaybolmaz.',
    side: 'left',
    at: 6.2,
    until: 8.1,
    readout: { value: '900 ms', caption: 'ortalama gecikme' },
  },
  {
    id: 'panel',
    title: 'Ekip nereyi\nkazacağını bilir.',
    body: 'Arama kurtarma sahaya vardığında binadaki kişi sayısını ve kat dağılımını tabletinden görür. Tahmin etmez.',
    side: 'right',
    at: 8.35,
    until: SCENE_END,
    readout: { value: '14 kişi', caption: 'binada bulunan' },
  },
]

/** Girişin ekranda kaldığı süre */
export const INTRO_UNTIL = 2.1
