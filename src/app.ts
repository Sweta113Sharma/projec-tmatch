// ================================================================
//  CollabMatch — Frontend TypeScript Application
//  Tinder-like student collaboration finder
// ================================================================

// ---- Types ----

type CollabType = 'hackathon' | 'research' | 'project' | 'startup' | 'opensource' | 'competition';
type SkillType = 'frontend' | 'backend' | 'ml' | 'mobile' | 'devops' | 'design' | 'data' |
                 'blockchain' | 'embedded' | 'research-skills' | 'writing' | 'pm';

interface Student {
  id: string;
  name: string;
  university: string;
  year: number;
  major: string;
  collabTypes: CollabType[];
  skills: SkillType[];
  bio: string;
  avatarColor: string;
}

interface AppState {
  myProfile: Student | null;
  candidates: Student[];
  seen: Set<string>;
  liked: Set<string>;
  superliked: Set<string>;
  matches: Student[];
  currentFilter: string;
  newMatchCount: number;
}

// ---- Helpers ----

function $(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el;
}

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const COLLAB_LABELS: Record<CollabType, string> = {
  hackathon: '🏆 Hackathon',
  research: '📄 Research',
  project: '🚀 Project',
  startup: '💡 Startup',
  opensource: '🔓 Open Source',
  competition: '🎯 Competition',
};

const SKILL_LABELS: Record<SkillType, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  ml: 'ML/AI',
  mobile: 'Mobile',
  devops: 'DevOps',
  design: 'UI/UX',
  data: 'Data Science',
  blockchain: 'Blockchain',
  embedded: 'Embedded',
  'research-skills': 'Research',
  writing: 'Tech Writing',
  pm: 'Product Mgmt',
};

// ---- Demo Data ----

