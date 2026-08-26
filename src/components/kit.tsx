import type { ReactNode } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

type Tone = 'dark' | 'light'

/**
 * İki parçalı ok butonu: metin kutusu ve ondan hairline ile ayrılmış ok kutusu.
 * Sayfadaki tek birincil eylem biçimi.
 */
export function ArrowButton({
  href,
  children,
  variant = 'solid',
  tone = 'light',
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  tone?: Tone
}) {
  const solid = variant === 'solid'
  const ghost = tone === 'dark'
    ? 'border-chalk/25 text-chalk hover:border-chalk/60'
    : 'border-ink/20 text-ink hover:border-ink/45'

  return (
    <a
      href={href}
      className={[
        'edge-control group inline-flex items-stretch overflow-hidden border transition-colors duration-200',
        solid
          ? 'border-signal bg-signal text-ink hover:border-signal-deep hover:bg-signal-deep'
          : ghost,
      ].join(' ')}
    >
      <span className="label px-6 py-4 leading-none">{children}</span>
      <span
        className={[
          'grid w-11 place-items-center border-l',
          solid ? 'border-ink/20' : 'border-current/25',
        ].join(' ')}
      >
        <ArrowRight
          weight="light"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  )
}

/** Yarı saydam mono etiket kutusu. */
export function Tag({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={[
        'label edge-control inline-block w-fit self-start px-3 py-1.5 leading-none',
        tone === 'dark' ? 'bg-chalk/10 text-chalk/85' : 'bg-ink/[0.06] text-ink-soft',
      ].join(' ')}
    >
      {children}
    </span>
  )
}

/** Halftone dither dokusu. Pear'daki baskı hissini taşır. */
export function Dither({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: Tone
}) {
  return (
    <span
      className={['pointer-events-none absolute', className].join(' ')}
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(${
          tone === 'dark' ? 'rgba(244,241,236,0.35)' : 'rgba(20,17,14,0.28)'
        } 1px, transparent 1px)`,
        backgroundSize: '4px 4px',
      }}
    />
  )
}
