const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const backToTop = document.getElementById("backToTop");
const copyEmail = document.getElementById("copyEmail");
const copiedText = document.getElementById("copiedText");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      nav.classList.remove("open");
    }
  });
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeIcon.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeIcon.textContent = isLight ? "☾" : "◐";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const animateCounter = (element) => {
  const target = Number(element.dataset.count);
  const duration = 1300;
  const start = performance.now();

  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = target >= 1000 ? `${value}+` : value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target >= 1000 ? `${target}+` : target;
    }
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-count]").forEach((element) => {
  counterObserver.observe(element);
});

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter-btn").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    document.querySelectorAll(".project-card").forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !shouldShow);
    });
  });
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 650);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

copyEmail.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("adioranye@ugm.ac.id");
    copiedText.classList.add("show");

    setTimeout(() => {
      copiedText.classList.remove("show");
    }, 1800);
  } catch {
    window.location.href = "mailto:adioranye@ugm.ac.id";
  }
});
