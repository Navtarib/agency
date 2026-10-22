// NavTarib Business Solutions — update these placeholders before launch.
const CONFIG = {
  projectLinks: {
    ecommerce: "https://mart-gravity.vercel.app",
    saas: "https://example.com/saas-project",
    automation: "https://cleaninghome.vercel.app"
  },
  whatsappNumber: "+923152245671", // Replace with your WhatsApp number, digits only.
  contactEmail: "naveedcodezyra@gmail.com" // Replace with your real business email.
};

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
    if (!CONFIG.whatsappNumber || CONFIG.whatsappNumber === "923001234567") {
      alert("Replace CONFIG.whatsappNumber in script.js with your real WhatsApp number first.");
      return;
    }
    window.open(`https://wa.me/${CONFIG.whatsappNumber}`, "_blank", "noopener,noreferrer");
  });
});

// Contact form: opens the visitor's email app with a prepared enquiry.
// For automatic submissions, connect a backend or form provider.
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
    const subject = encodeURIComponent(`Project enquiry — ${data.get("service")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nBudget: ${data.get("budget") || "Not specified"}\n\nProject details:\n${data.get("details")}`
    );
    const status = contactForm.querySelector(".form-status");
    if (!CONFIG.contactEmail || CONFIG.contactEmail === "hello@example.com") {
      status.textContent = "Before launch, update CONFIG.contactEmail in script.js. Your enquiry is ready, but no message has been sent.";
      status.classList.add("status-warning");
      return;
    }
    status.textContent = "Opening your email app with the enquiry prepared…";
    // window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    window.open(`https://wa.me/${CONFIG.whatsappNumber}`, "_blank", "noopener,noreferrer");
  });
}
