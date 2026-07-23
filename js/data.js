/* =========================================================================
   DATA.JS
   -------------------------------------------------------------------------
   Aqui fica TODO o conteúdo do portfólio (textos, imagens, links de
   download e modelos 3D). Não precisa mexer no HTML nem no CSS para
   adicionar, remover ou editar itens — só editar os arrays abaixo.

   COMO ADICIONAR UMA IMAGEM
   - Coloque o arquivo dentro de assets/img/ (crie subpastas se quiser,
     ex: assets/img/point-blank/ak47-urban.jpg)
   - Aponte o campo "image" para esse caminho.
   - Se o campo "image" ficar vazio ou o arquivo não existir, o card mostra
     automaticamente um placeholder estilizado com o nome do item — o site
     nunca quebra por falta de imagem.

   COMO ADICIONAR DOWNLOAD (Mediafire)
   - Cole o link completo do Mediafire no campo "download".
   - Deixe "" (vazio) se ainda não tiver o link — o botão fica desativado.

   COMO ADICIONAR VISUALIZAÇÃO 3D
   - Exporte o modelo em .glb e coloque em assets/models/
   - Aponte o campo "model" para esse caminho, ex: "assets/models/ak47.glb"
   - Deixe "" (vazio) se não tiver modelo 3D — o botão fica desativado.
   ========================================================================= */

/* ---------------------- POINT BLANK — PACKS LANÇADOS --------------------
   Estrutura em 3 níveis para os itens de "Armas":
     category    → sempre "Armas" pra qualquer skin de arma
     subcategory → família da arma: Rifles, Sniper, SMG, Shotgun, Pistolas, Melee
     weapon      → arma específica dentro da subcategoria (ex: "AK47", "AUG A3")
   O filtro de "arma específica" no site é gerado automaticamente a partir
   dos valores de "weapon" que existirem em cada subcategoria — não precisa
   declarar essa lista em nenhum outro lugar, só usar o mesmo nome de "weapon"
   em todos os itens daquela arma.

   "Mapas" e "Launcher" ficam FORA da categoria "Armas" (sem subcategory/
   weapon) — são categorias soltas, iguais ao esquema antigo.
   As categorias e subcategorias de "Armas" ficam declaradas em
   pointBlankTopCategories / pointBlankArmasSubcategories, mais abaixo. */

const pointBlankTopCategories = ["Armas", "Mapas", "Launcher"];
const pointBlankArmasSubcategories = ["Rifles", "Sniper", "SMG", "Shotgun", "Pistolas", "Melee"];

