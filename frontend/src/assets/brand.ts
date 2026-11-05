/**
 * Assets da marca e destinos.
 *
 * Importados como modulos para o Vite deduplicar e embutir cada imagem uma
 * unica vez no bundle (ver `assetsInlineLimit` no vite.config.ts). Assim o
 * index.html gerado funciona sozinho, aberto via `file://`.
 */
import wordmarkColor from './logo-wordmark-color.png'
import wordmarkLight from './logo-wordmark-light.png'
import markColor from './logo-mark-color.png'
import markLight from './logo-mark-light.png'
import jericoacoara from './jericoacoara.jpg'
import serra from './serra.jpg'
import chapada from './chapada.jpg'

export const brand = {
  wordmarkColor,
  wordmarkLight,
  markColor,
  markLight,
} as const

export const destinationImage = {
  jericoacoara,
  serra,
  chapada,
} as const
