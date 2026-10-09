function toggleMore(btn) {
  const wrap = btn.previousElementSibling;
  const collapsed = wrap.classList.toggle("collapsed");
  btn.textContent = collapsed ? "Show more" : "Show less";
}

document.querySelectorAll(".news-wrap.collapsed").forEach(wrap => {
  // drop the "Show more" button on lists short enough to fit when collapsed
  if (wrap.scrollHeight <= wrap.clientHeight + 4) {
    wrap.classList.remove("collapsed");
    wrap.nextElementSibling.hidden = true;
    return;
  }
  // hide the bottom fade once the list is scrolled to its end
  wrap.addEventListener("scroll", () => {
    wrap.classList.toggle("at-end", wrap.scrollTop + wrap.clientHeight >= wrap.scrollHeight - 2);
  }, { passive: true });
});

// light/dark switch; the choice is remembered in this browser (the inline script in <head> applies it on load)
function setThemeButtons(dark) {
  document.querySelectorAll(".theme-toggle").forEach(btn => {
    const label = dark ? "Light mode" : "Dark mode";
    btn.title = label;
    btn.setAttribute("aria-label", label);
    btn.querySelector("i").className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    const span = btn.querySelector("span");
    if (span) span.textContent = label;
  });
}
function toggleTheme() {
  const dark = document.documentElement.dataset.theme !== "dark";
  if (dark) document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  setThemeButtons(dark);
}
setThemeButtons(document.documentElement.dataset.theme === "dark");

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

// open-source projects: render my pinned GitHub repos from pinned.json, which the deploy
// workflow regenerates daily; the cards already in the HTML stay if the file is missing
(function () {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  // repos that have a paper preview on this page; others use GitHub's generated card image
  const thumbs = {
    "facebookresearch/AINA": "aina.gif",
    "ruka-hand/RUKA": "ruka.gif",
    "irmakguzey/object-rewards": "hudor.gif",
    "irmakguzey/see-to-touch": "tavi.gif",
    "irmakguzey/tactile-dexterity": "tdex.gif",
  };
  // project sites for repos whose GitHub page doesn't list one
  const sites = {
    "irmakguzey/tactile-dexterity": "https://tactile-dexterity.github.io/",
  };
  const esc = t => String(t ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function card(r) {
    const full = `${r.owner}/${r.name}`;
    const desc = r.description || "";
    // the project site is the repo homepage, or else the first link in its description
    const site = r.homepage || sites[full] || (desc.match(/https?:\/\/[^\s)]+/) || [""])[0].replace(/[.,]$/, "");
    const cleanDesc = desc
      .replace(/\s*(project\s+)?website:?\s*https?:\/\/\S+/gi, "")
      .replace(/[:\s]*https?:\/\/\S+/g, "")
      .trim();
    const img = thumbs[full]
      ? `assets/img/publication_preview/${thumbs[full]}`
      : `https://opengraph.githubassets.com/1/${full}`;
    const lang = r.language
      ? `<span><span class="lang-dot" style="background:${esc(r.languageColor || "#888")}"></span>${esc(r.language)}</span>`
      : "";
    return `<div class="project-card">
      <a class="project-thumb" href="${esc(r.url)}" target="_blank" rel="noopener"><img src="${esc(img)}" alt="${esc(r.name)}" loading="lazy"></a>
      <div class="project-info">
        <div class="project-title"><a href="${esc(r.url)}" target="_blank" rel="noopener"><span class="project-owner">${esc(r.owner)}/</span>${esc(r.name)}</a></div>
        ${cleanDesc ? `<p class="project-desc">${esc(cleanDesc)}</p>` : ""}
        <div class="project-meta">${lang}<span><i class="fa-regular fa-star"></i> ${r.stars}</span><span><i class="fa-solid fa-code-fork"></i> ${r.forks}</span></div>
        <div class="pub-links"><a href="${esc(r.url)}" target="_blank" rel="noopener">Code</a>${site ? `<a href="${esc(site)}" target="_blank" rel="noopener">Website</a>` : ""}</div>
      </div>
    </div>`;
  }

  fetch("pinned.json", { cache: "no-cache" })
    .then(res => (res.ok ? res.json() : Promise.reject()))
    .then(repos => {
      if (Array.isArray(repos) && repos.length) grid.innerHTML = repos.map(card).join("");
    })
    .catch(() => {});
})();
