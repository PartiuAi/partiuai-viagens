import { ArrowRight, Check, Compass } from 'lucide-react'
import type { TravelMode } from '../data'
import { Modal } from './Modal'

type ModeModalProps = {
  mode: TravelMode | null
  open: boolean
  onClose: () => void
  onStart: () => void
}

export function ModeModal({ mode, open, onClose, onStart }: ModeModalProps) {
  if (!mode) return null
  const Icon = mode.icon

  return (
    <Modal open={open} onClose={onClose} size="md" hideHeader ariaLabel={`Detalhes de ${mode.title}`}>
      <div className={`mode-detail mode-detail--${mode.id}`}>
        <div className="mode-detail__hero">
          <span className="mode-detail__eyebrow">{mode.eyebrow}</span>
          <span className="mode-detail__icon"><Icon size={70} strokeWidth={1.3} /></span>
          <h2>{mode.title}</h2>
          <p>{mode.description}</p>
          <div className="mode-detail__tags">
            {mode.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        <div className="mode-detail__body">
          <span className="mode-detail__label">O que você encontra por aqui</span>
          <ul className="mode-detail__features">
            {mode.features.map((feature) => (
              <li key={feature}><Check size={16} strokeWidth={2.6} /> {feature}</li>
            ))}
          </ul>

          <div className="mode-detail__note">
            <Compass size={20} strokeWidth={1.8} />
            <div>
              <strong>Ideal para</strong>
              <span>{mode.idealFor}</span>
            </div>
          </div>

          <button
            type="button"
            className="button button--primary mode-detail__cta"
            onClick={onStart}
          >
            <span>Montar minha rota</span>
            <span className="button__icon"><ArrowRight size={18} strokeWidth={2.4} /></span>
          </button>
        </div>
      </div>
    </Modal>
  )
}
