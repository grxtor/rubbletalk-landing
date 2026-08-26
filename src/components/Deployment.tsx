const STEPS = [
  {
    index: '01',
    title: 'Keşif',
    body: 'Binanın giriş çıkış noktaları, kat planı ve mevcut kamera altyapısı çıkarılır.',
    note: '1 gün',
  },
  {
    index: '02',
    title: 'Montaj',
    body: 'Uç birimler giriş noktalarına takılır. Kablolama mevcut hatlar üzerinden yapılır.',
    note: 'Giriş başına ~2 saat',
  },
  {
    index: '03',
    title: 'Kalibrasyon',
    body: 'Sayım, gerçek giriş çıkışlarla karşılaştırılarak binaya özel eşiklere ayarlanır.',
    note: '3-5 gün',
  },
  {
    index: '04',
    title: 'Devreye alma',
    body: 'Bina, bölgedeki arama kurtarma birimlerinin paneline tanımlanır ve tatbikatla doğrulanır.',
    note: '1 gün',
  },
]

export default function Deployment() {
  return (
    <section
      id="kurulum"
      className="border-y border-rule bg-paper-soft py-28 md:py-44"
    >
      <div className="shell">
        <h2
          data-reveal-title
          className="display mt-7 max-w-[18ch] text-[clamp(1.75rem,3.6vw,2.875rem)] text-ink"
        >
          Mevcut binaya dört adımda girer.
        </h2>
        <p
          data-reveal
          className="mt-6 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft"
        >
          Bina otomasyonu değiştirilmez, tadilat gerekmez. Sistem mevcut altyapının
          üzerine kurulur.
        </p>

        <ol className="mt-14 md:mt-20">
          {STEPS.map((step, i) => (
            <li
              key={step.index}
              className="group relative grid gap-3 py-8 md:grid-cols-[5rem_14rem_1fr_8rem] md:items-baseline md:gap-8"
            >
              {/* Adım sırası geldikçe soldan sağa çizilen ayraç */}
              <span
                data-reveal-line
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-rule"
                aria-hidden="true"
              />
              {i === STEPS.length - 1 && (
                <span
                  data-reveal-line
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-rule"
                  aria-hidden="true"
                />
              )}

              <span className="label text-ink-soft transition-transform duration-300 group-hover:translate-x-1">
                {step.index}
              </span>
              <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                {step.body}
              </p>
              <span className="text-[0.8125rem] text-ink-soft md:text-right">
                {step.note}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
