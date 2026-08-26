import { useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sayfa tek bir tema geçişi yapıyor: koyu sahneden aydınlık gövdeye.
 * Üst bar ve ölçüm çizgileri aynı anda dönsün diye tek yerden okunuyor.
 */
export function useThemeZone(): 'dark' | 'light' {
  const [zone, setZone] = useState<'dark' | 'light'>('dark')

  useLayoutEffect(() => {
    const stage = document.querySelector('#sahne')
    if (!stage) return

    /* Nokta geçişi olarak kuruluyor.
       Aralık verip 'max' ile bitirince sayfanın en altında bitiş noktasına
       dayanıp bölge yeniden koyuya düşüyordu. */
    const trigger = ScrollTrigger.create({
      trigger: stage,
      start: 'bottom 64px',
      onEnter: () => setZone('light'),
      onLeaveBack: () => setZone('dark'),
      onRefresh: (self) =>
        setZone(self.scroll() >= self.start ? 'light' : 'dark'),
    })

    return () => trigger.kill()
  }, [])

  return zone
}
