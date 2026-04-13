# Phase 1: Paleta de Cores, Tipografia & Ouro Envelhecido

## Objective
Implementar o design system basal, focando nas configurações globais (*settings* e *CSS variables*). Aplicar a tipografia dual (Serifada para "peso", Sans-serif para usabilidade) e criar a codificação/gradientes metálicos do "Aged Gold", substituindo o dourado obsoleto.

## Context
Conforme o `MANUAL_ESTILO` focado na fusão do luxo automotivo histórico com a fluidez digital contemporânea:
- **Fundo Sombrio:** Uso restrito ao preto-luxo (`#111111` ou `#0A0A0A`), fugindo do preto "lavado".
- **Ouro Envelhecido (Aged Gold):** Não apenas uma cor "chapada". Uma variação mais séria (ex: `#C5A059` a `#8C6E3B`) possivelmente transicionada por um agradável gradiente, emulando uma peça de bronze/ouro automotiva antiga e não plástica.
- **Fontes Duais:** Títulos em Playfair Display/Cinzel. Body & Interações UI em Inter/Geist/San Francisco.

## Execution Steps

### 1.1 Configuração de Fontes (Typographic Hierarchy)
**Target:** Arquivos CSS globais (ex: `assets/theme.css` ou equivalente). E possivelmente os Schemas em `config/settings_schema.json`.
- Injetar/Configurar fontes Serifadas para headings (`h1` ao `h3`).
- Injetar/Configurar modern sans-serifs para botões, inputs, menus e descrições (`body`, `.button`, etc).
- Garantir contrastes altos: primário `#FFFFFF`, secundário mutado `#A1A1AA` para descritivos e subtítulos, no estilo Apple/Vercel.

### 1.2 Variáveis CSS: Ouro Envelhecido & Luxo Sombrio
**Target:** CSS Global raiz (`:root` vars) ou `settings_data.json`.
- Ajustar os hexadeximais primários do fundo (Background / Surface colors).
- Substituir o amarelo/ouro velho por uma matiz "Aged Gold":
  ```css
  --color-aged-gold-light: #d8b877;
  --color-aged-gold: #c5a059;
  --color-aged-gold-dark: #8c6e3b;
  --gradient-aged-gold: linear-gradient(135deg, var(--color-aged-gold) 0%, var(--color-aged-gold-dark) 100%);
  ```
- Integrar esse gradiente como a cor (ou borda) para highlights especiais, preços de produtos (prominent pricing) e reviews (estrelas douradas).

### 1.3 Adaptação Mínima Viável do CTA (Botões Iniciais)
**Target:** CSS dos Botões globais.
- Adotar arestas afiadas (`border-radius: 0px`).
- Configurar o botão para não ter background recheado (ao menos na maioria), mantendo uma borda premium: `border: 1px solid var(--color-aged-gold-dark);`.
- Configurar hover states polidos: `transition: all .2s ease-in-out`, disparando um background subtly preenchido, ou invocando uma sutil luz/Glow no text-shadow / box-shadow dourado.

## Deliverables
- [ ] Modificação consolidada na base de fontes (CSS fonts, fallbacks seguros).
- [ ] `settings_schema.json` e CSS root (`:root`) operando com o Aged Gold e Dark Backgrounds.
- [ ] Regras CSS fundamentais do Botão Atualizado (CTA Base) concluídas e testadas num HTML primário da loja.

## Acceptance Criteria
- O "Ouro" está visivelmente mais encorpado e sofisticado ("Premium Aged").
- A rápida leitura em elementos de loja está intacta (Sans-serif claro), enquanto títulos mantêm a autoridade visual (Serifado).
- Os padrões de cor global do Shopify Theme apontam corretamente para os novos Hex codes.
