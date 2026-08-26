const GAPS = [
  {
    word: 'Belirsizlik',
    body: 'Binada kimin kaldığı komşu ifadelerinden ve telefon kayıtlarından toplanır. Bilgi dağınık, çelişkili ve çoğu zaman eksiktir.',
    offset: '',
  },
  {
    word: 'Zaman',
    body: 'Enkaz altındaki hayatta kalma şansı ilk saatlerde en yüksektir. Doğru noktayı bulmak için harcanan her saat o şansın aleyhine çalışır.',
    offset: 'md:ml-auto md:mr-[8%]',
  },
  {
    word: 'Öncelik',
    body: 'Aynı anda onlarca bina bekler. Hangisinde kaç kişi olduğu bilinmeden, sınırlı ekip ve ekipmanın nereye gideceği tahminle belirlenir.',
    offset: 'md:ml-[14%]',
  },
]

export default function Reality() {
  return (
    <section className="bg-paper py-28 md:py-44">
      <div className="shell">
        <h2
          data-reveal-title
          className="display max-w-[16ch] text-[clamp(2rem,5vw,4rem)] text-ink"
        >
          Enkaza varan ekibin elinde çoğu zaman yalnızca tahmin var.
        </h2>

        <div className="mt-20 md:mt-32">
          {GAPS.map((gap) => (
            <article
              key={gap.word}
              data-reveal
              className={[
                'max-w-[34rem] border-t border-rule py-10 md:py-14',
                gap.offset,
              ].join(' ')}
            >
              <h3 className="display text-[clamp(1.5rem,2.6vw,2.125rem)] text-ink">
                {gap.word}
              </h3>
              <p className="mt-4 text-[0.9688rem] leading-relaxed text-ink-soft">
                {gap.body}
              </p>
            </article>
          ))}
        </div>

        <p
          data-reveal
          className="mt-20 max-w-[30ch] text-[clamp(1.25rem,2.4vw,1.875rem)] leading-snug text-ink md:mt-28"
        >
          RubbleTalk bu üç boşluğu tek bir veriyle kapatır: binanın içinde o an kaç kişi
          olduğu.
        </p>
      </div>
    </section>
  )
}
