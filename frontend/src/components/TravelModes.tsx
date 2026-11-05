import { ArrowUpRight, Sparkles } from 'lucide-react'
import { travelModes } from '../data'
import type { TravelMode } from '../data'

type TravelModesProps = {
  onDetails: (mode: TravelMode) => void
}

export function TravelModes({ onDetails }: TravelModesProps) {
  return (
    <section className="modes section" id="modos">
      <div className="container">
        <div className="section-head" data-reveal-group data-reveal-stagger="120">
          <div className="section-head__copy" data-reveal>
            <span className="eyebrow"><Sparkles size={14} /> Do seu jeito</span>
            <h2 className="section-title">
              Como você quer <span className="text-gradient">partir?</span>
            </h2>
          </div>
          <p className="section-head__lede" data-reveal>
            Cada viagem tem um ritmo. Escolha o seu e encontre a rota que combina com o momento —
            seja para fugir da rotina ou só chegar mais rápido.
          </p>
        </div>

        <div className="modes__grid" data-reveal-group data-reveal-stagger="130">
          {travelModes.map((mode, index) => {
            const Icon = mode.icon
            const SecondaryIcon = mode.secondaryIcon
            return (
              <article
                key={mode.id}
                className={`mode-card mode-card--${mode.id}`}
                data-reveal="scale"
              >
                <div className="mode-card__visual">
                  <span className="mode-card__number" aria-hidden="true">0{index + 1}</span>
                  {mode.popular && <span className="mode-card__popular">Mais procurado</span>}
                  <span className="mode-card__eyebrow">{mode.eyebrow}</span>

                  <svg className="mode-card__road" viewBox="0 0 420 230" fill="none" aria-hidden="true">
                    <path d="M-24 214C74 188 103 111 210 120C317 129 346 50 456 34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
                    <path d="M-22 228C82 198 111 130 214 138C317 146 352 71 458 55" stroke="currentColor" strokeWidth="1" opacity=".45" />
                  </svg>

                  <span className="mode-card__glow" aria-hidden="true" />
                  <span className="mode-card__speed mode-card__speed--one" aria-hidden="true" />
                  <span className="mode-card__speed mode-card__speed--two" aria-hidden="true" />

                  <span className={`mode-card__icon${SecondaryIcon ? ' mode-card__icon--split' : ''}`}>
                    <Icon size={92} strokeWidth={1.35} />
                    {SecondaryIcon && (
                      <>
                        <span className="mode-card__split" aria-hidden="true" />
                        <SecondaryIcon size={66} strokeWidth={1.4} />
                      </>
                    )}
                  </span>
                </div>

                <div className="mode-card__body">
                  <div className="mode-card__title-row">
                    <h3>{mode.title}</h3>
                    <span className="mode-card__hint">{mode.hint}</span>
                  </div>
                  <p>{mode.description}</p>
                  <div className="mode-card__tags">
                    {mode.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <button type="button" className="mode-card__link" onClick={() => onDetails(mode)}>
                    Saiba mais
                    <span><ArrowUpRight size={16} strokeWidth={2.3} /></span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
