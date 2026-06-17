# Sophos Advisory Services Questionnaire

![Static Badge](https://img.shields.io/badge/Version-3.0-green)
![Static Badge](https://img.shields.io/badge/Demo_Available%3A-Yes-%232006F7)
![Static Badge](https://img.shields.io/badge/Status-Experimental-orange)

A modern, interactive questionnaire for **Sophos Advisory Services** and **Sophos Professional Services**. Helps prospects explore the official catalog, see Service Unit (SU) sizing, capture scoping context, and export a PDF summary for their Sophos account team or partner.

**Live Demo:** [stefanscanteie.github.io/secureworks-imr](https://stefanscanteie.github.io/secureworks-imr/)

---

## Features

- **macOS Settings-style Layout** — Two-panel design with sidebar navigation
- **7 Service Categories** — 49 catalog services (plus Introduction and Contact sections in the sidebar)
- **Service Unit display** — Each service shows catalog SU sizing in a dedicated line, populated from `service-blurbs.js`
- **Service search** — Sidebar field filters services by title, description, SU text, and scoping questions (sections 1–7)
- **Catalog + curated blurbs** — Each service links to the official Sophos catalog page; summaries and SU maps live in `service-blurbs.js`
- **Ask AI (Beta)** — Optional Perplexity search with a prompt grounded in the official catalog (verify in Catalog)
- **Auto-Save** — Form data saved to browser `localStorage`
- **PDF Export** — Download a summary of selected services, SU sizing, and scoping answers
- **Sophos Branding** — Official colors, logo, and Montserrat typography

---

## Quick Start

```bash
# Clone and open
git clone https://github.com/StefanScanteie/secureworks-imr.git
open index.html
```

Or serve locally and open in a browser:

```bash
python3 -m http.server 8765
# http://127.0.0.1:8765/
```

No build process required.

### Smoke test

```bash
python3 smoke_test.py
```

Runs static alignment checks (titles, blurbs, SU map, catalog URLs) and a headless browser pass (SU injection, selections, scoping recommendations, search, catalog links). Requires `playwright` for the browser step:

```bash
pip install playwright
python -m playwright install chromium
```

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Main HTML structure and service blocks |
| `styles.css` | Sophos-branded styles |
| `script.js` | Navigation, catalog links, SU injection, scoping recommendations, PDF export |
| `service-blurbs.js` | Curated descriptions (`IMR_SERVICE_BLURBS`) and SU sizing (`IMR_SERVICE_SU`) per service |
| `smoke_test.py` | Local static + Playwright smoke checks |
| `sophos-logo.svg` | Sophos logo asset |

---

## Brand Colors

Official Sophos colors from [brand.sophos.com](https://brand.sophos.com/identity#colors):

| Color | Hex |
|-------|-----|
| Sophos Blue | `#2006F7` |
| Sophos Dark Blue | `#001A47` |

---

## Service categories (sidebar)

These match the main questionnaire sections (see `index.html`):

1. **Incident Readiness** — IR plans and playbooks
2. **Testing & Validation** — Pen tests, assessments, phishing/vishing drills
3. **Threat Intelligence** — EBS brief, landscape brief, TI support
4. **Workshops & Exercises** — Purple/red team, training, tabletops
5. **Professional Services** — Taegis onboarding, training, Sophos MDR/XDR onboarding (from the [Professional Services catalog](https://docs.sophos.com/servicescatalog/en-us/pages/professional-services.html))
6. **Incident Response** — Emergency IR and custom-scoped engagements
7. **AI Security** — AI LLM Security Assessment

There are also **Introduction** and **Contact Information** entries in the nav (not counted in the seven categories above).

---

## Catalog sources of truth

| Content | URL |
|---------|-----|
| Advisory services | [Sophos Advisory Services](https://docs.sophos.com/servicescatalog/en-us/pages/advisory-services.html) |
| Professional services | [Sophos Professional Services](https://docs.sophos.com/servicescatalog/en-us/pages/professional-services.html) |

To update service names, descriptions, or SU values, edit `service-blurbs.js` (keys must match `.service-title` text in `index.html` exactly) and adjust `serviceDocSlugs` / pro-service paths in `script.js` when catalog URLs change.

---

## Changelog

### v3.0 (Current)

- Synced service list, descriptions, and SU sizing to the official Sophos services catalog
- Added per-service **Service Units** line (`.service-su`) populated from `IMR_SERVICE_SU`
- Replaced Taegis/Secureworks catalog links with Sophos Advisory and Professional Services docs
- Merged phishing drills into a single **Phishing Drills** service
- Updated Professional Services section to catalog-aligned Taegis and Sophos onboarding/training offerings
- Replaced Programs / Technical Assistance sections with **Incident Response** and **AI Security**
- Renamed exercises and training to match current catalog (Purple Team, Red Team, Principles of IR Training, etc.)

### v2.6

- Sidebar service search (filters catalog services; subsection headers hide when empty for the current query)
- Safari/WebKit-focused styling for the search field (no inner “search box” chrome when typing)
- Per-service **Catalog** link, curated summaries in `service-blurbs.js`, and **Ask AI (Beta)** (Perplexity) alongside Interested

### v2.5

- Redesigned to macOS Settings-style two-panel layout
- Sidebar navigation with category icons
- Blue dot indicators for categories with selections
- URL hash navigation support
- Fixed Sophos brand colors
- Various content updates

### v2.0

- Added "Explain with AI" (Perplexity integration)
- Progress tracking and auto-save
- Animations and transitions

### v1.0

- Initial release with all 7 sections
- PDF export and Sophos branding

---

## Resources

- [Sophos Advisory Services Catalog](https://docs.sophos.com/servicescatalog/en-us/pages/advisory-services.html)
- [Sophos Professional Services Catalog](https://docs.sophos.com/servicescatalog/en-us/pages/professional-services.html)
- [Sophos Brand Guidelines](https://brand.sophos.com)

---

## License

**Sophos** and the **Sophos logo** are registered trademarks of Sophos Ltd.

| Resource | License |
|----------|---------|
| [Montserrat Font](https://fonts.google.com/specimen/Montserrat) | SIL Open Font License |
| [Heroicons](https://heroicons.com/) | MIT License |

---

<p align="center">
  Built with ❤️ by Ștefan, with guidance from Claude.
</p>
