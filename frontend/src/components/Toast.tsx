import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react'

export type ToastTone = 'success' | 'info' | 'error'

export type ToastItem = {
  id: number
  message: string
  tone: ToastTone
  /** Set while the toast plays its exit animation, right before removal. */
  exiting?: boolean
}

type ToastViewportProps = {
  toasts: ToastItem[]
  onDismiss: (id: number) => void
}

const toneIcon = {
  success: CheckCircle2,
  info: Info,
  error: AlertCircle,
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div className="toast-viewport" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => {
        const Icon = toneIcon[toast.tone]
        return (
          <div key={toast.id} className={`toast toast--${toast.tone}${toast.exiting ? ' is-exiting' : ''}`} role="status">
            <span className="toast__icon">
              <Icon size={18} strokeWidth={2.2} />
            </span>
            <p>{toast.message}</p>
            <button type="button" className="toast__close" onClick={() => onDismiss(toast.id)} aria-label="Fechar aviso">
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
