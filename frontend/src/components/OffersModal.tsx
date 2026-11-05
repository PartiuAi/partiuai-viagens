import { ArrowUpRight, Clock3, Sparkles, TicketPercent } from 'lucide-react'
import { destinations, offers } from '../data'
import type { Destination } from '../data'
import { Modal } from './Modal'

type OffersModalProps = {
  open: boolean
  onClose: () => void
  onSelect: (destination: Destination) => void
}

export function OffersModal({ open, onClose, onSelect }: OffersModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      eyebrow="Só até domingo"
      title="Ofertas para partir agora"
      className="modal--offers"
    >
      <div className="offers-intro">
        <span><Sparkles size={15} /> Escolhemos três partidas com preço especial para você.</span>
        <span className="offers-intro__timer"><Clock3 size={14} /> Ofertas por tempo limitado</span>
      </div>

      <div className="offers-list">
        {offers.map((offer) => {
          const destination = destinations.find((item) => item.id === offer.destinationId)
          if (!destination) return null
          return (
            <article key={offer.id} className="offer-card">
              <div className="offer-card__media">
                <img src={destination.image} alt={`Paisagem de ${destination.name}`} loading="lazy" />
                <span className="offer-card__discount"><TicketPercent size={13} /> {offer.discount}</span>
              </div>
              <div className="offer-card__body">
                <span className="offer-card__place">{destination.name} · {destination.state}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <div className="offer-card__price">
                  <span>{offer.oldPrice}</span>
                  <strong>{offer.price}</strong>
                  <small>{offer.note}</small>
                </div>
              </div>
              <button type="button" className="offer-card__cta" onClick={() => onSelect(destination)}>
                Quero essa
                <ArrowUpRight size={17} strokeWidth={2.3} />
              </button>
            </article>
          )
        })}
      </div>

      <p className="offers-note">
        Valores de referência para o protótipo. As ofertas finais serão exibidas após a integração com os parceiros.
      </p>
    </Modal>
  )
}
