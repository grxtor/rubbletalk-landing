const COLUMNS = [
  {
    title: 'Veri',
    points: [
      'Görüntü cihazdan dışarı çıkmaz; buluta yalnızca sayı gider.',
      'Yüz tanıma, kimlik eşleştirme ve kişi takibi yapılmaz.',
      'Kayıtlar kişiye değil, binaya ve kata bağlıdır.',
      'Panel erişimi yetkili arama kurtarma hesaplarıyla sınırlıdır.',
    ],
  },
  {
    title: 'Süreklilik',
    points: [
      'Elektrik kesildiğinde üniteler yedek güçle çalışmaya devam eder.',
      'İnternet koptuğunda sayım yerel bellekte tutulur ve GSM hattına geçilir.',
      'Bulut erişilemezse panel, son doğrulanmış kaydı gösterir.',
      'Sarsıntı algılandığı an o dakikanın durumu ayrıca mühürlenir.',
    ],
  },
]

const VENUES = [
  'Konut siteleri',
  'İş merkezleri',
  'Kamu binaları',
  'Okullar',
  'Hastaneler',
  'Yurtlar',
  'Alışveriş merkezleri',
  'Oteller',
]

export default function Assurance() {
  return (
    <section id="guvence" className="bg-paper py-28 md:py-44">
      <div className="shell">
        <h2
          data-reveal-title
          className="display mt-7 max-w-[18ch] text-[clamp(1.75rem,3.6vw,2.875rem)] text-ink"
        >
          Kimliği değil, sayıyı bilir.
        </h2>

        <div
          data-reveal-group
          className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16"
        >
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink">
                {column.title}
              </h3>
              <ul className="mt-6">
                {column.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-4 border-t border-rule py-4 last:pb-0"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 edge-control bg-signal"
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-ink-soft">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-20 border-t border-rule pt-10">
          <p className="label text-ink-soft">Kurulduğu yerler</p>
          <ul data-reveal-group className="mt-6 flex flex-wrap gap-2.5">
            {VENUES.map((venue) => (
              <li
                key={venue}
                className="edge-control border border-rule bg-paper-soft px-4 py-2 text-[0.8125rem] text-ink"
              >
                {venue}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
