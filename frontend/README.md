# PartiuAí — Front end

Interface completa (somente front end) da aplicação **PartiuAí**, construída a partir das
referências em `../referencias` (logo, paleta de cores e wireframes mobile/desktop).

> Nenhum back end foi implementado. Todos os dados (destinos, ofertas, rotas e preços)
> são **simulados no front end**, em `src/data.ts`, prontos para serem substituídos por
> chamadas de API quando o back end existir.

## Stack

- React 19 + TypeScript + Vite
- CSS puro com design tokens (sem framework de estilo)
- `lucide-react` para ícones
- Fontes: Plus Jakarta Sans (texto) e Instrument Serif (destaques) via Google Fonts

## Como rodar

```bash
cd frontend
npm install
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção: UM único dist/index.html
npm run build:folder # build de produção com assets em pastas (para hospedar)
npm run preview      # serve o build de produção
npm run lint         # oxlint
```

### Abrir sem servidor (duplo clique)

O `npm run build` gera **apenas** `dist/index.html`, com CSS, JavaScript e todas as
imagens embutidos em base64. Basta dar duplo clique no arquivo — não precisa de Node,
servidor nem conexão (exceto as fontes do Google, que caem no fallback do sistema
quando offline).

```
frontend/dist/index.html   ← abra este arquivo (~2,5 MB)
```

Como funciona:

- `vite-plugin-singlefile` embute o JS e o CSS no HTML.
- As imagens ficam em `src/assets/` e são **importadas como módulos**, então o Vite
  as converte em data URIs uma única vez e deduplica (`assetsInlineLimit`).
- `scripts/inline-assets.mjs` roda no fim do build e embute o `favicon.svg`, além de
  apagar as pastas de assets que sobraram. Ele falha o build se restar algum caminho
  absoluto local no HTML.

> Se o `npm run dev` cair com `memory allocation failed`, é falta de memória livre na
> máquina para o pré-empacotador de dependências do Vite. Nesse caso use
> `npm run build && npm run preview`, que funciona igual.

## Identidade visual

| Token | Valor | Uso |
| --- | --- | --- |
| `--navy` | `#0E0064` | azul-marinho da marca |
| `--blue` | `#5472FF` | azul principal |
| `--purple` | `#8C52FF` | roxo de destaque |
| `--white` | `#FFFFFF` | base clara |

O logo original (`referencias/logo.png`) foi processado em duas versões com fundo
transparente e vive em `src/assets/`: `logo-wordmark-color.png` (tema claro),
`logo-wordmark-light.png` (tema escuro) e o símbolo (`logo-mark-color/light.png`).
São importados por `src/assets/brand.ts`, junto com as fotos dos destinos.

## Estrutura

```
src/
├── App.tsx                    # estado global da página e orquestração das sobreposições
├── data.ts                    # destinos, formas de viagem, ofertas e montagem de rotas
├── assets/
│   ├── brand.ts               # importa logos e fotos (Vite deduplica e embute no build)
│   └── *.png / *.jpg          # logo, símbolo e fotos dos destinos
├── components/
│   ├── Header.tsx             # menu, logo, busca, ofertas, conta e alternância de tema
│   ├── Hero.tsx               # título, localização, planejador e carrossel
│   ├── RoutePlanner.tsx       # campos de rota (partida, parada opcional, destino)
│   ├── DestinationCarousel.tsx# carrossel de destinos com autoplay e arraste
│   ├── TrustStrip.tsx         # faixa de diferenciais
│   ├── TravelModes.tsx        # cards carro / ônibus / táxi & moto
│   ├── CtaSection.tsx         # bloco "Planejando sua próxima viagem?"
│   ├── Footer.tsx             # newsletter, navegação, destinos e contato
│   ├── Modal.tsx              # diálogo acessível (foco preso, Esc, scroll lock)
│   ├── MenuDrawer.tsx         # menu lateral
│   ├── SearchModal.tsx        # busca de destinos
│   ├── OffersModal.tsx        # ofertas
│   ├── ModeModal.tsx          # detalhes de cada forma de viagem
│   ├── RouteResultModal.tsx   # resultado da rota com opções
│   ├── AuthModal.tsx          # entrar / criar conta (visual)
│   └── Toast.tsx              # notificações
├── hooks/                     # tema, scroll lock e reveal on scroll
└── styles/                    # tokens, header, hero, carrossel, seções, overlays, responsivo
```