const DEMO_STUDENTS: Student[] = [
  {
    id: 'demo-1',
    name: 'Priya Sharma',
    university: 'IIT Delhi',
    year: 3,
    major: 'Computer Science',
    collabTypes: ['hackathon', 'project'],
    skills: ['ml', 'backend', 'data'],
    bio: 'ML enthusiast working on NLP models. Looking for teammates for HackMIT and side projects that push AI boundaries.',
    avatarColor: '#FF6584',
  },
  {
    id: 'demo-2',
    name: 'Marcus Johnson',
    university: 'Stanford University',
    year: 4,
    major: 'Human-Computer Interaction',
    collabTypes: ['startup', 'project'],
    skills: ['design', 'frontend', 'pm'],
    bio: 'Building products people love. Let\'s create something that solves real problems — I handle the UX, you handle the tech.',
    avatarColor: '#43B89C',
  },
  {
    id: 'demo-3',
    name: 'Lena Mueller',
    university: 'ETH Zurich',
    year: 5,
    major: 'Computational Biology',
    collabTypes: ['research', 'competition'],
    skills: ['data', 'research-skills', 'writing'],
    bio: 'PhD student interested in bioinformatics. Co-authoring papers on protein folding. ISEF alumni. Let\'s publish something meaningful!',
    avatarColor: '#2193B0',
  },
  {
    id: 'demo-4',
    name: 'Arjun Patel',
    university: 'Carnegie Mellon University',
    year: 2,
    major: 'Electrical & Computer Engineering',
    collabTypes: ['hackathon', 'opensource', 'project'],
    skills: ['embedded', 'backend', 'devops'],
    bio: 'Firmware wizard who loves robotics and IoT. Won HackPSU twice. Ready to build the next great hardware hack.',
    avatarColor: '#F7971E',
  },
  {
    id: 'demo-5',
    name: 'Sofia Chen',
    university: 'UC Berkeley',
    year: 3,
    major: 'Data Science',
    collabTypes: ['research', 'project', 'hackathon'],
    skills: ['data', 'ml', 'writing'],
    bio: 'Researching fairness in ML systems. Also love building quick prototypes at hackathons. Let\'s combine rigor with speed.',
    avatarColor: '#C94B4B',
  },
  {
    id: 'demo-6',
    name: 'James Okoye',
    university: 'MIT',
    year: 4,
    major: 'Management Science',
    collabTypes: ['startup', 'hackathon'],
    skills: ['pm', 'frontend', 'writing'],
    bio: 'Business side of tech. Great at pitching, user research, and growth strategy. Need a technical co-founder or hackathon squad.',
    avatarColor: '#6C63FF',
  },
  {
    id: 'demo-7',
    name: 'Yuki Tanaka',
    university: 'University of Tokyo',
    year: 3,
    major: 'Computer Science',
    collabTypes: ['research', 'opensource'],
    skills: ['backend', 'blockchain', 'writing'],
    bio: 'Working on decentralized identity systems. Also contributing to open source cryptography libraries. DM me!',
    avatarColor: '#00695C',
  },
  {
    id: 'demo-8',
    name: 'Natasha Rivera',
    university: 'Georgia Tech',
    year: 2,
    major: 'Industrial Design',
    collabTypes: ['hackathon', 'startup', 'competition'],
    skills: ['design', 'mobile', 'pm'],
    bio: 'Designer who codes. I make apps look gorgeous and feel great. Let\'s build something award-winning together.',
    avatarColor: '#AD1457',
  },
  {
    id: 'demo-9',
    name: 'Ravi Krishnamurthy',
    university: 'NUS',
    year: 6,
    major: 'Robotics',
    collabTypes: ['research', 'competition'],
    skills: ['embedded', 'ml', 'data'],
    bio: 'PhD candidate in autonomous navigation. Looking for co-authors and competition teammates. ICRA & ROS enthusiast.',
    avatarColor: '#558B2F',
  },
  {
    id: 'demo-10',
    name: 'Emma Larsson',
    university: 'KTH Royal Institute',
    year: 3,
    major: 'Software Engineering',
    collabTypes: ['project', 'opensource', 'hackathon'],
    skills: ['frontend', 'mobile', 'devops'],
    bio: 'Full-stack dev with a soft spot for developer tools. Maintaining 3 open source projects. Let\'s build something people actually use.',
    avatarColor: '#0277BD',
  },
];

// ================================================================
//  State
// ================================================================

const state: AppState = {
  myProfile: null,
  candidates: [],
  seen: new Set(),
  liked: new Set(),
  superliked: new Set(),
  matches: [],
  currentFilter: 'all',
  newMatchCount: 0,
};

function saveState(): void {
  const data = {
    myProfile: state.myProfile,
    seen: [...state.seen],
    liked: [...state.liked],
    superliked: [...state.superliked],
    matches: state.matches,
  };
  localStorage.setItem('collabmatch_state', JSON.stringify(data));
}

function loadState(): void {
  const raw = localStorage.getItem('collabmatch_state');
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    state.myProfile = data.myProfile ?? null;
    state.seen      = new Set(data.seen ?? []);
    state.liked     = new Set(data.liked ?? []);
    state.superliked = new Set(data.superliked ?? []);
    state.matches   = data.matches ?? [];
  } catch {
    // ignore corrupt state
  }
}

// ================================================================
//  Screen Navigation
// ================================================================

type ScreenId = 'screen-onboarding' | 'screen-setup' | 'screen-discover' |
                'screen-matches' | 'screen-profile-view';

function showScreen(id: ScreenId): void {
  document.querySelectorAll<HTMLElement>('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    el.scrollTop = 0;
  }
}

// ================================================================
//  Onboarding
// ================================================================

function initOnboarding(): void {
  $('btn-get-started').addEventListener('click', () => showScreen('screen-setup'));
}

// ================================================================
//  Profile Setup
// ================================================================

