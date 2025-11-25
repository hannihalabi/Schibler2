const revealItems = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

revealItems.forEach(item => observer.observe(item));

document.querySelectorAll("[data-tilt]").forEach(card => {
  const strength = 10;
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * strength;
    const ry = ((x - rect.width / 2) / rect.width) * strength;
    card.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg) translateZ(0)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

const form = document.getElementById("quote-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    form.reset();
    const toast = document.createElement("div");
    toast.textContent =
      translations[currentLanguage]?.["contact.form.toast"] ||
      translations.sv["contact.form.toast"];
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "12px 16px";
    toast.style.borderRadius = "12px";
    toast.style.background =
      "linear-gradient(120deg, rgba(255,107,53,0.95), rgba(255,145,71,0.95))";
    toast.style.color = "#0a0f1f";
    toast.style.fontWeight = "700";
    toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
    toast.style.zIndex = "30";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  });
}

const hero = document.querySelector(".hero");
if (hero) {
  hero.addEventListener("pointermove", e => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    hero.style.backgroundPosition = `${percentX * 20}px ${percentY * 20}px`;
  });
}

const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const navClose = document.querySelector(".nav-close");
const mobileLinks = document.querySelectorAll(".mobile-links a");
const langButtons = document.querySelectorAll(".lang-btn");

