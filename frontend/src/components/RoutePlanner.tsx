import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  CirclePlus,
  Flag,
  LoaderCircle,
  LocateFixed,
  MapPin,
  ShieldCheck,
  Sparkles,
  Timer,
  X,
} from 'lucide-react'

type RouteInput = {
  origin: string
  stop: string
  destination: string
}

type RoutePlannerProps = {
  destination: string
  onDestinationChange: (value: string) => void
  onPlan: (route: RouteInput) => void
  notify: (message: string, tone?: 'success' | 'info' | 'error') => void
}

export function RoutePlanner({ destination, onDestinationChange, onPlan, notify }: RoutePlannerProps) {
  const [origin, setOrigin] = useState('Minha localização atual')
  const [stop, setStop] = useState('')
  const [error, setError] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const destinationRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!destination.trim()) {
      setError('Conte para onde você quer ir para traçarmos a rota.')
      destinationRef.current?.focus()
      return
    }
    setError('')
    onPlan({ origin: origin.trim() || 'Minha localização atual', stop, destination: destination.trim() })
  }

  function handleLocate() {
    if (isLocating) return
    setIsLocating(true)
    window.setTimeout(() => {
      setOrigin('Av. Paulista, 1000 — São Paulo, SP')
      setIsLocating(false)
      notify('Localização atualizada com sucesso.')
    }, 850)
  }

  return (
    <form
      id="planejador"
      className={`planner${error ? ' planner--invalid' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="planner__top">
        <span className="planner__label">
          <Sparkles size={15} strokeWidth={2.2} />
          Planeje sua rota
        </span>
        <span className="planner__estimate">
          <Timer size={14} /> leva menos de 2 min
        </span>
      </div>

      <div className="planner__fields">
        <div className="route-field">
          <span className="route-field__icon route-field__icon--start">
            <MapPin size={18} strokeWidth={2.2} />
          </span>
          <div className="route-field__control">
            <label htmlFor="route-origin">De onde você sai?</label>
            <input
              id="route-origin"
              type="text"
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
              placeholder="Seu ponto de partida"
              autoComplete="street-address"
            />
            <button
              type="button"
              className={`route-field__action${isLocating ? ' is-loading' : ''}`}
              onClick={handleLocate}
              aria-label="Usar minha localização atual"
              title="Usar minha localização"
            >
              {isLocating ? <LoaderCircle size={17} className="spin" /> : <LocateFixed size={17} strokeWidth={2.1} />}
            </button>
          </div>
        </div>

        <div className="route-field">
          <span className="route-field__icon route-field__icon--stop">
            <CirclePlus size={18} strokeWidth={2.1} />
          </span>
          <div className="route-field__control">
            <label htmlFor="route-stop">
              Quer parar no caminho? <span className="route-field__optional">opcional</span>
            </label>
            <input
              id="route-stop"
              type="text"
              value={stop}
              onChange={(event) => setStop(event.target.value)}
              placeholder="Adicionar uma parada"
              autoComplete="off"
            />
            {stop && (
              <button
                type="button"
                className="route-field__action"
                onClick={() => setStop('')}
                aria-label="Remover parada"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="route-field">
          <span className="route-field__icon route-field__icon--end">
            <Flag size={18} strokeWidth={2.2} />
          </span>
          <div className="route-field__control">
            <label htmlFor="route-destination">E o destino final?</label>
            <input
              ref={destinationRef}
              id="route-destination"
              type="text"
              value={destination}
              onChange={(event) => {
                onDestinationChange(event.target.value)
                if (error) setError('')
              }}
              placeholder="Para onde vamos?"
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'route-error' : undefined}
            />
          </div>
        </div>
      </div>

      {error && (
        <p id="route-error" className="route-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="button button--primary planner__submit">
        <span>Traçar minha rota</span>
        <span className="button__icon"><ArrowRight size={18} strokeWidth={2.4} /></span>
      </button>

      <div className="planner__foot">
        <span><ShieldCheck size={14} /> Sem cadastro</span>
        <span className="planner__foot-dot" aria-hidden="true" />
        <span>Carro, ônibus ou moto</span>
      </div>
    </form>
  )
}
