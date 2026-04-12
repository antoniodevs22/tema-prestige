# Phase 4: Anatomia de CTAs & Otimização Mobile (Atrito Zero)

## Objective
Elevar a anatomia dos botões principais de "Comprar" ("CTAs") assegurando uma experiência visual condizente com as marcas automotivas históricas, transicionada para fluidez extrema da Web moderna no ecossistema Mobile.

## Context
Baseado no `/docs-ai/MANUAL_ESTILO_MR_CAVALHEIROS.md`:
- Os CTAs precisam ter um visual de autoridade.
- A tipografia interna do botão deve ser a de precisão (Sans-serif - Inter/Geist).
- Mobile exige uma ergonomia digital perfeita: botões não muito densos, porém perfeitamente "clicáveis" (touch area Apple guideline - mín de 44px).

## Execution Steps

### 4.1 Anatomia e Hover de Autoridade
**Target:** Modificadores e globais do botão em `theme.css`.
- Assegurar `border-radius: 0px !important;` e `border: 1px solid var(--color-aged-gold-dark) !important;`.
- Configurar o Hover effect para uma transição do fundo transparente p/ um fundo sólido (ou glow profundo).
- Inserir brilho/glow dourado discreto no hover que remeta a metais valiosos (com `.2s ease-in-out`).

### 4.2 Responsividade Mobile & Ergonomia
**Target:** Media queries `< 700px` em `theme.css` ou na declaração do botão.
- Enforçar a propriedade `min-height: 44px` nos botões por padrão global para resolver falhas de touch em polegares, como exigido nas diretrizes de UI (Apple HIG).
- Assegurar que mesmo com `44px`, as fontes não fiquem gigantes e desajustadas visualmente (manter a fonte em `text-sm` ou ~`13-14px` e centrar o texto via Flexbox `align-items: center`).

## Deliverables
- [ ] O Hover do botão atualiza o Background/Glow para transmitir peso sem sujar tela.
- [ ] Regras mobile limitando `min-height` sem expandir drasticamente as margens.
- [ ] "Comprar" se torna visualmente um objeto polido, pronto para uso cross-device.

## Acceptance Criteria
- No mobile, errar o clique deve ser estatisticamente impossível.
- No desktop, a sensação tátil deve ser polida, como se a tela emitisse uma resposta de toque.
