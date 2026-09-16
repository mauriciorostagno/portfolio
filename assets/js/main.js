// Portfolio interactions: navbar state, mobile menu and hero typing effect.

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Dark background on the navbar once the user scrolls past the top
  const updateNavbar = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Mobile menu
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Highlight the nav link of the section currently on screen
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.querySelectorAll("a").forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => observer.observe(section));

  // Resume tabs: Work Experience / Education & Training
  const tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((other) => {
        const selected = other === tab;
        other.setAttribute("aria-selected", String(selected));
        document.getElementById(other.getAttribute("aria-controls")).hidden = !selected;
      });
    });
  });

  // Project filters for the "More projects" grid
  const filters = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filters.forEach((other) => {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach((card) => {
        card.hidden = category !== "all" && card.dataset.category !== category;
      });
    });
  });

  // Copy email to clipboard
  const copyButton = document.querySelector(".copy-btn");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyButton.dataset.copy);
        copyButton.textContent = "Copied";
        copyButton.classList.add("is-copied");
        setTimeout(() => {
          copyButton.textContent = "Copy";
          copyButton.classList.remove("is-copied");
        }, 2000);
      } catch {
        window.location.href = `mailto:${copyButton.dataset.copy}`;
      }
    });
  }

  // Current year in the footer
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // Typing effect for the hero title. Types the role once and keeps the cursor blinking.
  const typedElement = document.querySelector("[data-typed]");
  if (typedElement) {
    const text = typedElement.dataset.typed;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      typedElement.textContent = text;
    } else {
      let index = 0;
      const typeNext = () => {
        typedElement.textContent = text.slice(0, index);
        index += 1;
        if (index <= text.length) setTimeout(typeNext, 90);
      };
      setTimeout(typeNext, 400);
    }
  }
});
