import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowUpRight,
  Compass,
  Home,
  Mail,
  Phone,
  Route,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'
import { brand } from '../assets/brand'
import type { Theme } from '../hooks/useTheme'
import { useBodyLock } from '../hooks/useBodyLock'
import { usePresence } from '../hooks/usePresence'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons'

type DrawerProps = {
  open: boolean
  onClose: () => void
  theme: Theme
  onToggleTheme: () => void
  onOpenSearch: () => void
  onOpenOffers: () => void
  onOpenAuth: () => void
}

export function MenuDrawer({
  open,
  onClose,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenOffers,
  onOpenAuth,
}: DrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useBodyLock(open)

  // Keeps the drawer mounted while it slides out.
  const { mounted, closing } = usePresence(open)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!mounted) return null

  function goTo(id: string) {
    onClose()
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const items = [
    { label: 'Início', hint: 'De volta ao começo', icon: Home, action: () => goTo('inicio') },
    { label: 'Para onde ir?', hint: 'Explore destinos', icon: Compass, action: onOpenSearch },
    { label: 'Formas de viajar', hint: 'Carro, ônibus, táxi e moto', icon: Route, action: () => goTo('modos') },
    { label: 'Ofertas', hint: 'Partidas com preço especial', icon: Sparkles, action: onOpenOffers },
    { label: 'Contato', hint: 'Fale com a gente', icon: Mail, action: () => goTo('contato') },
  ]

  return createPortal(
    <div className={`drawer-layer${closing ? ' is-closing' : ''}`}>
      <div className="drawer__backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Menu de navegação">
        <div className="drawer__top">
          <a className="brand drawer__brand" href="#inicio" onClick={(event) => { event.preventDefault(); goTo('inicio') }}>
            <img
              src={theme === 'dark' ? brand.wordmarkLight : brand.wordmarkColor}
              alt="PartiuAí"
              decoding="async"
            />
          </a>
          <button ref={closeRef} type="button" className="icon-button" onClick={onClose} aria-label="Fechar menu">
            <X size={19} strokeWidth={2.2} />
          </button>
        </div>

        <nav className="drawer__nav" aria-label="Navegação principal">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <button key={item.label} type="button" className="drawer__link" onClick={item.action}>
                <span className="drawer__link-icon"><Icon size={19} strokeWidth={1.9} /></span>
                <span className="drawer__link-text">
                  <span className="drawer__link-label">{item.label}</span>
                  <span className="drawer__link-hint">{item.hint}</span>
                </span>
                <span className="drawer__link-index">0{index + 1}</span>
                <ArrowUpRight className="drawer__link-arrow" size={17} />
              </button>
            )
          })}
        </nav>

        <div className="drawer__theme-row">
          <div>
            <strong>Aparência</strong>
            <span>{theme === 'dark' ? 'Tema escuro ativo' : 'Tema claro ativo'}</span>
          </div>
          <button
            type="button"
            className="theme-switch"
            role="switch"
            aria-checked={theme === 'light'}
            aria-label="Alternar tema claro e escuro"
            onClick={onToggleTheme}
          >
            <span className="theme-switch__thumb" />
          </button>
        </div>

        <div className="drawer__account">
          <span className="drawer__account-icon"><UserRound size={20} strokeWidth={2} /></span>
          <div>
            <strong>Olá, viajante</strong>
            <span>Entre para salvar suas rotas</span>
          </div>
          <button type="button" className="drawer__account-button" onClick={onOpenAuth}>
            Entrar
          </button>
        </div>

        <div className="drawer__footer">
          <a className="drawer__contact" href="mailto:contato@partiuai.com.br">
            <Mail size={15} /> contato@partiuai.com.br
          </a>
          <a className="drawer__contact" href="tel:+5511999990000">
            <Phone size={15} /> +55 11 99999-0000
          </a>
          <div className="drawer__socials" aria-label="Redes sociais">
            <button type="button" aria-label="Instagram"><InstagramIcon size={17} /></button>
            <button type="button" aria-label="Facebook"><FacebookIcon size={17} /></button>
            <button type="button" aria-label="YouTube"><YoutubeIcon size={17} /></button>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  )
}
