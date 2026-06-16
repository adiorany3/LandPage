const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const themeToggle = document.getElementById("themeToggle");
const topButton = document.getElementById("topButton");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const themeKey = "adioranye-tech-portfolio-theme";
const savedTheme = localStorage.getItem(themeKey);
const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

if (savedTheme === "light" || (!savedTheme && prefersLight)) {
  document.body.classList.add("light");
  if (themeToggle) themeToggle.textContent = "☾";
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    themeToggle.textContent = isLight ? "☾" : "◐";
    localStorage.setItem(themeKey, isLight ? "light" : "dark");
  });
}

if (topButton) {
  window.addEventListener(
    "scroll",
    () => {
      topButton.classList.toggle("show", window.scrollY > 620);
    },
    { passive: true }
  );

  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const blogPosts = document.getElementById("blogPosts");
const blogStatus = document.getElementById("blogStatus");

const stripHtml = (html = "") => {
  const template = document.createElement("template");
  template.innerHTML = html;
  return (template.content.textContent || "").replace(/\s+/g, " ").trim();
};

const escapeHtml = (text = "") =>
  text.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[character]));

const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
};

const formatPostDate = (value) => {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(value));
  } catch {
    return "Artikel terbaru";
  }
};

const renderBlogPosts = (posts) => {
  if (!blogPosts || !Array.isArray(posts) || posts.length === 0) return;

  blogPosts.innerHTML = posts
    .slice(0, 3)
    .map((post) => {
      const title = stripHtml(post?.title?.rendered || post?.title || "Artikel Catatan Insani");
      const excerpt = truncateText(stripHtml(post?.excerpt?.rendered || post?.excerpt || "Ringkasan artikel terbaru dari Catatan Insani."));
      const link = post?.link || "https://catataninsani.wordpress.com/";
      const date = post?.date || new Date().toISOString();
      return `
        <article class="blog-card">
          <time datetime="${date.slice(0, 10)}">${formatPostDate(date)}</time>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(excerpt)}</p>
          <a href="${encodeURI(link)}" target="_blank" rel="noopener noreferrer">Baca ringkasan →</a>
        </article>
      `;
    })
    .join("");
};

const loadCatatanInsaniPosts = async () => {
  if (!blogPosts) return;

  const endpoint = "https://catataninsani.wordpress.com/wp-json/wp/v2/posts?per_page=3&_fields=date,link,title,excerpt";

  try {
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("WordPress response was not OK");
    const posts = await response.json();
    renderBlogPosts(posts);
    if (blogStatus) blogStatus.textContent = "Sinkron dari WordPress REST API";
  } catch (error) {
    if (blogStatus) blogStatus.textContent = "Fallback SEO aktif · API belum terbaca";
  }
};

loadCatatanInsaniPosts();


const typingCode = document.getElementById("typingCode");

const startCodeTyping = () => {
  if (!typingCode) return;

  const source = typingCode.dataset.typingCode || typingCode.textContent || "";
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    typingCode.textContent = source;
    return;
  }

  let index = 0;
  let pause = false;
  const baseSpeed = 22;

  const tick = () => {
    if (pause) {
      pause = false;
      index = 0;
      typingCode.textContent = "";
      window.setTimeout(tick, 380);
      return;
    }

    typingCode.textContent = source.slice(0, index);
    index += 1;

    if (index <= source.length) {
      const currentChar = source[index - 2] || "";
      const delay = currentChar === "\n" ? 260 : currentChar === " " ? 34 : baseSpeed;
      window.setTimeout(tick, delay);
    } else {
      pause = true;
      window.setTimeout(tick, 2600);
    }
  };

  typingCode.textContent = "";
  window.setTimeout(tick, 520);
};

startCodeTyping();
