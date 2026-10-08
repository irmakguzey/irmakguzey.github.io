# irmakguzey.github.io

Personal website: plain static HTML (`index.html`, `style.css`, `script.js`), no build step.
Pushing to `master` deploys via `.github/workflows/deploy.yml` to the `gh-pages` branch.

- **News / Publications / Talks / Service:** edit the lists in `index.html` (copy an existing `<li>` or `.publication` block). Add `class="all-only" hidden` to a publication to show it only under "All".
- **Open-Source Projects:** filled automatically from the repos pinned on github.com/irmakguzey. The deploy workflow fetches them into `pinned.json` on every push and once a day; to change the list, change your pins on GitHub. To use a paper GIF as a repo's thumbnail, add it to `thumbs` in `script.js`.
- **Dog photo:** put it at `assets/img/dogs.jpg` (opened by the "2 amazing dogs" link in the bio).
- **Preview locally:** `python3 -m http.server 8000`, then open http://localhost:8000.

Design adapted from [kevinywu.github.io](https://kevinywu.github.io) with the pinned sidebar from [meganrichards3.github.io](https://meganrichards3.github.io).
