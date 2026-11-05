import { useEffect } from 'react'

let lockCount = 0
let originalOverflow = ''
let originalPaddingRight = ''

/**
 * Locks page scrolling while an overlay is open. A counter keeps nested or
 * rapidly switching overlays from restoring scroll too early.
 */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow
      originalPaddingRight = document.body.style.paddingRight
      const scrollbar = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    }
    lockCount += 1

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [locked])
}
