# Valentine (static site)

This is a single-file, static Valentine webpage with local assets in `assets/`.

You can deploy this easily so anyone with a link can open it.

Deployment options

1) GitHub Pages (recommended)

- Create a new GitHub repository and push the contents of this folder.
  Ensure `index.html` and the `assets/` folder are at the repository root.

- This repository includes a GitHub Actions workflow that will automatically publish the repository root to GitHub Pages when you push to the `main` branch.

- Steps (example):

```bash
# from the project folder
git init
git add .
git commit -m "Initial site"
# create a remote repo on GitHub then:
git remote add origin git@github.com:<your-username>/<repo>.git
git branch -M main
git push -u origin main
```

After the push the workflow `.github/workflows/gh-pages.yml` will run and publish the site to the `gh-pages` branch; GitHub Pages will then serve the site at `https://<your-username>.github.io/<repo>/` (it can take a few minutes).

If you prefer, you can also enable Pages via the repository settings (choose the `gh-pages` branch or the `main` branch and `/ (root)` depending on your preference).

2) Netlify / Vercel (drag & drop or connect repo)

- Drag-and-drop: both Netlify and Vercel let you drag a folder (containing `index.html` and `assets/`) in their dashboard to publish instantly.
- Connect repo: connect the GitHub repo and set the root as the publish directory. Both providers will give you a link you can share.

3) Manual local hosting (for testing)

If you just want to test locally and serve the page over HTTP (recommended over opening via `file://`):

```bash
# Python 3
python -m http.server 8000
# open http://localhost:8000/index.html

# or using Node.js (if you have `serve` installed)
npx serve .
```

Notes & troubleshooting

- Keep `assets/` at the same level as `index.html` so all images load correctly.
- The page references some external audio files hosted on third-party URLs; these are optional but will load when available.
- If you want a custom domain, add a `CNAME` file and configure DNS; GitHub/Netlify docs explain the steps.

If you'd like, I can:
- create the GitHub Actions workflow (already added),
- help you initialize a Git repo and provide the exact commands for pushing to GitHub,
- or prepare a Netlify/Vercel deployment-specific config.

Tell me which provider you prefer and I will guide you or generate additional automation.
