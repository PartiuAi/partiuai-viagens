import { ArrowRight, ArrowUpRight, Check, Mail, Sparkles } from 'lucide-react'
import { brand } from '../assets/brand'

type CtaSectionProps = {
  onStart: () => void
}

export function CtaSection({ onStart }: CtaSectionProps) {
  return (
    <section className="cta section" id="planeje">
      <div className="container">
        <div className="cta__card" data-reveal-group data-reveal-stagger="140">
          <div className="cta__content" data-reveal>
            <span className="eyebrow eyebrow--onColor"><Sparkles size={14} /> A próxima história começa aqui</span>
            <h2>
              Planejando sua <em>próxima viagem?</em>
            </h2>
            <p>
              Do fim de semana na serra àquele destino que você guarda há anos: a gente organiza o caminho,
              você só escolhe a trilha sonora.
            </p>
            <div className="cta__actions">
              <button type="button" className="button button--white" onClick={onStart}>
                <span>Começar meu roteiro</span>
                <span className="button__icon"><ArrowRight size={18} strokeWidth={2.4} /></span>
              </button>
              <a className="button button--glass" href="mailto:contato@partiuai.com.br">
                <Mail size={17} strokeWidth={2.1} />
                Falar com a gente
              </a>
            </div>
            <div className="cta__checks">
              <span><Check size={14} /> Sem cadastro</span>
              <span><Check size={14} /> Rota gratuita</span>
              <span><Check size={14} /> Suporte humano</span>
            </div>
          </div>

          <div className="cta__visual" data-reveal="scale" aria-hidden="true">
            <div className="cta__halo" />
            <img className="cta__mark" src={brand.markLight} alt="" width="300" height="350" />
            <div className="cta__trip">
              <div className="cta__trip-top">
                <span>Rota sugerida</span>
                <strong>2h 40min</strong>
              </div>
              <div className="cta__trip-row">
                <span className="cta__trip-dot cta__trip-dot--start" />
                <div><strong>São Paulo</strong><span>Partida · 08:00</span></div>
              </div>
              <div className="cta__trip-line" />
              <div className="cta__trip-row">
                <span className="cta__trip-dot" />
                <div><strong>Monte Verde</strong><span>Destino final · 10:40</span></div>
              </div>
              <div className="cta__trip-tags">
                <span>164 km</span>
                <span>1 parada</span>
              </div>
            </div>
            <span className="cta__sticker">Partiu! <ArrowUpRight size={14} strokeWidth={2.4} /></span>
          </div>
        </div>
      </div>
    </section>
  )
}
