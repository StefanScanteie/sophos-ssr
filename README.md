# Sophos Security Services Questionnaire

![Static Badge](https://img.shields.io/badge/Version-3.2-green)
![Static Badge](https://img.shields.io/badge/Demo_Available%3A-Yes-%232006F7)
![Static Badge](https://img.shields.io/badge/Status-Experimental-orange)

A modern, interactive questionnaire for the **Sophos Security Services Retainer** catalog. Helps prospects explore DFIR & Readiness, Security Testing & Assessment, and Deployment services, see Service Unit (SU) sizing, answer readiness-focused scoping questions, and export a PDF summary for their Sophos account team or partner.

**Live Demo:** [stefanscanteie.github.io/sophos-ssr](https://stefanscanteie.github.io/sophos-ssr/)

---

## Features

- **macOS Settings-style Layout** — Two-panel design with sidebar navigation
- **Guided scoping recommendations** — Eleven readiness question blocks auto-select catalog services; all selections remain editable
- **7 Service Categories** — 89 catalog services (plus Introduction, Scoping Questions, and Contact in the sidebar)
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
git clone https://github.com/StefanScanteie/sophos-ssr.git
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
| `index.html` | Main HTML structure, scoping questions, and service blocks |
| `styles.css` | Sophos-branded styles |
| `script.js` | Navigation, catalog links, SU injection, `buildRecommendations()`, PDF export |
| `service-blurbs.js` | Curated descriptions (`IMR_SERVICE_BLURBS`), SU sizing (`IMR_SERVICE_SU`), and catalog paths (`IMR_SERVICE_CATALOG`) |
| `smoke_test.py` | Local static + Playwright smoke checks |
| `sophos-logo.svg` | Sophos logo asset |

---

## Scoping Questions

The **Scoping Questions** sidebar section drives guided recommendations via `buildRecommendations()` in `script.js`. Answers map to catalog services using common readiness themes (documented response, tested controls, identity security, detection validation, exercised teams).

| Block | Topics covered |
|-------|----------------|
| Incident Response Program | IR plan, playbooks, last exercise, incident commander |
| Testing & Validation History | Pentest cadence, application security gaps |
| Technology Environment | On-prem, cloud, web/API, mobile, IoT, SAP, laptops, Wi‑Fi, physical sites |
| Identity & Access Security | AD / Entra ID, identity assessment cadence, AD attack-path training |
| Detection & Threat Hunting | Proactive hunting, detection validation against priority TTPs |
| Incident History & Risk Concerns | Active incident (Emergency IR), incident history, executive reporting |
| Team Readiness & Exercises | IR maturity, exercise types (tabletop → functional → technical) |
| Human Risk & Security Awareness | Phishing program maturity (credential-capture drills) |
| Threat Intelligence Needs | Landscape brief, EBS, ongoing analyst support |
| Sophos & Taegis Platform | MDR/XDR onboarding, Central posture review, Taegis enablement and training |
| Emerging Technology (AI) | LLM/chatbot deployment plans |

Recommendation logic highlights:

- **Pentest cadence** — Stale or missing pentests recommend External Pentest; environment-specific tests (internal, cloud, web, wireless, etc.) are added only when relevant checkboxes are selected and pentest is stale.
- **Identity** — AD and Entra ID assessments recommend when identity has not been assessed within 12 months. Annual password cracking is a Level 4 retainer entitlement, not a separately listed catalog SKU.
- **Emergency IR** — Recommended only when the user indicates an **active** incident, not for historical or “concerned about ransomware” answers alone.
- **Exercises** — Team maturity and last exercise type drive tabletop, functional, purple team, and red team recommendations without duplicate picks.

To change scoping behaviour, edit the questions in `index.html` (`#scoping`) and the matching rules in `buildRecommendations()`.

---

## Service categories (sidebar)

These match the main questionnaire sections (see `index.html`):

1. **Incident Readiness** — IR plans and playbooks
2. **Testing & Validation** — Pen tests, assessments, credential-capture phishing drills
3. **Threat Intelligence** — EBS info brief and TI support
4. **Workshops & Exercises** — Purple/red team, training, tabletops
5. **Deployment Services** — Fusion/Central implementation, guided onboarding, firewall/network, health checks, and training ([Deployment catalog](https://docs.sophos.com/servicescatalog/en-us/pages/deployment.html))
6. **Incident Response** — Digital Forensics and Incident Response, custom-scoped engagements, and project management
7. **AI Security** — AI LLM Security Assessment

There are also **Introduction**, **Scoping Questions**, and **Contact Information** entries in the nav (not counted in the seven service categories above).

---

## Catalog sources of truth

| Content | URL |
|---------|-----|
| Catalog home / retainer tiers | [Sophos Security Services Retainer](https://docs.sophos.com/servicescatalog/en-us/index.html) |
| DFIR & Readiness | [DFIR & Readiness Services](https://docs.sophos.com/servicescatalog/en-us/pages/dfir.html) |
| Security testing & assessment | [Security Testing & Assessment](https://docs.sophos.com/servicescatalog/en-us/pages/security-testing_assessment-services.html) |
| Deployment | [Sophos Deployment Services](https://docs.sophos.com/servicescatalog/en-us/pages/deployment.html) |

To update service names, descriptions, SU values, or catalog links, edit `service-blurbs.js` (keys must match `.service-title` text in `index.html` exactly). `IMR_SERVICE_CATALOG` holds the official page path or absolute URL.

---

## Brand Colors

Official Sophos colors from [brand.sophos.com](https://brand.sophos.com/identity#colors):

| Color | Hex |
|-------|-----|
| Sophos Blue | `#2006F7` |
| Sophos Dark Blue | `#001A47` |

---

## Changelog

### v3.2 (Current)

- Synced to the September 2026 Security Services Retainer catalog (DFIR & Readiness, Security Testing & Assessment, Deployment)
- Replaced retired Advisory / Professional Services overview links with the current catalog hubs
- Added retainer tier table (Levels 1–4) and expanded Deployment to the current implementation, onboarding, firewall, and training SKUs
- Renamed services to match the catalog (DFIR, Fusion posture assessment, Entra ID, Threat Hunting/Compromise Assessment, credential-capture phishing)
- Folded retired standalone SKUs (vishing, password cracking, device/laptop/medical/SAP tests, threat landscape brief) into custom-scoped or retainer entitlements
- Cloud Penetration Test SU now includes Custom: 26; added Project Management Services

### v3.1

- Expanded **Scoping Questions** to eleven readiness blocks aligned with cybersecurity best practices and the current catalog
- Smarter recommendation logic: pentest and environment gating, identity assessment cadence, active-incident-only Emergency IR, exercise maturity ladder
- Fixed awareness mapping (phishing-only path now recommends Vishing Drill)
- Extended smoke tests for scoping scenarios (AI LLM, active incident, vishing, pentest gating)

### v3.0

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

- [Sophos Security Services Retainer Catalog](https://docs.sophos.com/servicescatalog/en-us/index.html)
- [DFIR & Readiness Services](https://docs.sophos.com/servicescatalog/en-us/pages/dfir.html)
- [Security Testing & Assessment](https://docs.sophos.com/servicescatalog/en-us/pages/security-testing_assessment-services.html)
- [Sophos Deployment Services](https://docs.sophos.com/servicescatalog/en-us/pages/deployment.html)
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
  Built with ❤️ by Ștefan.
</p>
