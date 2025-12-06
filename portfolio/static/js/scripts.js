// -----------------------------
// Scroll Progress Indicator
// -----------------------------
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);
  }
  
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('scroll-progress').style.width = scrolled + '%';
});

// -----------------------------
// Custom Cursor (Desktop only)
// -----------------------------
if (window.innerWidth > 768) {
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);
  
  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'cursor-outline';
  document.body.appendChild(cursorOutline);
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  // Smooth follow for outline
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  
  // Expand cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '50px';
      cursorOutline.style.height = '50px';
      cursorDot.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '30px';
      cursorOutline.style.height = '30px';
      cursorDot.style.transform = 'scale(1)';
    });
  });
}

// -----------------------------
// Fade-in animation when sections appear in viewport
// -----------------------------
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100); // Stagger animation
    }
  });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.exp-card, .skill-category, .project-card');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Legacy scroll-based fade-in (backup)
document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".fade-in");
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
});

// -----------------------------
// Smooth scroll for navbar
// -----------------------------
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Close mobile nav after clicking a link
      const navList = document.getElementById('primary-navigation');
      const navToggle = document.getElementById('nav-toggle');
      if (navList && navList.classList.contains('open')) {
        navList.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// -----------------------------
// Dark / Light Theme Toggle (switch input)
// -----------------------------
const themeToggleInput = document.getElementById('theme-toggle');
if (themeToggleInput) {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light');
    themeToggleInput.checked = true;
  } else {
    themeToggleInput.checked = false;
  }

  themeToggleInput.addEventListener('change', () => {
    if (themeToggleInput.checked) {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// -----------------------------
// Mobile nav toggle
// -----------------------------
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('primary-navigation');
if (navToggle && navList) {
  // Toggle menu
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  // Close menu when clicking a link
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navList.classList.contains('open') && !navList.contains(e.target) && e.target !== navToggle) {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// -----------------------------
// Contact form — mailto fallback
// -----------------------------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    // Build a mailto link as a fallback so the user can send via their email client
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:nischitshrestha@example.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
}

// -----------------------------
// Language translation (English <-> Nepali)
// -----------------------------
const langToggle = document.getElementById('lang-toggle');
const translations = {
  en: {
    Home: 'Home',
    Projects: 'Projects',
    Skills: 'Skills',
    Experience: 'Experience',
    Contact: 'Contact',
    'Experiencing the Full Stack Developer Life': 'Experiencing the Full Stack Developer Life',
    'Turning ideas into interactive and scalable web solutions.': 'Turning ideas into interactive and scalable web solutions.',
    'Hire Me': 'Hire Me',
    'Theme': 'Theme'
  },
  ne: {
    Home: 'घर',
    Projects: 'प्रोजेक्टहरू',
    Skills: 'कौशल',
    Experience: 'अनुभव',
    Contact: 'सम्पर्क',
    'Experiencing the Full Stack Developer Life': 'फुल स्ट्याक विकासकर्ता जीवन अनुभव गर्दै',
    'Turning ideas into interactive and scalable web solutions.': 'विचारहरूलाई अन्तरक्रियात्मक र स्केलेबल वेब समाधानमा परिणत गर्दछु।',
    'Hire Me': 'हाल्नुहोस्',
    'Theme': 'थिम'
  }
};

// extend translations with page-wide keys
Object.assign(translations.en, {
  'NISCHIT SHRESTHA': 'NISCHIT SHRESTHA',
  "Python Django Intern": 'Python Django Intern',
  'Worked on CRUD applications, Gunaso API, voting systems, and test management.': 'Worked on CRUD applications, Gunaso API, voting systems, and test management.',
  'Backend Intern (NestJS)': 'Backend Intern (NestJS)',
  'Developed scalable RESTful APIs using NestJS with PostgreSQL and MySQL databases.': 'Developed scalable RESTful APIs using NestJS with PostgreSQL and MySQL databases.',
  'Full Stack Intern': 'Full Stack Intern',
  'Created complete solutions using Next.js, React, and Django for interactive web apps.': 'Created complete solutions using Next.js, React, and Django for interactive web apps.',
  'Frontend': 'Frontend',
  'React, Next.js, HTML, CSS, JavaScript': 'React, Next.js, HTML, CSS, JavaScript',
  'Backend': 'Backend',
  'Python, Django, Node.js, NestJS, FastAPI': 'Python, Django, Node.js, NestJS, FastAPI',
  'Database': 'Database',
  'MySQL, PostgreSQL, DBeaver': 'MySQL, PostgreSQL, DBeaver',
  'TypeScript': 'TypeScript',
  'Strong knowledge of NestJS & Next.js ecosystems': 'Strong knowledge of NestJS & Next.js ecosystems',
  'CRUD To-Do List': 'CRUD To-Do List',
  'Blog API': 'Blog API',
  'Voting System': 'Voting System',
  'Gunaso System API': 'Gunaso System API',
  'Test Management API': 'Test Management API',
  'If you\'d like to collaborate, send a message — or use the links below.': "If you'd like to collaborate, send a message — or use the links below.",
  'Name': 'Name',
  'Email': 'Email',
  'Message': 'Message',
  'Send Message': 'Send Message',
  'This form opens your email client as a fallback — no server required.': 'This form opens your email client as a fallback — no server required.',
  "Let's Work Together": "Let's Work Together",
  'Interested in collaborating? Feel free to reach out!': 'Interested in collaborating? Feel free to reach out!',
  'Email Me': 'Email Me',
  'LinkedIn': 'LinkedIn',
  'GitHub': 'GitHub'
});

Object.assign(translations.ne, {
  'NISCHIT SHRESTHA': 'NISCHIT - निश्चित',
  "Python Django Intern": 'पाइथन Django इन्टर्न',
  'Worked on CRUD applications, Gunaso API, voting systems, and test management.': 'CRUD अनुप्रयोगहरू, गुनासो API, भोटिङ प्रणालीहरू, र टेस्ट व्यवस्थापनमा काम गरियो।',
  'Backend Intern (NestJS)': 'ब्याकएन्ड इन्टर्न (NestJS)',
  'Developed scalable RESTful APIs using NestJS with PostgreSQL and MySQL databases.': 'NestJS प्रयोग गरेर PostgreSQL र MySQL डेटाबेसहरूसँग स्केलेबल RESTful APIहरू विकास गरियो।',
  'Full Stack Intern': 'फुल स्ट्याक इन्टर्न',
  'Created complete solutions using Next.js, React, and Django for interactive web apps.': 'Next.js, React, र Django प्रयोग गरेर अन्तरक्रियात्मक वेब एप्सका लागि पूर्ण समाधानहरू बनाए।',
  'Frontend': 'फ्रन्टएन्ड',
  'React, Next.js, HTML, CSS, JavaScript': 'React, Next.js, HTML, CSS, JavaScript',
  'Backend': 'ब्याकएन्ड',
  'Python, Django, Node.js, NestJS, FastAPI': 'Python, Django, Node.js, NestJS, FastAPI',
  'Database': 'डेटाबेस',
  'MySQL, PostgreSQL, DBeaver': 'MySQL, PostgreSQL, DBeaver',
  'TypeScript': 'TypeScript',
  'Strong knowledge of NestJS & Next.js ecosystems': 'NestJS र Next.js इकोसिस्टमको गहिरो ज्ञान',
  'CRUD To-Do List': 'CRUD टु-डु सूची',
  'Blog API': 'ब्लग API',
  'Voting System': 'भोटिङ सिस्टम',
  'Gunaso System API': 'गुनासो सिस्टम API',
  'Test Management API': 'टेस्ट म्यानेजमेन्ट API',
  'If you\'d like to collaborate, send a message — or use the links below.': 'यदि तपाईं सहकार्य गर्न चाहनुहुन्छ भने, सन्देश पठाउनुहोस् — वा तलका लिंकहरू प्रयोग गर्नुहोस्।',
  'Name': 'नाम',
  'Email': 'इमेल',
  'Message': 'सन्देश',
  'Send Message': 'सन्देश पठाउनुहोस्',
  'This form opens your email client as a fallback — no server required.': 'यो फर्मले फालब्याकको रूपमा तपाईंको इमेल क्लाइन्ट खोल्छ — कुनै सर्भर आवश्यक छैन।',
  "Let's Work Together": 'संगै काम गरौं',
  'Interested in collaborating? Feel free to reach out!': 'सहकार्यमा इच्छुक? निस्चिन्त भएर सम्पर्क गर्नुहोस्!',
  'Email Me': 'इमेल पठाउनुहोस्',
  'LinkedIn': 'LinkedIn',
  'GitHub': 'GitHub'
});

function setLanguage(lang) {
  // nav links — use data-key attribute (stable English key) when present
  document.querySelectorAll('#primary-navigation a').forEach(a => {
    const enKey = a.dataset.key || a.textContent.trim();
    if (translations[lang] && translations[lang][enKey]) a.textContent = translations[lang][enKey];
  });

  // translate any element tagged with data-en (page-wide)
  document.querySelectorAll('[data-en]').forEach(el => {
    const key = el.getAttribute('data-en');
    if (!key) return;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    } else if (lang === 'en') {
      el.textContent = key; // restore English key
    }
  });

  // update theme label
  const themeLabel = document.querySelector('.theme-label');
  if (themeLabel) themeLabel.textContent = translations[lang]['Theme'];

  // persist
  localStorage.setItem('lang', lang);
  if (langToggle) {
    langToggle.setAttribute('aria-pressed', String(lang === 'ne'));
    langToggle.textContent = (lang === 'ne') ? 'English' : 'नेपाली';
  }
}

if (langToggle) {
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
  langToggle.addEventListener('click', () => {
    const current = localStorage.getItem('lang') || 'en';
    const next = current === 'en' ? 'ne' : 'en';
    setLanguage(next);
    // re-render date/time localized
    renderDateTime(currentTimeData);
  });
}

// -----------------------------
// Date & Time (worldtimeapi fallback to local)
// -----------------------------
const dateTimeEl = document.getElementById('date-time');
let currentTimeData = null; // store fetched timezone info

function renderDateTime(info) {
  const lang = localStorage.getItem('lang') || 'en';
  try {
    let now = info && info.datetime ? new Date(info.datetime) : new Date();
    const dateFormatter = new Intl.DateTimeFormat(lang === 'ne' ? 'ne-NP' : undefined, { dateStyle: 'full' });
    const timeFormatter = new Intl.DateTimeFormat(lang === 'ne' ? 'ne-NP' : undefined, { timeStyle: 'medium' });
    const timeStr = timeFormatter.format(now);
    const dateStr = dateFormatter.format(now);
    if (dateTimeEl) dateTimeEl.innerHTML = `<span class="time">${timeStr}</span><span class="date">${dateStr}</span>`;
  } catch (e) {
    if (dateTimeEl) dateTimeEl.innerHTML = `<span class="time">${new Date().toLocaleTimeString()}</span><span class="date">${new Date().toLocaleDateString()}</span>`;
  }
}

// fetch from worldtimeapi.org; if it fails gracefully fallback to local Date
fetch('https://worldtimeapi.org/api/ip')
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(data => {
    currentTimeData = data;
    renderDateTime(data);
    // update every second using the base datetime and incremental seconds
    setInterval(() => {
      if (currentTimeData && currentTimeData.datetime) {
        currentTimeData.datetime = new Date(new Date(currentTimeData.datetime).getTime() + 1000).toISOString();
      }
      renderDateTime(currentTimeData);
    }, 1000);
  })
  .catch(() => {
    currentTimeData = null;
    renderDateTime(null);
    setInterval(() => renderDateTime(null), 1000);
  });

// -----------------------------
// Typing Animation for Hero Section
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const heroSubtitle = document.querySelector('.hero-text h2');
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    function typeChar() {
      if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      }
    }
    
    // Start typing after initial animations
    setTimeout(typeChar, 1200);
  }
});

