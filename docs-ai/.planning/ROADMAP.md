# Roadmap: Elevação Mr. Cavalheiros

## Phase 1: Paleta de Cores, Tipografia & Ouro Envelhecido
**Goal:** Implementar o design system basal, com a tipografia dual (Serifada clássica e Sans-serif Apple) e criar a codificação/gradientes metálicos do "Aged Gold", aplicando nos arquivos centrais de tema (ex: CSS variables, _settings).
- Estudar composição CSS para o Ouro Envelhecido (combinação de hex e linear-gradients) simulando luz indireta em superfícies clássicas de luxo.
- Configurar fontes de marca globalmente, injetando links vitais e definindo as variáveis da hierarquia de textos.

## Phase 2: Refinamento de Componentes (Vercel & Stripe style)
**Goal:** Ajustar botões fundamentais, cards de intersecção, bordas extremas (border: 1px) e integrar as micro-animações (lifts e glows sútis pautadas em easing functions de .2s).
- Refatorar a folha de estilo de CTAs e grids de produto.
- Aplicar transparências Glassmorphic em overlay blocks.

## Phase 3: Performance Liquid (Apple Speed)
**Goal:** Iniciar substituição arquitetural na renderização (`include` -> `render`) e aplicar regras restritas de formatação de whitespace (`{%-`) ao longo de views estruturais densas e no header/footer.
- Mapear templates cruciais de impacto visual e refatorar Liquid snippet calls.
- Adicionar configurações apropriadas de `loading="lazy"` para fotografias "Chiaroscuro" preservando Web Vitals.
