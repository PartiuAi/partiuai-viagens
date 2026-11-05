import { useEffect } from 'react'

export function useButtonMagnet() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>('.button, .offers-button, .icon-button, .header__avatar, .slide__cta, .footer__top'))

    function onMove(event: MouseEvent) {
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      target.style.setProperty('--btn-x', `${x}%`)
      target.style.setProperty('--btn-y', `${y}%`)
    }

    function onLeave(event: MouseEvent) {
      const target = event.currentTarget as HTMLElement
      target.style.setProperty('--btn-x', '50%')
      target.style.setProperty('--btn-y', '50%')
    }

    elements.forEach((element) => {
      element.addEventListener('mousemove', onMove)
      element.addEventListener('mouseleave', onLeave)
      element.style.setProperty('--btn-x', '50%')
      element.style.setProperty('--btn-y', '50%')
    })

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mousemove', onMove)
        element.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])
}
