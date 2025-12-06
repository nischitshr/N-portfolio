// -----------------------------
// Fade-in animation when sections appear in viewport
// -----------------------------
document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".fade-in");
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });
});

// -----------------------------
// Smooth scroll for navbar
// -----------------------------
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });

    // Close mobile nav after clicking a link
    const navList = document.getElementById('primary-navigation');
    const navToggle = document.getElementById('nav-toggle');
    if (navList && navList.classList.contains('open')) {
      navList.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
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
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
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

  // hero texts
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
    // if info has utc_offset and datetime, we rely on datetime. Otherwise use local.
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
        // increment stored datetime by 1 second
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
