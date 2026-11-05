import { useMemo, useState } from 'react'
import { ArrowUpRight, Compass, MapPin, Search, Timer } from 'lucide-react'
import { destinationTags, destinations } from '../data'
import type { Destination } from '../data'
import { Modal } from './Modal'

type SearchModalProps = {
  open: boolean
  onClose: () => void
  onSelect: (destination: Destination) => void
}

export function SearchModal({ open, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<(typeof destinationTags)[number]>('Todos')
  const [wasOpen, setWasOpen] = useState(open)

  // Start from a clean slate every time the modal is opened. Adjusting state
  // during render keeps it in sync without an extra commit.
  if (wasOpen !== open) {
    setWasOpen(open)
    if (open) {
      setQuery('')
      setTag('Todos')
    }
  }

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return destinations.filter((destination) => {
      const matchesTag = tag === 'Todos' || destination.tag === tag
      const matchesQuery =
        !normalized ||
        `${destination.name} ${destination.state} ${destination.region} ${destination.tag}`
          .toLowerCase()
          .includes(normalized)
      return matchesTag && matchesQuery
    })
  }, [query, tag])

  function choose(destination: Destination) {
    onSelect(destination)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} size="md" hideHeader ariaLabel="Buscar destinos">
      <div className="search-modal">
        <div className="search-modal__head">
          <span className="search-modal__icon"><Search size={20} strokeWidth={2.2} /></span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && results[0]) {
                event.preventDefault()
                choose(results[0])
              }
            }}
            placeholder="Para onde vamos?"
            aria-label="Buscar destino"
            data-autofocus
            autoComplete="off"
          />
          <span className="search-modal__hint">Enter para escolher</span>
        </div>

        <div className="search-modal__tags" aria-label="Filtrar por tipo de destino">
          {destinationTags.map((item) => (
            <button
              key={item}
              type="button"
              className={item === tag ? 'is-active' : ''}
              onClick={() => setTag(item)}
              aria-pressed={item === tag}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="search-modal__label">
          <span>{query ? 'Resultados' : 'Destinos em alta'}</span>
          <span>{results.length} {results.length === 1 ? 'destino' : 'destinos'}</span>
        </div>

        {results.length > 0 ? (
          <ul className="search-results">
            {results.map((destination) => (
              <li key={destination.id}>
                <button type="button" className="search-result" onClick={() => choose(destination)}>
                  <img src={destination.image} alt="" loading="lazy" />
                  <div className="search-result__info">
                    <strong>{destination.name}</strong>
                    <span><MapPin size={13} /> {destination.state} · {destination.region}</span>
                    <span className="search-result__tag">{destination.tag}</span>
                  </div>
                  <span className="search-result__time"><Timer size={14} /> {destination.duration}</span>
                  <span className="search-result__arrow"><ArrowUpRight size={17} strokeWidth={2.2} /></span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="search-empty">
            <span><Compass size={26} strokeWidth={1.6} /></span>
            <strong>Nenhum destino por aqui… ainda.</strong>
            <p>Tente buscar por outro lugar ou explore todas as sugestões.</p>
            <button type="button" onClick={() => { setQuery(''); setTag('Todos') }}>Ver todos os destinos</button>
          </div>
        )}

        <p className="search-modal__foot">
          Dica: você pode digitar o nome da cidade, do estado ou o tipo de viagem.
        </p>
      </div>
    </Modal>
  )
}
