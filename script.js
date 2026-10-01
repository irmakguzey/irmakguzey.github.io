function toggleMore(btn) {
  const wrap = btn.previousElementSibling;
  const collapsed = wrap.classList.toggle("collapsed");
  btn.textContent = collapsed ? "Show more" : "Show less";
}

// drop the "Show more" button on lists short enough to fit when collapsed
document.querySelectorAll(".news-wrap.collapsed").forEach(wrap => {
  if (wrap.scrollHeight <= wrap.clientHeight + 4) {
    wrap.classList.remove("collapsed");
    wrap.nextElementSibling.hidden = true;
  }
});

function toggleBib(btn) {
  const pre = btn.closest(".pub-body").querySelector(".bibtex");
  pre.hidden = !pre.hidden;
}

function showPubs(mode) {
  const all = mode === "all";
  document.querySelectorAll(".all-only").forEach(el => { el.hidden = !all; });
  document.getElementById("btn-selected").classList.toggle("active", !all);
  document.getElementById("btn-all").classList.toggle("active", all);
}

// mobile top bar: show once the header (sidebar) has scrolled out of view
(function () {
  const nav = document.getElementById("sticky-nav");
  const sentinel = document.getElementById("nav-sentinel");
  if (!nav || !sentinel) return;
  new IntersectionObserver(([entry]) => {
    nav.classList.toggle("visible", !entry.isIntersecting && entry.boundingClientRect.top < 0);
  }).observe(sentinel);
})();

// highlight the sidebar link of the section currently in view
(function () {
  const links = [...document.querySelectorAll(".sidebar-sections a")];
  const sections = links.map(a => document.querySelector(a.getAttribute("href")));
  function update() {
    // the active section is the last one whose top has passed 30% of the viewport
    const line = window.innerHeight * 0.3;
    let active = -1;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) active = i; });
    // at the very bottom, short last sections never reach the line
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) active = sections.length - 1;
    links.forEach((a, i) => a.classList.toggle("active", i === active));
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// click-to-open lightbox for any element with data-lightbox="<image src>"
(function () {
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (!triggers.length) return;
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = "<img alt=\"\">";
  document.body.appendChild(overlay);
  const big = overlay.querySelector("img");

  function open(el) {
    big.src = el.dataset.lightbox;
    big.alt = el.dataset.alt || "";
    overlay.classList.add("open");
  }
  function close() { overlay.classList.remove("open"); }

  triggers.forEach(el => el.addEventListener("click", () => open(el)));
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();
