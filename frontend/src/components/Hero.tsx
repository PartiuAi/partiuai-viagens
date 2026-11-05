import { MapPin, Sparkles, Star } from 'lucide-react'
import type { Destination } from '../data'
import { DestinationCarousel } from './DestinationCarousel'
import { RoutePlanner } from './RoutePlanner'

type HeroProps = {
  destination: string
  onDestinationChange: (value: string) => void
  onPlan: (route: { origin: string; stop: string; destination: string }) => void
  onChooseDestination: (destination: Destination) => void
  notify: (message: string, tone?: 'success' | 'info' | 'error') => void
}

export function Hero({ destination, onDestinationChange, onPlan, onChooseDestination, notify }: HeroProps) {
  return (
    <section className="hero" id="inicio">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__location">
            <span className="hero__location-pulse" aria-hidden="true" />
            <MapPin size={14} strokeWidth={2.2} />
            <span>Sua localização atual</span>
            <span className="hero__location-divider" aria-hidden="true" />
            <strong>São Paulo, SP</strong>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-top">Vá para qualquer</span>
            <span className="hero__title-highlight">destino</span>
            <span className="hero__title-bottom">na nossa região</span>
          </h1>

          <p className="hero__lede">
            Monte sua rota, descubra paradas pelo caminho e escolha o jeito mais fácil de partir.
            <span> Tudo em um só lugar, do primeiro clique ao destino.</span>
          </p>

          <RoutePlanner
            destination={destination}
            onDestinationChange={onDestinationChange}
            onPlan={onPlan}
            notify={notify}
          />

          <div className="hero__proof">
            <div className="hero__avatars" aria-hidden="true">
              <span>MA</span>
              <span>JC</span>
              <span>LP</span>
            </div>
            <div className="hero__proof-text">
              <span className="hero__stars" aria-label="Avaliação 4,9 de 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={12} fill="currentColor" strokeWidth={0} />
                ))}
                <strong>4,9</strong>
              </span>
              <span><Sparkles size={13} /> +12 mil rotas planejadas este mês</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <svg className="hero__route-sketch" viewBox="0 0 520 640" fill="none" aria-hidden="true">
            <path
              d="M34 596C34 498 118 476 118 386C118 296 18 268 44 178C64 106 146 78 250 78"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 8"
              strokeLinecap="round"
            />
            <circle cx="34" cy="596" r="5" fill="currentColor" />
            <circle cx="250" cy="78" r="7" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <DestinationCarousel onChoose={onChooseDestination} />

          <div className="hero__floating-card">
            <span className="hero__floating-icon"><MapPin size={17} strokeWidth={2.2} /></span>
            <div>
              <strong>Rota pronta em 2 min</strong>
              <span>Sem planilhas, sem estresse.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
