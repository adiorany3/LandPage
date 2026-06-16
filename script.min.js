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

const CATATAN_INSANI_FEED = "https://catataninsani.wordpress.com/feed/";
const CATATAN_INSANI_HOME = "https://catataninsani.wordpress.com/";

const blogEndpoints = [
  {
    name: "WordPress.com WP v2 API",
    url: "https://public-api.wordpress.com/wp/v2/sites/catataninsani.wordpress.com/posts?per_page=3&_fields=date,link,title,excerpt",
    normalize: (data) => Array.isArray(data) ? data : []
  },
  {
    name: "WordPress.com REST v1.1 API",
    url: "https://public-api.wordpress.com/rest/v1.1/sites/catataninsani.wordpress.com/posts/?number=3&fields=ID,date,title,URL,excerpt",
    normalize: (data) => Array.isArray(data?.posts)
      ? data.posts.map((post) => ({
          date: post.date,
          link: post.URL,
          title: post.title,
          excerpt: post.excerpt
        }))
      : []
  },
  {
    name: "Direct WordPress REST API",
    url: "https://catataninsani.wordpress.com/wp-json/wp/v2/posts?per_page=3&_fields=date,link,title,excerpt",
    normalize: (data) => Array.isArray(data) ? data : []
  },
  {
    name: "RSS fallback via rss2json",
    url: `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(CATATAN_INSANI_FEED)}`,
    normalize: (data) => Array.isArray(data?.items)
      ? data.items.slice(0, 3).map((item) => ({
          date: item.pubDate,
          link: item.link,
          title: item.title,
          excerpt: item.description || item.content
        }))
      : []
  }
];

const stripHtml = (html = "") => {
  const template = document.createElement("template");
  template.innerHTML = String(html);
  return (template.content.textContent || "").replace(/\s+/g, " ").trim();
};

const escapeHtml = (text = "") =>
  String(text).replace(/[&<>"']/g, (character) => ({
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
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Artikel terbaru";
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  } catch {
    return "Artikel terbaru";
  }
};

const normalizeTitle = (post) => stripHtml(post?.title?.rendered || post?.title || "Artikel Catatan Insani");
const normalizeExcerpt = (post) => truncateText(stripHtml(post?.excerpt?.rendered || post?.excerpt || "Ringkasan artikel terbaru dari Catatan Insani."));
const normalizeLink = (post) => post?.link || post?.URL || CATATAN_INSANI_HOME;

const getPostIsoDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const renderBlogPosts = (posts) => {
  if (!blogPosts || !Array.isArray(posts) || posts.length === 0) return false;

  blogPosts.innerHTML = posts
    .slice(0, 3)
    .map((post) => {
      const title = normalizeTitle(post);
      const excerpt = normalizeExcerpt(post);
      const link = normalizeLink(post);
      const date = post?.date || post?.pubDate || new Date().toISOString();
      return `
        <article class="blog-card">
          <time datetime="${getPostIsoDate(date)}">${formatPostDate(date)}</time>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(excerpt)}</p>
          <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Baca ringkasan →</a>
        </article>
      `;
    })
    .join("");

  return true;
};

const fetchWithTimeout = async (url, timeout = 9000) => {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
};

const setBlogStatus = (message) => {
  if (blogStatus) blogStatus.textContent = message;
};

const loadCatatanInsaniPosts = async () => {
  if (!blogPosts) return;

  setBlogStatus("Mengambil artikel terbaru dari Catatan Insani…");

  for (const endpoint of blogEndpoints) {
    try {
      const separator = endpoint.url.includes("?") ? "&" : "?";
      const data = await fetchWithTimeout(`${endpoint.url}${separator}t=${Date.now()}`);
      const posts = endpoint.normalize(data).filter(Boolean);

      if (renderBlogPosts(posts)) {
        setBlogStatus(`Update otomatis aktif · ${endpoint.name}`);
        return;
      }
    } catch (error) {
      console.info(`Catatan Insani fetch failed from ${endpoint.name}:`, error);
    }
  }

  setBlogStatus("Fallback SEO aktif · API belum terbaca di browser ini");
};

loadCatatanInsaniPosts();
