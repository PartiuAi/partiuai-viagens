import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUp, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react'
import { brand } from '../assets/brand'
import { destinations } from '../data'
import type { Destination } from '../data'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons'

type FooterProps = {
  onOpenOffers: () => void
  onOpenSearch: () => void
  onChooseDestination: (destination: Destination) => void
  notify: (message: string, tone?: 'success' | 'info' | 'error') => void
}

export function Footer({ onOpenOffers, onOpenSearch, onChooseDestination, notify }: FooterProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Digite um e-mail válido para receber as novidades.')
      return
    }
    setError('')
    setEmail('')
    notify('Pronto! Você está na lista para receber boas rotas.')
  }

  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer__newsletter" data-reveal-group data-reveal-stagger="120">
          <div className="footer__newsletter-copy" data-reveal>
            <span className="eyebrow eyebrow--onColor">Newsletter PartiuAí</span>
            <h2>Boas rotas, direto no seu e-mail.</h2>
            <p>Destinos, dicas e ofertas para quem prefere viver o caminho. Uma vez por mês, sem spam.</p>
          </div>
          <form className="footer__form" data-reveal onSubmit={handleSubscribe} noValidate>
            <div className={`footer__input${error ? ' is-invalid' : ''}`}>
              <Mail size={18} strokeWidth={2} />
              <input
                type="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); if (error) setError('') }}
                placeholder="seu@email.com"
                aria-label="Seu e-mail para receber a newsletter"
                aria-invalid={Boolean(error)}
                autoComplete="email"
              />
              <button type="submit">
                Quero receber
                <Send size={15} strokeWidth={2.2} />
              </button>
            </div>
            {error ? (
              <p className="footer__form-error" role="alert">{error}</p>
            ) : (
              <p className="footer__form-hint">Sem cadastro. Cancele quando quiser.</p>
            )}
          </form>
        </div>

        <div className="footer__main" data-reveal-group data-reveal-stagger="90">
          <div className="footer__brand" data-reveal>
            <a className="brand" href="#inicio" aria-label="PartiuAí — início">
              <img src={brand.wordmarkLight} alt="PartiuAí" width="170" height="33" />
            </a>
            <p>O caminho entre o “quero ir” e o “estou indo”. Rotas, paradas e liberdade para partir do seu jeito.</p>
            <div className="footer__socials">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram do PartiuAí"><InstagramIcon /></a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook do PartiuAí"><FacebookIcon /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube do PartiuAí"><YoutubeIcon /></a>
            </div>
          </div>

          <nav className="footer__column" data-reveal aria-label="Navegue pelo site">
            <h3>Navegue</h3>
            <a href="#inicio">Início</a>
            <a href="#modos">Formas de viajar</a>
            <button type="button" onClick={onOpenSearch}>Para onde ir?</button>
            <button type="button" onClick={onOpenOffers}>Ofertas</button>
            <a href="mailto:contato@partiuai.com.br">Contato</a>
          </nav>

          <nav className="footer__column" data-reveal aria-label="Destinos em destaque">
            <h3>Destinos</h3>
            {destinations.map((destination) => (
              <button key={destination.id} type="button" onClick={() => onChooseDestination(destination)}>
                {destination.name}, {destination.state}
              </button>
            ))}
            <button type="button" onClick={onOpenSearch}>Ver mais destinos</button>
          </nav>

          <div className="footer__column footer__contact" data-reveal>
            <h3>Fale com a gente</h3>
            <a href="mailto:contato@partiuai.com.br"><Mail size={16} /> contato@partiuai.com.br</a>
            <a href="tel:+5511999990000"><Phone size={16} /> +55 11 99999-0000</a>
            <span><MapPin size={16} /> São Paulo, Brasil</span>
            <span><Clock3 size={16} /> Seg a sex, 9h às 18h</span>
            <div className="footer__contact-note">
              <span className="status-dot" aria-hidden="true" />
              Respondendo agora
            </div>
          </div>
        </div>

        <div className="footer__bottom" data-reveal>
          <p>© 2026 PartiuAí. Feito com <span aria-label="amor">♥</span> no Brasil.</p>
          <div className="footer__legal">
            <button type="button" onClick={() => notify('Nossos termos serão publicados em breve.', 'info')}>Termos de uso</button>
            <button type="button" onClick={() => notify('Nossa política de privacidade será publicada em breve.', 'info')}>Privacidade</button>
            <a href="https://unsplash.com" target="_blank" rel="noreferrer">Fotos: Unsplash</a>
          </div>
          <button type="button" className="footer__top" onClick={goToTop}>
            Voltar ao topo <ArrowUp size={15} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </footer>
  )
}
