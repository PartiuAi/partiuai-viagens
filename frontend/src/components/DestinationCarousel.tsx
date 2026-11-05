import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Flame, MapPin, Route, Timer } from 'lucide-react'
import { destinations } from '../data'
import type { Destination } from '../data'

type DestinationCarouselProps = {
  onChoose: (destination: Destination) => void
}

export function DestinationCarousel({ onChoose }: DestinationCarouselProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pointerStart = useRef<number | null>(null)

  useEffect(() => {
    if (isPaused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % destinations.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [isPaused])

  function goTo(next: number) {
    setIndex((next + destinations.length) % destinations.length)
  }

  return (
    <section
      className="carousel"
      aria-roledescription="carrossel"
      aria-label="Destinos em alta"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false)
      }}
    >
      <div
        className="carousel__frame"
        onPointerDown={(event) => { pointerStart.current = event.clientX }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return
          const distance = event.clientX - pointerStart.current
          pointerStart.current = null
          if (Math.abs(distance) > 48) goTo(index + (distance < 0 ? 1 : -1))
        }}
      >
        <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {destinations.map((destination, slideIndex) => {
            const isActive = slideIndex === index
            return (
              <article
                key={destination.id}
                className={`slide${isActive ? ' is-active' : ''}`}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} de ${destinations.length}: ${destination.name}`}
              >
                <img
                  className="slide__image"
                  src={destination.image}
                  alt={`Paisagem de ${destination.name}, ${destination.state}`}
                  loading={slideIndex === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
                <div className="slide__shade" aria-hidden="true" />

                <div className="slide__panel">
                  <span className="slide__badge">
                    <Flame size={14} strokeWidth={2.3} />
                    {destination.badge}
                  </span>

                  <div className="slide__heading">
                    <span className="slide__tag">{destination.tag}</span>
                    <h2>{destination.name}</h2>
                    <p><MapPin size={14} strokeWidth={2.2} /> {destination.state} · {destination.region}</p>
                  </div>

                  <div className="slide__bottom">
                    <div className="slide__meta">
                      <span><Route size={14} strokeWidth={2.1} /> {destination.distance}</span>
                      <span><Timer size={14} strokeWidth={2.1} /> {destination.duration}</span>
                    </div>
                    <button
                      type="button"
                      className="slide__cta"
                      onClick={() => onChoose(destination)}
                      tabIndex={isActive ? 0 : -1}
                      aria-label={`Montar rota para ${destination.name}`}
                    >
                      Montar rota
                      <ArrowUpRight size={16} strokeWidth={2.3} />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="carousel__controls">
          <span className="carousel__counter">
            <strong>0{index + 1}</strong> / 0{destinations.length}
          </span>
          <button type="button" className="carousel__arrow" onClick={() => goTo(index - 1)} aria-label="Destino anterior">
            <ChevronLeft size={18} strokeWidth={2.3} />
          </button>
          <button type="button" className="carousel__arrow" onClick={() => goTo(index + 1)} aria-label="Próximo destino">
            <ChevronRight size={18} strokeWidth={2.3} />
          </button>
        </div>
      </div>

      <div className="carousel__footer">
        <div className="carousel__dots" role="tablist" aria-label="Escolher destino">
          {destinations.map((destination, dotIndex) => (
            <button
              key={destination.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Ver ${destination.name}`}
              className={`carousel__dot${dotIndex === index ? ' is-active' : ''}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
        <span className="carousel__hint">Arraste para explorar</span>
      </div>
    </section>
  )
}
