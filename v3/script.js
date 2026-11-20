(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Typing effect for the hero command
  const typed = document.getElementById("typed");
  const out = document.getElementById("hero-out");
  const text = typed.dataset.text;
  if (reduced) {
    typed.textContent = text;
  } else {
    out.classList.add("hidden");
    let i = 0;
    const tick = () => {
      typed.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 110);
      else setTimeout(() => out.classList.remove("hidden"), 250);
    };
    setTimeout(tick, 400);
  }

  // Mobile menu
  const toggle = document.querySelector(".nav__toggle");
  const links = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Active section highlight in nav
  const navLinks = [...links.querySelectorAll("a")];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => s && spy.observe(s));

  // Reveal on scroll
  if (!reduced && "IntersectionObserver" in window) {
    const items = document.querySelectorAll(".card, .stack__group, .log__item, .edu li, .about > *, .window--contact");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // Copy email
  document.querySelectorAll(".copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = "copiado ✓";
      } catch {
        btn.textContent = "error";
      }
      setTimeout(() => (btn.textContent = "copiar"), 1800);
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
