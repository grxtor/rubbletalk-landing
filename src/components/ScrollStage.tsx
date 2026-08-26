import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowButton, Dither } from './kit'
import {
  BEATS,
  INTRO_UNTIL,
  SCENE_END,
  SCENE_TAIL,
  VIDEO_DURATION,
  VIDEO_POSTER,
  VIDEO_SRC,
} from '../lib/beats'

gsap.registerPlugin(ScrollTrigger)

/** Aynı kareye tekrar tekrar seek atmamak için eşik (yaklaşık yarım kare). */
const SEEK_EPSILON = 1 / 48

/**
 * Finalde görüntünün çekildiği ölçek ve kayma.
 *
 * Oransal değerler; her ekran genişliğinde metin bloğunun soluna denk gelir.
 * Ölçek 0.70 ve kayma -12% ile tabletteki okuma ekranın sol yarısında kalır,
 * metin sağ yarıda durur. inset yerine transform kullanılıyor: layout tetiklemez.
 */
const FRAMED_SCALE = 0.68
const FRAMED_SHIFT = -12

export default function ScrollStage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [metaReady, setMetaReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (video.readyState >= 1) {
      setMetaReady(true)
      return
    }
    const onMeta = () => setMetaReady(true)
    video.addEventListener('loadedmetadata', onMeta)
    return () => video.removeEventListener('loadedmetadata', onMeta)
  }, [])

  /* iOS, kullanıcı hareketi olmadan videoyu çözmeye başlamıyor. */
  useEffect(() => {
    const unlock = () => {
      const video = videoRef.current
      if (!video) return
      video.play().then(() => video.pause()).catch(() => {})
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video || !metaReady) return

    const duration = Number.isFinite(video.duration) && video.duration > 0
      ? video.duration
      : VIDEO_DURATION

    const sceneEnd = Math.min(SCENE_END, duration)

    const mm = gsap.matchMedia(root)

    mm.add(
      {
        calm: '(prefers-reduced-motion: reduce)',
        lively: '(prefers-reduced-motion: no-preference)',
        wide: '(min-width: 768px)',
      },
      (context) => {
        const calm = Boolean(context.conditions?.calm)
        const wide = Boolean(context.conditions?.wide)

        const seek = { time: 0 }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: calm ? true : 0.55,
            /* Görüntü yeniden ölçeklenirken tarayıcı bekleyen seek'i düşürebiliyor;
               scrub durduğunda hedef kareyi bir kez daha uygula. */
            onScrubComplete: () => {
              if (video.readyState >= 1) video.currentTime = seek.time
            },
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`
              }
            },
          },
        })

        /* Zaman çizelgesinin uzunluğu = videonun sahne uzunluğu.
           Böylece aşağıdaki her konum doğrudan bir video saniyesidir. */
        tl.to(
          seek,
          {
            time: sceneEnd,
            duration: sceneEnd,
            onUpdate: () => {
              if (video.readyState < 1) return
              if (Math.abs(video.currentTime - seek.time) < SEEK_EPSILON) return
              video.currentTime = seek.time
            },
          },
          0,
        )

        /* Görüntü durduktan sonra son metnin oturması için boş pay. */
        tl.to({}, { duration: SCENE_TAIL }, sceneEnd)

        /* Giriş */
        tl.to(
          '[data-intro]',
          { opacity: 0, y: calm ? 0 : -28, duration: 0.6, ease: 'power1.in' },
          INTRO_UNTIL,
        )

        BEATS.forEach((beat, i) => {
          const wrap = `[data-beat="${i}"]`
          const lines = `[data-beat="${i}"] [data-line]`
          const trail = `[data-beat="${i}"] [data-trail]`

          tl.fromTo(
            wrap,
            { opacity: 0 },
            { opacity: 1, duration: calm ? 0.2 : 0.45, ease: 'power1.out' },
            beat.at,
          )

          if (!calm) {
            /* Başlık satırları maskenin altından çıkar. */
            tl.fromTo(
              lines,
              { yPercent: 115 },
              { yPercent: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08 },
              beat.at,
            )
            tl.fromTo(
              trail,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.06 },
              beat.at + 0.15,
            )
          }

          const isLast = beat.until >= sceneEnd - 0.05
          if (isLast) {
            /* Finalde görüntü çekilir, metin yanına oturur; tabletteki
               "binada 14 kişi" okuması kapanmaz. */
            if (wide) {
              tl.to(
                '[data-video-frame]',
                {
                  scale: FRAMED_SCALE,
                  xPercent: FRAMED_SHIFT,
                  duration: calm ? 0.4 : 0.9,
                  ease: 'power2.inOut',
                },
                beat.at - 0.5,
              )
            }
            return
          }

          tl.to(
            wrap,
            { opacity: 0, duration: calm ? 0.2 : 0.4, ease: 'power1.in' },
            beat.until,
          )
          if (!calm) {
            tl.to(
              lines,
              { yPercent: -115, duration: 0.5, ease: 'power2.in', stagger: 0.05 },
              beat.until,
            )
          }
        })
      },
    )

    ScrollTrigger.refresh()
    return () => mm.revert()
  }, [metaReady])

  return (
    <div ref={rootRef} id="sahne" className="relative h-[520vh] md:h-[660vh]">
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-ground">
        <div
          data-video-frame
          className="edge absolute inset-x-4 top-20 h-[calc((100vw-2rem)*0.5625)] overflow-hidden will-change-transform md:inset-0 md:h-full md:rounded-none"
        >
          <Dither
            tone="dark"
            className="inset-x-0 bottom-0 z-10 h-10 opacity-45 [mask-image:linear-gradient(to_top,black,transparent)] md:h-20 md:opacity-60"
          />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'brightness(0.78) saturate(0.92) contrast(1.04)' }}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
          />
        </div>

        <Intro />

        {BEATS.map((beat, i) => (
          <BeatText key={beat.id} beat={beat} index={i} />
        ))}

        <div
          ref={progressRef}
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

/** Başlıkta \n ile ayrılmış her satır kendi maskesinin içinde. */
function MaskedTitle({ text, className }: { text: string; className: string }) {
  return (
    <h2 className={className}>
      {text.split('\n').map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <span data-line className="block">
            {line}
          </span>
        </span>
      ))}
    </h2>
  )
}

function Intro() {
  return (
    <div data-intro className="absolute inset-0">
      <div className="pointer-events-none absolute inset-0 hidden md:block md:bg-gradient-to-r md:from-ground md:from-18% md:via-ground/74 md:via-58% md:to-transparent" />
      <div className="shell relative flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0">
        <h1 className="display max-w-[15ch] text-[clamp(2.75rem,7.5vw,6.5rem)] text-chalk">
          Enkaz altında kimse belirsiz kalmasın.
        </h1>
        <p className="mt-8 max-w-[42ch] text-[clamp(1rem,1.35vw,1.1875rem)] leading-relaxed text-chalk-soft">
          RubbleTalk binadaki insan sayısını her an bilir. Deprem olduğu saniyede bu
          bilgi arama kurtarma ekiplerinin eline geçer.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ArrowButton href="#iletisim">Demo talep et</ArrowButton>
          <ArrowButton href="#sistem" variant="ghost" tone="dark">
            Nasıl çalışır
          </ArrowButton>
        </div>
      </div>
    </div>
  )
}

function BeatText({ beat, index }: { beat: (typeof BEATS)[number]; index: number }) {
  const onRight = beat.side === 'right'

  return (
    <div data-beat={index} id={beat.id} className="absolute inset-0 opacity-0">
      {/* Perde yalnızca metnin oturduğu tarafta. */}
      <div
        className={[
          'pointer-events-none absolute inset-0 hidden md:block',
          onRight
            ? 'md:bg-gradient-to-l md:from-ground md:from-32% md:via-ground/78 md:via-62% md:to-transparent'
            : 'md:bg-gradient-to-r md:from-ground md:from-32% md:via-ground/78 md:via-62% md:to-transparent',
        ].join(' ')}
      />
      <div
        className={[
          'shell relative flex h-full items-end pb-24 md:items-center md:pb-0',
          onRight ? 'md:justify-end' : 'md:justify-start',
        ].join(' ')}
      >
        <div className="w-full md:w-[38%] md:min-w-[20rem] md:max-w-[30rem]">
          <MaskedTitle
            text={beat.title}
            className="display text-[clamp(2rem,4vw,3.25rem)] text-chalk"
          />
          <p
            data-trail
            className="mt-6 max-w-[38ch] text-[0.9688rem] leading-relaxed text-chalk/78"
          >
            {beat.body}
          </p>
          {beat.readout && (
            <p data-trail className="mt-8 flex items-baseline gap-3">
              <span
                className={[
                  'font-mono text-2xl tracking-tight',
                  index === BEATS.length - 1 ? 'text-signal' : 'text-chalk',
                ].join(' ')}
              >
                {beat.readout.value}
              </span>
              <span className="label text-chalk-soft">{beat.readout.caption}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
