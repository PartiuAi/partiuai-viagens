import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff, Lock, Mail, UserRound } from 'lucide-react'
import { brand } from '../assets/brand'
import { Modal } from './Modal'
import { AppleIcon, GoogleIcon } from './SocialIcons'

type AuthModalProps = {
  open: boolean
  onClose: () => void
  notify: (message: string, tone?: 'success' | 'info' | 'error') => void
}

type Errors = {
  name?: string
  email?: string
  password?: string
}

export function AuthModal({ open, onClose, notify }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (mode === 'signup' && name.trim().length < 2) nextErrors.name = 'Como podemos te chamar?'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) nextErrors.email = 'Digite um e-mail válido.'
    if (password.length < (mode === 'signup' ? 8 : 6)) {
      nextErrors.password = mode === 'signup' ? 'Use pelo menos 8 caracteres.' : 'A senha precisa ter pelo menos 6 caracteres.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    notify(
      mode === 'login'
        ? 'Que bom ter você de volta! Boa viagem.'
        : `Conta criada! Bem-vindo(a) ao PartiuAí, ${name.trim().split(' ')[0]}.`,
    )
    onClose()
  }

  function handleSocial(provider: string) {
    notify(`Conexão com ${provider} concluída. Bem-vindo(a)!`)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} size="sm" hideHeader ariaLabel="Entrar na sua conta">
      <div className="auth">
        <div className="auth__brand">
          <span className="auth__mark">
            <img src={brand.markColor} alt="" width="44" height="52" />
          </span>
          <span className="auth__eyebrow">Sua conta PartiuAí</span>
          <h2>{mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
          <p>
            {mode === 'login'
              ? 'Entre para salvar rotas, favoritos e continuar de onde parou.'
              : 'Leve suas rotas com você e viaje com tudo no lugar certo.'}
          </p>
        </div>

        <div className="auth__socials">
          <button type="button" onClick={() => handleSocial('Google')}>
            <GoogleIcon size={17} />
            Google
          </button>
          <button type="button" onClick={() => handleSocial('Apple')}>
            <AppleIcon size={18} />
            Apple
          </button>
        </div>

        <div className="auth__divider"><span>ou continue com e-mail</span></div>

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          {mode === 'signup' && (
            <div className={`auth__field${errors.name ? ' is-invalid' : ''}`}>
              <UserRound size={17} strokeWidth={2} />
              <input
                type="text"
                value={name}
                onChange={(event) => { setName(event.target.value); if (errors.name) setErrors((current) => ({ ...current, name: undefined })) }}
                placeholder="Seu nome"
                aria-label="Seu nome"
                aria-invalid={Boolean(errors.name)}
                autoComplete="name"
                data-autofocus
              />
              {errors.name && <small>{errors.name}</small>}
            </div>
          )}

          <div className={`auth__field${errors.email ? ' is-invalid' : ''}`}>
            <Mail size={17} strokeWidth={2} />
            <input
              type="email"
              value={email}
              onChange={(event) => { setEmail(event.target.value); if (errors.email) setErrors((current) => ({ ...current, email: undefined })) }}
              placeholder="seu@email.com"
              aria-label="Seu e-mail"
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              data-autofocus={mode === 'login' ? true : undefined}
            />
            {errors.email && <small>{errors.email}</small>}
          </div>

          <div className={`auth__field${errors.password ? ' is-invalid' : ''}`}>
            <Lock size={17} strokeWidth={2} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => { setPassword(event.target.value); if (errors.password) setErrors((current) => ({ ...current, password: undefined })) }}
              placeholder={mode === 'signup' ? 'Crie uma senha (8+ caracteres)' : 'Sua senha'}
              aria-label="Sua senha"
              aria-invalid={Boolean(errors.password)}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />
            <button
              type="button"
              className="auth__eye"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.password && <small>{errors.password}</small>}
          </div>

          {mode === 'login' && (
            <button
              type="button"
              className="auth__forgot"
              onClick={() => notify('Enviamos as instruções de recuperação para o seu e-mail.', 'info')}
            >
              Esqueci minha senha
            </button>
          )}

          <button type="submit" className="button button--primary auth__submit">
            <span>{mode === 'login' ? 'Entrar' : 'Criar minha conta'}</span>
            <span className="button__icon"><ArrowRight size={18} strokeWidth={2.4} /></span>
          </button>
        </form>

        <p className="auth__switch">
          {mode === 'login' ? 'Ainda não tem conta?' : 'Já tem uma conta?'}
          {' '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}) }}
          >
            {mode === 'login' ? 'Criar agora' : 'Entrar'}
          </button>
        </p>

        <p className="auth__terms">
          Ao continuar, você concorda com os Termos de uso e a Política de privacidade do PartiuAí.
        </p>
      </div>
    </Modal>
  )
}
