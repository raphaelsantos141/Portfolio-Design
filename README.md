# Raphael Augusto Designer — Portfólio

Site estático, sem build: é só abrir `index.html` no navegador (ou subir os arquivos
em qualquer hospedagem — Netlify, Vercel, GitHub Pages, etc).

## Estrutura

```
index.html          → estrutura das seções (não precisa mexer aqui pra add conteúdo)
css/style.css        → toda a estilização
js/data.js           → TODO o conteúdo do site (textos, imagens, links, modelos 3D)
js/main.js           → lógica de renderização, filtros e modais (não precisa mexer)
assets/logo/         → sua logo (já incluída)
assets/img/          → coloque aqui as imagens de cada projeto
assets/models/       → coloque aqui os modelos .glb para o visualizador 3D
```

## Como adicionar conteúdo

Tudo é editado em **`js/data.js`**. Cada seção do site é uma lista (array) de
objetos. Para adicionar um item, copie um bloco existente e troque os valores.

Exemplo (Rocket League / ETS2 — categoria simples):

```js
{ title:"Octane Fúria Néon", category:"Octane", image:"assets/img/rocket-league/octane-furia-neon.jpg", download:"https://www.mediafire.com/xxxx", model:"assets/models/octane.glb" },
```

Exemplo (Point Blank — hierarquia de 3 níveis, só pra armas):

```js
{ title:"AK47 Urban Camo", category:"Armas", subcategory:"Rifles", weapon:"AK47", image:"assets/img/point-blank/ak47-urban.jpg", download:"https://www.mediafire.com/xxxx", model:"assets/models/ak47.glb" },
```

- **image**: caminho da imagem dentro de `assets/img/`. Se deixar vazio ou o
  arquivo não existir, o card mostra um placeholder estilizado com o nome do
  item — o site nunca quebra por falta de imagem.
- **download**: link do Mediafire. Se vazio, o botão "Download" fica
  desativado.
- **model**: caminho do arquivo `.glb` em `assets/models/`. Se vazio, o botão
  "Ver em 3D" fica desativado. Ao clicar, abre um visualizador 3D interativo
  (arrastar para girar, scroll para zoom).
- **category**: precisa bater exatamente com uma das categorias declaradas no
  topo do arquivo (`rocketLeagueCategories`, `screenshotCategories`,
  `ets2Categories`, ou — no caso do Point Blank — `pointBlankTopCategories`).
  Para criar uma categoria nova, adicione o nome nessa lista também.

### Point Blank: categoria > subcategoria > arma

O Point Blank tem um filtro em 3 níveis, só pra parte de armas. Cada item
tem três campos:

- **category**: `"Armas"` pra qualquer skin de arma, ou `"Mapas"` /
  `"Launcher"` pros itens soltos (sem os campos abaixo).
- **subcategory**: só quando `category` é `"Armas"` — a família da arma:
  `Rifles`, `Sniper`, `SMG`, `Shotgun`, `Pistolas` ou `Melee` (lista em
  `pointBlankArmasSubcategories`, no topo de `data.js`).
- **weapon**: só quando `category` é `"Armas"` — o nome da arma específica
  (ex: `"AK47"`, `"AUG A3"`, `"870MCS"`, `"Amok Kukri"`). **Não precisa
  declarar essa lista em nenhum lugar** — o filtro de arma específica no
  site é gerado automaticamente a partir dos valores de `weapon` que
  existirem dentro de cada subcategoria. Se você adicionar uma skin nova
  pra uma arma que ainda não existe (ex: `weapon:"M4A1"`), o botão de
  filtro "M4A1" aparece sozinho.
- Pra criar uma nova subcategoria (família de arma), adicione o nome em
  `pointBlankArmasSubcategories`.
- Todas as skins da mesma arma (ex: as duas do AUG A3) precisam usar
  exatamente o mesmo texto em `weapon` pra caírem no mesmo filtro.

> Screenshots do ETS2 entram direto em `screenshotItems`, com
> `category:"ETS2"` — não é uma seção separada, é só mais uma categoria
> dentro da seção Screenshots que já existe. Já os **skins de caminhão**
> (packs pra baixar) ficam na seção própria "Euro Truck Simulator 2",
> editados em `ets2Items`.

### Seções e onde editar cada uma

| Seção do site        | Variável em `data.js`                          |
|-----------------------|-------------------------------------------------|
| Point Blank (packs)   | `pointBlankItems` / hierarquia em `pointBlankTopCategories` + `pointBlankArmasSubcategories` |
| Point Blank (projetos)| `pointBlankProjects` (sem download/3D, só imagem + categoria) |
| Rocket League         | `rocketLeagueItems` / categorias em `rocketLeagueCategories` |
| Screenshots           | `screenshotItems` / categorias em `screenshotCategories` |
| Euro Truck Simulator 2| `ets2Items` / categorias em `ets2Categories` |
| Minecraft             | `minecraftItems` |
| GTA San Andreas       | `gtaSaItems` |
| Jogo autoral          | `gameFeatureData` (objeto único) |
| Edições Photoshop     | `photoshopItems` |
| Redes sociais (rodapé)| `socialLinks` |

## Paginação

Todas as grades (Point Blank, Rocket League, Screenshots, Minecraft, GTA SA,
Photoshop, incluindo os "Projetos" do Point Blank) agora mostram os itens em
páginas, com botões `‹ 1 2 3 ›` abaixo do grid, em vez de listar tudo de uma
vez. Ao trocar de filtro (ex: clicar em "Rifles"), a paginação volta pra
página 1 automaticamente.

- Para mudar quantos itens aparecem por página, edite a constante
  `PAGE_SIZE` no topo da seção "PAGINAÇÃO" em `js/main.js` (hoje está em 8).
- Se uma seção tiver poucos itens (menos que `PAGE_SIZE`), os botões de
  página simplesmente não aparecem.

## Sobre os modelos 3D

O visualizador usa o componente `<model-viewer>` do Google (carregado via CDN
no `index.html`). Ele só aceita arquivos `.glb` (ou `.gltf` com os assets
juntos). Se você exportar do Blender/Cinema4D, exporte direto como `.glb` —
é o formato mais simples de hospedar, já vem com texturas embutidas.

## Personalização rápida

- Cores, fontes e o efeito de "mira/retícula" nos cards estão centralizados
  no topo de `css/style.css`, na seção `:root` — mudar as variáveis muda o
  site inteiro.
- O menu lateral (esquerda no desktop, topo no mobile) é gerado a partir dos
  links dentro de `<nav class="nav__list">` no `index.html`.