// -----------------------------
// Parallax Effect on Scroll
// -----------------------------
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-text');
  
  parallaxElements.forEach((el, index) => {
    const speed = index === 0 ? 0.3 : 0.5;
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// -----------------------------
// Add Tilt Effect to Cards
// -----------------------------
document.querySelectorAll('.exp-card, .skill-category, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// -----------------------------
// Tech Galaxy Background
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    const galaxyContainer = document.getElementById('tech-background');
    if (!galaxyContainer) return;

    const icons = [
        'devicon-python-plain',
        'devicon-django-plain',
        'devicon-java-plain',
        'devicon-html5-plain',
        'devicon-css3-plain',
        'devicon-javascript-plain',
        'devicon-typescript-plain',
        'devicon-nestjs-plain',
        'devicon-nextjs-plain',
        'devicon-react-original',
        'devicon-kaggle-plain',
        'devicon-cplusplus-plain',
        'devicon-jupyter-plain',
        'devicon-rstudio-plain',
        'devicon-git-plain',
        'devicon-docker-plain',
        'devicon-postgresql-plain'
    ];

    const iconCount = 30; // Number of floating icons

    for (let i = 0; i < iconCount; i++) {
        const iconClass = icons[Math.floor(Math.random() * icons.length)];
        const el = document.createElement('i');
        
        // Add classes
        el.classList.add('galaxy-icon', iconClass);
        // Sometimes use colored version for subtle variety? No, stick to white/monochrome for background subtle
        // el.classList.add('colored'); 

        // Random Properties
        const left = Math.random() * 100; // 0-100vw
        const duration = 15 + Math.random() * 25; // 15-40s duration
        const delay = -Math.random() * 40; // Start instantly at random positions
        const size = 20 + Math.random() * 40; // 20-60px size

        el.style.left = `${left}%`;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
        el.style.fontSize = `${size}px`;
        
        el.style.opacity = (0.1 + Math.random() * 0.15).toString();

        galaxyContainer.appendChild(el);
    }
});

// -----------------------------
// Profile Slider Logic
// -----------------------------
let currentSlideIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.profile-slider-container .profile-img');
    if (slides.length <= 1) return;

    // Current Slide
    const currentSlide = slides[currentSlideIndex];
    
    // Hide current
    currentSlide.classList.remove('active-slide');
    currentSlide.style.opacity = '0';
    // Use timeout to set display:none after transition (0.5s match CSS)
    setTimeout(() => {
         if (!currentSlide.classList.contains('active-slide')) {
             currentSlide.style.display = 'none';
         }
    }, 500);

    // Update Index
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

    // Show Next
    const nextSlide = slides[currentSlideIndex];
    // Must be block before opacity change
    nextSlide.style.display = 'block'; 
    
    // Small delay to trigger transition
    setTimeout(() => {
        nextSlide.classList.add('active-slide');
        nextSlide.style.opacity = '1';
    }, 20);
}

