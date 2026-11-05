import { BadgeDollarSign, Headset, Route, ShieldCheck } from 'lucide-react'

const items = [
  { icon: Route, title: 'Rotas inteligentes', description: 'O melhor caminho, sem tentativa e erro.' },
  { icon: BadgeDollarSign, title: 'Preços transparentes', description: 'Você compara antes de decidir.' },
  { icon: Headset, title: 'Gente de verdade', description: 'Suporte humano do início ao fim.' },
  { icon: ShieldCheck, title: 'Partida segura', description: 'Parceiros avaliados e dados protegidos.' },
]

export function TrustStrip() {
  return (
    <section className="trust" aria-label="Por que viajar com o PartiuAí">
      <div className="container">
        <div className="trust__grid" data-reveal-group data-reveal-stagger="90">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="trust__item" data-reveal>
                <span className="trust__icon"><Icon size={20} strokeWidth={1.9} /></span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
