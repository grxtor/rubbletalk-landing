import { Tag } from './kit'

const PARTS = [
  {
    name: 'Uç birimi',
    tag: 'Sahada',
    body: 'Giriş ve çıkışlara yerleştirilen görüntü işleme ünitesi. Sayımı cihaz üzerinde yapar, dışarı yalnızca sayı çıkar.',
    image: '/frame-tespit.jpg',
    alt: 'Bina girişindeki kamera ünitesi, geçen kişileri sayarken',
    specs: [
      ['Kurulum', 'Giriş başına bir ünite'],
      ['İşleme', 'Cihaz üzerinde'],
    ],
    span: 'md:col-span-3 md:row-span-2',
    frame: 'aspect-[16/10] md:aspect-auto md:min-h-[22rem]',
  },
  {
    name: 'Bulut',
    tag: 'Aktarımda',
    body: 'Ünitelerden gelen sayımı toplar, kat bazında birleştirir ve son bilinen durumu sürekli yedekler.',
    image: '/frame-bulut.jpg',
    alt: 'Bina cephesinde akan veri hatları',
    specs: [['Yedek', 'GSM hat ve yerel bellek']],
    span: 'md:col-span-2',
    frame: 'aspect-[16/9]',
  },
  {
    name: 'Kurtarma paneli',
    tag: 'Müdahalede',
    body: 'Sahadaki ekibin tabletten açtığı görünüm. Bina, kat ve kişi sayısı; sarsıntı anındaki son kayıt.',
    image: '/frame-panel.jpg',
    alt: 'Arama kurtarma ekibinin tabletinde bina doluluk ekranı',
    specs: [['Erişim', 'Yetkili ekip hesabı']],
    span: 'md:col-span-2',
    frame: 'aspect-[16/9]',
  },
]

export default function System() {
  return (
    <section id="sistem" className="border-y border-rule bg-paper-soft py-28 md:py-44">
      <div className="shell">
        <h2
          data-reveal-title
          className="display max-w-[14ch] text-[clamp(2rem,5vw,4rem)] text-ink"
        >
          Üç parça, tek zincir.
        </h2>
        <p
          data-reveal
          className="mt-8 max-w-[44ch] text-[0.9688rem] leading-relaxed text-ink-soft"
        >
          Zincirin herhangi bir halkası koptuğunda sistem susmaz; en son
          doğrulanmış sayıyı taşımaya devam eder.
        </p>

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-5">
          {PARTS.map((part) => (
            <article
              key={part.name}
              data-reveal
              className={[
                'edge group relative flex flex-col overflow-hidden border border-rule bg-paper',
                part.span,
              ].join(' ')}
            >
              <div className={['relative overflow-hidden', part.frame].join(' ')}>
                <img
                  src={part.image}
                  alt={part.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 md:p-8">
                <Tag>{part.tag}</Tag>
                <h3 className="display mt-5 text-[1.5rem] text-ink">{part.name}</h3>
                <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  {part.body}
                </p>
                <dl className="mt-auto pt-7">
                  {part.specs.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-baseline justify-between gap-4 border-t border-rule py-3"
                    >
                      <dt className="label text-ink-soft">{key}</dt>
                      <dd className="font-mono text-[0.8125rem] text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