const pointBlankItems = [
  // -------- Armas > Rifles --------
  { title:"AK47 Urban Camo", category:"Armas", subcategory:"Rifles", weapon:"AK47", image:"assets/img/point-blank/ak47-urban.jpg", download:"", model:"" },
  { title:"Aug Monster Energy Falken", category:"Armas", subcategory:"Rifles", weapon:"AUG A3", image:"assets/img/point-blank/aug-monster-energy-falken.jpg", download:"https://www.mediafire.com/", model:"assets/models/aug-a3.glb" },
  { title:"Aug San Fierro Police", category:"Armas", subcategory:"Rifles", weapon:"AUG A3", image:"assets/img/point-blank/aug-san-fierro-police.jpg", download:"https://www.mediafire.com/", model:"assets/models/aug-a3.glb" },
  { title:"FAMAS Digital", category:"Armas", subcategory:"Rifles", weapon:"FAMAS", image:"assets/img/point-blank/famas-digital.jpg", download:"", model:"" },
  { title:"G36C Nightfall", category:"Armas", subcategory:"Rifles", weapon:"G36C", image:"assets/img/point-blank/g36c-nightfall.jpg", download:"", model:"" },
  { title:"SG550 Carbon", category:"Armas", subcategory:"Rifles", weapon:"SG550", image:"assets/img/point-blank/sg550-carbon.jpg", download:"", model:"" },

  // -------- Armas > Sniper --------
  { title:"CheyTac Ghost", category:"Armas", subcategory:"Sniper", weapon:"CheyTac", image:"assets/img/point-blank/cheytac-ghost.jpg", download:"", model:"" },
  { title:"L115A1 Arctic", category:"Armas", subcategory:"Sniper", weapon:"L115A1", image:"assets/img/point-blank/l115a1-arctic.jpg", download:"", model:"" },
  { title:"Rangemaster Gold", category:"Armas", subcategory:"Sniper", weapon:"Rangemaster", image:"assets/img/point-blank/rangemaster-gold.jpg", download:"", model:"" },

  // -------- Armas > SMG --------
  { title:"Kriss Super V Alpha", category:"Armas", subcategory:"SMG", weapon:"Kriss Super V", image:"assets/img/point-blank/kriss-super-v-alpha.jpg", download:"", model:"" },
  { title:"Micro Uzi Chrome", category:"Armas", subcategory:"SMG", weapon:"Micro Uzi", image:"assets/img/point-blank/micro-uzi-chrome.jpg", download:"", model:"" },
  { title:"MP7 Stealth", category:"Armas", subcategory:"SMG", weapon:"MP7", image:"assets/img/point-blank/mp7-stealth.jpg", download:"", model:"" },
  { title:"P90 Hazard", category:"Armas", subcategory:"SMG", weapon:"P90", image:"assets/img/point-blank/p90-hazard.jpg", download:"", model:"" },
  { title:"Spectre Void", category:"Armas", subcategory:"SMG", weapon:"Spectre", image:"assets/img/point-blank/spectre-void.jpg", download:"", model:"" },

  // -------- Armas > Shotgun --------
  { title:"870MCS Reaper", category:"Armas", subcategory:"Shotgun", weapon:"870MCS", image:"assets/img/point-blank/870mcs-reaper.jpg", download:"", model:"" },
  { title:"Spas-15 Inferno", category:"Armas", subcategory:"Shotgun", weapon:"Spas-15", image:"assets/img/point-blank/spas-15-inferno.jpg", download:"", model:"" },

  // -------- Armas > Pistolas --------
  { title:"Colt Python Gold", category:"Armas", subcategory:"Pistolas", weapon:"Colt Python", image:"assets/img/point-blank/colt-python-gold.jpg", download:"", model:"" },
  { title:"Desert Eagle Non-Grata", category:"Armas", subcategory:"Pistolas", weapon:"Desert Eagle", image:"assets/img/point-blank/aug-non-grata-red.jpg", download:"https://www.mediafire.com/", model:"" },
  { title:"Glock18 Neon", category:"Armas", subcategory:"Pistolas", weapon:"Glock18", image:"assets/img/point-blank/glock18-neon.jpg", download:"", model:"" },
  { title:"MK23 Silent", category:"Armas", subcategory:"Pistolas", weapon:"MK23", image:"assets/img/point-blank/mk23-silent.jpg", download:"", model:"" },
  { title:"K-5 Classic", category:"Armas", subcategory:"Pistolas", weapon:"K-5", image:"assets/img/point-blank/k5-classic.jpg", download:"", model:"" },
  { title:"K400 Prata", category:"Armas", subcategory:"Pistolas", weapon:"K400", image:"assets/img/point-blank/k400-prata.jpg", download:"", model:"" },

  // -------- Armas > Melee --------
  { title:"Amok Kukri Sangue", category:"Armas", subcategory:"Melee", weapon:"Amok Kukri", image:"assets/img/point-blank/amok-kukri-sangue.jpg", download:"", model:"" },
  { title:"Dual Knife Shadow", category:"Armas", subcategory:"Melee", weapon:"Dual Knife", image:"assets/img/point-blank/dual-knife-shadow.jpg", download:"", model:"" },
  { title:"Machete de Combate Rust", category:"Armas", subcategory:"Melee", weapon:"Machete", image:"assets/img/point-blank/machete-rust.jpg", download:"", model:"" },
  { title:"Mini-Axe Frost", category:"Armas", subcategory:"Melee", weapon:"Mini-Axe", image:"assets/img/point-blank/mini-axe-frost.jpg", download:"", model:"" },

  // -------- Launcher (fora de "Armas", sem subcategoria/arma) --------
  { title:"Ballistic Kit Ouro", category:"Launcher", image:"assets/img/point-blank/ballistic-ouro.jpg", download:"", model:"" },
  { title:"Chocolate Kit", category:"Launcher", image:"assets/img/point-blank/chocolate-kit.jpg", download:"", model:"" },
  { title:"WP Smoke Tático", category:"Launcher", image:"assets/img/point-blank/wp-smoke.jpg", download:"", model:"" },

  // -------- Mapas (fora de "Armas", sem subcategoria/arma) --------
  { title:"Mstation", category:"Mapas", image:"assets/img/point-blank/mstation.jpg", download:"", model:"" },
  { title:"Burning Hall", category:"Mapas", image:"assets/img/point-blank/burning-hall.jpg", download:"", model:"" },
];

