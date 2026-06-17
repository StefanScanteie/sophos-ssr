#!/usr/bin/env python3
"""Static + browser smoke tests for the Sophos services questionnaire."""

from __future__ import annotations

import json
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

ROOT = Path(__file__).resolve().parent
PORT = 8765
BASE = f"http://127.0.0.1:{PORT}/"


class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        pass


def start_server() -> ThreadingHTTPServer:
    server = ThreadingHTTPServer(("127.0.0.1", PORT), QuietHandler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server


def fetch(path: str) -> str:
    with urllib.request.urlopen(BASE + path, timeout=10) as resp:
        return resp.read().decode("utf-8")


def parse_js_object(source: str, var_name: str) -> dict[str, str]:
    marker = f"window.{var_name} = "
    start = source.index(marker) + len(marker)
    depth = 0
    end = start
    for i, ch in enumerate(source[start:], start):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    blob = source[start:end]
    pairs = re.findall(r"'((?:\\'|[^'])*)'\s*:\s*\n?\s*'((?:\\'|[^'])*)'", blob, re.S)
    return {k.replace("\\'", "'"): v.replace("\\'", "'") for k, v in pairs}


def run_static_checks() -> list[str]:
    errors: list[str] = []
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    blurbs_js = (ROOT / "service-blurbs.js").read_text(encoding="utf-8")
    script_js = (ROOT / "script.js").read_text(encoding="utf-8")

    titles = re.findall(r'<h3 class="service-title">([^<]+)</h3>', html)
    desc_count = html.count('class="service-description"')
    su_count = html.count('class="service-su"')

    if "docs.taegis.secureworks.com" in html or "docs.taegis.secureworks.com" in script_js:
        errors.append("Legacy Taegis catalog URL still present")

    if desc_count != len(titles):
        errors.append(f"service-description count ({desc_count}) != titles ({len(titles)})")
    if su_count != len(titles):
        errors.append(f"service-su count ({su_count}) != titles ({len(titles)})")

    blurbs = parse_js_object(blurbs_js, "IMR_SERVICE_BLURBS")
    sus = parse_js_object(blurbs_js, "IMR_SERVICE_SU")

    for title in titles:
        if title not in blurbs:
            errors.append(f"Missing blurb for: {title}")
        if title not in sus:
            errors.append(f"Missing SU map for: {title}")

    if "Phishing Drill – Click and Log" in titles or "Phishing Drill – Credential Capture" in titles:
        errors.append("Phishing drills were not merged")
    if "Phishing Drills" not in titles:
        errors.append("Merged Phishing Drills service missing")

    removed = [
        "Vulnerability Assessment",
        "Ransomware Preparedness Program",
        "Technical Assistance Services",
        "Taegis Health Check",
    ]
    for name in removed:
        if name in titles:
            errors.append(f"Removed service still present: {name}")

    required_new = [
        "AI LLM Security Assessment",
        "Emergency Incident Response",
        "Taegis Solution Review – per tenant",
        "Purple Team Exercise",
    ]
    for name in required_new:
        if name not in titles:
            errors.append(f"Expected service missing: {name}")

    if "docs.sophos.com/servicescatalog" not in script_js:
        errors.append("Sophos catalog base URL missing from script.js")

    return errors


def run_browser_checks() -> list[str]:
    errors: list[str] = []
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("  SKIP: Playwright not installed (pip install playwright && python -m playwright install chromium)")
        return []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        console_errors: list[str] = []
        page.on("pageerror", lambda exc: console_errors.append(str(exc)))

        page.goto(BASE, wait_until="networkidle", timeout=30000)
        page.wait_for_function(
            "() => document.querySelectorAll('.service-su').length >= 49",
            timeout=10000,
        )

        if page.title() != "Sophos Advisory Services Questionnaire":
            errors.append(f"Unexpected page title: {page.title()!r}")

        su_sample = page.locator(".service-block .service-su").first.inner_text(timeout=5000)
        if not su_sample.startswith("Service Units:"):
            errors.append(f"SU line not populated: {su_sample!r}")

        # Navigate to Incident Readiness before interacting with service checkboxes
        page.locator('.nav-item[data-section="section-1"]').click()
        page.wait_for_selector("#section-1.active", timeout=5000)

        # Select a service and verify interested state + count
        page.locator('input[name="s1_irp_dev_interested"]').check(force=True)
        page.wait_for_function(
            "() => document.getElementById('selected-count')?.textContent === '1'",
            timeout=5000,
        )

        # Scoping recommendation: no IR plan -> recommends plan development
        page.locator('.nav-item[data-section="scoping"]').click()
        page.wait_for_selector("#scoping.active", timeout=5000)
        page.locator('input[name="scope_ir_plan"][value="none"]').check()
        page.wait_for_function(
            "() => document.querySelector('input[name=\"s1_irp_dev_interested\"]')?.checked === true",
            timeout=5000,
        )

        # AI LLM scoping -> AI service
        page.locator('input[name="scope_ai_llm"][value="production"]').check()
        page.wait_for_function(
            "() => document.querySelector('input[name=\"s7_ai_llm_interested\"]')?.checked === true",
            timeout=5000,
        )

        # Active incident -> Emergency IR; concerned history alone should not require it
        page.locator('input[name="scope_active_incident"][value="yes"]').check()
        page.wait_for_function(
            "() => document.querySelector('input[name=\"s6_emergency_ir_interested\"]')?.checked === true",
            timeout=5000,
        )
        page.locator('input[name="scope_active_incident"][value="no"]').check()
        page.locator('input[name="scope_incidents"][value="concerned"]').check()
        page.wait_for_function(
            "() => document.querySelector('input[name=\"s6_emergency_ir_interested\"]')?.checked === false",
            timeout=5000,
        )

        # Phishing-only awareness -> vishing drill
        page.locator('input[name="scope_awareness"][value="phishing_only"]').check()
        page.wait_for_function(
            "() => document.querySelector('input[name=\"s2_vishing_interested\"]')?.checked === true",
            timeout=5000,
        )

        # Pass 2: stale pentest alone -> external only (no env selected)
        page.evaluate("""() => {
            document.querySelectorAll('input[type="checkbox"][name^="scope_env_"]').forEach(cb => {
                cb.checked = false;
                cb.dispatchEvent(new Event('change', { bubbles: true }));
            });
        }""")
        page.locator('input[name="scope_last_pentest"][value="never"]').check()
        page.wait_for_function(
            """() => {
                const ext = document.querySelector('input[name="s2_ext_pentest_interested"]')?.checked;
                const internal = document.querySelector('input[name="s2_int_pentest_interested"]')?.checked;
                return ext === true && internal !== true;
            }""",
            timeout=5000,
        )

        # Stale pentest + on-prem -> adds internal pentest
        page.locator('input[name="scope_env_onprem"]').check()
        page.wait_for_function(
            "() => document.querySelector('input[name=\"s2_int_pentest_interested\"]')?.checked === true",
            timeout=5000,
        )

        # Search filters to phishing drills
        page.fill("#sidebar-service-search", "phishing drills")
        page.wait_for_function(
            """() => {
                const block = [...document.querySelectorAll('.service-title')]
                  .find(el => el.textContent.trim() === 'Phishing Drills')
                  ?.closest('.service-block');
                return block && !block.classList.contains('search-hidden');
            }""",
            timeout=5000,
        )

        # Catalog link targets Sophos advisory docs
        href = page.locator(".catalog-doc-link").first.get_attribute("href")
        if not href or "docs.sophos.com/servicescatalog" not in href:
            errors.append(f"Unexpected catalog href: {href!r}")

        if console_errors:
            errors.append(f"Page errors: {console_errors}")

        browser.close()

    return errors


def main() -> int:
    print("Starting local server...")
    server = start_server()
    time.sleep(0.3)

    try:
        try:
            fetch("index.html")
        except urllib.error.URLError as exc:
            print(f"FAIL: server did not start: {exc}")
            return 1

        static_errors = run_static_checks()
        browser_errors = run_browser_checks()

        print("\n=== Static checks ===")
        if static_errors:
            for err in static_errors:
                print(f"  FAIL: {err}")
        else:
            print("  PASS: HTML/JS/data alignment")

        print("\n=== Browser checks ===")
        if browser_errors:
            for err in browser_errors:
                print(f"  FAIL: {err}")
        else:
            print("  PASS: UI initialization, SU lines, search, recommendations, catalog links")

        failed = static_errors + browser_errors
        print(f"\n{'SMOKE TEST FAILED' if failed else 'SMOKE TEST PASSED'} ({len(failed)} issue(s))")
        return 1 if failed else 0
    finally:
        server.shutdown()


if __name__ == "__main__":
    sys.exit(main())