const translations = {
  sv: {
    "meta.title": "Schibler Electric | Elektriker Stockholm & Uppsala",
    "nav.services": "Tjänster",
    "nav.benefits": "Fördelar",
    "nav.emergency": "Jour 24/7",
    "nav.contact": "Kontakt",
    "nav.phone": "08 50 70 2700",
    "nav.book": "Boka en elektriker",
    "nav.theme": "Byt tema",
    "nav.open": "Öppna meny",
    "nav.close": "Stäng meny",
    "mobile.call": "Ring 08 50 70 2700",
    "mobile.call.aria": "Ring Schibler Electric",
    "hero.tagline": "STOCKHOLM & UPPSALA",
    "hero.title": "Din Fullservicepartner inom El",
    "hero.lead1":
      "Söker du efter en pålitlig elektriker i Stockholm? Vi är ett etablerat elbolag som stolt erbjuder fullservice för alla dina elbehov i Stockholm och Uppsala.",
    "hero.lead2":
      "Med endast certifierade och erfarna elektriker kan vi garantera högkvalitativt arbete där säkerhet och noggrannhet alltid är i fokus.",
    "hero.cta.primary": "Begär offert",
    "hero.cta.secondary": "Samarbeten",
    "hero.panel.label": "Trygga installationer",
    "hero.panel.title": "Smarta hem, elcentraler och laddboxar som bara funkar.",
    "hero.panel.metric1": "Jour",
    "hero.panel.metric2": "Certifierat team",
    "hero.panel.metric3": "Svar",
    "hero.panel.metric3caption": "Inom 15 min",
    "hero.panel.metric4": "Alltid",
    "hero.panel.metric4caption": "Certifierade",
    "logoLoop.label": "Betalningslogotyper",
    "services.eyebrow": "Tjänster",
    "services.title": "Våra tjänster i Stockholm & Uppsala",
    "services.lead1":
      "Letar du efter en pålitlig elektriker för ditt kommande projekt? Oavsett om det är för en nyinstallation, en renovering eller för att byta ut din elcentral, så är vi här för att hjälpa dig.",
    "services.lead2":
      "Behöver du assistans med att installera belysning eller byta ut gamla vägguttag? Vi levererar resultat oavsett uppgiftens omfattning.",
    "services.items.troubleshooting.title": "Felsökning",
    "services.items.troubleshooting.body": "Snabb analys och åtgärd av elproblem i hem och företag.",
    "services.items.installation.title": "Elinstallation",
    "services.items.installation.body": "Säkra installationer vid nybyggnation, renovering eller uppgraderingar.",
    "services.items.maintenance.title": "Underhåll",
    "services.items.maintenance.body": "Planerat underhåll och uppdatering av befintliga anläggningar.",
    "services.items.ev.title": "Laddboxar",
    "services.items.ev.body": "Installation av laddbox för elbil med komplett dokumentation.",
    "services.items.panel.title": "Elcentral",
    "services.items.panel.body": "Byte till modern el-central med säkra säkringslösningar.",
    "services.items.solar.title": "Solceller",
    "services.items.solar.body": "Dimensionering och installation av solpaneler och växelriktare.",
    "services.items.lighting.title": "Belysning",
    "services.items.lighting.body": "Effektfull belysning inne och ute – från design till driftsättning.",
    "services.items.security.title": "Säkerhet & övervakning",
    "services.items.security.body": "Övervakning, brand- och passagesystem med full dokumentation.",
    "services.items.access.title": "Inpasseringssystem",
    "services.items.access.body": "Smart åtkomstkontroll för fastigheter och lokaler.",
    "services.items.homeauto.title": "Hemautomation",
    "services.items.homeauto.body": "Styr belysning, värme och trygghet med smarta hem-lösningar.",
    "services.items.fiber.title": "Fiber och data",
    "services.items.fiber.body": "Snabb, stabil anslutning med dragning och terminering av fiber och nätverk.",
    "services.items.partners.title": "BRF & företag",
    "services.items.partners.body": "Helhetsavtal och driftstöd för bostadsrättsföreningar och kommersiella miljöer.",
    "certs.eyebrow": "Certifierade partners",
    "certs.title": "Vårt arbete backas av ledande certifieringar",
    "certs.lead":
      "Vi kvalitetssäkrar installationerna tillsammans med branschorganisationer och tillsynsmyndigheter.",
    "jour.eyebrow": "EL-Jour 24/7",
    "jour.title": "Vi står alltid till hands för att hjälpa våra kunder",
    "jour.lead": "Allvarligt strömavbrott eller akuta fel? Ring oss direkt så säkrar vi din anläggning.",
    "jour.cta.primary": "Ring akut",
    "jour.cta.secondary": "Kontakt",
    "jour.stat1": "Snabb återkoppling",
    "jour.stat2": "Akut support",
    "jour.stat3": "Elsäkerhet",
    "jour.stat3caption": "Alltid i fokus",
    "benefits.eyebrow": "Fördelar",
    "benefits.title":
      "När du väljer att anlita en elektriker i Stockholm & Uppsala genom oss får du tillgång till en rad fördelar",
    "benefits.items.expertise.title": "Professionell Expertis",
    "benefits.items.expertise.body":
      "Vårt team består av certifierade elektriker med gedigen erfarenhet och utbildning. Vi garanterar professionellt utfört arbete som möter höga standarder.",
    "benefits.items.safety.title": "Säkerhet och Trygghet",
    "benefits.items.safety.body": "Vi prioriterar säkerheten för både dig och ditt projekt. Arbetet utförs på ett säkert och korrekt sätt.",
    "benefits.items.tailored.title": "Skräddarsydda Lösningar",
    "benefits.items.tailored.body": "Vi lyssnar på dina behov för att erbjuda el-lösningar som passar din situation och budget.",
    "benefits.items.payment.title": "Flexibla betalningsalternativ",
    "benefits.items.payment.body": "Enkel och smidig betalning genom Swish, kort, delbetalning eller faktura.",
    "benefits.items.experience.title": "Erfarenhet och kompetens",
    "benefits.items.experience.body":
      "Vi hanterar allt från mindre elreparationer till större projekt med samma noggrannhet.",
    "sidecard.eyebrow": "Allt inom el",
    "sidecard.title": "Allt inom el-installation i Stockholm & Uppsala",
    "sidecard.body":
      "Vi hjälper oavsett storlek, vare sig du är privatperson, BRF eller företag. Allt från att byta el-uttag och strömbrytare till att dra om elen i hela huset eller anläggningen. Arbetet sker alltid tryggt och säkert med dig i fokus.",
    "sidecard.chips.brf": "BRF & nyproduktion",
    "sidecard.chips.smart": "Smart belysning",
    "sidecard.chips.fiber": "Fiber & data",
    "sidecard.chips.panel": "Elcentral",
    "sidecard.chips.solar": "Solceller",
    "sidecard.payments.title": "Enkla och säkra betalningar",
    "sidecard.payments.swish": "Swish",
    "sidecard.payments.card": "Kort",
    "sidecard.payments.klarna": "Klarna",
    "sidecard.payments.installment": "Delbetalning",
    "sidecard.payments.invoice": "Faktura",
    "guide.eyebrow": "Guiden",
    "guide.title": "Så hittar du rätt elektriker",
    "guide.tip1": "Kontrollera att elföretaget är registrerat hos Elsäkerhetsverket.",
    "guide.tip2": "Säkerställ att elföretaget faktiskt får utföra de arbeten du behöver hjälp med.",
    "guide.tip3": "Be om tydlig offert och tidslinje – vi levererar båda.",
    "process.eyebrow": "Process",
    "process.title": "Vår väg till en trygg installation",
    "process.step1.title": "1. Behov & rådgivning",
    "process.step1.body": "Vi tar in förutsättningar och mål – digitalt eller på plats.",
    "process.step2.title": "2. Design & offert",
    "process.step2.body": "Du får en skräddarsydd lösning med kostnadsfri offert.",
    "process.step3.title": "3. Installation",
    "process.step3.body": "Behöriga elektriker installerar med full dokumentation.",
    "process.step4.title": "4. Överlämning",
    "process.step4.body": "Genomgång, egenkontroll och support när du behöver den.",
    "contact.eyebrow": "Kontakt",
    "contact.title": "Behövs hjälp? Ring vårt supportteam dygnet runt",
    "contact.jour.label": "Jour",
    "contact.jour.caption": "Jour 24/7",
    "contact.email.label": "E-post",
    "contact.address.label": "Adress",
    "contact.address.street": "Datavägen 5<br>175 43 Järfälla",
    "contact.address.hours": "Mån–fre 08:00–15:00",
    "contact.cta.mail": "Maila",
    "contact.cta.call": "Ring direkt",
    "contact.form.title": "Snabb offert",
    "contact.form.name": "Namn",
    "contact.form.namePlaceholder": "Ditt namn",
    "contact.form.email": "E-post",
    "contact.form.emailPlaceholder": "din@epost.se",
    "contact.form.service": "Vilken tjänst gäller det?",
    "contact.form.options.default": "Välj alternativ",
    "contact.form.options.troubleshooting": "Felsökning",
    "contact.form.options.installation": "Elinstallation",
    "contact.form.options.ev": "Laddbox",
    "contact.form.options.solar": "Solceller",
    "contact.form.options.panel": "Elcentral",
    "contact.form.options.other": "Annat",
    "contact.form.message": "Beskriv behovet",
    "contact.form.messagePlaceholder": "Kort beskrivning...",
    "contact.form.submit": "Skicka",
    "contact.form.note":
      "Vi återkopplar inom 15 minuter under jour och samma vardag för övriga ärenden.",
    "contact.form.toast": "Tack! Vi återkopplar strax med din offert.",
    "footer.heading": "Schibler Electric",
    "footer.body": "Pålitlig fullservicepartner inom el i Stockholm och Uppsala.",
    "footer.start": "Start",
    "footer.copy": "© 2025 Schibler Electric AB. Alla rättigheter förbehållna.",
    "lang.group": "Språk",
    "lang.sv-label": "Visa svenska",
    "lang.en-label": "Visa engelska"
  },
  en: {
    "meta.title": "Schibler Electric | Electricians Stockholm & Uppsala",
    "nav.services": "Services",
    "nav.benefits": "Benefits",
    "nav.emergency": "Emergency 24/7",
    "nav.contact": "Contact",
    "nav.phone": "Call 08 50 70 2700",
    "nav.book": "Book an electrician",
    "nav.theme": "Toggle theme",
    "nav.open": "Open menu",
    "nav.close": "Close menu",
    "mobile.call": "Call 08 50 70 2700",
    "mobile.call.aria": "Call Schibler Electric",
    "hero.tagline": "STOCKHOLM & UPPSALA",
    "hero.title": "Your full-service electrical partner",
    "hero.lead1":
      "Looking for a reliable electrician in Stockholm? We are an established electrical firm proudly offering full-service support for every electrical need in Stockholm and Uppsala.",
    "hero.lead2":
      "With only certified and experienced electricians, we guarantee high-quality work where safety and precision are always the focus.",
    "hero.cta.primary": "Request a quote",
    "hero.cta.secondary": "Partners",
    "hero.panel.label": "Safe installations",
    "hero.panel.title": "Smart homes, switchboards and EV chargers that just work.",
    "hero.panel.metric1": "On-call",
    "hero.panel.metric2": "Certified team",
    "hero.panel.metric3": "Response",
    "hero.panel.metric3caption": "Within 15 min",
    "hero.panel.metric4": "Always",
    "hero.panel.metric4caption": "Certified",
    "logoLoop.label": "Payment logos",
    "services.eyebrow": "Services",
    "services.title": "Our services in Stockholm & Uppsala",
    "services.lead1":
      "Need a trusted electrician for your next project? From new builds and renovations to upgrading your switchboard, we are here to help.",
    "services.lead2":
      "Need assistance installing lighting or replacing old outlets? We deliver results no matter the scope.",
    "services.items.troubleshooting.title": "Troubleshooting",
    "services.items.troubleshooting.body": "Fast analysis and resolution of electrical issues in homes and businesses.",
    "services.items.installation.title": "Electrical installations",
    "services.items.installation.body": "Safe installations for new builds, renovations, or upgrades.",
    "services.items.maintenance.title": "Maintenance",
    "services.items.maintenance.body": "Planned maintenance and upgrades of existing systems.",
    "services.items.ev.title": "EV chargers",
    "services.items.ev.body": "Charger installation for electric cars with full documentation.",
    "services.items.panel.title": "Switchboards",
    "services.items.panel.body": "Upgrade to a modern panel with safe protection solutions.",
    "services.items.solar.title": "Solar",
    "services.items.solar.body": "Design and installation of solar panels and inverters.",
    "services.items.lighting.title": "Lighting",
    "services.items.lighting.body": "Impactful lighting indoors and outdoors – from design to commissioning.",
    "services.items.security.title": "Security & monitoring",
    "services.items.security.body": "Monitoring, fire and access systems with complete documentation.",
    "services.items.access.title": "Access control",
    "services.items.access.body": "Smart entry control for properties and facilities.",
    "services.items.homeauto.title": "Home automation",
    "services.items.homeauto.body": "Control lighting, heating and safety with smart home solutions.",
    "services.items.fiber.title": "Fiber & data",
    "services.items.fiber.body": "Fast, stable connectivity with fiber and network cabling.",
    "services.items.partners.title": "HOA & commercial",
    "services.items.partners.body": "Comprehensive contracts and operations support for HOAs and businesses.",
    "certs.eyebrow": "Certified partners",
    "certs.title": "Our work is backed by leading certifications",
    "certs.lead": "We ensure quality together with industry organizations and authorities.",
    "jour.eyebrow": "Emergency electricians 24/7",
    "jour.title": "We are always ready to support our customers",
    "jour.lead": "Serious outage or urgent fault? Call us right away and we will secure your system.",
    "jour.cta.primary": "Emergency call",
    "jour.cta.secondary": "Contact",
    "jour.stat1": "Rapid response",
    "jour.stat2": "Emergency support",
    "jour.stat3": "Electrical safety",
    "jour.stat3caption": "Always in focus",
    "benefits.eyebrow": "Benefits",
    "benefits.title": "Choose us and access a full range of electrical advantages",
    "benefits.items.expertise.title": "Professional expertise",
    "benefits.items.expertise.body":
      "Our certified electricians bring deep experience and education. We ensure professional work that meets high standards.",
    "benefits.items.safety.title": "Safety & peace of mind",
    "benefits.items.safety.body": "We prioritize the safety of you and your project. Everything is carried out safely and correctly.",
    "benefits.items.tailored.title": "Tailored solutions",
    "benefits.items.tailored.body": "We listen to your needs to deliver electrical solutions that fit your situation and budget.",
    "benefits.items.payment.title": "Flexible payment options",
    "benefits.items.payment.body": "Easy payments via Swish, card, installments or invoice.",
    "benefits.items.experience.title": "Experience and skill",
    "benefits.items.experience.body": "We handle minor repairs and large projects with equal precision.",
    "sidecard.eyebrow": "All things electrical",
    "sidecard.title": "Complete electrical installations in Stockholm & Uppsala",
    "sidecard.body":
      "We help regardless of size, whether you are a homeowner, HOA or business. From swapping outlets and switches to rewiring entire homes or facilities – always safely with you in focus.",
    "sidecard.chips.brf": "HOA & new builds",
    "sidecard.chips.smart": "Smart lighting",
    "sidecard.chips.fiber": "Fiber & data",
    "sidecard.chips.panel": "Switchboards",
    "sidecard.chips.solar": "Solar",
    "sidecard.payments.title": "Simple and secure payments",
    "sidecard.payments.swish": "Swish",
    "sidecard.payments.card": "Card",
    "sidecard.payments.klarna": "Klarna",
    "sidecard.payments.installment": "Installments",
    "sidecard.payments.invoice": "Invoice",
    "guide.eyebrow": "Guide",
    "guide.title": "How to choose the right electrician",
    "guide.tip1": "Check that the company is registered with the Swedish Electrical Safety Agency.",
    "guide.tip2": "Make sure they are authorized to perform the work you need.",
    "guide.tip3": "Ask for a clear quote and timeline – we deliver both.",
    "process.eyebrow": "Process",
    "process.title": "Our path to a safe installation",
    "process.step1.title": "1. Needs & consultation",
    "process.step1.body": "We review requirements and goals – remotely or on site.",
    "process.step2.title": "2. Design & quote",
    "process.step2.body": "You receive a tailored solution with a free quote.",
    "process.step3.title": "3. Installation",
    "process.step3.body": "Licensed electricians install with full documentation.",
    "process.step4.title": "4. Handover",
    "process.step4.body": "Walkthrough, quality control and support whenever you need it.",
    "contact.eyebrow": "Contact",
    "contact.title": "Need help? Call our support team around the clock",
    "contact.jour.label": "Emergency",
    "contact.jour.caption": "On-call 24/7",
    "contact.email.label": "Email",
    "contact.address.label": "Address",
    "contact.address.street": "Datavägen 5<br>175 43 Järfälla",
    "contact.address.hours": "Mon–Fri 08:00–15:00",
    "contact.cta.mail": "Email us",
    "contact.cta.call": "Call now",
    "contact.form.title": "Quick quote",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "you@email.com",
    "contact.form.service": "Which service do you need?",
    "contact.form.options.default": "Choose option",
    "contact.form.options.troubleshooting": "Troubleshooting",
    "contact.form.options.installation": "Electrical installation",
    "contact.form.options.ev": "EV charger",
    "contact.form.options.solar": "Solar",
    "contact.form.options.panel": "Switchboard",
    "contact.form.options.other": "Other",
    "contact.form.message": "Describe your need",
    "contact.form.messagePlaceholder": "Short description...",
    "contact.form.submit": "Send",
    "contact.form.note": "We respond within 15 minutes for emergencies and the same weekday otherwise.",
    "contact.form.toast": "Thank you! We will return with your quote shortly.",
    "footer.heading": "Schibler Electric",
    "footer.body": "Your trusted full-service electrical partner in Stockholm and Uppsala.",
    "footer.start": "Home",
    "footer.copy": "© 2025 Schibler Electric AB. All rights reserved.",
    "lang.group": "Language",
    "lang.sv-label": "View Swedish content",
    "lang.en-label": "View English content"
  }
};

