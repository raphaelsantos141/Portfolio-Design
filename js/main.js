/* =========================================================================
   MAIN.JS — renderização e interações
   Não precisa editar este arquivo para adicionar conteúdo — veja data.js
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------- helpers de DOM --------------------------- */
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function corners() {
    const wrap = el("div");
    wrap.innerHTML =
      '<span class="corner corner--tl"></span><span class="corner corner--tr"></span>' +
      '<span class="corner corner--bl"></span><span class="corner corner--br"></span>';
    return wrap;
  }

  /* Cria a área de mídia do card: tenta carregar a imagem; se não existir
     ou o campo vier vazio, cai automaticamente num placeholder estilizado. */
  function buildMedia(title, category, image) {
    const media = el("div", "card__media");
    media.appendChild(corners());

    if (image) {
      const img = el("img");
      img.alt = title;
      img.loading = "lazy";
      img.onerror = function () {
        img.remove();
        media.appendChild(buildPlaceholder(title, category));
      };
      img.src = image;
      media.appendChild(img);
    } else {
      media.appendChild(buildPlaceholder(title, category));
    }
    return media;
  }

  function buildPlaceholder(title, category) {
    const ph = el("div", "card__placeholder");
    ph.appendChild(el("span", "card__placeholder-tag", category || "Imagem em breve"));
    ph.appendChild(el("span", "card__placeholder-title", title));
    return ph;
  }

  /* ------------------------------- MODALS -------------------------------- */
  const modelModal = document.getElementById("modelModal");
  const modelViewer = document.getElementById("modelViewer");
  const modelModalTitle = document.getElementById("modelModalTitle");
  const modelModalClose = document.getElementById("modelModalClose");

  const imageModal = document.getElementById("imageModal");
  const imageModalImg = document.getElementById("imageModalImg");
  const imageModalTitle = document.getElementById("imageModalTitle");
  const imageModalClose = document.getElementById("imageModalClose");

  function openModal(modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openModelViewer(title, modelSrc) {
    modelModalTitle.textContent = title;
    modelViewer.setAttribute("src", modelSrc);
    openModal(modelModal);
  }
  function openImageViewer(title, imgSrc) {
    if (!imgSrc) return;
    imageModalImg.src = imgSrc;
    imageModalImg.alt = title;
    imageModalTitle.textContent = title;
    openModal(imageModal);
  }

  modelModalClose.addEventListener("click", function () {
    closeModal(modelModal);
    modelViewer.removeAttribute("src");
  });
  imageModalClose.addEventListener("click", function () { closeModal(imageModal); });

  [modelModal, imageModal].forEach(function (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal(modal);
        if (modal === modelModal) modelViewer.removeAttribute("src");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal(modelModal); modelViewer.removeAttribute("src");
      closeModal(imageModal);
    }
  });

  /* ------------------------------ CARD TYPES ------------------------------ */

  // Cards com botões de Download + Ver em 3D (Point Blank / Rocket League / ETS2)
  function buildWeaponCard(item) {
    const card = el("div", "card");
    card.appendChild(buildMedia(item.title, item.category, item.image));

    const body = el("div", "card__body");
    // Se o item tiver arma específica (hierarquia de Armas do Point Blank),
    // mostra "Subcategoria · Arma" no lugar da categoria genérica "Armas".
    const catLabel = item.weapon ? (item.subcategory + " · " + item.weapon) : item.category;
    body.appendChild(el("span", "card__cat", catLabel));
    body.appendChild(el("h3", "card__title", item.title));

    const actions = el("div", "card__actions");

    const dl = el("a", "btn btn--sm btn--primary", "Download");
    if (item.download) {
      dl.href = item.download;
      dl.target = "_blank";
      dl.rel = "noopener";
    } else {
      dl.setAttribute("disabled", "true");
      dl.title = "Link de download em breve";
      dl.href = "#";
      dl.addEventListener("click", function (e) { e.preventDefault(); });
    }
    actions.appendChild(dl);

    const view3d = el("button", "btn btn--sm btn--ghost", "Ver em 3D");
    if (item.model) {
      view3d.addEventListener("click", function () { openModelViewer(item.title, item.model); });
    } else {
      view3d.setAttribute("disabled", "true");
      view3d.title = "Modelo 3D em breve";
    }
    actions.appendChild(view3d);

    body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  // Cards de conceito (só imagem, sem download/3D) — Projetos Point Blank
  function buildConceptCard(item) {
    const card = el("div", "card");
    const media = buildMedia(item.title, item.category, item.image);
    media.appendChild(el("span", "card__badge", "Conceito"));
    media.style.cursor = "pointer";
    media.addEventListener("click", function () { openImageViewer(item.title, item.image); });
    card.appendChild(media);

    const body = el("div", "card__body");
    body.appendChild(el("span", "card__cat", item.category));
    body.appendChild(el("h3", "card__title", item.title));
    card.appendChild(body);
    return card;
  }

  // Cards de galeria simples (Screenshots / Photoshop) — clique abre lightbox
  function buildGalleryCard(item) {
    const card = el("div", "card");
    const media = buildMedia(item.title, item.category, item.image);
    media.style.cursor = "pointer";
    media.addEventListener("click", function () { openImageViewer(item.title, item.image); });
    card.appendChild(media);

    const body = el("div", "card__body");
    if (item.category) body.appendChild(el("span", "card__cat", item.category));
    body.appendChild(el("h3", "card__title", item.title));
    card.appendChild(body);
    return card;
  }

  // Cards com nota + download (Minecraft / GTA SA)
  function buildNoteCard(item) {
    const card = el("div", "card");
    const media = buildMedia(item.title, "", item.image);
    media.style.cursor = "pointer";
    media.addEventListener("click", function () { openImageViewer(item.title, item.image); });
    card.appendChild(media);

    const body = el("div", "card__body");
    body.appendChild(el("h3", "card__title", item.title));
    if (item.note) body.appendChild(el("p", "card__note", item.note));

    const actions = el("div", "card__actions");
    const dl = el("a", "btn btn--sm btn--primary btn--full", "Download");
    if (item.download) {
      dl.href = item.download; dl.target = "_blank"; dl.rel = "noopener";
    } else {
      dl.setAttribute("disabled", "true");
      dl.title = "Link de download em breve";
      dl.href = "#";
      dl.addEventListener("click", function (e) { e.preventDefault(); });
    }
    actions.appendChild(dl);
    body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  /* --------------------------- FILTROS + GRID ----------------------------- */
  function renderFilters(container, categories, onChange) {
    container.innerHTML = "";
    categories.forEach(function (cat, i) {
      const chip = el("button", "chip" + (i === 0 ? " is-active" : ""), cat);
      chip.addEventListener("click", function () {
        container.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        onChange(cat);
      });
      container.appendChild(chip);
    });
  }

  function renderGrid(container, items, builder) {
    container.innerHTML = "";
    if (!items.length) {
      container.appendChild(el("p", "card__note", "Nenhum item nessa categoria ainda."));
      return;
    }
    items.forEach(function (item) { container.appendChild(builder(item)); });
  }

  /* ----------------------------- PAGINAÇÃO --------------------------------
     Divide uma lista de itens em páginas e desenha os botões de navegação
     (‹ 1 2 3 ›) dentro de um elemento .pagination. Usado por todas as
     seções em grid (Point Blank, Rocket League, Screenshots, Minecraft,
     GTA SA, Photoshop). PAGE_SIZE controla quantos itens aparecem por vez —
     mude o número abaixo se quiser mostrar mais/menos itens por página. */
  const PAGE_SIZE = 9;

  function createPaginatedGrid(gridEl, paginationEl, builder, pageSize) {
    pageSize = pageSize || PAGE_SIZE;
    let items = [];
    let currentPage = 1;

    function totalPages() {
      return Math.max(1, Math.ceil(items.length / pageSize));
    }

    function renderPagination() {
      paginationEl.innerHTML = "";
      const tp = totalPages();
      if (tp <= 1) return;

      const prev = el("button", "page-btn page-btn--nav", "‹");
      prev.setAttribute("aria-label", "Página anterior");
      if (currentPage === 1) prev.setAttribute("disabled", "true");
      prev.addEventListener("click", function () { goTo(currentPage - 1); });
      paginationEl.appendChild(prev);

      for (let i = 1; i <= tp; i++) {
        const btn = el("button", "page-btn" + (i === currentPage ? " is-active" : ""), String(i));
        btn.addEventListener("click", function () { goTo(i); });
        paginationEl.appendChild(btn);
      }

      const next = el("button", "page-btn page-btn--nav", "›");
      next.setAttribute("aria-label", "Próxima página");
      if (currentPage === tp) next.setAttribute("disabled", "true");
      next.addEventListener("click", function () { goTo(currentPage + 1); });
      paginationEl.appendChild(next);
    }

    function renderCurrentPage() {
      const start = (currentPage - 1) * pageSize;
      renderGrid(gridEl, items.slice(start, start + pageSize), builder);
      renderPagination();
    }

    function goTo(page) {
      const tp = totalPages();
      if (page < 1 || page > tp || page === currentPage) {
        if (page >= 1 && page <= tp) currentPage = page; else return;
      } else {
        currentPage = page;
      }
      renderCurrentPage();
      // rola até o topo do grid ao trocar de página, sem pular demais na tela
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return {
      setItems: function (newItems) {
        items = newItems;
        currentPage = 1;
        renderCurrentPage();
      }
    };
  }

  function setupFilteredSection(filterEl, gridEl, paginationEl, categories, items, builder) {
    const paginator = createPaginatedGrid(gridEl, paginationEl, builder);
    function apply(cat) {
      const filtered = cat === "Todos" ? items : items.filter(function (i) { return i.category === cat; });
      paginator.setItems(filtered);
    }
    renderFilters(filterEl, categories, apply);
    apply(categories[0]);
  }

  /* ----------------- FILTRO EM 3 NÍVEIS (POINT BLANK) ---------------------
     Point Blank tem uma hierarquia própria: categoria "Armas" (que se abre
     em subcategoria — Rifles, Sniper, SMG... — e depois em arma específica,
     ex: AK47, AUG A3) e categorias soltas sem esse detalhamento (Mapas,
     Launcher). A lista de armas específicas de cada subcategoria é montada
     automaticamente a partir do campo "weapon" dos itens em data.js — não
     precisa declarar essa lista em nenhum outro lugar. */
  function setupPointBlankSection(containerEl, gridEl, paginationEl, topCategories, armasSubcategories, items) {
    containerEl.innerHTML = "";
    const topRow = el("div", "filters-row filters-row--top");
    const subRow = el("div", "filters-row filters-row--sub");
    const weaponRow = el("div", "filters-row filters-row--weapon");
    containerEl.appendChild(topRow);
    containerEl.appendChild(subRow);
    containerEl.appendChild(weaponRow);

    const paginator = createPaginatedGrid(gridEl, paginationEl, buildWeaponCard);

    let selectedTop = topCategories[0];   // "Armas"
    let selectedSub = "Todos";
    let selectedWeapon = "Todos";

    // Armas específicas disponíveis dentro de uma subcategoria (ou de todas,
    // se selectedSub === "Todos"), na ordem em que aparecem em data.js.
    function weaponsFor(sub) {
      const found = [];
      items.forEach(function (i) {
        if (i.category === "Armas" && (sub === "Todos" || i.subcategory === sub) && i.weapon && found.indexOf(i.weapon) === -1) {
          found.push(i.weapon);
        }
      });
      return found;
    }

    function currentItems() {
      return items.filter(function (i) {
        if (i.category !== selectedTop) return false;
        if (selectedTop === "Armas") {
          if (selectedSub !== "Todos" && i.subcategory !== selectedSub) return false;
          if (selectedWeapon !== "Todos" && i.weapon !== selectedWeapon) return false;
        }
        return true;
      });
    }

    function renderRow(rowEl, options, active, onPick) {
      rowEl.innerHTML = "";
      options.forEach(function (opt) {
        const chip = el("button", "chip" + (opt === active ? " is-active" : ""), opt);
        chip.addEventListener("click", onPick.bind(null, opt));
        rowEl.appendChild(chip);
      });
    }

    function render() {
      renderRow(topRow, topCategories, selectedTop, function (cat) {
        selectedTop = cat;
        selectedSub = "Todos";
        selectedWeapon = "Todos";
        render();
      });

      if (selectedTop === "Armas") {
        renderRow(subRow, ["Todos"].concat(armasSubcategories), selectedSub, function (sub) {
          selectedSub = sub;
          selectedWeapon = "Todos";
          render();
        });

        // O nível de "arma específica" só aparece quando uma subcategoria
        // concreta está selecionada — com "Todos" ele ficaria poluído,
        // misturando armas de famílias diferentes.
        const weapons = selectedSub === "Todos" ? [] : weaponsFor(selectedSub);
        if (weapons.length > 1) {
          renderRow(weaponRow, ["Todos"].concat(weapons), selectedWeapon, function (w) {
            selectedWeapon = w;
            render();
          });
        } else {
          weaponRow.innerHTML = "";
        }
      } else {
        subRow.innerHTML = "";
        weaponRow.innerHTML = "";
      }

      paginator.setItems(currentItems());
    }

    render();
  }

  /* --------------------------------- INIT --------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {

    // Point Blank
    setupPointBlankSection(
      document.getElementById("pbFilters"),
      document.getElementById("pbGrid"),
      document.getElementById("pbPagination"),
      pointBlankTopCategories,
      pointBlankArmasSubcategories,
      pointBlankItems
    );
    createPaginatedGrid(
      document.getElementById("pbProjectsGrid"),
      document.getElementById("pbProjectsPagination"),
      buildConceptCard
    ).setItems(pointBlankProjects);

    // Rocket League
    setupFilteredSection(
      document.getElementById("rlFilters"),
      document.getElementById("rlGrid"),
      document.getElementById("rlPagination"),
      rocketLeagueCategories,
      rocketLeagueItems,
      buildWeaponCard
    );

    // Euro Truck Simulator 2
    setupFilteredSection(
      document.getElementById("ets2Filters"),
      document.getElementById("ets2Grid"),
      document.getElementById("ets2Pagination"),
      ets2Categories,
      ets2Items,
      buildWeaponCard
    );

    // Screenshots
    setupFilteredSection(
      document.getElementById("ssFilters"),
      document.getElementById("ssGrid"),
      document.getElementById("ssPagination"),
      screenshotCategories,
      screenshotItems,
      buildGalleryCard
    );

    // Minecraft
    createPaginatedGrid(
      document.getElementById("mcGrid"),
      document.getElementById("mcPagination"),
      buildNoteCard
    ).setItems(minecraftItems);

    // GTA San Andreas
    createPaginatedGrid(
      document.getElementById("gtaGrid"),
      document.getElementById("gtaPagination"),
      buildNoteCard
    ).setItems(gtaSaItems);

    // Photoshop
    createPaginatedGrid(
      document.getElementById("psGrid"),
      document.getElementById("psPagination"),
      buildGalleryCard
    ).setItems(photoshopItems);

    // Jogo autoral (feature)
    (function renderGameFeature() {
      const wrap = document.getElementById("gameFeature");
      const media = el("div", "feature__media");
      const img = el("img");
      img.alt = gameFeatureData.title;
      img.onerror = function () {
        img.remove();
        media.appendChild(buildPlaceholder(gameFeatureData.title, gameFeatureData.genre));
      };
      img.src = gameFeatureData.image;
      media.appendChild(img);

      const info = el("div", "feature__info");
      info.appendChild(el("span", "feature__genre", gameFeatureData.genre));
      info.appendChild(el("h3", "feature__title", gameFeatureData.title));
      info.appendChild(el("p", "feature__text", gameFeatureData.text));

      const actions = el("div", "feature__actions");
      const dl = el("a", "btn btn--primary", "Download");
      if (gameFeatureData.download) {
        dl.href = gameFeatureData.download; dl.target = "_blank"; dl.rel = "noopener";
      } else {
        dl.setAttribute("disabled", "true");
        dl.title = "Link em breve";
        dl.href = "#";
        dl.addEventListener("click", function (e) { e.preventDefault(); });
      }
      actions.appendChild(dl);
      if (gameFeatureData.video) {
        const vid = el("a", "btn btn--ghost", "Assistir trailer");
        vid.href = gameFeatureData.video; vid.target = "_blank"; vid.rel = "noopener";
        actions.appendChild(vid);
      }
      info.appendChild(actions);

      wrap.appendChild(media);
      wrap.appendChild(info);
    })();

    // Social links
    (function renderSocial() {
      const wrap = document.getElementById("socialLinks");
      socialLinks.forEach(function (s) {
        const a = el("a", "", s.label);
        a.href = s.url; a.target = "_blank"; a.rel = "noopener";
        wrap.appendChild(a);
      });
    })();

    // Ano do rodapé
    document.getElementById("year").textContent = new Date().getFullYear();

    // Menu mobile
    const navToggle = document.getElementById("navToggle");
    const navList = document.getElementById("navList");
    navToggle.addEventListener("click", function () {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navList.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { navList.classList.remove("is-open"); });
    });

    // Scroll-spy simples para destacar o link ativo
    const sections = Array.from(document.querySelectorAll("main > section[id]"));
    const links = Array.from(document.querySelectorAll(".nav__link"));
    function onScroll() {
      let current = sections[0] && sections[0].id;
      const pos = window.scrollY + window.innerHeight * 0.3;
      sections.forEach(function (sec) {
        if (sec.offsetTop <= pos) current = sec.id;
      });
      links.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
      });
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });
})();