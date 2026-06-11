// ---- Custom Cursor ----
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    function animFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animFollower);
    }
    animFollower();
    document.querySelectorAll('a,button,.skill-chip,.project-card,.edu-card,.resp-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px'; cursor.style.height = '20px';
        follower.style.width = '52px'; follower.style.height = '52px';
        follower.style.opacity = '0.2';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px'; cursor.style.height = '12px';
        follower.style.width = '36px'; follower.style.height = '36px';
        follower.style.opacity = '0.5';
      });
    });

    // ---- Navbar scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ---- Progress bar ----
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = pct + '%';
    });

    // ---- Mobile menu ----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    function closeMobile() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    }

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
        if (ci === phrase.length) { deleting = true; setTimeout(typeLoop, 1600); return; }
      } else {
        tw.textContent = phrase.slice(0, --ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(typeLoop, 300); return; }
      }
      setTimeout(typeLoop, deleting ? 40 : 65);
    }
    typeLoop();

    // ---- Scroll reveal ----
    const revealEls = document.querySelectorAll('.reveal, .reveal-left');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 0);
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
    heroObserver.observe(document.getElementById('hero'));

    // ---- Active nav highlight ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      navLinks.forEach(l => {
        l.style.color = l.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
      });
    });
    document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  document.getElementById('blob1').style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
  document.getElementById('blob2').style.transform = `translate(${x * -0.03}px, ${y * 0.03}px)`;
  document.getElementById('blob3').style.transform = `translate(${x * 0.04}px, ${y * -0.02}px)`;
  document.getElementById('blob4').style.transform = `translate(${x * -0.02}px, ${y * -0.03}px)`;
  document.getElementById('blob5').style.transform = `translate(${x * 0.03}px, ${y * 0.04}px)`;
});