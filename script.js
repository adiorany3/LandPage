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

// Animate skill bars when visible
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const fill = entry.target.querySelector('.skill-fill');
      if(fill){
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => fill.style.width = width, 100);
      }
      skillObserver.unobserve(entry.target);
    }
  })
},{threshold:0.5});
skillCards.forEach(card => skillObserver.observe(card));

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
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&direction=desc`);
    if(!res.ok) throw new Error('Gagal mengambil repositori');
    const repos = await res.json();
    return repos.filter(r => !r.fork);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
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
    // Update projects stat with actual Python repos count
    const pythonReposCount = _cachedRepos.filter(r => r.language === 'Python').length;
    const projectsStat = document.getElementById('projectsStat');
    if(projectsStat){
      const statNumber = projectsStat.querySelector('.stat-number');
      if(statNumber) statNumber.setAttribute('data-target', pythonReposCount);
    }
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

// Greeting banner (compact, once-per-day)
const greetingBanner = document.getElementById('greetingBanner');
const greetingText = document.getElementById('greetingText');
const dismissGreeting = document.getElementById('dismissGreeting');

function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Browser tidak dikenal';
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return 'Mobile';
  if (/Tablet|iPad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

function getFlagEmoji(countryCode) {
  if (!countryCode || countryCode === 'Tidak dapat mendeteksi') return '';
  return countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

async function getUserInfo() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('Failed to fetch IP');
    const data = await response.json();
    const ip = data.ip;
    const countryResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!countryResponse.ok) throw new Error('Failed to fetch country');
    const countryData = await countryResponse.json();
    const country = countryData.country_name || 'Tidak dapat mendeteksi';
    const countryCode = countryData.country_code || '';
    const flag = getFlagEmoji(countryCode);
    const browser = getBrowserName();
    const device = getDeviceType();
    return { ip, country, flag, browser, device };
  } catch (error) {
    console.error('Error fetching user info:', error);
    const browser = getBrowserName();
    const device = getDeviceType();
    return { ip: 'Tidak dapat mendeteksi', country: 'Tidak dapat mendeteksi', flag: '', browser, device };
  }
}

function getGreetingMessage(lang = 'id') {
  const hour = new Date().getHours();
  if (lang === 'en') {
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Good afternoon';
    return 'Good evening';
  } else {
    if (hour >= 5 && hour < 12) return 'Selamat pagi';
    if (hour >= 12 && hour < 18) return 'Selamat siang';
    return 'Selamat malam';
  }
}

function greetingDismissedToday() {
  const val = localStorage.getItem('greetingDismissDate');
  return val === new Date().toISOString().slice(0,10);
}

function dismissBanner() {
  if (greetingBanner) {
    greetingBanner.classList.remove('show');
    greetingBanner.setAttribute('aria-hidden', 'true');
  }
  localStorage.setItem('greetingDismissDate', new Date().toISOString().slice(0,10));
}

async function showGreeting() {
  console.log('showGreeting called');
  // Removed dismissal check to show greeting on every load
  let country = 'Indonesia', flag = '';
  try {
    const info = await getUserInfo();
    country = info.country || country;
    flag = info.flag || '';
    console.log('User info:', info);
  } catch (e) {
    console.error('Error fetching user info:', e);
  }
  const lang = (country === 'Indonesia') ? 'id' : 'en';
  const greeting = getGreetingMessage(lang);
  console.log('Greeting message:', greeting, 'Lang:', lang);
  const welcomeText = (lang === 'id') ? 'Selamat datang dari' : 'Welcome from';
  if (greetingText) {
    greetingText.textContent = `${greeting}! ${welcomeText} ${flag} ${country}.`;
    console.log('Greeting text set:', greetingText.textContent);
  } else {
    console.error('greetingText not found');
  }
  if (greetingBanner) {
    greetingBanner.classList.add('show');
    greetingBanner.setAttribute('aria-hidden', 'false');
    console.log('Greeting banner shown');
    // Focus to dismiss button for accessibility
    setTimeout(() => dismissGreeting && dismissGreeting.focus(), 100);
  } else {
    console.error('greetingBanner not found');
  }
}

if (dismissGreeting) {
  dismissGreeting.addEventListener('click', dismissBanner);
  dismissGreeting.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dismissBanner();
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadGitHubProjects();
  // Defer greeting modal to improve initial load
  setTimeout(showGreeting, 1000);
  // Update footer year
  const footerYearText = document.getElementById('footerYearText');
  if (footerYearText) {
    footerYearText.textContent = `© ${new Date().getFullYear()} Galuh Adi Insani — Semua hak dilindungi.`;
  }
  // Visit counter
  let visitCount = localStorage.getItem('visitCount') || 0;
  visitCount = parseInt(visitCount) + 1;
  localStorage.setItem('visitCount', visitCount);
  const counterEl = document.getElementById('visitCounter');
  if (counterEl) {
    counterEl.textContent = visitCount;
  }
  // Trigger stat animation if already visible
  setTimeout(() => {
    statNumbers.forEach(s => {
      const rect = s.getBoundingClientRect();
      if(rect.top < window.innerHeight && rect.bottom > 0){
        const target = parseInt(s.getAttribute('data-target'));
        animateNumber(s, 0, target, 2000);
        statObserver.unobserve(s);
      }
    });
  }, 500);
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

// Fade-in animation for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {threshold: 0.1});

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  sectionObserver.observe(section);
});
