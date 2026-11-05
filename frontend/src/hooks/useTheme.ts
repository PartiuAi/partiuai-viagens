import { useCallback, useEffect, useRef, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'partiuai-theme'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // localStorage can be unavailable in private contexts
  }
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const hasMounted = useRef(false)

  useEffect(() => {
    const root = document.documentElement

    const apply = () => {
      root.dataset.theme = theme
      root.style.colorScheme = theme

      try {
        localStorage.setItem(STORAGE_KEY, theme)
      } catch {
        // Ignore storage failures — the theme still applies for this session.
      }

      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', theme === 'dark' ? '#060819' : '#f6f7ff')
    }

    // The first paint has nothing to cross-fade from, so apply it directly.
    if (!hasMounted.current) {
      hasMounted.current = true
      apply()
      return
    }

    // Enable the cross-fade first, then flip the theme on the next frame so
    // the browser has a chance to pick up the transition before it changes.
    root.classList.add('is-theme-shifting')

    const frame = window.requestAnimationFrame(() => {
      apply()
      window.setTimeout(() => root.classList.remove('is-theme-shifting'), 460)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
