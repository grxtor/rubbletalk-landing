import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type Floor = {
  id: string
  name: string
  use: string
  count: number
}

/* Başlangıç toplamı 14: sahnedeki tablette okunan sayıyla aynı. */
const FLOORS: Floor[] = [
  { id: 'k5', name: '5. Kat', use: 'Daire 12, 13', count: 3 },
  { id: 'k4', name: '4. Kat', use: 'Daire 10, 11', count: 2 },
  { id: 'k3', name: '3. Kat', use: 'Daire 8, 9', count: 4 },
  { id: 'k2', name: '2. Kat', use: 'Daire 6, 7', count: 0 },
  { id: 'k1', name: '1. Kat', use: 'Daire 4, 5', count: 3 },
  { id: 'z', name: 'Zemin', use: 'Giriş ve lobi', count: 2 },
  { id: 'b1', name: 'Bodrum', use: 'Otopark', count: 0 },
]

const MAX_PER_FLOOR = 6

/* Sahnedeki tablet 14 okuyor; canlı akış o sayının etrafında kalır. */
const TOTAL_MIN = 12
const TOTAL_MAX = 16

function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useRef(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const state = { n: shown.current }
    const tween = gsap.to(state, {
      n: value,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: () => {
        shown.current = state.n
        el.textContent = String(Math.round(state.n))
      },
    })
    return () => {
      tween.kill()
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}

export default function RescuePanel() {
  const [floors, setFloors] = useState(FLOORS)
  const [selected, setSelected] = useState('z')
  const [sealed, setSealed] = useState<{ total: number; time: string } | null>(null)

  const total = floors.reduce((sum, floor) => sum + floor.count, 0)
  const current = floors.find((floor) => floor.id === selected) ?? floors[0]

  /* Canlı akış: mühürlenene kadar giriş çıkışlar sayımı oynatır. */
  useEffect(() => {
    if (sealed) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setFloors((prev) => {
        const total = prev.reduce((sum, floor) => sum + floor.count, 0)

        /* Doluluk gerçek bir binada olduğu gibi dar bir bantta salınır.
           Serbest bıraksak toplam sürüklenip sahnedeki 14 ile bağını koparıyor. */
        let delta = Math.random() > 0.5 ? 1 : -1
        if (total >= TOTAL_MAX) delta = -1
        if (total <= TOTAL_MIN) delta = 1

        const i = Math.floor(Math.random() * prev.length)
        const next = prev[i].count + delta
        if (next < 0 || next > MAX_PER_FLOOR) return prev

        return prev.map((floor, index) =>
          index === i ? { ...floor, count: next } : floor,
        )
      })
    }, 2400)

    return () => window.clearInterval(timer)
  }, [sealed])

  const seal = () =>
    setSealed({
      total,
      time: new Date().toLocaleTimeString('tr-TR'),
    })

  return (
    <section id="kurtarma" className="bg-paper py-28 md:py-44">
      <div className="shell">
        <p data-reveal className="label text-ink-soft">
          Kurtarma Paneli
        </p>
        <h2
          data-reveal-title
          className="display mt-7 max-w-[15ch] text-[clamp(2rem,5vw,4rem)] text-ink"
        >
          Ekibin sahada gördüğü ekran.
        </h2>
        <p
          data-reveal
          className="mt-8 max-w-[52ch] text-[0.9688rem] leading-relaxed text-ink-soft"
        >
          Aşağıdaki panel canlı çalışıyor. Sarsıntı düğmesine bastığında sistem o
          anın sayımını mühürler. Gerçek bir depremde yaptığı da tam olarak budur.
        </p>

        <div
          data-reveal
          className={[
            'mt-14 overflow-hidden edge border transition-colors duration-500 md:mt-20',
            sealed ? 'border-alarm/35 bg-alarm/[0.03]' : 'border-rule bg-paper',
          ].join(' ')}
        >
          {/* Panel başlığı */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-6 py-4 md:px-8">
            <div className="flex items-center gap-2.5">
              <span
                className={[
                  'h-1.5 w-1.5 edge-control',
                  sealed ? 'bg-alarm' : 'animate-pulse bg-ink/40',
                ].join(' ')}
                aria-hidden="true"
              />
              <span className="label text-ink">
                {sealed ? 'Sarsıntı algılandı' : 'Canlı'}
              </span>
              <span className="text-[0.8125rem] text-ink-soft">
                {sealed
                  ? `${sealed.time} itibarıyla mühürlendi`
                  : 'Bahçelievler Sitesi, B Blok'}
              </span>
            </div>

            <button
              type="button"
              onClick={sealed ? () => setSealed(null) : seal}
              className={[
                'edge-control px-5 py-2 text-[0.8125rem] font-medium transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5',
                sealed
                  ? 'border border-rule bg-paper text-ink hover:border-ink/25'
                  : 'bg-alarm text-white hover:brightness-90',
              ].join(' ')}
            >
              {sealed ? 'Canlıya dön' : 'Sarsıntı anını simüle et'}
            </button>
          </div>

          <div className="grid md:grid-cols-[1fr_20rem]">
            {/* Kat listesi */}
            <ul className="p-3 md:p-5">
              {floors.map((floor) => {
                const isActive = floor.id === selected
                return (
                  <li key={floor.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(floor.id)}
                      onMouseEnter={() => setSelected(floor.id)}
                      className={[
                        'grid w-full grid-cols-[5.5rem_1fr_2.5rem] items-center gap-4 edge-sm px-4 py-3.5 text-left transition-colors duration-200',
                        isActive ? 'bg-signal/[0.09]' : 'hover:bg-paper-soft',
                      ].join(' ')}
                    >
                      <span className="text-[0.875rem] font-medium text-ink">
                        {floor.name}
                      </span>

                      <span className="flex items-center gap-3">
                        <span className="h-1.5 flex-1 overflow-hidden edge-control bg-rule">
                          <span
                            className={[
                              'block h-full edge-control transition-[width,background-color] duration-500 ease-out',
                              sealed ? 'bg-alarm' : 'bg-ink/35',
                            ].join(' ')}
                            style={{
                              width: `${(floor.count / MAX_PER_FLOOR) * 100}%`,
                            }}
                          />
                        </span>
                        <span className="hidden text-[0.8125rem] text-ink-soft sm:block">
                          {floor.use}
                        </span>
                      </span>

                      <span className="text-right text-[0.9375rem] font-semibold tabular-nums text-ink">
                        <Counter value={floor.count} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Seçili kat ve toplam */}
            <aside className="border-t border-rule p-6 md:border-t-0 md:border-l md:p-8">
              <p className="label text-ink-soft">Binada bulunan</p>
              <p
                className={[
                  'mt-4 text-[3.5rem] leading-none font-semibold tracking-tight tabular-nums transition-colors duration-500',
                  sealed ? 'text-alarm' : 'text-ink',
                ].join(' ')}
              >
                <Counter value={sealed ? sealed.total : total} />
              </p>
              <p className="mt-2 text-[0.8125rem] text-ink-soft">
                {sealed ? 'mühürlenmiş kayıt' : 'kişi, anlık'}
              </p>

              <div className="mt-8 border-t border-rule pt-6">
                <p className="label text-ink-soft">Seçili kat</p>
                <p className="mt-3 text-[1.0625rem] font-semibold tracking-tight text-ink">
                  {current.name}
                </p>
                <p className="mt-1 text-[0.8125rem] text-ink-soft">{current.use}</p>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tabular-nums text-ink">
                    <Counter value={current.count} />
                  </span>
                  <span className="text-[0.8125rem] text-ink-soft">kişi</span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