function initSetup(): void {
  // bio char counter
  const bioArea = document.getElementById('f-bio') as HTMLTextAreaElement;
  bioArea.addEventListener('input', () => {
    $('bio-count').textContent = String(bioArea.value.length);
  });

  // tag toggles
  document.querySelectorAll<HTMLButtonElement>('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('selected'));
  });

  // avatar color selector
  document.querySelectorAll<HTMLButtonElement>('.avatar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // form submit
  $('setup-form').addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const name = (document.getElementById('f-name') as HTMLInputElement).value.trim();
    const university = (document.getElementById('f-university') as HTMLInputElement).value.trim();

    if (!name || !university) {
      alert('Please fill in your name and university.');
      return;
    }

    const selectedCollabTypes = Array.from(
      document.querySelectorAll<HTMLButtonElement>('#collab-types .tag-btn.selected')
    ).map(b => b.dataset['value'] as CollabType);

    if (selectedCollabTypes.length === 0) {
      alert('Please select at least one collaboration type.');
      return;
    }

    const selectedSkills = Array.from(
      document.querySelectorAll<HTMLButtonElement>('#skills-grid .tag-btn.selected')
    ).map(b => b.dataset['value'] as SkillType);

    const selectedColor = (
      document.querySelector<HTMLButtonElement>('.avatar-btn.selected')
    )?.dataset['color'] ?? '#6C63FF';

    state.myProfile = {
      id: 'me',
      name,
      university,
      year: parseInt((document.getElementById('f-year') as HTMLSelectElement).value, 10),
      major: (document.getElementById('f-major') as HTMLInputElement).value.trim() || 'Student',
      collabTypes: selectedCollabTypes,
      skills: selectedSkills,
      bio: (document.getElementById('f-bio') as HTMLTextAreaElement).value.trim(),
      avatarColor: selectedColor,
    };

    saveState();
    startDiscover();
  });
}

// ================================================================
//  Discover
// ================================================================

let currentCardEl: HTMLElement | null = null;
let dragStartX = 0;
let dragStartY = 0;
let isDragging = false;

function filteredCandidates(): Student[] {
  return DEMO_STUDENTS.filter(s => {
    if (state.seen.has(s.id)) return false;
    if (state.currentFilter === 'all') return true;
    return s.collabTypes.includes(state.currentFilter as CollabType);
  });
}

