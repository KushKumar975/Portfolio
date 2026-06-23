// ---- Throttle helper ----
function throttle(fn, delay) {
  let last = 0, timer = null;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn(...args);
      last = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay - (now - last));
    }
  };
}

// ---- COMBINED & OPTIMIZED MOUSEMOVE HANDLER ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
const blobs = [
  document.getElementById('blob1'),
  document.getElementById('blob2'),
  document.getElementById('blob3'),
  document.getElementById('blob4'),
  document.getElementById('blob5')
];
const blobFactors = [0.02, -0.03, 0.04, -0.02, 0.03];
const blobFactorsY = [0.02, 0.03, -0.02, -0.03, 0.04];

let mx = 0, my = 0, fx = 0, fy = 0;

// Mouse position tracking - runs every mousemove
const updateMousePos = (e) => {
  mx = e.clientX;
  my = e.clientY;
};

// Cursor update (throttled to ~60fps)
const updateCursor = throttle(() => {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
}, 16);

// Blob update (throttled to ~30fps, less critical)
const updateBlobs = throttle(() => {
  for (let i = 0; i < blobs.length; i++) {
    blobs[i].style.transform = `translate(${mx * blobFactors[i]}px, ${my * blobFactorsY[i]}px)`;
  }
}, 33);

document.addEventListener('mousemove', (e) => {
  updateMousePos(e);
  updateCursor();
  updateBlobs();
});

// ---- Follower animation ----
function animFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animFollower);
}
animFollower();

// ---- Cache interactive elements ----
const interactiveElements = document.querySelectorAll('a,button,.skill-chip,.project-card,.edu-card,.resp-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    follower.style.width = '52px';
    follower.style.height = '52px';
    follower.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.opacity = '0.5';
  });
});

// ---- CACHED DOM QUERIES (don't re-query in scroll handler!) ----
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

// ---- BATCHED SCROLL HANDLER (single listener, all logic) ----
const handleScroll = throttle(() => {
  const scrollY = window.scrollY;
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  
  // Navbar toggle
  navbar.classList.toggle('scrolled', scrollY > 60);
  
  // Progress bar
  const pct = (scrollY / scrollHeight) * 100;
  progressBar.style.width = pct + '%';
  
  // Active nav highlight
  let current = '';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}, 16);

window.addEventListener('scroll', handleScroll, { passive: true });

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// ---- Typewriter ----
const phrases = [
  'Building REST APIs',
  'Learning MERN Stack',
  'Solving DSA Problems',
  'Exploring Node.js',
  'Writing C++ Solutions'
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    tw.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    tw.textContent = phrase.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(typeLoop, 300);
      return;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 65);
}
typeLoop();

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal, .reveal-left');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ---- Counter animation ----
function animCount(el, target, suffix = '') {
  let count = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(interval);
  }, 20);
}

const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    setTimeout(() => {
      animCount(document.getElementById('cnt1'), 11, '+');
      animCount(document.getElementById('cnt2'), 3, '+');
      animCount(document.getElementById('cnt3'), 200, '+');
    }, 600);
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });

const heroElement = document.getElementById('hero');
if (heroElement) {
  heroObserver.observe(heroElement);
}
