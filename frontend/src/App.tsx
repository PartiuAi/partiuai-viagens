import { useCallback, useRef, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { TravelModes } from './components/TravelModes'
import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { ToastViewport } from './components/Toast'
import type { ToastItem, ToastTone } from './components/Toast'
import { MenuDrawer } from './components/MenuDrawer'
import { SearchModal } from './components/SearchModal'
import { OffersModal } from './components/OffersModal'
import { AuthModal } from './components/AuthModal'
import { ModeModal } from './components/ModeModal'
import { RouteResultModal } from './components/RouteResultModal'
import { buildRoutePlan } from './data'
import type { Destination, RoutePlan, TravelMode } from './data'
import { useTheme } from './hooks/useTheme'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import { useButtonMagnet } from './hooks/useButtonMagnet'

type Overlay = 'menu' | 'search' | 'offers' | 'auth' | null

/** How long the toast exit animation takes before the item is removed. */
const TOAST_EXIT_MS = 260

/**
 * Overlays that carry their own content keep it around while they close, so
 * the panel can finish its exit animation before the DOM is cleaned up.
 */
type ModeOverlay = { mode: TravelMode; open: boolean }
type PlanOverlay = { id: number; plan: RoutePlan; open: boolean }

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useRevealOnScroll()
  useButtonMagnet()

  const [overlay, setOverlay] = useState<Overlay>(null)
  const [modeOverlay, setModeOverlay] = useState<ModeOverlay | null>(null)
  const [planOverlay, setPlanOverlay] = useState<PlanOverlay | null>(null)
  const [destination, setDestination] = useState('')
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const toastId = useRef(0)
  const planId = useRef(0)

  const dismissToast = useCallback((id: number) => {
    // Flag it first so it can slide out, then drop it from the list.
    setToasts((current) =>
      current.map((toast) => (toast.id === id ? { ...toast, exiting: true } : toast)),
    )
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, TOAST_EXIT_MS)
  }, [])

  const notify = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = ++toastId.current
    setToasts((current) => [...current.slice(-2), { id, message, tone }])
    window.setTimeout(() => dismissToast(id), 4400)
  }, [dismissToast])

  const closeModeOverlay = useCallback(() => {
    setModeOverlay((current) => (current ? { ...current, open: false } : current))
  }, [])

  const closePlanOverlay = useCallback(() => {
    setPlanOverlay((current) => (current ? { ...current, open: false } : current))
  }, [])

  const openOverlay = useCallback((next: Exclude<Overlay, null>) => {
    closeModeOverlay()
    closePlanOverlay()
    setOverlay(next)
  }, [closeModeOverlay, closePlanOverlay])

  const scrollToPlanner = useCallback(async (focusInput = true) => {
    setOverlay(null)
    await wait(60)
    document.getElementById('planejador')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (focusInput) {
      await wait(520)
      document.getElementById('route-destination')?.focus({ preventScroll: true })
    }
  }, [])

  const handleChooseDestination = useCallback((chosen: Destination) => {
    setDestination(`${chosen.name}, ${chosen.state}`)
    setOverlay(null)
    notify(`${chosen.name} selecionado. Agora só falta a partida.`)
    void scrollToPlanner()
  }, [notify, scrollToPlanner])

  const handlePlan = useCallback((route: { origin: string; stop: string; destination: string }) => {
    setPlanOverlay({ id: ++planId.current, plan: buildRoutePlan(route), open: true })
  }, [])

  const handleModeStart = useCallback(() => {
    closeModeOverlay()
    void scrollToPlanner()
  }, [closeModeOverlay, scrollToPlanner])

  return (
    <div className="app">
      <a className="skip-link" href="#inicio">Pular para o conteúdo</a>

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenMenu={() => openOverlay('menu')}
        onOpenSearch={() => openOverlay('search')}
        onOpenOffers={() => openOverlay('offers')}
        onOpenAuth={() => openOverlay('auth')}
      />

      <main>
        <Hero
          destination={destination}
          onDestinationChange={setDestination}
          onPlan={handlePlan}
          onChooseDestination={handleChooseDestination}
          notify={notify}
        />
        <TrustStrip />
        <TravelModes onDetails={(mode) => { setOverlay(null); setModeOverlay({ mode, open: true }) }} />
        <CtaSection onStart={() => void scrollToPlanner()} />
      </main>

      <Footer
        onOpenOffers={() => openOverlay('offers')}
        onOpenSearch={() => openOverlay('search')}
        onChooseDestination={handleChooseDestination}
        notify={notify}
      />

      <MenuDrawer
        open={overlay === 'menu'}
        onClose={() => setOverlay(null)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => openOverlay('search')}
        onOpenOffers={() => openOverlay('offers')}
        onOpenAuth={() => openOverlay('auth')}
      />

      {/* Overlays stay mounted so they can play their exit animation. */}
      <SearchModal
        open={overlay === 'search'}
        onClose={() => setOverlay(null)}
        onSelect={handleChooseDestination}
      />

      <OffersModal
        open={overlay === 'offers'}
        onClose={() => setOverlay(null)}
        onSelect={handleChooseDestination}
      />

      <AuthModal
        open={overlay === 'auth'}
        onClose={() => setOverlay(null)}
        notify={notify}
      />

      <ModeModal
        mode={modeOverlay?.mode ?? null}
        open={modeOverlay?.open ?? false}
        onClose={closeModeOverlay}
        onStart={handleModeStart}
      />

      {planOverlay && (
        <RouteResultModal
          key={planOverlay.id}
          plan={planOverlay.plan}
          open={planOverlay.open}
          onClose={closePlanOverlay}
          notify={notify}
        />
      )}

      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