let currentLanguage = "sv";

const applyLanguage = lang => {
  if (!translations[lang]) return;
  currentLanguage = lang;
  document.documentElement.lang = lang;
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.dataset.i18n;
    const value = translations[lang]?.[key];
    if (value === undefined) return;
    const target = el.dataset.i18nTarget || "text";
    if (target === "text") {
      el.textContent = value;
    } else if (target === "html") {
      el.innerHTML = value;
    } else {
      el.setAttribute(target, value);
    }
  });
  langButtons.forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
  localStorage.setItem("schibler-lang", lang);
};

const storedLanguage = localStorage.getItem("schibler-lang");
applyLanguage(storedLanguage || "sv");

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang || "sv");
  });
});

const setMenuState = open => {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle("active", open);
  document.body.classList.toggle("menu-open", open);
  if (navToggle) navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
};

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => setMenuState(!mobileMenu.classList.contains("active")));
}

if (navClose) {
  navClose.addEventListener("click", () => setMenuState(false));
}

mobileMenu?.addEventListener("click", e => {
  if (e.target === mobileMenu) setMenuState(false);
});

mobileLinks.forEach(link => link.addEventListener("click", () => setMenuState(false)));

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const applyTheme = theme => {
  root.classList.toggle("light", theme === "light");
  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "🏙️" : "🌇";
    themeToggle.dataset.theme = theme;
  }
};

