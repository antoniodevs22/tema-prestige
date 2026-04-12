# Phase 3: Performance Liquid & Chiaroscuro Loading

## Objective
Acelerar drasticamente o tempo de carregamento da aplicação (TTFB e LCP) e evitar vazamento de contexto, implementando lógicas "Apple-level" no back-end (Liquid). Esta fase também deve configurar fotografias chave (Chiaroscuro) para "lazy loading" a fim de mitigar o bloqueio de renderização imposto por imagens grandes e de alto contraste.

## Context
A marcação no manual adverte severamente contra o uso de linguagens lentas (`{% include %}`) na engine do Shopify. Quando se trata de performance digna da Vercel/Stripe, o peso visual de imagens não deve atrasar a loja.
- `{% include %}` quebra o escopo e é descontinuado pela Shopify – deve-se usar `{% render %}` forçando o código a ser autossuficiente e rápido.
- Tags devem ser apertadas para controle de espaço branco: `{%-` e `-%}`, prevenindo sujeira microscópica no DOM.
- Imagens fotográficas enormes precisam de tags corretas de native lazy-load.

## Execution Steps

### 3.1 Migração: Include para Render
**Target:** Arquivos estruturais de peso (ex: `layout/theme.liquid`, `sections/header-group.liquid` ou customizações do footer).
- Usar ferramentas de refatoração massiva (grep/search) na loja para encontrar remanescentes obsoletos de `{% include %}`.
- Substituir chamadas por `{% render 'snippet-name' %}` e passar as variáveis ativamente na declaração (ex: `with my_var: my_var`).
- *Nota:* Certifique-se de que nenhum snippet essencial exija variáveis globais que não estejam sendo passadas na própria chamada do `render`.

### 3.2 Higiene de Whitespace
**Target:** `snippets/product-card.liquid` ou estruturas em loop pesadas (`for`).
- Refatorar qualquer bloco condicional solto de `{% if x %}` para `{%- if x -%}` em áreas vitais, suprimindo brancos sobressalentes que travam o parse da DOM na engine do navegador.

### 3.3 Chiaroscuro "Lazy" Loading Presets
**Target:** Renderização de Imagens Globais (geralmente localizados em `snippets/image.liquid` ou tags `<picture>` espalhadas pelos `blocks/`).
- Assegurar que os elementos `img` recebam ativamente o atributo `loading="lazy"`.
- *Exceção Crítica:* Imagens de "above the fold" (LCP - Maior Preenchimento de Conteúdo visível primeiramente, ex: Banner Principal) DEVEM utilizar `loading="eager"` ou `priority: "high"`. Todas as outras `lazy-load` nativo.
- Adicionar as propriedades `decoding="async"`.

## Deliverables
- [ ] Arquivos mestre inspecionados para remoção e atualização de tags obsoletas.
- [ ] Controle rígido de Whitespaces injetado onde for essencial.
- [ ] Otimização nativa das imagens "Chiaroscuro" nos grids.

## Acceptance Criteria
- A home page deve carregar perceptivelmente mais limpa, sem rebaixamentos de layout.
- Nenhum `include` deve ser acionado na geração do corpo e index do tema.
- A ferramenta Lighthouse apontaria saltos em performance ao processar `<img>` com `loading="lazy"`.
