/**
 * SmartBroker – Controllers Layer
 * Maneja eventos, interacciones y lógica de presentación.
 * No conoce los datos de negocio (eso es Models).
 * No genera HTML directamente (eso es Views).
 */

export const Controllers = {

  /* ═══════════════════════════════════════
     NAV CONTROLLER
  ═══════════════════════════════════════ */
  initNav() {
    const header    = document.getElementById("header");
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link, .mobile-cta");
    const navLinks    = document.querySelectorAll(".nav-link");

    if (!header || !hamburger) return;

    /* ── Scroll: sticky shadow + active link ── */
    const onScroll = () => {
      header.classList.toggle("header--scrolled", window.scrollY > 30);
      this._updateActiveNav(navLinks);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ── Hamburger toggle ── */
    hamburger.addEventListener("click", () => {
      const open = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!open));
      hamburger.classList.toggle("is-open", !open);
      mobileMenu.classList.toggle("is-open", !open);
      mobileMenu.setAttribute("aria-hidden", String(open));
      document.body.classList.toggle("no-scroll", !open);
    });

    /* ── Close mobile menu on link click ── */
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.classList.remove("is-open");
        mobileMenu.classList.remove("is-open");
        mobileMenu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
      });
    });

    /* ── Smooth scroll for all anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const offset = header.offsetHeight;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: "smooth",
        });
      });
    });
  },

  _updateActiveNav(links) {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;
    let current = "";

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });

    links.forEach(link => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${current}`
      );
    });
  },

  /* ═══════════════════════════════════════
     SCROLL REVEAL CONTROLLER
  ═══════════════════════════════════════ */
  initScrollReveal() {
    const opts = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.style.getPropertyValue("--delay") || "0ms";
          setTimeout(() => {
            el.classList.add("is-visible");
          }, parseInt(delay) || 0);
          observer.unobserve(el);
        }
      });
    }, opts);

    document.querySelectorAll(".reveal, .reveal--right, .reveal--up").forEach(el => {
      observer.observe(el);
    });
  },

  /* ═══════════════════════════════════════
     TESTIMONIALS CAROUSEL CONTROLLER
  ═══════════════════════════════════════ */
  initTestimonials() {
    /* El carrusel de aseguradoras es 100% CSS (animation marquee).
       No requiere lógica JS — este método se mantiene para compatibilidad. */
  },

  /* ═══════════════════════════════════════
     FORM CONTROLLER
  ═══════════════════════════════════════ */
  initContactForm() {
    const form    = document.getElementById("contact-form");
    const submit  = document.getElementById("form-submit");
    const btnText = document.getElementById("btn-text");
    const btnLoad = document.getElementById("btn-loading");
    const success = document.getElementById("form-success");

    if (!form) return;

    /* ── Real-time validation ── */
    const fields = form.querySelectorAll("input[required], textarea[required]");
    fields.forEach(field => {
      field.addEventListener("blur", () => this._validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) this._validateField(field);
      });
    });

    /* ── Submit ── */
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;

      fields.forEach(field => {
        if (!this._validateField(field)) valid = false;
      });

      if (!valid) {
        const firstErr = form.querySelector(".is-invalid");
        firstErr?.focus();
        return;
      }

      /* Simulate async submission */
      this._setFormLoading(true, btnText, btnLoad, submit);
      await this._simulateSubmit();
      this._setFormLoading(false, btnText, btnLoad, submit);

      form.reset();
      success.hidden = false;
      success.focus();

      setTimeout(() => { success.hidden = true; }, 6000);
    });
  },

  _validateField(field) {
    const errEl = document.getElementById(`err-${field.name}`);
    const value = field.value.trim();
    let msg = "";

    if (!value) {
      msg = "Este campo es obligatorio.";
    } else if (field.type === "email") {
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(value)) msg = "Ingresa un correo válido.";
    } else if (field.type === "tel" && value) {
      const telRx = /^[\d\s()+-]{7,20}$/;
      if (!telRx.test(value)) msg = "Ingresa un teléfono válido.";
    } else if (field.tagName === "TEXTAREA" && value.length < 10) {
      msg = "El mensaje debe tener al menos 10 caracteres.";
    }

    field.classList.toggle("is-invalid", !!msg);
    field.classList.toggle("is-valid", !msg && !!value);
    if (errEl) errEl.textContent = msg;

    return !msg;
  },

  _setFormLoading(loading, btnText, btnLoad, submit) {
    btnText.hidden  = loading;
    btnLoad.hidden  = !loading;
    submit.disabled = loading;
    if (loading) btnLoad.removeAttribute("aria-hidden");
    else btnLoad.setAttribute("aria-hidden", "true");
  },

  _simulateSubmit() {
    return new Promise(resolve => setTimeout(resolve, 1800));
  },

  /* ═══════════════════════════════════════
     COUNTER ANIMATION (stats in hero)
  ═══════════════════════════════════════ */
  initCounters() {
    const counters = document.querySelectorAll(".hero__stat strong");
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent;
        const num = parseFloat(raw.replace(/[^\d.]/g, ""));
        const suffix = raw.replace(/[\d.]/g, "");
        if (isNaN(num)) return;

        let start = 0;
        const step = num / 60;
        const tick = () => {
          start = Math.min(start + step, num);
          el.textContent = (Number.isInteger(num)
            ? Math.floor(start)
            : start.toFixed(0)) + suffix;
          if (start < num) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  },

  /* ═══════════════════════════════════════
     MODAL CONTROLLER – POLÍTICA DE DATOS
  ═══════════════════════════════════════ */
  initDataModal() {
    const backdrop  = document.getElementById("modal-data-policy");
    if (!backdrop) return;

    const openModal = () => {
      backdrop.removeAttribute("hidden");
      // Force reflow before adding class for transition
      backdrop.offsetHeight;
      backdrop.classList.add("is-open");
      document.body.classList.add("no-scroll");
      document.getElementById("modal-close-top")?.focus();
    };

    const closeModal = () => {
      backdrop.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
      setTimeout(() => { backdrop.setAttribute("hidden", ""); }, 320);
    };

    /* Trigger links */
    document.querySelectorAll('[data-modal="data-policy"]').forEach(el => {
      el.addEventListener("click", (e) => { e.preventDefault(); openModal(); });
    });

    /* Close buttons */
    document.getElementById("modal-close-top")?.addEventListener("click", closeModal);
    document.getElementById("modal-close-bottom")?.addEventListener("click", closeModal);
    document.getElementById("modal-accept")?.addEventListener("click", closeModal);

    /* Click outside modal */
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });

    /* Escape key */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("is-open")) closeModal();
    });
  },

  /* ─── INIT ALL ─── */
  init() {
    this.initNav();
    this.initScrollReveal();
    this.initTestimonials();
    this.initContactForm();
    this.initCentralMenu();
    this.initCounters();
    this.initDataModal();
    this.initServiceModal();
  },

  /* ─── SPIDER RADIAL MENU ─── */
  /* ═══════════════════════════════════════
     MENÚ CENTRAL MÓVIL
  ═══════════════════════════════════════ */
  initCentralMenu() {
    const panel      = document.getElementById("cmenuPanel");
    const panelHdr   = document.getElementById("cmenuPanelHeader");
    const panelItems = document.getElementById("cmenuPanelItems");
    const hint       = document.getElementById("cmenuHint");
    if (!panel) return;

    /* Datos de las ramas — espejo del spiderMenu del modelo */
    const branches = [
      {
        id: "personas", label: "Personas",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
        cols: 1,
        children: [
          { label: "Vehículos",                serviceId: "personas-vehiculos",   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M5 12l2-5h10l2 5"/><rect x="2" y="12" width="20" height="5" rx="2"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>` },
          { label: "Hogar",                    serviceId: "personas-hogar",       icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 12L12 3l9 9"/><path d="M9 21V12h6v9"/></svg>` },
          { label: "Vida y Asistencia Médica", serviceId: "personas-vida-medica", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 21s-8-5-8-11a6 6 0 0112 0 6 6 0 0112 0c0 6-8 11-8 11z"/></svg>` },
          { label: "Seguro de viaje",          serviceId: "personas-viaje",       icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M21 3L3 10.5l7 3L21 3z"/><path d="M10 13.5L13 21l3-7"/></svg>` },
          { label: "Vida y Ahorro",            serviceId: "personas-vida-ahorro", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>` },
        ]
      },
      {
        id: "empresas", label: "Empresas",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 014 0v2M3 11h18"/></svg>`,
        cols: 2,
        children: [
          { label: "Multirriesgo",           serviceId: "empresas-multirriesgo", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
          { label: "Programas de Seguros",   serviceId: "empresas-programas",    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 12h6M9 16h4"/></svg>` },
          { label: "Transporte",             serviceId: "empresas-transporte",   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 17h18M3 12l2-5h14l2 5"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>` },
          { label: "Responsabilidad Civil",  serviceId: "empresas-rc",           icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>` },
          { label: "Accidentes Personales",  serviceId: "empresas-accidentes",   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 8v4M12 16h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>` },
          { label: "Casco Aéreo / Marítimo", serviceId: "empresas-casco",        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 17l4-8 5 4 5-6 4 10H3z"/></svg>` },
          { label: "Asistencia Médica",      serviceId: "empresas-medica",       icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>` },
        ]
      },
      {
        id: "fianzas", label: "Fianzas",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 12h6M9 16h4M5 3h14a2 2 0 012 2v16l-3-2-2 2-2-2-2 2-2-2-3 2V5a2 2 0 012-2z"/></svg>`,
        cols: 2,
        children: [
          { label: "BUA",   serviceId: "fianzas-bua",   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "CC",    serviceId: "fianzas-cc",    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "EOBCM", serviceId: "fianzas-eobcm", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "SO",    serviceId: "fianzas-so",    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "PGB",   serviceId: "fianzas-pgb",   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "FL",    serviceId: "fianzas-fl",    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "GA",    serviceId: "fianzas-ga",    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "GJ",    serviceId: "fianzas-gj",    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "GAR",   serviceId: "fianzas-gar",   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
          { label: "GA",    serviceId: "fianzas-ga",    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>` },
        ]
      }
    ];

    const arrowSvg = `<svg class="cmenu__item-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    let activeBranch = null;

    branches.forEach(branch => {
      const btn = document.getElementById("cmb-" + branch.id);
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = activeBranch === branch.id;

        /* Reset all buttons */
        branches.forEach(b => {
          const el = document.getElementById("cmb-" + b.id);
          if (el) el.setAttribute("aria-expanded", "false");
        });

        if (isOpen) {
          activeBranch = null;
          panel.classList.remove("is-open");
          panel.setAttribute("aria-hidden", "true");
          hint.textContent = "Toca una categoría para explorar";
        } else {
          activeBranch = branch.id;
          btn.setAttribute("aria-expanded", "true");

          /* Build panel content */
          panelHdr.innerHTML = `
            <div class="cmenu__panel-inner">
              <div class="cmenu__panel-header">
                ${branch.iconSvg}
                <span>${branch.label}</span>
              </div>
              <div class="cmenu__panel-items" style="grid-template-columns: repeat(${branch.cols}, 1fr);">
                ${branch.children.map(child => `
                  <a class="cmenu__item" href="#" data-service-id="${child.serviceId || ''}">
                    ${child.icon}
                    <span class="cmenu__item-label">${child.label}</span>
                    ${arrowSvg}
                  </a>`).join("")}
              </div>
            </div>`;
          panelHdr.nextElementSibling && (panelHdr.nextElementSibling.innerHTML = "");

          panel.innerHTML = panelHdr.innerHTML;

          /* Wire click on each cmenu item → service modal */
          panel.querySelectorAll(".cmenu__item[data-service-id]").forEach(el => {
            el.addEventListener("click", (e) => {
              e.preventDefault();
              const sid = el.getAttribute("data-service-id");
              if (sid) window.SmartBroker.openServiceModal(sid);
            });
          });

          panel.classList.add("is-open");
          panel.setAttribute("aria-hidden", "false");
          hint.textContent = branch.label + " — elige una opción";

          /* Scroll panel into view on small screens */
          setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
        }
      });
    });
  },

  initSpiderMenu(services) {
    const scene      = document.getElementById("spiderScene");
    const centerBtn  = document.getElementById("spiderCenter");
    const nodesWrap  = document.getElementById("spiderNodes");
    const svg        = document.getElementById("spiderSvg");
    const hint       = document.getElementById("spiderHint");
    if (!scene || !centerBtn || !nodesWrap || !svg) return;

    const SCENE_W  = 600;
    const CX       = SCENE_W / 2;   // 300
    const CY       = SCENE_W / 2;   // 300
    const R1       = 160;            // orbit 1 radius (3 main nodes)
    const R2       = 300;            // orbit 2 radius (child nodes — up to 10, expanded for spacing)
    const DEG      = Math.PI / 180;

    let menuOpen  = false;
    let activeId  = null;

    /* helpers */
    function radPos(angleDeg, r) {
      return {
        x: CX + r * Math.cos(angleDeg * DEG),
        y: CY + r * Math.sin(angleDeg * DEG),
      };
    }

    function drawLine(id, x1, y1, x2, y2, opacity) {
      let el = svg.querySelector(`#${id}`);
      if (!el) {
        el = document.createElementNS("http://www.w3.org/2000/svg", "line");
        el.id = id;
        svg.appendChild(el);
      }
      el.setAttribute("x1", x1); el.setAttribute("y1", y1);
      el.setAttribute("x2", x2); el.setAttribute("y2", y2);
      el.setAttribute("stroke", "#E8571A");
      el.setAttribute("stroke-width", "1");
      el.setAttribute("stroke-opacity", opacity);
      el.setAttribute("stroke-dasharray", "5 4");
    }

    function removeLine(id) {
      svg.querySelector(`#${id}`)?.remove();
    }

    /* Build DOM nodes */
    services.forEach((svc) => {
      const p = radPos(svc.angle, R1);

      /* Main node */
      const node = document.createElement("button");
      node.className = "spider-node";
      node.id        = "sn-" + svc.id;
      node.setAttribute("aria-label", svc.label.replace("\n", " "));
      node.style.left = (p.x - 31) + "px";
      node.style.top  = (p.y - 31) + "px";
      node.innerHTML  = `<span class="sn-icon">${svc.icon}</span><span class="sn-label">${svc.label.replace("\n", "<br>")}</span>`;
      nodesWrap.appendChild(node);

      /* Child nodes — spread dynamically based on count and per-branch step */
      const CHILD_STEP = svc.childStep || 9;                  // degrees between children (per branch)
      const totalArc   = (svc.children.length - 1) * CHILD_STEP;
      const startAngle = svc.angle - totalArc / 2;
      svc.children.forEach((child, j) => {
        const spread = startAngle + j * CHILD_STEP;
        const cp     = radPos(spread, R2);
        const childEl = document.createElement("a");
        childEl.className = "spider-child";
        childEl.id        = `sc-${svc.id}-${j}`;
        childEl.href      = "#";
        childEl.setAttribute("aria-label", child.label.replace("\n", " "));
        childEl.setAttribute("data-service-id", child.serviceId || "");
        childEl.style.left = (cp.x - 25) + "px";
        childEl.style.top  = (cp.y - 25) + "px";
        childEl.innerHTML  = `<span class="sc-icon">${child.icon}</span><span class="sc-label">${child.label.replace("\n", "<br>")}</span>`;
        childEl.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (child.serviceId) window.SmartBroker.openServiceModal(child.serviceId);
        });
        nodesWrap.appendChild(childEl);
      });

      /* Main node click / hover */
      node.addEventListener("click",      (e) => { e.stopPropagation(); toggleChildren(svc, p); });
      node.addEventListener("mouseenter", ()  => { if (menuOpen) openChildren(svc, p); });
    });

    /* ── toggle main menu ── */
    function openMenu() {
      menuOpen = true;
      centerBtn.classList.add("is-open");
      centerBtn.setAttribute("aria-expanded", "true");
      hint.textContent = "Selecciona una categoría";
      services.forEach((svc, i) => {
        const p  = radPos(svc.angle, R1);
        const el = document.getElementById("sn-" + svc.id);
        setTimeout(() => {
          el.classList.add("is-visible");
          drawLine("ln-" + svc.id, CX, CY, p.x, p.y, "0.30");
        }, i * 65);
      });
    }

    function closeMenu() {
      menuOpen = false;
      activeId = null;
      centerBtn.classList.remove("is-open");
      centerBtn.setAttribute("aria-expanded", "false");
      hint.textContent = "Pasa el cursor o haz clic para explorar nuestros servicios";
      services.forEach((svc) => {
        document.getElementById("sn-" + svc.id)?.classList.remove("is-visible", "is-active");
        removeLine("ln-" + svc.id);
        closeChildrenOf(svc);
      });
    }

    /* ── children ── */
    function openChildren(svc, parentPos) {
      activeId = svc.id;
      document.getElementById("sn-" + svc.id)?.classList.add("is-active");
      hint.textContent = svc.label.replace("\n", " ") + " — elige una opción";
      const childStep2   = svc.childStep || 9;
      const totalArc2    = (svc.children.length - 1) * childStep2;
      const startAngle2  = svc.angle - totalArc2 / 2;
      svc.children.forEach((child, j) => {
        const spread  = startAngle2 + j * childStep2;
        const cp      = radPos(spread, R2);
        const childEl = document.getElementById(`sc-${svc.id}-${j}`);
        setTimeout(() => {
          childEl?.classList.add("is-visible");
          drawLine(`lc-${svc.id}-${j}`, parentPos.x, parentPos.y, cp.x, cp.y, "0.45");
        }, j * 75);
      });
    }

    function closeChildrenOf(svc) {
      document.getElementById("sn-" + svc.id)?.classList.remove("is-active");
      svc.children.forEach((_, j) => {
        document.getElementById(`sc-${svc.id}-${j}`)?.classList.remove("is-visible");
        removeLine(`lc-${svc.id}-${j}`);
      });
    }

    function toggleChildren(svc, parentPos) {
      const wasActive = activeId === svc.id;
      /* close all children first */
      services.forEach((s) => closeChildrenOf(s));
      if (!wasActive) {
        openChildren(svc, parentPos);
      } else {
        activeId = null;
        hint.textContent = "Selecciona una categoría";
      }
    }

    /* ── center button ── */
    centerBtn.addEventListener("click", () => {
      if (menuOpen) closeMenu(); else openMenu();
    });

    /* hover on center: auto-open */
    centerBtn.addEventListener("mouseenter", () => {
      if (!menuOpen) openMenu();
    });

    /* click outside: close children but keep menu open; double-click outside closes all */
    scene.addEventListener("click", (e) => {
      if (!e.target.closest(".spider-node") && !e.target.closest(".spider-center") && !e.target.closest(".spider-child")) {
        if (activeId) {
          services.forEach((s) => closeChildrenOf(s));
          activeId = null;
          hint.textContent = "Selecciona una categoría";
        }
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".spider-scene") && menuOpen) closeMenu();
    });
  },

  /* ═══════════════════════════════════════
     MODAL DE SERVICIO — pop-up con info,
     WhatsApp y formulario de solicitud
  ═══════════════════════════════════════ */
  initServiceModal() {
    const backdrop  = document.getElementById("modal-service");
    if (!backdrop) return;

    const details     = AppModel.serviceDetails || {};
    const waNumber    = AppModel.whatsapp || "593998661249";
    const recipientEmail = "yordonez@smartbroker.com.ec";

    /* ── refs al DOM del modal ── */
    const title    = document.getElementById("svc-modal-title");
    const branch   = document.getElementById("svcModalBranch");
    const icon     = document.getElementById("svcModalIcon");
    const desc     = document.getElementById("svcModalDesc");
    const waBtn    = document.getElementById("svcWaBtn");
    const form     = document.getElementById("svcForm");
    const submitBtn= document.getElementById("svcFormSubmit");
    const btnText  = document.getElementById("svcBtnText");
    const btnLoad  = document.getElementById("svcBtnLoad");
    const success  = document.getElementById("svcSuccess");
    const svcInput = document.getElementById("svcFormServicio");

    /* ── open / close helpers ── */
    const openModal = (serviceId) => {
      const svc = details[serviceId];
      if (!svc) return;

      /* populate content */
      title.textContent  = svc.title;
      branch.textContent = svc.branch + " · SmartBroker";
      desc.innerHTML = `
        <p style="color:rgba(255,255,255,.80);font-size:.92rem;line-height:1.7;margin-bottom:.75rem">${svc.desc}</p>
        ${svc.features && svc.features.length ? `
        <ul style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:6px;margin:0;padding:0;list-style:none;">
          ${svc.features.map(f => `
            <li style="display:flex;align-items:flex-start;gap:7px;font-size:.82rem;color:rgba(255,255,255,.70)">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14" style="flex-shrink:0;margin-top:2px;color:#E8571A">
                <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>${f}
            </li>`).join("")}
        </ul>` : ""}`;

      /* WhatsApp URL */
      const waMsg = encodeURIComponent(`Hola SmartBroker, me interesa información sobre: ${svc.title}`);
      waBtn.href = `https://wa.me/${waNumber}?text=${waMsg}`;

      /* form state reset */
      if (svcInput) svcInput.value = svc.title;
      if (form)    { form.reset(); form.removeAttribute("hidden"); }
      if (success) success.setAttribute("hidden", "");
      if (submitBtn) submitBtn.disabled = false;
      if (btnText)   btnText.hidden = false;
      if (btnLoad)   btnLoad.hidden = true;
      document.querySelectorAll(".svc-form__input").forEach(el => el.classList.remove("is-invalid"));
      document.querySelectorAll(".svc-form__err").forEach(el => el.textContent = "");

      /* show modal */
      backdrop.removeAttribute("hidden");
      requestAnimationFrame(() => backdrop.classList.add("is-open"));
      document.body.style.overflow = "hidden";
      document.getElementById("svc-modal-close")?.focus();
    };

    const closeModal = () => {
      backdrop.classList.remove("is-open");
      setTimeout(() => backdrop.setAttribute("hidden", ""), 300);
      document.body.style.overflow = "";
    };

    /* expose globally so spider + cmenu can call it */
    window.SmartBroker = window.SmartBroker || {};
    window.SmartBroker.openServiceModal = openModal;

    /* close handlers */
    document.getElementById("svc-modal-close")?.addEventListener("click", closeModal);
    backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("is-open")) closeModal();
    });

    /* ── form submission via EmailJS / fetch ── */
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        /* basic validation */
        let valid = true;
        const nombre  = document.getElementById("svcNombre");
        const email   = document.getElementById("svcEmail");
        const msg     = document.getElementById("svcMsg");
        const consent = document.getElementById("svcDataConsent");

        const setErr = (fieldId, errId, message) => {
          const f = document.getElementById(fieldId);
          const er= document.getElementById(errId);
          if (f)  f.classList.add("is-invalid");
          if (er) er.textContent = message;
          valid = false;
        };

        if (!nombre?.value.trim())   setErr("svcNombre","svcErrNombre","Ingresa tu nombre.");
        if (!email?.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) setErr("svcEmail","svcErrEmail","Correo no válido.");
        if (!msg?.value.trim())      setErr("svcMsg","svcErrMsg","Escribe tu consulta.");
        if (!consent?.checked)       {
          document.getElementById("svcErrConsent").textContent = "Debes aceptar la política de datos.";
          valid = false;
        }
        if (!valid) return;

        /* show loading */
        submitBtn.disabled = true;
        btnText.hidden = true;
        btnLoad.hidden = false;

        /* build payload */
        const payload = {
          servicio:  svcInput?.value || "",
          nombre:    nombre.value.trim(),
          email:     email.value.trim(),
          telefono:  document.getElementById("svcTel")?.value.trim() || "",
          mensaje:   msg.value.trim(),
          destinatario: recipientEmail,
          timestamp: new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" }),
        };

        try {
          /* ── Send via FormSubmit (no backend needed) ── */
          const fd = new FormData();
          fd.append("_subject",  `Solicitud de información: ${payload.servicio} — SmartBroker`);
          fd.append("_to",       recipientEmail);
          fd.append("_captcha",  "false");
          fd.append("_template", "table");
          fd.append("Servicio",  payload.servicio);
          fd.append("Nombre",    payload.nombre);
          fd.append("Email",     payload.email);
          fd.append("Teléfono",  payload.telefono || "—");
          fd.append("Mensaje",   payload.mensaje);
          fd.append("Fecha",     payload.timestamp);

          const res = await fetch(`https://formsubmit.co/${recipientEmail}`, {
            method: "POST",
            body: fd,
          });

          if (res.ok || res.type === "opaque") {
            /* store locally */
            try {
              const log = JSON.parse(localStorage.getItem("sb_leads") || "[]");
              log.push(payload);
              localStorage.setItem("sb_leads", JSON.stringify(log));
            } catch (_) {}

            /* show success */
            form.setAttribute("hidden", "");
            success.removeAttribute("hidden");
          } else {
            throw new Error("Server responded with " + res.status);
          }
        } catch (err) {
          console.error("Form error:", err);
          /* graceful degradation — still show success to user, log error */
          form.setAttribute("hidden", "");
          success.removeAttribute("hidden");
          try {
            const log = JSON.parse(localStorage.getItem("sb_leads") || "[]");
            log.push({ ...payload, _sendError: err.message });
            localStorage.setItem("sb_leads", JSON.stringify(log));
          } catch (_) {}
        } finally {
          submitBtn.disabled = false;
          btnText.hidden = false;
          btnLoad.hidden = true;
        }
      });
    }

    /* also wire data-policy links inside svc-modal */
    backdrop.addEventListener("click", (e) => {
      const trigger = e.target.closest('[data-modal="data-policy"]');
      if (trigger) {
        e.preventDefault();
        document.getElementById("modal-data-policy")?.removeAttribute("hidden");
        requestAnimationFrame(() =>
          document.getElementById("modal-data-policy")?.classList.add("is-open"));
      }
    });
  },
};
export default Controllers;
