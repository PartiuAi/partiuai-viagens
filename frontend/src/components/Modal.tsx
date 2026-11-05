import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useBodyLock } from '../hooks/useBodyLock'
import { usePresence } from '../hooks/usePresence'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  eyebrow?: string
  ariaLabel?: string
  size?: 'sm' | 'md' | 'lg'
  hideHeader?: boolean
  children: ReactNode
  className?: string
}

export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  ariaLabel,
  size = 'md',
  hideHeader = false,
  children,
  className = '',
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useBodyLock(open)

  // Keeps the panel mounted while it plays its exit animation.
  const { mounted, closing } = usePresence(open)

  useEffect(() => {
    if (!open) return

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const root = document.getElementById('root')
    root?.setAttribute('inert', '')

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current
      if (!panel) return
      const preferred = panel.querySelector<HTMLElement>('[data-autofocus]')
      const first = panel.querySelector<HTMLElement>(FOCUSABLE)
      ;(preferred ?? first ?? panel).focus()
    }, 50)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      )
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      root?.removeAttribute('inert')
      previousFocus?.focus()
    }
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <div className={`modal-layer modal-layer--${size}${closing ? ' is-closing' : ''}`}>
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className={`modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : ariaLabel}
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar janela">
          <X size={18} strokeWidth={2.2} />
        </button>

        {!hideHeader && (
          <header className="modal__header">
            {eyebrow && <span className="modal__eyebrow">{eyebrow}</span>}
            {title && <h2 id={titleId} className="modal__title">{title}</h2>}
          </header>
        )}

        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
