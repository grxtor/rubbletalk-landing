import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { href: '#sistem', label: 'Sistem' },
  { href: '#kurtarma', label: 'Panel' },
  { href: '#guvence', label: 'Güvence' },
  { href: '#kurulum', label: 'Kurulum' },
]

export default function SiteNav({ zone }: { zone: 'dark' | 'light' }) {
  const onPaper = zone === 'light'
  const barRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${self.progress})`
        }
      },
    })
    return () => trigger.kill()
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        onPaper
          ? 'border-b border-rule bg-paper/88 backdrop-blur-md'
          : 'border-b border-transparent',
      ].join(' ')}
    >
      <nav className="shell flex h-16 items-center justify-between md:h-18">
        <a href="#" className="relative block h-5 w-[6.5rem]">
          <img
            src="/logo-dark.png"
            alt="RubbleTalk"
            className={[
              'absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500',
              onPaper ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
          />
          <img
            src="/logo-light.png"
            alt=""
            aria-hidden="true"
            className={[
              'absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500',
              onPaper ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={[
                  'text-[0.875rem] transition-colors duration-300',
                  onPaper
                    ? 'text-ink-soft hover:text-ink'
                    : 'text-chalk-soft hover:text-chalk',
                ].join(' ')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#iletisim"
          className="label group inline-flex items-center gap-3 border border-signal bg-signal px-4 py-2.5 leading-none text-ink transition-colors duration-200 hover:border-signal-deep hover:bg-signal-deep"
        >
          Demo talep et
          <ArrowRight
            weight="light"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </nav>

      <div
        ref={barRef}
        className="h-px origin-left scale-x-0 bg-signal"
        aria-hidden="true"
      />
    </header>
  )
}
