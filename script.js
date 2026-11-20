(() => {
  const root = document.documentElement;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---------- Idioma / Language ----------
     El español vive en el HTML; acá solo va el inglés. */
  const EN = {
    "skip": "Skip to content",
    "hero.hi": "Hi,",
    "hero.name": "I'm Melissa González",
    "hero.role": "Backend Engineer · .NET & Node.js",
    "hero.lead": "I got into programming out of pure curiosity, that urge to understand how things work on the inside. More than ten years later, that curiosity still drives me: today I build systems for banks and financial companies, and I still love figuring out how to solve each problem.",
    "hero.cta": "Contact me",
    "hero.cv": "Download CV",
    "hero.caption": "from Areguá, with coffee ♡",

    "about.title": "A little about me",
    "about.where.k": "I'm in",
    "about.where.p": "The strawberry town, on the shores of Lake Ypacaraí. I work remotely.",
    "about.been.k": "Where I've been",
    "about.now": "now",
    "about.venn.k": "I move between",
    "about.venn.db": "Data",
    "about.venn.note": "…and in the middle, what I enjoy most: the backend.",

    "proj.title": "My work in projects",
    "proj.sub": "Real problems, the decisions I made and what I learned. Tap each card to read more.",
    "c1.n": "Case 01 · ITTI · 2024 — now",
    "c1.q": "How do you design a credit system from scratch?",
    "c1.a": "<p>I was asked to design the new credit origination system. I built it in layers (API, application, domain and infrastructure) so business rules live apart from the database and can be tested without fear.</p><p><strong>Decisions:</strong> Entity Framework Core Code-First, Repository and Unit of Work patterns, and PostgreSQL.</p>",
    "c2.n": "Case 02 · ITTI · 2024",
    "c2.q": "What do you do when a critical system gets the math wrong?",
    "c2.a": "<p>I migrated the PCA credit origination system to .NET Core and fixed critical financial-logic bugs, improving data integrity.</p><p><strong>What I learned:</strong> no good logs, no diagnosis. I added structured logging with Serilog and the team started finding errors much faster.</p>",
    "c3.n": "Case 03 · Bepsa · 2022 — 2024",
    "c3.q": "How do you make three databases live in peace?",
    "c3.a": "<p>I designed REST APIs in Node.js and Express within a high-volume microservices architecture, integrating PostgreSQL, MongoDB and DB2.</p><p><strong>The key:</strong> versioned migrations with Knex and Liquibase, so development and production never drift apart. I also modernized legacy C# modules.</p>",
    "c4.n": "Case 04 · Roshka · 2016 — 2019",
    "c4.pill": "Digital banking",
    "c4.pill2": "High availability",
    "c4.q": "What's it like to work on a system that can't go down?",
    "c4.a": "<p>I developed and maintained the frontend of Banco Itaú Paraguay's online banking, a transactional system that had to be available all the time. I also worked on CAJUBI's financial management system.</p><p><strong>What I learned:</strong> when thousands of people depend on a system, every change that goes to production is handled with care.</p>",
    "stack.k": "What I work with",

    "exp.title": "My journey",
    "exp.sub": "Over ten years, six companies and a lot of lines of code.",
    "exp.now": "Current",
    "j1.when": "Jun 2024 — Present",
    "j1.role": "SSR Software Engineer",
    "j1.b1": "Designing a new credit origination system in .NET 9 + PostgreSQL with Clean Architecture, EF Core Code-First, Repository and Unit of Work.",
    "j1.b2": "Migrated the PCA system to .NET Core; fixed critical financial-logic bugs.",
    "j1.b3": "REST APIs with Node.js in a microservices architecture.",
    "j1.b4": "Structured logging with Serilog for production traceability.",
    "j2.role": "Backend Developer",
    "j2.b1": "REST APIs with Node.js and Express in microservices; high-volume integrations with PostgreSQL, MongoDB and DB2.",
    "j2.b2": "Modernized legacy C# modules into decoupled architectures.",
    "j2.b3": "Database migrations with Knex and Liquibase.",
    "j3.role": "Developer",
    "j3.b1": "SGR system in C# with DevExpress XAF/XPO and SQL Server.",
    "j4.role": "Developer",
    "j4.b1": "HR management systems for SMBs in C# .NET Core and Blazor.",
    "j4.b2": "Management system in C# and SQL Server.",
    "j5.when": "Apr 2019 — Jul 2019",
    "j5.role": "Analyst / Developer",
    "j5.b1": "CRM for Fortaleza S.A. in C# .NET Core and SQL Server.",
    "j6.when": "Apr 2016 — Feb 2019",
    "j6.role": "Analyst / Developer",
    "j6.b1": "Online banking for Banco Itaú Paraguay in C# .NET and SQL Server (high availability).",
    "j6.b2": "CAJUBI's financial management system.",
    "j7.when": "Oct 2013 — Apr 2016",
    "j7.role": "Analyst / Developer",
    "j7.b1": "Financial application in C# .NET and Oracle.",
    "edu.k": "Education",
    "edu1.t": "FullStack Development Program",
    "edu1.badge": "★ Outstanding Student",
    "edu2.t": "Introduction to Python",
    "edu3.t": "BSc in Computer Science",
    "edu.una": "UNA, Polytechnic School",
    "edu.una2": "UNA, Polytechnic School",

    "fun.title": "What my CV doesn't say",
    "f1.t": "I live in strawberry land",
    "f1.p": "Areguá is famous for its strawberries and ceramics. My office has a view of all that.",
    "f2.t": "Spanish, English and a little more",
    "f2.p": "Native Spanish, intermediate English, and basic Guaraní and Portuguese.",
    "f4.t": "My favorite project is called Amelia",
    "f4.p": "She's my little girl, and playing with her is the best part of my day, just like enjoying tereré with my husband.",
    "f5.t": "Reading is my favorite break",
    "f5.p": "A good book is how I unplug after a day of code.",
    "f6.t": "Always with music",
    "f6.p": "It goes with me everywhere: to focus, to relax and through the everyday.",
    "f3.t": "I never stop learning",
    "f3.p": "Ten years into my career, I finished a FullStack program as an Outstanding Student.",

    "contact.title": "What if we build something together?",
    "contact.mail.k": "Write to me",
    "contact.li.k": "See my journey",
    "contact.gh.k": "See my code",
    "contact.cv.k": "All on one page",
    "contact.cv": "My CV ↓",
    "footer": "Made with love in Areguá",
  };

  const nodes = [...document.querySelectorAll("[data-i18n]")];
  const ES = {};
  nodes.forEach((el) => (ES[el.dataset.i18n] = el.innerHTML));
  const buttons = [...document.querySelectorAll(".lang button")];
  const vennLabel = document.querySelector(".venn");
  const VENN = { es: vennLabel.getAttribute("aria-label"), en: ".NET, Node.js and Data; in the middle, Backend" };

  function setLang(lang) {
    nodes.forEach((el) => {
      const k = el.dataset.i18n;
      const html = lang === "en" && EN[k] != null ? EN[k] : ES[k];
      if (el.namespaceURI === "http://www.w3.org/2000/svg") el.textContent = html;
      else el.innerHTML = html;
    });
    root.lang = lang;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    vennLabel.setAttribute("aria-label", VENN[lang]);
    store.set("lang", lang);
  }
  const saved = store.get("lang");
  const initial = saved || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  if (initial !== "es") setLang(initial);
  buttons.forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  /* ---------- Aparición suave ---------- */
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && "IntersectionObserver" in window) {
    const items = document.querySelectorAll(".title-arrow, .about > *, .section > h2, .sub, .case, .stack, .tl, .edu, .title-spark, .fact, .contact > *");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
