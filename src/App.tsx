import SiteNav from './components/SiteNav'
import ScrollStage from './components/ScrollStage'
import Reality from './components/Reality'
import System from './components/System'
import RescuePanel from './components/RescuePanel'
import Assurance from './components/Assurance'
import Deployment from './components/Deployment'
import Faq from './components/Faq'
import Closing from './components/Closing'
import { useReveal } from './lib/useReveal'
import { useThemeZone } from './lib/useThemeZone'

export default function App() {
  useReveal()
  const zone = useThemeZone()

  return (
    <>
      <SiteNav zone={zone} />
      <main>
        <ScrollStage />
        {/* Sahnenin karasından gövdenin kağıdına tek geçiş. Sert kesim yok. */}
        <div
          aria-hidden="true"
          className="h-[28vh] bg-gradient-to-b from-ground to-paper"
        />
        <Reality />
        <System />
        <RescuePanel />
        <Assurance />
        <Deployment />
        <Faq />
        <Closing />
      </main>
    </>
  )
}
