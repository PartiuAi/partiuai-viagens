import { Bike, BusFront, CarFront, CarTaxiFront } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { destinationImage } from './assets/brand'

export type Destination = {
  id: string
  name: string
  state: string
  region: string
  image: string
  tag: 'Praia' | 'Serra' | 'Aventura'
  badge: string
  distance: string
  duration: string
  description: string
}

export const destinations: Destination[] = [
  {
    id: 'jericoacoara',
    name: 'Jericoacoara',
    state: 'Ceará',
    region: 'Litoral nordestino',
    image: destinationImage.jericoacoara,
    tag: 'Praia',
    badge: 'Em alta esta semana',
    distance: '312 km',
    duration: '4h 20min',
    description: 'Dunas, lagoas cristalinas e um pôr do sol que vale a viagem inteira.',
  },
  {
    id: 'capitolio',
    name: 'Capitólio',
    state: 'Minas Gerais',
    region: 'Lago de Furnas',
    image: destinationImage.serra,
    tag: 'Aventura',
    badge: 'Road trip favorita',
    distance: '278 km',
    duration: '3h 50min',
    description: 'Cânions, cachoeiras e estradas que fazem cada quilômetro valer a pena.',
  },
  {
    id: 'monte-verde',
    name: 'Monte Verde',
    state: 'Minas Gerais',
    region: 'Serra da Mantiqueira',
    image: destinationImage.chapada,
    tag: 'Serra',
    badge: 'Ideal para o fim de semana',
    distance: '164 km',
    duration: '2h 40min',
    description: 'Clima de montanha, bosques e aquele fim de semana sem pressa.',
  },
]

export type ModeId = 'carro' | 'onibus' | 'taxi'

export type TravelMode = {
  id: ModeId
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  secondaryIcon?: LucideIcon
  tags: string[]
  features: string[]
  idealFor: string
  hint: string
  popular?: boolean
}

export const travelModes: TravelMode[] = [
  {
    id: 'carro',
    eyebrow: 'Liberdade total',
    title: 'Carro próprio',
    description: 'Vá no seu ritmo, descubra paradas pelo caminho e leve quem você quiser.',
    icon: CarFront,
    tags: ['Rota otimizada', 'Paradas livres'],
    features: [
      'Rota otimizada com pedágios e combustível estimados',
      'Sugestões de paradas, mirantes e lugares para comer',
      'Compartilhe o roteiro com quem vai com você',
      'Funciona mesmo em trechos sem sinal',
    ],
    idealFor: 'Famílias, grupos e quem gosta de liberdade',
    hint: 'Você dirige, a gente cuida do caminho.',
    popular: true,
  },
  {
    id: 'onibus',
    eyebrow: 'Leve e econômico',
    title: 'Ônibus',
    description: 'Conforto e economia para viagens regionais, sem se preocupar com estacionamento.',
    icon: BusFront,
    tags: ['Melhor preço', 'Sem bagagem extra'],
    features: [
      'Comparação de horários e empresas em um só lugar',
      'Trechos regionais e intermunicipais',
      'Alertas de embarque e mudanças de plataforma',
      'Opções de assento e acessibilidade',
    ],
    idealFor: 'Quem viaja sozinho ou quer economizar',
    hint: 'Embarque tranquilo, destino certo.',
  },
  {
    id: 'taxi',
    eyebrow: 'Rápido e prático',
    title: 'Táxi & Moto',
    description: 'Chegue mais rápido com motoristas parceiros — ideal para o dia a dia e a última milha.',
    icon: CarTaxiFront,
    secondaryIcon: Bike,
    tags: ['Porta a porta', 'Sem estacionar'],
    features: [
      'Solicitação de táxi e moto em poucos toques',
      'Estimativa de preço antes de confirmar',
      'Motoristas parceiros avaliados pela comunidade',
      'Perfeito para o trajeto até a rodoviária ou aeroporto',
    ],
    idealFor: 'Trajetos curtos, compromissos e conexões',
    hint: 'Menos espera, mais caminho percorrido.',
  },
]

export type Offer = {
  id: string
  destinationId: string
  title: string
  description: string
  oldPrice: string
  price: string
  discount: string
  note: string
}

export const offers: Offer[] = [
  {
    id: 'oferta-jeri',
    destinationId: 'jericoacoara',
    title: 'Fim de semana em Jericoacoara',
    description: '2 noites + rota saindo de Fortaleza',
    oldPrice: 'R$ 1.290',
    price: 'R$ 899',
    discount: '-30%',
    note: 'por pessoa, ida e volta',
  },
  {
    id: 'oferta-capitolio',
    destinationId: 'capitolio',
    title: 'Bate-volta em Capitólio',
    description: 'Rota, paradas e passeio de lancha',
    oldPrice: 'R$ 780',
    price: 'R$ 549',
    discount: '-25%',
    note: 'por pessoa, saindo de BH',
  },
  {
    id: 'oferta-monte-verde',
    destinationId: 'monte-verde',
    title: 'Escapada em Monte Verde',
    description: '3 dias de serra para recarregar',
    oldPrice: 'R$ 640',
    price: 'R$ 449',
    discount: '-30%',
    note: 'por pessoa, 2 diárias',
  },
]

export type RouteChoice = {
  id: ModeId
  label: string
  time: string
  price: string
  note: string
  icon: LucideIcon
  recommended?: boolean
}

export type RoutePlan = {
  origin: string
  stop?: string
  destination: string
  destinationId?: string
  distance: string
  choices: RouteChoice[]
}

const journeyData: Record<string, { distance: string; car: string; bus: string; taxi: string; prices: [string, string, string] }> = {
  jericoacoara: { distance: '312 km', car: '4h 20min', bus: '5h 10min', taxi: '3h 50min', prices: ['R$ 89', 'R$ 64', 'R$ 79'] },
  capitolio: { distance: '278 km', car: '3h 50min', bus: '4h 40min', taxi: '3h 20min', prices: ['R$ 79', 'R$ 54', 'R$ 69'] },
  'monte-verde': { distance: '164 km', car: '2h 40min', bus: '3h 30min', taxi: '2h 20min', prices: ['R$ 59', 'R$ 39', 'R$ 49'] },
}

export function buildRoutePlan(input: { origin: string; stop: string; destination: string }): RoutePlan {
  const match = destinations.find((item) => input.destination.toLowerCase().includes(item.name.toLowerCase()))
  const journey = (match && journeyData[match.id]) || {
    distance: '248 km',
    car: '4h 10min',
    bus: '5h 00min',
    taxi: '3h 40min',
    prices: ['R$ 89', 'R$ 62', 'R$ 76'] as [string, string, string],
  }

  return {
    origin: input.origin,
    stop: input.stop.trim() || undefined,
    destination: match ? `${match.name}, ${match.state}` : input.destination.trim(),
    destinationId: match?.id,
    distance: journey.distance,
    choices: [
      {
        id: 'carro',
        label: 'Carro próprio',
        time: journey.car,
        price: journey.prices[0],
        note: 'Combustível e pedágios estimados',
        icon: CarFront,
        recommended: true,
      },
      {
        id: 'onibus',
        label: 'Ônibus',
        time: journey.bus,
        price: journey.prices[1],
        note: 'Melhor opção pelo menor preço',
        icon: BusFront,
      },
      {
        id: 'taxi',
        label: 'Táxi & Moto',
        time: journey.taxi,
        price: journey.prices[2],
        note: 'Porta a porta, sem estacionar',
        icon: CarTaxiFront,
      },
    ],
  }
}

export const destinationTags = ['Todos', 'Praia', 'Serra', 'Aventura'] as const