## Funcionalidades já implementadas (front end)

- Layout responsivo (desktop, tablet e mobile) seguindo os dois wireframes de referência.
- Tema claro/escuro com persistência em `localStorage`.
- Menu lateral com navegação por âncoras e busca de destinos.
- Planejador de rota com validação de campos, geolocalização simulada e parada opcional.
- Resultado de rota comparando carro, ônibus e táxi/moto (valores estimados).
- Busca de destinos com filtro por tipo (praia, serra, aventura).
- Modal de ofertas, detalhes de cada forma de viagem e tela de acesso.
- Carrossel de destinos com autoplay, setas, indicadores e arraste.
- Newsletter com validação de e-mail, toasts de feedback e "voltar ao topo".
- Acessibilidade: navegação por teclado, foco preso nos diálogos, `aria-label`, textos alternativos
  e respeito a `prefers-reduced-motion`.

## Animações de entrada (reveal on scroll)

O hook `useRevealOnScroll` anima os blocos conforme eles entram na viewport.

| Atributo | Efeito |
| --- | --- |
| `data-reveal` | Fade + subida (padrão) |
| `data-reveal="up\|down\|left\|right\|scale\|fade"` | Variantes de direção |
| `data-reveal-delay="120"` | Delay explícito em ms |
| `data-reveal-group` | Container cujos filhos diretos entram em cascata |
| `data-reveal-stagger="90"` | Passo da cascata daquele grupo |

Blocos com reveal:Faixa de diferenciais (4 itens em cascata), título da seção
"Como você quer partir?", cards carro/ônibus/táxi (entrada em escala), bloco de CTA,
newsletter e colunas do rodapé.

> O `prefers-reduced-motion: reduce` desativa a animação e exibe tudo imediatamente.
> Note que o Chrome headless ativa essa media query por padrão — em capturas
> automatizadas force `no-preference` para ver a animação.

## Animações dos botões

Efeitos sutis, aplicados via CSS e um único hook (`useButtonMagnet`), que apenas
alimenta as variáveis `--btn-x` / `--btn-y` com a posição do cursor.

| Elemento | Hover | Clique |
| --- | --- | --- |
| `.button` (`--primary`, `--white`, `--glass`) | sobe 3px, sombra cresce, brilho radial segue o cursor | desce para 1px e escala 0.985 |
| `.button__icon` | seta desliza 4px para a direita | volta 2px com leve redução |
| `.icon-button`, `.header__avatar` | sobe 2px, borda/sombra realçadas, brilho radial | escala 0.98 |
| `.offers-button` | sobe 2px, sombra e saturação aumentam | escala 0.985 |
| `.slide__cta`, `.footer__top` | sobe 2px, fundo/borda mais claros, brilho radial | escala 0.985 |
| `.mode-card__link` | quadrado da seta sobe na diagonal e ganha gradiente | volta parcialmente, escala 0.96 |

O brilho é um `::before` com `radial-gradient` posicionado em `var(--btn-x) var(--btn-y)`;
`useButtonMagnet` atualiza essas variáveis no `mousemove` e recentraliza no `mouseleave`.
Tudo é desativado por `prefers-reduced-motion: reduce` (ver `src/styles/motion.css`).

## Próximos passos (back end)

1. Substituir `src/data.ts` por chamadas de API (destinos, ofertas, rotas, autenticação).
2. Substituir a geolocalização simulada por `navigator.geolocation`.
3. Conectar o login/cadastro a um provedor de autenticação.
4. Enviar a newsletter para um serviço de e-mail.
