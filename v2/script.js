(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---------- Idioma / Language ---------- */
  // El español vive en el HTML; aquí solo va el inglés.
  const EN = {
    "skip": "Skip to content",
    "nav.about": "About", "nav.exp": "Experience", "nav.proj": "Projects",
    "nav.skills": "Skills", "nav.beyond": "Beyond", "nav.contact": "Contact",
    "hero.hello": "hi! I'm",
    "hero.sticker": "Backend Engineer ✦",
    "hero.lead": "From Areguá, Paraguay, I've spent over ten years building the systems behind banks and financial companies: the ones nobody sees, but that have to work <mark>always</mark>.",
    "hero.cta": "Let's talk", "hero.cv": "View CV",
    "hero.status": "Open to new opportunities · remote",

    "about.kicker": "about me ↓",
    "about.title": "Making complex things simple is <mark>my thing</mark>",
    "about.p1": "I started building financial applications in 2013 and never left the world of serious numbers: <strong>online banking, credit origination, financial management</strong>. That's where I learned that a bug isn't just an error on a screen, it's someone's money.",
    "about.p2": "Today I design APIs and modernize legacy systems into cleaner, easier-to-maintain architectures. I like to understand the business before writing code, explain things calmly, and leave everything a little better than I found it.",
    "v1.t": "Caring about details", "v1.p": "Data integrity is non-negotiable. I review twice and test three times.",
    "v2.t": "Keeping it simple", "v2.p": "I turn tangled systems into clear pieces the whole team understands.",
    "v3.t": "Always learning", "v3.p": "In 2025 I completed a FullStack program as an Outstanding Student.",

    "exp.kicker": "my journey ↓",
    "exp.title": "Over a decade of <mark>building</mark>",
    "j1.when": "Jun 2024 — present",
    "j1.role": "SSR Software Engineer",
    "j1.p": "Designing a new credit origination system in .NET 9 and PostgreSQL with Clean Architecture, and migrated the PCA system while fixing critical financial-logic bugs. Added Serilog structured logging so the team finds errors faster.",
    "j2.role": "Backend Developer",
    "j2.p": "REST APIs in Node.js and Express within high-volume microservices, integrating PostgreSQL, MongoDB and DB2. Modernized legacy C# modules and managed migrations with Knex and Liquibase.",
    "j3.role": "Developer", "j3.p": "SGR system in C# with DevExpress XAF/XPO and SQL Server.",
    "j4.role": "Developer", "j4.p": "HR management systems for SMBs with .NET Core and Blazor.",
    "j5.when": "Apr 2019 — Jul 2019", "j5.role": "Analyst / Developer", "j5.p": "CRM for Fortaleza S.A. in .NET Core and SQL Server.",
    "j6.when": "Apr 2016 — Feb 2019", "j6.role": "Analyst / Developer", "j6.p": "Online banking for Banco Itaú Paraguay and CAJUBI's financial management system, in C# .NET and SQL Server.",
    "j7.when": "Oct 2013 — Apr 2016", "j7.role": "Analyst / Developer", "j7.p": "Where it all began: a financial application in C# .NET and Oracle.",

    "proj.kicker": "projects ↓",
    "proj.title": "Things I'm <mark>proud of</mark>",
    "p1.tag": "2024 — present · ITTI",
    "p1.t": "A credit system, from scratch",
    "p1.p": "Designing a brand-new system is an opportunity that doesn't come often. I built it in layers, so business rules live apart from the database and can be tested and changed without fear.",
    "l.app": "Application", "l.dom": "Domain", "l.inf": "Infrastructure",
    "p2.t": "Rescuing a critical system",
    "p2.p": "I migrated the PCA system to .NET Core, fixed errors in financial calculations and added clear logs so the team sleeps better at night.",
    "p3.t": "High-volume microservices",
    "p3.p": "Node.js APIs talking to three different databases, with versioned migrations so nothing breaks on the way to production.",
    "p4.t": "Online banking for thousands",
    "p4.p": "Development and maintenance of Banco Itaú Paraguay's online banking, a system that had to be available all the time.",

    "sk.kicker": "skills ↓",
    "sk.title": "My <mark>toolbox</mark>",
    "sk.db": "Databases", "sk.arch": "Architecture & data", "sk.micro": "Microservices",
    "sk.more": "And also", "sk.note": "My favorites, the ones I use every day",

    "b.kicker": "beyond code ↓",
    "b.title": "A little <mark>more about me</mark>",
    "b1.t": "From Areguá",
    "b1.p": "I live in the town of strawberries and ceramics, on the shores of Lake Ypacaraí. I work remotely with teams across the country.",
    "b2.t": "Four languages",
    "b2.p": "Native Spanish, intermediate English, and a little Guaraní and Portuguese. Always happy to practice.",
    "b3.t": "Curious by nature",
    "b3.p": "BSc in Computer Science from UNA. Ten years in, I'm still studying: FullStack, Python and whatever comes next.",

    "c.kicker": "contact ↓",
    "c.title": "Shall we <mark>chat</mark>?",
    "c.lead": "Whether you have a project, a job opening or just want to swap ideas, write to me. I always reply.",
    "c.copy": "Copy email", "c.cv": "CV as PDF ↗",
    "footer": "Made with love and coffee in Areguá",
  };
  const UI = {
    es: { title: "Melissa González Coral · Backend Engineer", copied: "¡Copiado! ✓", copyFail: "No se pudo copiar",
          langLabel: "Switch to English", theme: "Cambiar tema claro u oscuro", open: "Abrir menú", close: "Cerrar menú" },
    en: { title: "Melissa González Coral · Backend Engineer", copied: "Copied! ✓", copyFail: "Couldn't copy",
          langLabel: "Cambiar a español", theme: "Toggle light or dark theme", open: "Open menu", close: "Close menu" },
  };

  const nodes = [...document.querySelectorAll("[data-i18n]")];
  const ES = {};
  nodes.forEach((el) => (ES[el.dataset.i18n] = el.innerHTML));
  let lang = "es";

  const langBtn = document.querySelector(".lang");
  const themeBtn = document.querySelector(".theme");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.getElementById("nav-links");

  function setLang(next) {
    lang = next;
    nodes.forEach((el) => {
      const k = el.dataset.i18n;
      el.innerHTML = next === "en" && EN[k] != null ? EN[k] : ES[k];
    });
    root.lang = next;
    document.title = UI[next].title;
    langBtn.setAttribute("aria-label", UI[next].langLabel);
    themeBtn.setAttribute("aria-label", UI[next].theme);
    toggle.setAttribute("aria-label", links.classList.contains("open") ? UI[next].close : UI[next].open);
    store.set("lang", next);
  }
  const saved = store.get("lang");
  const initial = saved || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  if (initial !== "es") setLang(initial); else root.lang = "es";
  langBtn.addEventListener("click", () => setLang(lang === "es" ? "en" : "es"));

  /* ---------- Tema / Theme ---------- */
  themeBtn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    store.set("theme", next);
  });

  /* ---------- Menú móvil ---------- */
  const setOpen = (open) => {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? UI[lang].close : UI[lang].open);
  };
  toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") setOpen(false); });

  /* ---------- Sección activa en el menú ---------- */
  const navLinks = [...links.querySelectorAll("a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => {
    const s = document.querySelector(a.getAttribute("href"));
    if (s) spy.observe(s);
  });

  /* ---------- Aparición suave ---------- */
  if (!reduced && "IntersectionObserver" in window) {
    const items = document.querySelectorAll(".section__head, .about__text, .values li, .job, .project, .skills__group, .beyond__card, .contact > *");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  /* ---------- Copiar email ---------- */
  document.querySelectorAll(".copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const label = btn.innerHTML;
      try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = UI[lang].copied; }
      catch { btn.textContent = UI[lang].copyFail; }
      setTimeout(() => {
        const k = btn.dataset.i18n;
        btn.innerHTML = lang === "en" && EN[k] ? EN[k] : (ES[k] || label);
      }, 1800);
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