function buildCard(student: Student): HTMLElement {
  const card = document.createElement('div');
  card.className = 'profile-card';
  card.dataset['id'] = student.id;

  const collabChips = student.collabTypes
    .map(c => `<span class="collab-chip ${c}">${COLLAB_LABELS[c]}</span>`)
    .join('');

  const skillChips = student.skills
    .map(s => `<span class="skill-chip">${SKILL_LABELS[s]}</span>`)
    .join('');

  const yearLabel = ['', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Master\'s', 'PhD'][student.year] ?? '';

  card.innerHTML = `
    <div class="card-header">
      <div class="card-avatar-bg" style="background: linear-gradient(135deg, ${student.avatarColor} 0%, ${student.avatarColor}99 100%)">
        <div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:64px;font-weight:800;color:rgba(255,255,255,0.25)">${initials(student.name)}</div>
      </div>
      <div class="card-header-text">
        <h3>${escHtml(student.name)}</h3>
        <p>${escHtml(student.university)} · ${escHtml(student.major)} · ${yearLabel}</p>
      </div>
    </div>
    <div class="card-body">
      <div class="card-collab-types">${collabChips}</div>
      ${student.bio ? `<p class="card-bio">${escHtml(student.bio)}</p>` : ''}
      <div class="card-skills">${skillChips}</div>
    </div>
    <div class="swipe-overlay like">CONNECT</div>
    <div class="swipe-overlay pass">PASS</div>
    <div class="swipe-overlay super">SUPER ⭐</div>
  `;

  attachDrag(card);
  return card;
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderNextCard(): void {
  const stack = $('card-stack');

  // Remove any existing card
  stack.querySelectorAll('.profile-card').forEach(c => c.remove());

  const candidates = filteredCandidates();

  if (candidates.length === 0) {
    $('empty-state').classList.remove('hidden');
    return;
  }

  $('empty-state').classList.add('hidden');

  // Render top card + ghost behind
  const top = candidates[0];
  const cardEl = buildCard(top);
  stack.appendChild(cardEl);
  currentCardEl = cardEl;

  // Ghost card hint
  if (candidates.length > 1) {
    const ghost = document.createElement('div');
    ghost.className = 'profile-card';
    ghost.style.cssText = 'transform:scale(0.95) translateY(12px);opacity:0.5;pointer-events:none;';
    ghost.style.zIndex = '-1';
    const s2 = candidates[1];
    ghost.style.background = s2.avatarColor + '22';
    stack.insertBefore(ghost, cardEl);
  }
}

// ---- Drag / Swipe ----

function attachDrag(card: HTMLElement): void {
  const likeOverlay  = card.querySelector<HTMLElement>('.swipe-overlay.like')!;
  const passOverlay  = card.querySelector<HTMLElement>('.swipe-overlay.pass')!;
  const superOverlay = card.querySelector<HTMLElement>('.swipe-overlay.super')!;

  let startX = 0, startY = 0, curX = 0, curY = 0, active = false;

  function onDown(x: number, y: number): void {
    active = true;
    startX = x; startY = y; curX = x; curY = y;
    isDragging = false;
    dragStartX = x; dragStartY = y;
    card.style.transition = 'none';
  }
  function onMove(x: number, y: number): void {
    if (!active) return;
    isDragging = true;
    curX = x; curY = y;
    const dx = curX - startX;
    const dy = curY - startY;
    const rot = dx * 0.08;
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;

    const ratio = Math.abs(dx) / (window.innerWidth / 2);
    if (dx > 30) {
      likeOverlay.style.opacity = String(Math.min(ratio, 1));
      passOverlay.style.opacity = '0';
      superOverlay.style.opacity = '0';
    } else if (dx < -30) {
      passOverlay.style.opacity = String(Math.min(ratio, 1));
      likeOverlay.style.opacity = '0';
      superOverlay.style.opacity = '0';
    } else if (dy < -50) {
      superOverlay.style.opacity = String(Math.min(Math.abs(dy) / 100, 1));
      likeOverlay.style.opacity = '0';
      passOverlay.style.opacity = '0';
    } else {
      likeOverlay.style.opacity = '0';
      passOverlay.style.opacity = '0';
      superOverlay.style.opacity = '0';
    }
  }
  function onUp(): void {
    if (!active) return;
    active = false;
    card.style.transition = '';

    const dx = curX - startX;
    const dy = curY - startY;
    const studentId = card.dataset['id']!;

    if (dx > 100) {
      swipe(studentId, 'like', card);
    } else if (dx < -100) {
      swipe(studentId, 'pass', card);
    } else if (dy < -100) {
      swipe(studentId, 'super', card);
    } else {
      card.style.transform = '';
      likeOverlay.style.opacity = '0';
      passOverlay.style.opacity = '0';
      superOverlay.style.opacity = '0';
    }
  }

  // Mouse
  card.addEventListener('mousedown', e => { onDown(e.clientX, e.clientY); });
  window.addEventListener('mousemove', e => { if (active) onMove(e.clientX, e.clientY); });
  window.addEventListener('mouseup', () => { if (active) onUp(); });

  // Touch
  card.addEventListener('touchstart', e => {
    const t = e.touches[0];
    onDown(t.clientX, t.clientY);
  }, { passive: true });
  card.addEventListener('touchmove', e => {
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
    e.preventDefault();
  }, { passive: false });
  card.addEventListener('touchend', () => onUp());
}

type SwipeDir = 'like' | 'pass' | 'super';

function swipe(studentId: string, dir: SwipeDir, cardEl: HTMLElement): void {
  state.seen.add(studentId);

  if (dir === 'like' || dir === 'super') {
    state.liked.add(studentId);
    if (dir === 'super') state.superliked.add(studentId);

    // Simulate match: 40% chance for like, 70% for super
    const matchChance = dir === 'super' ? 0.7 : 0.4;
    if (Math.random() < matchChance) {
      const student = DEMO_STUDENTS.find(s => s.id === studentId);
      if (student) {
        state.matches.push(student);
        state.newMatchCount++;
        setTimeout(() => showMatchPopup(student, dir === 'super'), 400);
      }
    }
  }

  const animClass = dir === 'like' ? 'fly-right' : dir === 'pass' ? 'fly-left' : 'fly-up';
  cardEl.classList.add(animClass);
  cardEl.addEventListener('animationend', () => {
    cardEl.remove();
    renderNextCard();
    updateMatchBadge();
    saveState();
  }, { once: true });
}

// ---- Match Popup ----

function showMatchPopup(student: Student, isSuper: boolean): void {
  const popup = $('match-popup');
  const myProfile = state.myProfile!;

  const myAv = $('popup-my-avatar');
  myAv.style.background = myProfile.avatarColor;
  myAv.textContent = initials(myProfile.name);

  const theirAv = $('popup-their-avatar');
  theirAv.style.background = student.avatarColor;
  theirAv.textContent = initials(student.name);

  const txt = $('popup-match-text');
  txt.innerHTML = `You and <strong>${escHtml(student.name)}</strong> both want to ${isSuper ? '⭐ super-collaborate' : 'collaborate'}!`;

  popup.classList.remove('hidden');
}

function initMatchPopup(): void {
  $('popup-view-matches').addEventListener('click', () => {
    $('match-popup').classList.add('hidden');
    state.newMatchCount = 0;
    updateMatchBadge();
    renderMatches();
    showScreen('screen-matches');
  });
  $('popup-keep-swiping').addEventListener('click', () => {
    $('match-popup').classList.add('hidden');
  });
}

// ---- Filter chips ----

function initFilterChips(): void {
  document.querySelectorAll<HTMLButtonElement>('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentFilter = chip.dataset['filter'] ?? 'all';
      renderNextCard();
    });
  });
}