themeToggle?.addEventListener("click", () => {
  const nextTheme = themeToggle.dataset.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
});

const heroVideo = document.querySelector(".hero-video");
if (heroVideo) {
  const sources = (heroVideo.dataset.sources || "")
    .split(",")
    .map(src => src.trim())
    .filter(Boolean);
  let currentVideo = 0;

  const playCurrentVideo = () => {
    if (!sources.length) return;
    heroVideo.src = sources[currentVideo];
    heroVideo.load();
    const playPromise = heroVideo.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {});
    }
  };

  heroVideo.addEventListener("ended", () => {
    currentVideo = (currentVideo + 1) % sources.length;
    playCurrentVideo();
  });

  playCurrentVideo();
}

const heroPanel = document.querySelector(".hero-panel");
const heroSection = document.querySelector(".hero");
const heroPanelPlaceholder = document.getElementById("hero-panel-placeholder");

const relocateHeroPanel = () => {
  if (!heroPanel || !heroSection || !heroPanelPlaceholder) return;
  if (window.innerWidth <= 720) {
    if (heroPanel.parentElement !== heroPanelPlaceholder) {
      heroPanelPlaceholder.appendChild(heroPanel);
    }
  } else if (heroPanel.parentElement !== heroSection) {
    heroSection.appendChild(heroPanel);
  }
};

relocateHeroPanel();
window.addEventListener("resize", relocateHeroPanel);
