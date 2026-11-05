import { useEffect, useState } from 'react'
import { Menu, Moon, Search, Sparkles, Sun, UserRound } from 'lucide-react'
import { brand } from '../assets/brand'
import type { Theme } from '../hooks/useTheme'

type HeaderProps = {
  theme: Theme
  onToggleTheme: () => void
  onOpenMenu: () => void
  onOpenSearch: () => void
  onOpenOffers: () => void
  onOpenAuth: () => void
}

export function Header({ theme, onToggleTheme, onOpenMenu, onOpenSearch, onOpenOffers, onOpenAuth }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner container">
        <div className="site-header__group">
          <button type="button" className="icon-button header__menu" onClick={onOpenMenu} aria-label="Abrir menu de navegação">
            <Menu size={20} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="icon-button header__theme"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
          >
            {theme === 'dark' ? <Sun size={19} strokeWidth={2.1} /> : <Moon size={19} strokeWidth={2.1} />}
          </button>
        </div>

        <a className="brand header__brand" href="#inicio" aria-label="PartiuAí — voltar ao início">
          <img
            src={theme === 'dark' ? brand.wordmarkLight : brand.wordmarkColor}
            alt="PartiuAí"
            width="165"
            height="32"
          />
        </a>

        <div className="site-header__group site-header__group--end">
          <button type="button" className="icon-button" onClick={onOpenSearch} aria-label="Buscar destinos">
            <Search size={19} strokeWidth={2.2} />
          </button>
          <button type="button" className="offers-button" onClick={onOpenOffers}>
            <Sparkles size={16} strokeWidth={2.2} />
            <span>Ofertas</span>
          </button>
          <button type="button" className="header__avatar" onClick={onOpenAuth} aria-label="Entrar na sua conta">
            <UserRound size={19} strokeWidth={2.1} />
            <span className="header__avatar-dot" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
