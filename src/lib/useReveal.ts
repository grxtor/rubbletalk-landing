import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * Sahnenin altındaki kurumsal bölümlerin ortak giriş hareketi.
 *
 *   data-reveal-title  başlık, satır satır maskenin altından çıkar
 *   data-reveal-group  çocukları sırayla belirir
 *   data-reveal        tek öğe belirir
 *
 * Satır bölme yazı tipi yüklenmeden yapılırsa satırlar yanlış hesaplanır,
 * bu yüzden `document.fonts.ready` beklenir.
 */
export function useReveal() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', (context) => {
      const splits: SplitText[] = []
      /* StrictMode iki kez bağlanıyor; sökülmüş bir geçişin geciken
         font sözü geri döndüğünde ikinci kurulumu bozmasın. */
      let cancelled = false

      const build = () => {
        if (cancelled) return
        context.add(() => {
          gsap.utils.toArray<HTMLElement>('[data-reveal-title]').forEach((el) => {
            const split = SplitText.create(el, { type: 'lines', mask: 'lines' })
            splits.push(split)
            gsap.from(split.lines, {
              yPercent: 115,
              duration: 0.95,
              ease: 'power3.out',
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            })
          })

          gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
            gsap.from(group.children, {
              opacity: 0,
              y: 26,
              duration: 0.75,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: { trigger: group, start: 'top 85%', once: true },
            })
          })

          gsap.utils.toArray<HTMLElement>('[data-reveal-line]').forEach((line) => {
            gsap.to(line, {
              scaleX: 1,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: { trigger: line, start: 'top 92%', once: true },
            })
          })

          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 20,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            })
          })

          ScrollTrigger.refresh()
        })
      }

      if (document.fonts?.status === 'loaded') build()
      else void document.fonts?.ready.then(build)

      return () => {
        cancelled = true
        splits.forEach((split) => split.revert())
      }
    })

    return () => mm.revert()
  }, [])
}
