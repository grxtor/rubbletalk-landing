# SETE — Scroll Brief

> **Röportaj yapılmadı, konuşmadan türetildi.** Kullanıcı brief'i ve tema kararını
> sohbette verdi; scrollcraft'ın 8 soruluk röportajı ayrıca sorulmadı.

## Ne, kime

Deprem anında binadaki insan sayısını tespit edip arama kurtarma ekiplerine
ileten sistemin tanıtım sayfası. Alıcı: site yönetimleri, kamu binaları,
iş merkezleri.

## Sonunda inanılması gereken tek cümle

Enkaza varan ekip, binada kaç kişi olduğunu tahmin etmek zorunda değil.

## Tek eylem

Demo talep et. Sayfadaki her yerde aynı etiket.

## Yön

Editorial Instrument. Referans pear.no'nun DNA'sı (bkz. `design-dna.json`):
ince serif display, sıkı satır aralığı, mono mikro etiket, hairline ayrım,
asimetrik kompozisyon. Kopya değil, uyarlama.

**Tema:** tek geçiş. Sahne sıcak siyah ve sinematik, sahne bitince sayfa kırık
beyaza çıkıyor. Rastgele bölüm alternasyonu değil, tek kasıtlı geçiş.

## Duygu eğrisi

| Perde | Duygu | Ekranda ne var |
|---|---|---|
| Giriş | Sakin ağırlık | Gün batımında site, tek cümle |
| Tespit | Merak | Kamera, geçen insanlar, sayım kutuları |
| Aktarım | Gerilim | Cepheden akan hatlar, buluta yükseliş |
| **Panel** | **Rahatlama** | **Tabletteki okuma, görüntü çekilir, sayı yanına oturur** |
| Gövde | Güven | Aydınlık, ferah, kanıt |

**Tepe:** son perde. En uzun kaydırma payı onda; görüntü tam ekrandan çekilip
metnin yanına oturuyor ve "binada 14 kişi" okuması açıkta kalıyor.

## İmza hareketi

Kurtarma panelinin **sarsıntı simülasyonu**. Panel canlı çalışır, sayım
kendiliğinden oynar; düğmeye basınca sistem o anın sayımını mühürler, saat
damgası düşer, sayılar donar. Ürünün gerçekte yaptığı şeyin ta kendisi.

## Cihaz dağılımı

| Perde | Cihaz | Neden |
|---|---|---|
| Sahne | `scrub` | Kaydırma videoyu sürüyor; kullanıcı sekansı kendi eliyle geçiriyor |
| Sahne finali | `morph` | Görüntü tam ekrandan panele çekilir, durum değişimi |
| Sorun | asimetrik dikey bloklar | Üç boşluk, üç farklı girinti |
| Sistem | bento + gerçek kare | Üç parça, üç hücre, videodan çıkarılmış görseller |
| Panel | `pointer` | Sayfanın durup kullanıcıya cevap verdiği tek yer |
| Kurulum | çizilen ayraç | Adım sırası geldikçe hairline soldan sağa çiziliyor |

Aynı cihaz iki kez arka arkaya yok.

## Söylenmeyenler

- Panel spec değerleri (±%2, 900 ms, kurulum süreleri) yer tutucudur.
- Gerçek cihazda doğrulama yapılmadı; masaüstü ve mobil yalnızca tarayıcı
  panelinde denendi.
