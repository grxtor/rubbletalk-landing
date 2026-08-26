import { ArrowButton } from './kit'

export default function Closing() {
  return (
    <>
      <section id="iletisim" className="bg-paper py-28 md:py-40">
        <div className="shell">
          <div className="mt-8 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <h2 data-reveal-title className="display max-w-[16ch] text-[clamp(1.875rem,4.2vw,3.25rem)] text-ink">
              Enkazın altında kaç kişi var? Cevabı depremden önce hazırlıyoruz.
            </h2>
            <div>
              <p className="max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-soft">
                RubbleTalk; site yönetimleri, kamu binaları ve iş merkezleri için
                kurulur. Mevcut kamera altyapısıyla çalışır, ayrı bir bina
                otomasyonu gerektirmez.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ArrowButton href="mailto:iletisim@rubbletalk.com">
                  Demo talep et
                </ArrowButton>
                <a
                  href="mailto:iletisim@rubbletalk.com"
                  className="text-[0.9375rem] font-medium text-ink-soft underline-offset-4 transition-colors duration-200 hover:underline"
                >
                  iletisim@rubbletalk.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-rule bg-paper-soft">
        <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <img
            src="/logo-light.png"
            alt="RubbleTalk"
            className="h-5 w-[6.5rem] object-contain object-left"
          />
          <p className="text-[0.8125rem] text-ink-soft">
            © {new Date().getFullYear()} RubbleTalk, Akıllı Bina Doluluk Sistemi
          </p>
        </div>
      </footer>
    </>
  )
}
