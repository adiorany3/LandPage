// Smooth scroll for nav anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href')
    if(href.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  })
})

// Theme toggle
const tBtn = document.getElementById('themeToggle');
tBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  tBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙'
})

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const primaryMenu = document.getElementById('primaryMenu');
menuToggle && menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  if(!open){
    primaryMenu.style.display = 'flex';
  } else {
    primaryMenu.style.display = '';
  }
})

// Animate skill bars when visible
const skillBars = document.querySelectorAll('.skill-bar');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const fill = entry.target.querySelector('.fill');
      const p = window.getComputedStyle(entry.target).getPropertyValue('--p').trim();
      if(fill){
        fill.style.width = p || '60%';
      }
      observer.unobserve(entry.target);
    }
  })
},{threshold:0.25});
skillBars.forEach(s => observer.observe(s));

// Animate stat numbers when visible
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateNumber(entry.target, 0, target, 2000);
      statObserver.unobserve(entry.target);
    }
  })
},{threshold:0.5});
statNumbers.forEach(s => statObserver.observe(s));

function animateNumber(element, start, end, duration) {
  const startTime = performance.now();
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(start + (end - start) * progress);
    element.textContent = value;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('#primaryMenu a').forEach(a => {
  a.addEventListener('click', () => {
    if(primaryMenu){
      primaryMenu.style.display = '';
      if(menuToggle) menuToggle.setAttribute('aria-expanded','false');
    }
  });
});

// Note: contact is handled via email only; no client-side form handler is needed.

// Load GitHub repositories into the Projects section
let _cachedRepos = null;
let _displayCount = 6;

async function fetchGitHubRepos(username = 'adiorany3'){
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&direction=desc`);
  if(!res.ok) throw new Error('Gagal mengambil repositori');
  const repos = await res.json();
  return repos.filter(r => !r.fork);
}

function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', {year:'numeric',month:'short',day:'numeric'});
}

function renderProjects(repos, {onlyPython=true, limit=6} = {}){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  let list = repos.slice();
  if(onlyPython) list = list.filter(r => r.language === 'Python');
  if(list.length === 0){
    grid.innerHTML = `<p class="muted">Tidak ada repositori Python publik. Lihat <a href="https://github.com/adiorany3" target="_blank" rel="noopener">profil GitHub</a>.</p>`;
    return;
  }
  const slice = list.slice(0, limit);
  grid.innerHTML = '';
  slice.forEach(r => {
    const card = document.createElement('article');
    card.className = 'project-card';
    const desc = r.description ? r.description : '';
    card.innerHTML = `
      <h3><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a></h3>
      <p>${desc}</p>
      <div class="project-meta">
        <span>🛠 ${r.language || '—'}</span>
        <span>⭐ ${r.stargazers_count}</span>
        <span>● ${formatDate(r.pushed_at)}</span>
      </div>
      <div class="project-links" style="margin-top:0.75rem">
        <a class="btn btn-outline" href="${r.html_url}" target="_blank" rel="noopener">Repo</a>
      </div>
    `;
    grid.appendChild(card);
  });
  // update more button visibility
  const loadMore = document.getElementById('loadMore');
  if(loadMore) loadMore.style.display = (list.length > limit) ? 'inline-block' : 'none';
}

async function loadGitHubProjects(username = 'adiorany3') {
  const filterEl = document.getElementById('filterPython');
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  try {
    if(!_cachedRepos) _cachedRepos = await fetchGitHubRepos(username);
    renderProjects(_cachedRepos, {onlyPython: filterEl && filterEl.checked, limit: _displayCount});
  } catch (err) {
    grid.innerHTML = `<p class="muted">Terjadi kesalahan saat memuat proyek. <a href="https://github.com/${username}" target="_blank" rel="noopener">Lihat GitHub</a>.</p>`;
    console.error(err);
  }
}

// Events for filtering and load more
const filterEl = document.getElementById('filterPython');
const loadBtn = document.getElementById('loadMore');
if(filterEl) filterEl.addEventListener('change', () => {
  _displayCount = 6; // reset
  loadGitHubProjects();
});
if(loadBtn) loadBtn.addEventListener('click', () => {
  _displayCount += 6;
  loadGitHubProjects();
});

// Copy email button behavior
const copyBtn = document.getElementById('copyEmail');
const emailBtn = document.getElementById('emailBtn');
if(copyBtn && emailBtn){
  emailBtn.addEventListener('click', () => {
    window.location.href = 'mailto:adioranye@ugm.ac.id';
  });
  copyBtn.addEventListener('click', async () => {
    const email = 'adioranye@ugm.ac.id';
    try{
      await navigator.clipboard.writeText(email);
      const old = copyBtn.textContent;
      copyBtn.textContent = 'Tersalin!';
      copyBtn.disabled = true;
      setTimeout(() => { copyBtn.textContent = old; copyBtn.disabled = false; }, 1400);
    }catch(e){
      // fallback
      window.prompt('Salin alamat email:', email);
    }
  });
}

// Greeting modal with IP
const greetingModal = document.getElementById('greetingModal');
const greetingText = document.getElementById('greetingText');
const closeGreeting = document.getElementById('closeGreeting');

async function getUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return 'Tidak dapat mendeteksi';
  }
}

async function showGreeting() {
  const ip = await getUserIP();
  greetingText.textContent = `IP Anda: ${ip}. Selamat datang di landing page Galuh Adi Insani!`;
  greetingModal.classList.add('show');
}

closeGreeting.addEventListener('click', () => {
  greetingModal.classList.remove('show');
});

document.addEventListener('DOMContentLoaded', () => {
  loadGitHubProjects();
  showGreeting();
});

// Back to Top button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
