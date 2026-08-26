import { useEffect, useId, useRef, useState } from 'react'
import gsap from 'gsap'
import { Plus } from '@phosphor-icons/react'

const QUESTIONS = [
  {
    q: 'Sistem kişileri tanıyor mu?',
    a: 'Hayır. Uç birim görüntüyü cihaz üzerinde işler ve yalnızca "kaç kişi girdi, kaç kişi çıktı" bilgisini üretir. Görüntü kaydedilmez, dışarı aktarılmaz; yüz tanıma ve kimlik eşleştirme yapılmaz.',
  },
  {
    q: 'Deprem anında elektrik ve internet giderse ne olur?',
    a: 'Üniteler yedek güçle çalışmaya devam eder, sayım yerel bellekte tutulur ve aktarım GSM hattına geçer. Hiçbiri çalışmazsa panel, sarsıntı anında mühürlenen son kaydı gösterir.',
  },
  {
    q: 'Sayım ne kadar doğru?',
    a: 'Kalibrasyon sonrası tipik sapma ±%2 bandındadır. Kalabalık giriş çıkışlarda sapma kısa süreli artar, hareket durulduğunda sayım kendini toparlar.',
  },
  {
    q: 'Panele kim erişebiliyor?',
    a: 'Erişim, binanın bağlı olduğu bölgedeki yetkili arama kurtarma birimlerinin hesaplarıyla sınırlıdır. Site yönetimi kendi binasının toplam sayısını görür, kişi bazlı hiçbir veri göremez.',
  },
  {
    q: 'Mevcut kameralarımız kullanılabilir mi?',
    a: 'Çoğu durumda evet. Keşif sırasında mevcut kameraların konumu ve çözünürlüğü değerlendirilir; yetersiz kalan giriş noktalarına uç birim eklenir.',
  },
]

function Question({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return

    gsap.killTweensOf(el)
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isOpen) {
      gsap.to(el, {
        height: 'auto',
        opacity: 1,
        duration: calm ? 0 : 0.45,
        ease: 'power2.out',
      })
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: calm ? 0 : 0.3,
        ease: 'power2.in',
      })
    }
  }, [isOpen])

  return (
    <div className="border-t border-rule last:border-b last:border-rule">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={id}
          className={[
            'flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-[1.0625rem] font-medium tracking-tight transition-colors duration-200 hover:text-ink-soft',
            isOpen ? 'text-ink-soft' : 'text-ink',
          ].join(' ')}
        >
          {question}
          <Plus
            weight="light"
            className={[
              'h-4 w-4 shrink-0 transition-transform duration-300',
              isOpen ? 'rotate-45' : 'rotate-0',
            ].join(' ')}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        ref={bodyRef}
        id={id}
        aria-hidden={!isOpen}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="max-w-[62ch] pb-7 text-[0.9375rem] leading-relaxed text-ink-soft">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="sss" className="bg-paper py-28 md:py-44">
      <div className="shell">
        <h2
          data-reveal-title
          className="display mt-7 max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.875rem)] text-ink"
        >
          Önce sorulanlar.
        </h2>

        <div data-reveal-group className="mt-14 md:mt-20">
          {QUESTIONS.map((item, i) => (
            <Question
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
