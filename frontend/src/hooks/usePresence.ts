import { useEffect, useState } from 'react'

export type PresencePhase = 'closed' | 'open' | 'closing'

/**
 * Duration of the exit animation. It must match `--dur-overlay-exit` in
 * `styles/base.css` so the DOM removal lands exactly on the last frame.
 */
export const PRESENCE_MS = 240

/**
 * Keeps an overlay mounted for a short while after `open` turns false, so it
 * can play an exit animation instead of disappearing on the spot.
 *
 * The phase is adjusted during render (the documented "derive state from
 * props" pattern) so the closing state is applied on the very first frame
 * after `open` flips — otherwise the element would unmount before the
 * animation had a chance to run.
 */
export function usePresence(open: boolean, duration: number = PRESENCE_MS) {
  const [phase, setPhase] = useState<PresencePhase>(open ? 'open' : 'closed')
  const [previousOpen, setPreviousOpen] = useState(open)

  if (previousOpen !== open) {
    setPreviousOpen(open)
    setPhase(open ? 'open' : 'closing')
  }

  useEffect(() => {
    if (phase !== 'closing') return
    const timer = window.setTimeout(() => setPhase('closed'), duration)
    return () => window.clearTimeout(timer)
  }, [phase, duration])

  return {
    mounted: phase !== 'closed',
    closing: phase === 'closing',
  }
}