/* ----------------- POINT BLANK — PROJETOS (SÓ ARTE/CONCEITO) ------------ */
const pointBlankProjects = [
  { title:"AK47 Predator (conceito)", category:"Rifles", image:"assets/img/point-blank/projetos/ak47-predator.jpg" },
  { title:"P90 Aurora (conceito)", category:"SMG", image:"assets/img/point-blank/projetos/p90-aurora.jpg" },
  { title:"Desert Eagle Kitsune (conceito)", category:"Pistolas", image:"assets/img/point-blank/projetos/desert-eagle-kitsune.jpg" },
  { title:"CheyTac Blackout (conceito)", category:"Sniper", image:"assets/img/point-blank/projetos/cheytac-blackout.jpg" },
];

/* ------------------------------ ROCKET LEAGUE --------------------------- */
const rocketLeagueCategories = ["Todos", "Octane", "Dominus", "Fennec", "Batmobile", "Breakout"];

const rocketLeagueItems = [
  { title:"Octane Fúria Néon", category:"Octane", image:"assets/img/rocket-league/octane-furia-neon.jpg", download:"", model:"" },
  { title:"Octane Camuflado Setor", category:"Octane", image:"assets/img/rocket-league/octane-camuflado.jpg", download:"", model:"" },
  { title:"Dominus Rust Bucket", category:"Dominus", image:"assets/img/rocket-league/dominus-rust.jpg", download:"", model:"" },
  { title:"Fennec Prisma", category:"Fennec", image:"assets/img/rocket-league/fennec-prisma.jpg", download:"", model:"" },
  { title:"Batmobile Noturno", category:"Batmobile", image:"assets/img/rocket-league/batmobile-noturno.jpg", download:"", model:"" },
  { title:"Breakout Vaporwave", category:"Breakout", image:"assets/img/rocket-league/breakout-vaporwave.jpg", download:"", model:"" },
];

/* --------------------------- EURO TRUCK SIMULATOR 2 --------------------- */
const ets2Categories = ["Todos", "Scania", "Volvo", "Mercedes-Benz", "DAF", "MAN", "Iveco", "Renault"];

const ets2Items = [
  { title:"Scania S Highline Grafite", category:"Scania", image:"assets/img/ets2/scania-s-highline-grafite.jpg", download:"", model:"" },
  { title:"Scania Next Gen Chamas", category:"Scania", image:"assets/img/ets2/scania-nextgen-chamas.jpg", download:"", model:"" },
  { title:"Volvo FH16 Nórdico", category:"Volvo", image:"assets/img/ets2/volvo-fh16-nordico.jpg", download:"", model:"" },
  { title:"Mercedes Actros Prata Fosco", category:"Mercedes-Benz", image:"assets/img/ets2/actros-prata-fosco.jpg", download:"", model:"" },
  { title:"DAF XF Néon Azul", category:"DAF", image:"assets/img/ets2/daf-xf-neon-azul.jpg", download:"", model:"" },
  { title:"MAN TGX Camuflado", category:"MAN", image:"assets/img/ets2/man-tgx-camuflado.jpg", download:"", model:"" },
  { title:"Iveco S-Way Rústico", category:"Iveco", image:"assets/img/ets2/iveco-sway-rustico.jpg", download:"", model:"" },
  { title:"Renault T Vermelho Fosco", category:"Renault", image:"assets/img/ets2/renault-t-vermelho.jpg", download:"", model:"" },
];

/* -------------------------------- SCREENSHOTS --------------------------- */
const screenshotCategories = ["Todos", "Gran Turismo 4", "Gran Turismo 6", "NFS Most Wanted", "NFS World", "Cinema 4D", "ETS2"];

