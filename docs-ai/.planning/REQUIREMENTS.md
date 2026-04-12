# Requirements

## Validated

(None yet — ship to validate)

## Active

- [ ] Consolidar paleta de "Luxo Sombrio" com foco no uso do `#111111` / `#0A0A0A` como fundos.
- [ ] Implementar e substituir globalmente o Ouro Antigo (#D4AF37) por um tom de "Ouro Envelhecido" (Aged Gold) ou gradiente metálico elegante.
- [ ] Configurar tipografia de promessa de marca (Ex: Playfair Display ou Cinzel).
- [ ] Configurar tipografia de UI/Corpo para alta legibilidade (Ex: Inter, Geist).
- [ ] Refinar Botões e CTAs: border-radius mínimo/nulo (0px), borda dourada envelhecida de `1px` em componentes chave.
- [ ] Implementar micro-animações estilo Stripe/Vercel: transições suaves `.2s ease-in-out` nos hovers, efeitos glow e lifts curtos e precisos.
- [ ] Otimizar performance de Liquid Theme refatorando seções para carregar subcomponentes puramente via `{% render %}`.
- [ ] Assegurar carregamento "lazy" de imagens e o respeito à fotografia Chiaroscuro (contraste dramático na iluminação).

## Out of Scope

- [Lógicas Pesadas no Liquid] — Toda lógica complexa que sobrecarregue o processamento do lado do servidor Shopify deve ser delegada e tratada no front-end via JavaScript.
- [Inclusões Mistas / Heranças Vazadas] — Não usar mais a tag de `{% include %}` e hacks de metaprogramação CSS que quebrem a fluidez de carregamento.
