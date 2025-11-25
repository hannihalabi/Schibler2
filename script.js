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
    toast.textContent = "Tack! Vi återkopplar strax med din offert.";
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
