# Phase 2: Refinamento de Componentes UI (Vercel & Stripe Style)

## Objective
Avançar a arquitetura visual da loja além da fundação básica. Modificar os Product Cards (Grids), refinando suas bordas para o estilo ultra-agudo de "Apple/Stripe", e introduzir os fundos Glassmorphic onde existir "overlay" (exemplo: menus, popups ou textos por cima de grandes imagens fotográficas Chiaroscuro).

## Context
Refinamento da UI para alcançar "Atrito zero" - o design precisa se afastar da robustez e sujeira de sites genéricos e aproximar-se da engenharia de ponta (Stripe, Vercel).
- Os `product-card` ou `card` não devem ter blocos flutuantes exagerados de box-shadow se não passarem por hover.
- O material "Glassmorphic" (Backdrop filter) confere um visual luxuoso acima de texturas fotográficas profundas.
- O Aged Gold deve aparecer apenas como um filete elegante de `1px` em estado de `:hover`.

## Execution Steps

### 2.1 Refatoração de Grids/Cards de Produto
**Target:** Arquivos CSS globais (ex: `assets/theme.css` ou trechos Liquid correspondentes em `snippets/product-card.liquid`).
- Remover preenchimentos ou margens não intencionais.
- Definir bordas limpas e invisíveis em estado normal, transicionando via `0.2s ease-in-out` para revelação de Ouro Envelhecido em Hover.
- Configurar imagem para sutil `.scale(1.03)` no Hover da âncora (Lift suave).

### 2.2 Transparências Luxuosas (Glassmorphism)
**Target:** Arquivos CSS relacionados a Dropdowns, Drawer Carts, e Overlays (`theme.css` ou específicos).
- Localizar elementos com `.overlay` ou modais.
- Em vez de um fundo maciço, aplicar `background: rgba(17, 17, 17, 0.7);` (Luxo Sombrio semitransparente) alido à propriedade `backdrop-filter: blur(12px);`.
- Inserir traço Ouro Envelhecido de 1px como barreira tátil no modal: `border: 1px solid rgba(197, 160, 89, 0.3)`.

### 2.3 Detalhes Finos em Tags e Badges
**Target:** Badge de *Sale* (Promoção/Ouro) ou *New*.
- Trocar fundos circulares antiquados por "pílulas" (`border-radius: 9999px` apenas nas badges seções, ou 0px se o layout demandar mais severidade).
- Ajustar os espaçamentos internos (whitespaces) pautados em sub-grid para o visual cirúrgico Apple.

## Deliverables
- [ ] CSS da Grade de Produtos otimizado para o "Hover Elegante" com elevação Vercel.
- [ ] Overlays e Modais convertidos para a textura Glassmorphic (`backdrop-filter`).
- [ ] Etiquetamento de produto (Badges) limpos e redesenhados.

## Acceptance Criteria
- Clicar em um produto na vitrine sente-se fluido e tátil (animações ultra-curtas de .2s e não preguiçosas).
- Modais e sidecarts parecem "vidro texturizado" e não blocos pretos chapados opressivos.