const screenshotItems = [
  { title:"GT4 — Pista Molhada", category:"Gran Turismo 4", image:"assets/img/screenshots/gt4-01.jpg" },
  { title:"GT4 — Grid de Largada", category:"Gran Turismo 4", image:"assets/img/screenshots/gt4-02.jpg" },
  { title:"GT6 — Pôr do Sol", category:"Gran Turismo 6", image:"assets/img/screenshots/gt6-01.jpg" },
  { title:"GT6 — Replay Cinemático", category:"Gran Turismo 6", image:"assets/img/screenshots/gt6-02.jpg" },
  { title:"NFS Most Wanted — Perseguição", category:"NFS Most Wanted", image:"assets/img/screenshots/nfsmw-01.jpg" },
  { title:"NFS Most Wanted — Garagem", category:"NFS Most Wanted", image:"assets/img/screenshots/nfsmw-02.jpg" },
  { title:"NFS World — Encontro Noturno", category:"NFS World", image:"assets/img/screenshots/nfsworld-01.jpg" },
  { title:"Cinema 4D — Render de Estúdio", category:"Cinema 4D", image:"assets/img/screenshots/c4d-01.jpg" },
  { title:"Cinema 4D — Estudo de Luz", category:"Cinema 4D", image:"assets/img/screenshots/c4d-02.jpg" },
  { title:"ETS2 — Estrada ao Amanhecer", category:"ETS2", image:"assets/img/screenshots/ets2-01.jpg" },
  { title:"ETS2 — Posto de Combustível", category:"ETS2", image:"assets/img/screenshots/ets2-02.jpg" },
  { title:"ETS2 — Neve nos Alpes", category:"ETS2", image:"assets/img/screenshots/ets2-03.jpg" },
];

/* --------------------------------- MINECRAFT ---------------------------- */
const minecraftItems = [
  { title:"Cidade Flutuante", note:"Mapa de sobrevivência com construções suspensas.", image:"assets/img/minecraft/cidade-flutuante.jpg", download:"" },
  { title:"Arena PvP Setorial", note:"Mapa competitivo com quatro setores temáticos.", image:"assets/img/minecraft/arena-pvp.jpg", download:"" },
  { title:"Vila Medieval", note:"Reconstrução detalhada de uma vila medieval.", image:"assets/img/minecraft/vila-medieval.jpg", download:"" },
];

/* -------------------------------- GTA SAN ANDREAS ------------------------ */
const gtaSaItems = [
  { title:"Elegy Tuning Racing", note:"Paint job de corrida em vermelho e preto.", image:"assets/img/gta-sa/elegy-racing.jpg", download:"" },
  { title:"Infernus Néon", note:"Pintura metálica com detalhes em neon.", image:"assets/img/gta-sa/infernus-neon.jpg", download:"" },
  { title:"Sultan Rally", note:"Skin inspirada em carros de rally.", image:"assets/img/gta-sa/sultan-rally.jpg", download:"" },
];

/* --------------------------------- PHOTOSHOP ----------------------------- */
const photoshopItems = [
  { title:"Composição Urbana", image:"assets/img/photoshop/urbana.jpg" },
  { title:"Manipulação Surreal", image:"assets/img/photoshop/surreal.jpg" },
  { title:"Arte para Capa de Vídeo", image:"assets/img/photoshop/capa-video.jpg" },
  { title:"Wallpaper Point Blank", image:"assets/img/photoshop/wallpaper-pb.jpg" },
];

/* ------------------------------- JOGO AUTORAL ---------------------------- */
const gameFeatureData = {
  title:"Nema Izlaza",
  genre:"Terror / Survival",
  image:"assets/img/jogo-autoral/nema-izlaza.jpg",
  text:"Projeto autoral de terror desenvolvido do zero — dos cenários à identidade visual. \"Nema Izlaza\" (\"sem saída\", em sérvio) coloca o jogador em um ambiente hostil onde cada decisão importa. Um projeto pessoal para explorar narrativa, atmosfera e design de jogos além das skins.",
  download:"",
  video:""
};

/* --------------------------------- SOCIAL -------------------------------- */
const socialLinks = [
  { label:"YouTube", url:"https://www.youtube.com/user/Raphaelsantosize" },
  { label:"Facebook", url:"http://www.facebook.com/alfa141packs" },
];
