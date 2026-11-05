import { useState } from 'react'
import { ArrowRight, Check, Clock3, MapPin, Navigation, Sparkles } from 'lucide-react'
import type { ModeId, RoutePlan } from '../data'
import { Modal } from './Modal'

type RouteResultModalProps = {
  plan: RoutePlan
  open: boolean
  onClose: () => void
  notify: (message: string, tone?: 'success' | 'info' | 'error') => void
}

export function RouteResultModal({ plan, open, onClose, notify }: RouteResultModalProps) {
  // The modal is remounted for every new plan, so the recommended option is
  // always the starting point.
  const [selected, setSelected] = useState<ModeId>(
    () => plan.choices.find((choice) => choice.recommended)?.id ?? plan.choices[0].id,
  )

  const activeChoice = plan.choices.find((choice) => choice.id === selected) ?? plan.choices[0]

  function saveRoute() {
    notify(`Rota para ${plan.destination} salva! Boa viagem.`)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} size="md" hideHeader ariaLabel="Resultado da sua rota">
      <div className="result">
        <header className="result__head">
          <span className="result__eyebrow"><Sparkles size={14} /> Rota encontrada</span>
          <h2>Sua rota está pronta.</h2>
          <p>Encontramos as melhores opções para o seu trajeto. Agora é só escolher como partir.</p>

          <div className="result__route">
            <div className="result__stop">
              <span className="result__dot result__dot--start" />
              <div><small>Partida</small><strong>{plan.origin}</strong></div>
            </div>
            {plan.stop && (
              <div className="result__stop">
                <span className="result__dot result__dot--stop" />
                <div><small>Parada</small><strong>{plan.stop}</strong></div>
              </div>
            )}
            <div className="result__stop">
              <span className="result__dot result__dot--end" />
              <div><small>Destino</small><strong>{plan.destination}</strong></div>
            </div>
            <span className="result__distance"><Navigation size={13} /> {plan.distance}</span>
          </div>
        </header>

        <div className="result__body">
          <div className="result__label">
            <span>Escolha como partir</span>
            <span><Clock3 size={13} /> valores estimados</span>
          </div>

          <div className="result__options">
            {plan.choices.map((choice) => {
              const Icon = choice.icon
              const isSelected = choice.id === activeChoice.id
              return (
                <button
                  key={choice.id}
                  type="button"
                  className={`result-option${isSelected ? ' is-selected' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelected(choice.id)}
                >
                  <span className="result-option__icon"><Icon size={23} strokeWidth={1.8} /></span>
                  <span className="result-option__copy">
                    <span className="result-option__title">
                      {choice.label}
                      {choice.recommended && <em>Recomendado</em>}
                    </span>
                    <small>{choice.note}</small>
                  </span>
                  <span className="result-option__numbers">
                    <strong>{choice.price}</strong>
                    <small>{choice.time}</small>
                  </span>
                  <span className="result-option__check" aria-hidden="true">
                    {isSelected && <Check size={13} strokeWidth={3} />}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="result__footer">
            <div className="result__total">
              <span>Total estimado</span>
              <strong>{activeChoice.price}</strong>
              <small>{activeChoice.label} · {activeChoice.time}</small>
            </div>
            <button type="button" className="button button--primary" onClick={saveRoute}>
              <span>Partiu! Salvar rota</span>
              <span className="button__icon"><ArrowRight size={18} strokeWidth={2.4} /></span>
            </button>
          </div>

          <p className="result__note">
            <MapPin size={13} /> Estimativas calculadas com base na distância. O valor final pode variar conforme horário e disponibilidade.
          </p>
        </div>
      </div>
    </Modal>
  )
}
