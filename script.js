const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

document.body.classList.add("no-motion");
root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");
window.setTimeout(() => document.body.classList.remove("no-motion"), 100);

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

document.addEventListener("pointermove", (event) => {
  root.style.setProperty("--cursor-x", `${event.clientX}px`);
  root.style.setProperty("--cursor-y", `${event.clientY}px`);
});

document.querySelectorAll(".timeline-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".timeline-item");
    const isOpen = item.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter-button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    document.querySelectorAll(".project-card").forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const email = "rucha.khartadkar123@gmail.com";
const note = document.querySelector(".form-note");

document.querySelector("[data-copy-email]").addEventListener("click", async () => {
  await navigator.clipboard.writeText(email);
  note.textContent = "Email copied.";
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = encodeURIComponent(form.get("name"));
  const message = encodeURIComponent(form.get("message"));
  window.location.href = `mailto:${email}?subject=Portfolio enquiry from ${name}&body=${message}`;
  note.textContent = "Opening your email app.";
});
