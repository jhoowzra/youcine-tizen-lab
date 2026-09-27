# YouCine Tizen Lab — Fase 2

Módulo **application** para TizenBrew.

## Objetivo desta fase
Validar:
- carregamento de um módulo próprio;
- frontend local/offline;
- foco e navegação pelo controle remoto;
- estrutura Home / Filmes / Séries / Pesquisa / Perfil.

Ainda NÃO inclui:
- backend do YouCine;
- login real;
- catálogo real;
- URLs de mídia;
- AVPlay.

## Estrutura
- `package.json`
- `app/index.html`
- `app/style.css`
- `app/app.js`

## Instalar no TizenBrew
Adicione este módulo:

`jhoowzra/youcine-tizen-lab@main`

Depois:
1. abra o gerenciador de módulos do TizenBrew;
2. escolha adicionar módulo GitHub;
3. informe `jhoowzra/youcine-tizen-lab@main`;
4. volte à lista;
5. abra `YouCine Tizen Lab`.

## Critério PASS
- o módulo aparece;
- abre sem tela branca;
- setas navegam;
- OK troca as seções do menu;
- o bloco `Controle remoto` muda para `PASS` ao pressionar uma tecla.
