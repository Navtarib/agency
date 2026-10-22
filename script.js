// NavTarib Business Solutions — update these placeholders before launch.
const CONFIG = {
  projectLinks: {
    ecommerce: "https://mart-gravity.vercel.app",
    saas: "https://example.com/saas-project",
    automation: "https://cleaninghome.vercel.app"
  },
  whatsappNumber: "+923152245671" // Replace with your WhatsApp number, including country code.
};

function getWhatsappUrl(message = "") {
  const number = CONFIG.whatsappNumber.replace(/\D/g, "");
  if (!number || number === "923001234567") return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }));
}

// Scroll reveal animation, with a graceful fallback for reduced motion.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Portfolio cards use editable URLs from CONFIG.
document.querySelectorAll("[data-project]").forEach(card => {
  card.addEventListener("click", event => {
    const url = CONFIG.projectLinks[card.dataset.project];
    if (!url || url.includes("example.com")) {
      event.preventDefault();
      alert("Add your real project URL in script.js → CONFIG.projectLinks.");
      return;
    }
    card.href = url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  });
});

// WhatsApp contact placeholder.
document.querySelectorAll('[data-link="whatsapp"]').forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const url = getWhatsappUrl();
    if (!url) {
      alert("Replace CONFIG.whatsappNumber in script.js with your real WhatsApp number first.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  });
});

// Contact form: opens WhatsApp with the visitor's enquiry prepared for sending.
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get("service");
  const serviceSelect = contactForm.querySelector('[name="service"]');
  if (serviceParam && serviceSelect) {
    const match = [...serviceSelect.options].find(option => option.text.toLowerCase().includes(serviceParam.toLowerCase()));
    if (match) serviceSelect.value = match.value;
  }
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const message =
      `Project enquiry\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nBudget: ${data.get("budget") || "Not specified"}\n\nProject details:\n${data.get("details")}`;
    const status = contactForm.querySelector(".form-status");
    const url = getWhatsappUrl(message);
    if (!url) {
      status.textContent = "Before launch, update CONFIG.whatsappNumber in script.js. Your enquiry is ready, but no message has been sent.";
      status.classList.add("status-warning");
      return;
    }
    status.textContent = "Opening WhatsApp with your enquiry prepared. Review and send it there.";
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
