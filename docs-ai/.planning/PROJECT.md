# Project: Mr. Cavalheiros Shopify Theme (GSD Framework)

## What This Is
Uma elevação da marca Mr. Cavalheiros para o ápice do design de luxo e performance digital. O projeto foca em fundir a estética clássica e o "peso histórico" de marcas automobilísticas premium (Ferrari/Lamborghini) com a extrema fluidez e o minimalismo operacional do Vale do Silício (Apple/Stripe/Vercel).

## Core Value
Conversão de altíssimo ticket através de uma interface Pixel Perfect, que transmita confiança e prestígio, garantindo o "Atrito zero" desde a navegação inicial até o checkout.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Substituição do '#D4AF37' padrão por um "Ouro Envelhecido" (Aged Gold) ou gradiente metálico. | O ouro "#D4AF37" estava parecendo liso e lavado demais no ambiente escuro. Precisamos de tons mais profundos e com peso de joia, remetendo aos detalhes de alta classe de uma Ferrari clássica. | Pending |
| Adoção híbrida de tipografias | Fontes serifadas (Playfair Display / Cinzel) p/ promessas de marca, e hiper-limpas (Inter / Geist) p/ interface de usabilidade (UI), equalizando requinte e clareza. | Pending |
| Refino extremo nos Botões (CTAs) | Bordas zero ou mínimas, traçados em ouro envelhecido de 1px, sem poluição visual. Efeitos sutis (glow/lift) com hover super polido (.2s ease-in-out). | Pending |
| Arquitetura Liquid Limpa | Uso estrito de `{% render %}` para injeção modular de componentes performáticos; abandonar o antigo `{% include %}` para reduzir sobrecarga de servidor. | Pending |
| Isolamento do GSD no `/docs-ai/` | Não misturar arquivos de documentação técnica/projeto do GSD na raiz do tema, mantendo tudo confinado na pasta apropriada. | Validated |

## Evolution
This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