// ---- Action buttons ----

function initActionButtons(): void {
  $('btn-pass').addEventListener('click', () => {
    if (!currentCardEl) return;
    const id = currentCardEl.dataset['id']!;
    swipe(id, 'pass', currentCardEl);
  });
  $('btn-like').addEventListener('click', () => {
    if (!currentCardEl) return;
    const id = currentCardEl.dataset['id']!;
    swipe(id, 'like', currentCardEl);
  });
  $('btn-super').addEventListener('click', () => {
    if (!currentCardEl) return;
    const id = currentCardEl.dataset['id']!;
    swipe(id, 'super', currentCardEl);
  });
  $('btn-reset').addEventListener('click', () => {
    state.seen.clear();
    state.liked.clear();
    state.superliked.clear();
    saveState();
    renderNextCard();
  });
}

function updateMatchBadge(): void {
  const badge = $('match-badge');
  if (state.newMatchCount > 0) {
    badge.textContent = String(state.newMatchCount);
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

// ----------------------------------------------------------------

function startDiscover(): void {
  showScreen('screen-discover');
  renderNextCard();
  updateMatchBadge();
}

// ================================================================
//  Matches Screen
// ================================================================

function renderMatches(): void {
  const list = $('matches-list');
  const noMatches = $('no-matches');

  // Clear previous cards
  list.querySelectorAll('.match-card').forEach(el => el.remove());

  if (state.matches.length === 0) {
    noMatches.classList.remove('hidden');
    return;
  }

  noMatches.classList.add('hidden');

  state.matches.slice().reverse().forEach(student => {
    const card = document.createElement('div');
    card.className = 'match-card';
    const isSuperlike = state.superliked.has(student.id);
    const collabLabels = student.collabTypes.map(c => COLLAB_LABELS[c]).join(', ');
    card.innerHTML = `
      <div class="match-card-avatar" style="background:${student.avatarColor}">${initials(student.name)}</div>
      <div class="match-card-info">
        <h4>${escHtml(student.name)} ${isSuperlike ? '<span class="match-superstar">⭐</span>' : ''}</h4>
        <p>${escHtml(student.university)} · ${collabLabels}</p>
      </div>
      <span style="font-size:20px">→</span>
    `;
    list.appendChild(card);
  });
}

function initMatchesScreen(): void {
  $('btn-matches-nav').addEventListener('click', () => {
    state.newMatchCount = 0;
    updateMatchBadge();
    renderMatches();
    showScreen('screen-matches');
  });
  $('btn-back-discover').addEventListener('click', () => showScreen('screen-discover'));
}

// ================================================================
//  My Profile View
// ================================================================

function renderMyProfile(): void {
  const container = $('my-profile-content');
  const p = state.myProfile;
  if (!p) return;

  const yearLabel = ['', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Master\'s', 'PhD'][p.year] ?? '';
  const collabChips = p.collabTypes.map(c =>
    `<span class="collab-chip ${c}">${COLLAB_LABELS[c]}</span>`).join('');
  const skillChips = p.skills.map(s =>
    `<span class="skill-chip">${SKILL_LABELS[s]}</span>`).join('');

  container.innerHTML = `
    <div class="profile-view-avatar" style="background:${p.avatarColor}">${initials(p.name)}</div>
    <div class="profile-view-name">${escHtml(p.name)}</div>
    <div class="profile-view-sub">${escHtml(p.university)} · ${escHtml(p.major)} · ${yearLabel}</div>

    <div class="profile-section">
      <h4>Looking for</h4>
      <div class="card-collab-types">${collabChips}</div>
    </div>

    ${p.bio ? `
    <div class="profile-section">
      <h4>Bio</h4>
      <p style="font-size:15px;line-height:1.6;color:var(--muted)">${escHtml(p.bio)}</p>
    </div>` : ''}

    <div class="profile-section">
      <h4>Skills</h4>
      <div class="card-skills">${skillChips || '<span style="color:var(--muted);font-size:14px">None added yet</span>'}</div>
    </div>

    <div class="profile-section" style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-size:13px;color:var(--muted)">Connections made</div>
        <div style="font-size:24px;font-weight:800;color:var(--primary)">${state.matches.length}</div>
      </div>
      <div>
        <div style="font-size:13px;color:var(--muted)">Profiles seen</div>
        <div style="font-size:24px;font-weight:800;color:var(--primary)">${state.seen.size}</div>
      </div>
      <div>
        <div style="font-size:13px;color:var(--muted)">Super likes sent</div>
        <div style="font-size:24px;font-weight:800;color:var(--super)">${state.superliked.size}</div>
      </div>
    </div>

    <button class="btn btn-outline btn-block" id="btn-reset-all" style="margin-top:12px">Reset All Data</button>
  `;

  document.getElementById('btn-reset-all')?.addEventListener('click', () => {
    if (confirm('This will clear all your data including matches. Are you sure?')) {
      localStorage.removeItem('collabmatch_state');
      location.reload();
    }
  });
}

function initProfileView(): void {
  $('btn-profile').addEventListener('click', () => {
    renderMyProfile();
    showScreen('screen-profile-view');
  });
  $('btn-back-from-profile').addEventListener('click', () => showScreen('screen-discover'));
  $('btn-edit-profile').addEventListener('click', () => {
    showScreen('screen-setup');
  });
}

// ================================================================
//  Bootstrap
// ================================================================

function boot(): void {
  loadState();

  initOnboarding();
  initSetup();
  initFilterChips();
  initActionButtons();
  initMatchPopup();
  initMatchesScreen();
  initProfileView();

  if (state.myProfile) {
    startDiscover();
  } else {
    showScreen('screen-onboarding');
  }
}

document.addEventListener('DOMContentLoaded', boot);
