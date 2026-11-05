import { useEffect } from 'react'

const REVEAL_SELECTOR = '[data-reveal]'
const GROUP_SELECTOR = '[data-reveal-group]'

/**
 * Reads the stagger step from the group container so each block can tune the
 * rhythm without hardcoding delays in every child.
 */
function readStagger(group: HTMLElement) {
  const raw = group.dataset.revealStagger
  if (!raw) return 90
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 90
}

function readDelay(element: HTMLElement) {
  const raw = window.getComputedStyle(element).getPropertyValue('--reveal-delay')
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

/**
 * Reveals elements as they enter the viewport.
 *
 * Supports:
 *  - `data-reveal`              — fade + rise (default)
 *  - `data-reveal="up|down|left|right|scale|fade"` — direction variants
 *  - `data-reveal-delay="120"`  — explicit delay in milliseconds
 *  - `data-reveal-group`        — parent whose direct children are staggered
 *  - `data-reveal-stagger="60"` — custom step for that group
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    // Automatic stagger: every direct child of a group reveals one after the other.
    document.querySelectorAll<HTMLElement>(GROUP_SELECTOR).forEach((group) => {
      const step = readStagger(group)
      const children = Array.from(group.querySelectorAll<HTMLElement>(`:scope > ${REVEAL_SELECTOR}`))
      children.forEach((child, index) => {
        if (child.dataset.revealDelay) return
        child.style.setProperty('--reveal-delay', `${index * step}ms`)
      })
    })

    // Explicit delays win over the automatic stagger.
    elements.forEach((element) => {
      const delay = element.dataset.revealDelay
      if (delay) element.style.setProperty('--reveal-delay', `${Number.parseInt(delay, 10) || 0}ms`)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const element = entry.target as HTMLElement
          element.classList.add('is-revealed')
          observer.unobserve(element)

          // Drop the stagger delay once the reveal transition is over. Otherwise
          // hover/focus transitions keep waiting behind the reveal delay.
          const duration = Number.parseInt(
            window.getComputedStyle(element).getPropertyValue('--dur-reveal'),
            10,
          )
          window.setTimeout(() => {
            element.style.setProperty('--reveal-delay', '0ms')
          }, readDelay(element) + (Number.isFinite(duration) ? duration : 720) + 60)
        })
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}
