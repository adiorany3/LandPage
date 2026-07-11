"use client";

import { CSSProperties, PointerEvent, useMemo, useState } from "react";
import type { GitHubProject, ProjectCategory } from "@/lib/github";

const categories: Array<"Semua" | ProjectCategory> = [
  "Semua",
  "AgriTech",
  "Statistics",
  "AI & Vision",
  "Web & Tools"
];

const categoryIcon: Record<ProjectCategory, string> = {
  AgriTech: "AG",
  Statistics: "Σ",
  "AI & Vision": "AI",
  "Web & Tools": "</>"
};

const categoryClass: Record<ProjectCategory, string> = {
  AgriTech: "agritech",
  Statistics: "statistics",
  "AI & Vision": "vision",
  "Web & Tools": "webtools"
};

type Props = {
  projects: GitHubProject[];
  totalRepositories: number;
  source: "github" | "fallback";
};

function formatUpdatedDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function safeHomepage(value: string | null) {
  if (!value) return null;
  return /^https?:\/\//i.test(value) ? value : null;
}

function ProjectCard({ project, index }: { project: GitHubProject; index: number }) {
  const homepage = safeHomepage(project.homepage);
  const visibleTags = project.topics.length > 0
    ? project.topics.slice(0, 3)
    : [project.language, project.category];

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--rotate-x", `${(0.5 - y) * 7}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * 8}deg`);
    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
  }

  function resetCard(event: PointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  }

  const animationStyle = { "--card-delay": `${Math.min(index, 11) * 55}ms` } as CSSProperties;

  return (
    <article
      className={`repo-card repo-card-enter repo-${categoryClass[project.category]}`}
      style={animationStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetCard}
    >
      <div className="repo-card-glow" aria-hidden="true" />
      <div className="repo-visual" aria-hidden="true">
        <div className="repo-visual-topline">
          <span className="repo-window-dots"><i /><i /><i /></span>
          <span className="repo-live"><i /> open source</span>
        </div>
        <div className="repo-symbol">{categoryIcon[project.category]}</div>
        <div className="repo-code-lines">
          <span /><span /><span /><span />
        </div>
        <span className="repo-language">{project.language}</span>
        <span className="repo-orbit orbit-one" />
        <span className="repo-orbit orbit-two" />
      </div>

      <div className="repo-content">
        <div className="repo-kicker-row">
          <span className="repo-category">{project.category}</span>
          {project.featured && <span className="featured-badge">Pinned</span>}
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>

        <div className="repo-tags" aria-label={`Teknologi ${project.name}`}>
          {visibleTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <div className="repo-meta">
          <span title="Pembaruan terakhir">↻ {formatUpdatedDate(project.updatedAt)}</span>
          <span title="GitHub stars">☆ {project.stars}</span>
          <span title="Forks">⑂ {project.forks}</span>
        </div>

        <div className="repo-actions">
          <a href={project.url} target="_blank" rel="noreferrer">
            Lihat kode <span aria-hidden="true">↗</span>
          </a>
          {homepage && (
            <a className="repo-demo-link" href={homepage} target="_blank" rel="noreferrer">
              Live demo <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcase({ projects, totalRepositories, source }: Props) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Semua");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);


  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "Semua" || project.category === activeCategory;
      const searchable = [
        project.name,
        project.description,
        project.language,
        project.category,
        ...project.topics
      ].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, projects, query]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const marqueeProjects = projects.slice(0, Math.min(12, projects.length));
  const latestUpdate = projects.reduce(
    (latest, project) => Math.max(latest, Date.parse(project.updatedAt)),
    0
  );

  return (
    <section className="section project-showcase" id="projects" aria-labelledby="projects-title">
      <div className="projects-heading-row">
        <div className="section-heading">
          <p className="eyebrow">GitHub Project Explorer</p>
          <h2 id="projects-title">Katalog proyek yang hidup dan selalu bergerak.</h2>
          <p>
            Repository diambil otomatis dari GitHub, dikelompokkan berdasarkan fokus, lalu
            ditampilkan sebagai kartu interaktif yang tetap ringan pada desktop dan mobile.
          </p>
        </div>
        <div className="github-sync-card" aria-label="Status sinkronisasi GitHub">
          <span className="sync-pulse" aria-hidden="true" />
          <div>
            <strong>{totalRepositories} repository publik</strong>
            <span>
              {source === "github" ? "Tersinkron dari GitHub" : "Data cadangan aktif"}
              {latestUpdate > 0 ? ` • update ${formatUpdatedDate(new Date(latestUpdate).toISOString())}` : ""}
            </span>
          </div>
        </div>
      </div>

      {marqueeProjects.length > 0 && (
        <div className="project-marquee" aria-label="Daftar singkat project terbaru">
          <div className="project-marquee-track">
            {[...marqueeProjects, ...marqueeProjects].map((project, index) => (
              <span key={`${project.name}-${index}`}>
                <i className={`marquee-dot dot-${categoryClass[project.category]}`} />
                {project.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="project-toolbar">
        <div className="project-filters" role="group" aria-label="Filter kategori project">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? "active" : ""}
              aria-pressed={activeCategory === category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(12);
              }}
            >
              {category}
              <span>
                {category === "Semua"
                  ? projects.length
                  : projects.filter((project) => project.category === category).length}
              </span>
            </button>
          ))}
        </div>

        <label className="project-search">
          <span className="sr-only">Cari repository</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(12);
            }}
            placeholder="Cari project atau teknologi"
          />
        </label>
      </div>

      <div className="project-result-line" aria-live="polite">
        <span>Menampilkan {Math.min(visibleCount, filteredProjects.length)} dari {filteredProjects.length} project</span>
        {(activeCategory !== "Semua" || query) && (
          <button
            type="button"
            onClick={() => {
              setActiveCategory("Semua");
              setQuery("");
              setVisibleCount(12);
            }}
          >
            Reset filter
          </button>
        )}
      </div>

      {visibleProjects.length > 0 ? (
        <div className="repo-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              project={project}
              index={index}
              key={`${project.name}-${activeCategory}-${query}`}
            />
          ))}
        </div>
      ) : (
        <div className="project-empty">
          <span aria-hidden="true">⌕</span>
          <h3>Project tidak ditemukan.</h3>
          <p>Coba kata kunci atau kategori lain.</p>
        </div>
      )}

      <div className="project-footer-actions">
        {visibleCount < filteredProjects.length && (
          <button className="btn ghost load-more" type="button" onClick={() => setVisibleCount((count) => count + 12)}>
            Tampilkan lebih banyak
          </button>
        )}
        <a className="btn primary" href="https://github.com/adiorany3?tab=repositories" target="_blank" rel="noreferrer">
          Lihat semua di GitHub
        </a>
      </div>
    </section>
  );
}
