# Secureworks IMR Advisory Services Questionnaire

![Static Badge](https://img.shields.io/badge/Version-2.6-green)
![Static Badge](https://img.shields.io/badge/Demo_Available%3A-Yes-%232006F7)
![Static Badge](https://img.shields.io/badge/Status-Experimental-orange)


A modern, interactive questionnaire for Secureworks Incident Management Retainer (IMR) Advisory Services. Helps prospects explore the official catalog, capture scoping context, and export a PDF summary for their Secureworks or partner account team.

**Live Demo:** [stefanscanteie.github.io/secureworks-imr](https://stefanscanteie.github.io/secureworks-imr/)

---

## Features

- **macOS Settings-style Layout** — Two-panel design with sidebar navigation
- **7 Service Categories** — 40+ catalog services (plus Introduction and Contact sections in the sidebar)
- **Service search** — Sidebar field filters services by title and description (sections 1–7)
- **Catalog + curated blurbs** — Each service links to the official Taegis catalog page; one-line summaries live in `service-blurbs.js`
- **Ask AI (Beta)** — Optional Perplexity search with a prompt grounded in the official catalog (verify in Catalog)
- **Auto-Save** — Form data saved to browser `localStorage`
- **PDF Export** — Download a summary of selected services and scoping answers
- **Sophos Branding** — Official colors, logo, and Montserrat typography

---

## Quick Start

```bash
# Clone and open
git clone https://github.com/StefanScanteie/secureworks-imr.git
open index.html
```

Or simply open `index.html` in any modern browser. No build process required.

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Main HTML structure |
| `styles.css` | Sophos-branded styles |
| `script.js` | JavaScript functionality |
| `service-blurbs.js` | Curated one-line descriptions per catalog service (edit to update UI copy) |
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

1. **Incident Readiness**
2. **Testing & Validation**
3. **Threat Intelligence**
4. **Workshops & Exercises**
5. **Professional Services**
6. **Programs**
7. **Technical Assistance**

There are also **Introduction** and **Contact Information** entries in the nav (not counted in the seven categories above).

---

## Changelog

### v2.6 (Current)

- Sidebar service search (filters catalog services; subsection headers hide when empty for the current query)
- Safari/WebKit-focused styling for the search field (no inner “search box” chrome when typing)
- Per-service **Catalog** link to Taegis docs, curated summaries in `service-blurbs.js`, and **Ask AI (Beta)** (Perplexity) alongside Interested

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

- [IMR Services Catalog](https://docs.taegis.secureworks.com/services/incident-response/imr-services-catalog/imr-services-catalog-overview/)
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
