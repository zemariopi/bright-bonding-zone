import { createFileRoute } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <div className="p-8">
      <pre className="whitespace-pre-wrap">
        CORREÇÃO CIRÚRGICA — SOMENTE TRANSIÇÃO DE COR DA CENA 01 / TECNOLOGIA

NÃO TROQUE A IMAGEM.
NÃO PINTE A IMAGEM INTEIRA DE VERDE.
NÃO ALTERE O ESTADO NORMAL DA CENA.

O objetivo é apenas testar a TRANSIÇÃO DE COR da cena 01 — TECNOLOGIA.

A imagem da Tecnologia deve permanecer com seu visual normal quando a cena estiver em repouso.

Durante a transição, aplique temporariamente um tom VERDE como cor de transição, substituindo apenas o tom amarelo que estava sendo usado antes.

Portanto:

ESTADO NORMAL:
imagem original, sem verde permanente.

DURANTE A TRANSIÇÃO:
o tratamento de cor deve mudar progressivamente para verde.

APÓS A TRANSIÇÃO:
o verde deve desaparecer conforme a lógica atual da animação.

IMPORTANTE:

Não use overlay verde fixo.
Não use background verde permanente.
Não altere brightness, crop, posição, tamanho ou imagem.
Não altere Perfumaria.
Não altere Utilidades.
Não altere textos.
Não altere layout.
Não altere scroll.
Não altere nenhuma outra animação.

Quero SOMENTE trocar a COR usada no efeito de transição da Tech:

AMARELO → VERDE

para verificar se a lógica da transição está funcionando.

Se houver um valor específico no código responsável pela cor da transição da Tecnologia, altere SOMENTE esse valor.

Não faça nenhuma outra modificação.

Execute e PARE.
      </pre>
    </div>
  );
}