// Ensure first slide is set up correctly on load (Standard HTML does this, but JS reinforcement)
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.profile-slider-container .profile-img');
    if (slides.length > 0) {
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.style.display = 'block';
                slide.style.opacity = '1';
                slide.classList.add('active-slide');
            } else {
                slide.style.display = 'none';
                slide.style.opacity = '0';
            }
        });
    }
});


// -----------------------------
// Experience Modal Logic
// -----------------------------
function openExpModal(btn) {
    const wrapper = btn.closest('.exp-desc-wrapper');
    const textEl = wrapper.querySelector('.exp-desc-text');
    // Allow data-full or just read text if not present, but template has data-full
    const fullText = textEl.getAttribute('data-full') || textEl.innerText;
    
    const card = btn.closest('.exp-card');
    const title = card.querySelector('h3').innerText;
    
    // Get company (styled p tag)
    // We try to find the p with font-weight:600 style, might be fragile if styles move to CSS classes
    // But currently it's inline style in template
    let company = '';
    const companyEl = card.querySelector('p[style*="font-weight:600"]');
    if (companyEl) company = companyEl.innerText;

    let date = '';
    const dateEl = card.querySelector('p[style*="font-size:0.85rem"]');
    if (dateEl) date = dateEl.innerText;
    
    const modal = document.getElementById('exp-modal');
    document.getElementById('modal-title').innerText = title;
    
    const subtitle = [company, date].filter(Boolean).join(' | ');
    document.getElementById('modal-company').innerText = subtitle;
    
    document.getElementById('modal-desc').innerText = fullText;
    
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; 
}

function closeExpModal() {
    const modal = document.getElementById('exp-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Close on click outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('exp-modal');
    if (e.target === modal) {
        closeExpModal();
    }
});

// Attach to window to ensure global access from HTML onclick
window.openExpModal = openExpModal;
window.closeExpModal = closeExpModal;


