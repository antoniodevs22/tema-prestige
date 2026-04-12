# Phase 7: Product Page Masterclass

## Objective
Transformar a página de produto (PDP) em uma experiência de alta conversão e autoridade, alinhando a anatomia dos botões, selos de confiança e tabelas técnicas ao Manual de Estilo Mr. Cavalheiros.

## Context
A página de produto é o momento da decisão. 
- O botão de compra deve ser um "convite de posse".
- A confiança deve ser transmitida via minimalismo (Trust Badges).
- Dados técnicos (Tabela de Medidas) devem ser legíveis e elegantes (Apple Standard).
- A apresentação visual deve ser dramática (Chiaroscuro).

## Execution Steps

### 7.1 Transmutação do CTA Principal
**Target:** `locales/pt-BR.json` e `assets/theme.css`.
- Alterar chave `products.product.add_to_cart` para "ADQUIRIR PEÇA".
- Garantir que a classe `.product-form__submit` (ou equivalente no Prestige) herde as regras de `1px border`, `0 radius` e `Aged Gold hover`.

### 7.2 Trust Badges Bespoke
**Target:** `snippets/product-info.liquid` ou arquivo de detalhes do produto.
- Injetar um bloco de HTML minimalista logo abaixo do seletor de quantidade/botão de compra.
- Estilo: Ícones finos (SVG) em dourado (`var(--color-aged-gold)`) + Texto em `smallcaps` Sans-serif.

### 7.3 Tabela de Medidas (Clean UI)
**Target:** CSS global e possivelmente um snippet de tabela.
- Definir estilos para `table.size-chart`: `border-collapse: collapse`, `border-top/bottom: 1px solid rgba(255,255,255,0.1)`.
- Tipografia: Inter, `text-xs` ou `text-sm`.
- Remover brancos excessivos e cores berrantes.

### 7.4 Apresentação Chiaroscuro
**Target:** `assets/theme.css`.
- Aplicar `box-shadow: inset 0 0 50px rgba(0,0,0,0.5);` ou uma máscara de gradiente radial nos containers de imagem do produto (`.product-gallery__image-wrapper`).
- Objetivo: Criar profundidade contra o fundo `#111111`.

## Deliverables
- [ ] Botão de compra atualizado com novo texto e estilo.
- [ ] Bloco de Trust Badges operante.
- [ ] CSS de tabelas técnicas polido.
- [ ] Efeito de profundidade nas imagens ativado.
