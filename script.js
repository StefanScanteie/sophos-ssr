/**
 * Sophos IMR Advisory Services Questionnaire
 * JavaScript - macOS Settings-style Layout
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebarNavigation();
    initializeServiceHelpActions();
    initializeInterestedCheckboxes();
    initializeProgressStats();
    initializeAutoSave();
    initializeServiceSearch();
    loadSavedData();
});

// ==================== SIDEBAR NAVIGATION ====================

function initializeSidebarNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.section) {
            showSection(e.state.section, false);
        }
    });
}

function showSection(sectionId, pushState = true) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.scrollTop = 0;
    }
    
    // Update nav state
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('data-section') === sectionId) {
            nav.classList.add('active');
        }
    });
    
    // Update URL hash
    if (pushState) {
        history.pushState({ section: sectionId }, '', '#' + sectionId);
    }
}

// ==================== CATALOG LINK + BLURBS + ASK AI (BETA) ====================

function getCatalogDocUrl(docSlug) {
    return `https://docs.taegis.secureworks.com/services/incident-response/imr-services-catalog/${docSlug}/`;
}

// Service name to documentation slug mapping
const serviceDocSlugs = {
    'Incident Response Plan Development': 'incident-response-plan-development',
    'Incident Response Plan Review': 'incident-response-plan-review',
    'Incident Response Playbook Development': 'incident_response_playbook_development',
    'Custom Application Security Assessment': 'custom-application-security-assessment',
    'Mobile Application Security Assessment': 'mobile-application-security-assessment',
    'Secure Code Analysis': 'secure-code-analysis',
    'Web Application Security Assessment': 'web-application-security-assessment',
    'Web Service/API Test': 'web-service-test',
    'Cloud Penetration Test': 'cloud-penetration-test',
    'External Penetration Test': 'external-penetration-test',
    'Internal Penetration Test': 'internal-penetration-test',
    'Physical Security Testing': 'physical_security_testing',
    'Wireless Network Penetration Test': 'wireless-network-penetration-test',
    'Device Penetration Test': 'device-penetration-test',
    'Laptop Penetration Test': 'laptop-penetration-test',
    'Medical Device Test': 'medical-device-test',
    'SAP Penetration Test': 'sap-penetration-test',
    'Phishing Drill – Click and Log': 'phishing_drill',
    'Phishing Drill – Credential Capture': 'phishing_drill',
    'Vishing Drill': 'vishing_drill',
    'Active Directory Security Assessment': 'active_directory_security_assessment',
    'Entra ID Security Assessment': 'microsoft_entra_id_security_assessment',
    'Password Cracking and Analysis Assessment': 'password-analysis',
    'Threat Hunting Assessment': 'threat-hunting-assessment',
    'Vulnerability Assessment': 'vulnerability_assessment',
    'EBS Info Brief': 'ebs_info_brief',
    'Threat Landscape Brief': 'threat-brief',
    'Threat Intelligence Support Services': 'threat_intelligence_support_services',
    'Collaborative Adversary Exercise': 'collaborative_adversary_exercise',
    'Adversary Emulation Exercise': 'adversary_emulation_exercise',
    'Adversary Simulation Exercise': 'adversary_simulation_exercise',
    'Functional Exercise': 'functional-exercise',
    'Incident Response Fundamentals Training': 'incident-response-fundamentals-training',
    'Incident Response Tabletop Exercise': 'tabletop-exercise',
    'Taegis Health Check': 'taegis_health_check',
    'Taegis Enablement: Core': 'taegis_enablement_core',
    'Taegis Enablement: Plus': 'taegis_enablement_plus',
    'Taegis Training': 'taegis_training',
    'Data Collection & Integration': 'data_collection_and_integration',
    'Customization Services': 'taegis_customizations',
    'Ransomware Preparedness Program': 'imr-services-catalog-overview',
    'Technical Assistance Services': 'technical-assistance-services'
};

function initializeServiceHelpActions() {
    const blurbs =
        typeof window.IMR_SERVICE_BLURBS === 'object' && window.IMR_SERVICE_BLURBS !== null
            ? window.IMR_SERVICE_BLURBS
            : {};

    document.querySelectorAll('.service-block').forEach(block => {
        const header = block.querySelector('.service-header');
        const titleEl = block.querySelector('.service-title');
        const checkbox = block.querySelector('.interested-checkbox');
        const desc = block.querySelector('.service-description');

        if (!header || !titleEl || !checkbox) return;

        const serviceName = titleEl.textContent.trim();
        const docSlug = serviceDocSlugs[serviceName] || 'imr-services-catalog-overview';

        if (desc && Object.prototype.hasOwnProperty.call(blurbs, serviceName)) {
            desc.textContent = blurbs[serviceName];
        }

        const catalogUrl = getCatalogDocUrl(docSlug);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'service-actions';

        const catalogLink = document.createElement('a');
        catalogLink.className = 'catalog-doc-link';
        catalogLink.href = catalogUrl;
        catalogLink.target = '_blank';
        catalogLink.rel = 'noopener noreferrer';
        catalogLink.setAttribute(
            'aria-label',
            `Official IMR catalog: ${serviceName}`
        );
        catalogLink.title = 'Open the official Taegis catalog page for this service.';
        catalogLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg><span>Catalog</span>`;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'explain-btn';
        btn.title =
            'Opens Perplexity in a new tab with a prompt grounded in the official catalog. Unofficial summary; verify details in Catalog.';
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg><span>Ask AI (Beta)</span>`;
        btn.onclick = () => explainWithAI(serviceName, docSlug);

        actionsDiv.appendChild(catalogLink);
        actionsDiv.appendChild(btn);
        actionsDiv.appendChild(checkbox);
        header.appendChild(actionsDiv);
    });
}

function explainWithAI(serviceName, docSlug) {
    const baseUrl = 'https://www.perplexity.ai/search?q=';
    const docUrl1 = getCatalogDocUrl(docSlug);
    const docUrl2 = 'https://docs.taegis.secureworks.com/services/incident-response/imr-services-catalog/imr-services-catalog-overview/';
    
    const prompt = `Using ONLY the official Secureworks documentation at ${docUrl1} and ${docUrl2} - Explain the "${serviceName}" service from the Secureworks Incident Management Retainer (IMR) catalog: 1. What is this service? 2. What is included? 3. Who should consider this? 4. Service Units required 5. Prerequisites or requirements. Keep it professional but easy to understand.`;
    
    const encodedPrompt = encodeURIComponent(prompt);
    window.open(baseUrl + encodedPrompt, '_blank');
}

// ==================== INTERESTED CHECKBOXES ====================

function initializeInterestedCheckboxes() {
    const checkboxes = document.querySelectorAll('.interested-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const serviceBlock = this.closest('.service-block');
            if (serviceBlock) {
                serviceBlock.classList.toggle('interested', this.checked);
            }
            updateProgressStats();
            updateNavIndicators();
            triggerAutoSave();
        });
    });
}

// ==================== PROGRESS STATS ====================

function initializeProgressStats() {
    updateProgressStats();
    updateNavIndicators();
    document.getElementById('questionnaire-form')?.addEventListener('change', () => {
        updateProgressStats();
        updateNavIndicators();
    });
}

function updateProgressStats() {
    const selectedServices = document.querySelectorAll('.service-block.interested').length;
    
    const selectedEl = document.getElementById('selected-count');
    
    if (selectedEl) {
        const oldValue = parseInt(selectedEl.textContent) || 0;
        selectedEl.textContent = selectedServices;
        if (oldValue !== selectedServices) {
            selectedEl.classList.remove('pulse');
            void selectedEl.offsetWidth; // Trigger reflow
            selectedEl.classList.add('pulse');
        }
    }
}

// ==================== SIDEBAR SERVICE SEARCH ====================

function initializeServiceSearch() {
    const input = document.getElementById('sidebar-service-search');
    if (!input) return;

    input.addEventListener('input', function() {
        applyServiceSearch(this.value.trim());
    });
}

function getServiceSearchHaystack(block) {
    const parts = [];
    const title = block.querySelector('.service-title')?.textContent?.trim();
    const desc = block.querySelector('.service-description')?.textContent?.trim();
    if (title) parts.push(title);
    if (desc) parts.push(desc);
    block.querySelectorAll('.scoping-title, .question').forEach(el => {
        parts.push(el.textContent || '');
    });
    block.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const ph = el.getAttribute('placeholder');
        if (ph) parts.push(ph);
    });
    return parts.join(' ').toLowerCase();
}

function applyServiceSearch(rawQuery) {
    const q = rawQuery.toLowerCase();
    const catalogBlocks = document.querySelectorAll(
        '#questionnaire-form .content-section[id^="section-"] .service-block'
    );

    catalogBlocks.forEach(block => {
        if (!q) {
            block.classList.remove('search-hidden');
            return;
        }
        const haystack = getServiceSearchHaystack(block);
        block.classList.toggle('search-hidden', !haystack.includes(q));
    });

    document.querySelectorAll('#questionnaire-form .content-section[id^="section-"] .subsection').forEach(sub => {
        if (!q) {
            sub.classList.remove('search-hidden');
            return;
        }
        let el = sub.nextElementSibling;
        let hasVisible = false;
        while (el && !el.classList.contains('subsection')) {
            if (el.classList.contains('service-block') && !el.classList.contains('search-hidden')) {
                hasVisible = true;
                break;
            }
            el = el.nextElementSibling;
        }
        sub.classList.toggle('search-hidden', !hasVisible);
    });

    // If the user is on a catalog section with zero matches, jump to the first section that has hits
    // (sidebar search is global; staying on e.g. Incident Readiness for "pen" looked like a broken filter).
    if (q) {
        const active = document.querySelector('.content-section.active');
        const activeId = active?.id || '';
        if (activeId.startsWith('section-')) {
            const visibleHere = active.querySelectorAll('.service-block:not(.search-hidden)').length;
            if (visibleHere === 0) {
                for (let i = 1; i <= 7; i++) {
                    const sec = document.getElementById(`section-${i}`);
                    if (sec?.querySelector('.service-block:not(.search-hidden)')) {
                        showSection(`section-${i}`);
                        break;
                    }
                }
            }
        }
    }
}

function updateNavIndicators() {
    // Check each section for selections and update nav indicators
    const sections = {
        'section-1': document.querySelectorAll('#section-1 .service-block.interested').length,
        'section-2': document.querySelectorAll('#section-2 .service-block.interested').length,
        'section-3': document.querySelectorAll('#section-3 .service-block.interested').length,
        'section-4': document.querySelectorAll('#section-4 .service-block.interested').length,
        'section-5': document.querySelectorAll('#section-5 .service-block.interested').length,
        'section-6': document.querySelectorAll('#section-6 .service-block.interested').length,
        'section-7': document.querySelectorAll('#section-7 .service-block.interested').length,
    };
    
    Object.keys(sections).forEach(sectionId => {
        const navItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
        if (navItem) {
            if (sections[sectionId] > 0) {
                navItem.classList.add('has-selections');
            } else {
                navItem.classList.remove('has-selections');
            }
        }
    });
}

// ==================== AUTO-SAVE ====================

let autoSaveTimeout;

function initializeAutoSave() {
    const form = document.getElementById('questionnaire-form');
    if (!form) return;
    form.addEventListener('input', triggerAutoSave);
    form.addEventListener('change', triggerAutoSave);
}

function triggerAutoSave() {
    clearTimeout(autoSaveTimeout);
    showSaveIndicator('saving');
    autoSaveTimeout = setTimeout(() => {
        saveFormData();
        showSaveIndicator('saved');
    }, 1000);
}

function showSaveIndicator(state) {
    const indicator = document.getElementById('autosave-indicator');
    if (!indicator) return;
    
    if (state === 'saving') {
        indicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="animation: spin 1s linear infinite;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> Saving...';
        indicator.classList.add('saving');
    } else {
        indicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Saved';
        indicator.classList.remove('saving');
    }
}

function saveFormData() {
    const form = document.getElementById('questionnaire-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => { data[cb.name] = cb.checked; });
    
    // Save current section
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
        data['_activeSection'] = activeSection.id;
    }
    
    localStorage.setItem('questionnaire_data', JSON.stringify(data));
    localStorage.setItem('questionnaire_saved_at', new Date().toISOString());
}

function loadSavedData() {
    const savedData = localStorage.getItem('questionnaire_data');
    if (!savedData) return;
    
    try {
        const data = JSON.parse(savedData);
        const form = document.getElementById('questionnaire-form');
        
        Object.keys(data).forEach(key => {
            if (key === '_activeSection') {
                // Restore active section
                showSection(data[key], false);
                return;
            }
            
            const element = form.querySelector(`[name="${key}"]`);
            if (!element) return;
            
            if (element.type === 'checkbox') {
                element.checked = data[key] === true;
                if (element.checked) {
                    const serviceBlock = element.closest('.service-block');
                    if (serviceBlock) serviceBlock.classList.add('interested');
                }
            } else if (element.type === 'radio') {
                if (element.value === data[key]) element.checked = true;
            } else {
                element.value = data[key];
            }
        });
        
        updateProgressStats();
        updateNavIndicators();
        
        const indicator = document.getElementById('autosave-indicator');
        if (indicator) {
            indicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Restored';
        }
    } catch (e) {
        console.error('Error loading saved data:', e);
    }
    
    // Handle URL hash on page load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        showSection(sectionId, false);
    }
}

// ==================== PDF DOWNLOAD ====================

function downloadPDF() {
    const interestedServices = document.querySelectorAll('.service-block.interested');
    if (interestedServices.length === 0) {
        alert('Please mark at least one service as "Interested" before downloading the PDF.');
        return;
    }

    // Get contact info
    const name = document.querySelector('[name="contact_name"]')?.value?.trim() || '';
    const company = document.querySelector('[name="contact_company"]')?.value?.trim() || '';
    const email = document.querySelector('[name="contact_email"]')?.value?.trim() || '';
    const phone = document.querySelector('[name="contact_phone"]')?.value?.trim() || '';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Build print content
    let servicesHTML = '';
    let currentSection = '';

    interestedServices.forEach(service => {
        const section = service.closest('.content-section');
        const sectionTitle = section?.querySelector('.content-header h1')?.textContent?.trim() || '';
        const serviceTitle = service.querySelector('.service-title')?.textContent?.trim() || 'Service';

        if (sectionTitle && sectionTitle !== currentSection) {
            currentSection = sectionTitle;
            servicesHTML += `<div class="pdf-section-header">${escapeHtml(sectionTitle)}</div>`;
        }

        const answers = [];
        service.querySelectorAll('.form-group').forEach(group => {
            const question = group.querySelector('.question')?.textContent?.trim();
            if (!question) return;

            const textInput = group.querySelector('input[type="text"], input[type="email"], input[type="tel"], textarea');
            if (textInput && textInput.value?.trim()) {
                answers.push({ q: question, a: textInput.value.trim() });
                return;
            }

            const checkedRadio = group.querySelector('input[type="radio"]:checked');
            if (checkedRadio) {
                const label = checkedRadio.closest('.radio-item')?.querySelector('span')?.textContent?.trim() || checkedRadio.value;
                answers.push({ q: question, a: label });
            }
        });

        let answersHTML = '';
        if (answers.length > 0) {
            answers.forEach(a => {
                answersHTML += `
                    <div class="pdf-answer">
                        <div class="pdf-question">${escapeHtml(a.q)}</div>
                        <div class="pdf-response">${escapeHtml(a.a)}</div>
                    </div>`;
            });
        } else {
            answersHTML = '<div class="pdf-no-details">No details provided</div>';
        }

        servicesHTML += `
            <div class="pdf-service">
                <div class="pdf-service-title">✓ ${escapeHtml(serviceTitle)}</div>
                ${answersHTML}
            </div>`;
    });

    // Create print window
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <title>Sophos IMR Advisory Services Questionnaire</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        body {
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        .pdf-header {
            text-align: center;
            border-bottom: 4px solid #2006F7;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }
        .pdf-logo {
            margin-bottom: 10px;
        }
        .pdf-logo svg {
            height: 28px;
            width: auto;
        }
        .pdf-subtitle {
            font-size: 16px;
            color: #444;
        }
        .pdf-contact {
            background: #EEEAFF;
            border-left: 4px solid #2006F7;
            padding: 15px 20px;
            margin-bottom: 25px;
        }
        .pdf-contact-title {
            font-weight: bold;
            color: #2006F7;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
        }
        .pdf-contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            font-size: 13px;
        }
        .pdf-contact-grid b { color: #2006F7; }
        .pdf-services-header {
            font-size: 14px;
            font-weight: bold;
            color: #2006F7;
            margin-bottom: 15px;
        }
        .pdf-section-header {
            background: #2006F7;
            color: white;
            padding: 10px 15px;
            font-weight: bold;
            font-size: 13px;
            margin-top: 15px;
        }
        .pdf-service {
            border: 1px solid #ddd;
            border-top: none;
            padding: 12px 15px;
            background: #fafbfc;
        }
        .pdf-service-title {
            font-weight: bold;
            color: #001A47;
            font-size: 13px;
            margin-bottom: 8px;
        }
        .pdf-answer {
            margin-left: 15px;
            margin-bottom: 8px;
        }
        .pdf-question {
            font-size: 11px;
            color: #666;
        }
        .pdf-response {
            font-size: 12px;
            color: #222;
            padding-left: 10px;
            border-left: 2px solid #2006F7;
            margin-top: 2px;
        }
        .pdf-no-details {
            margin-left: 15px;
            font-size: 11px;
            color: #999;
            font-style: italic;
        }
        .pdf-disclaimer {
            margin-top: 25px;
            padding: 12px 14px;
            background: #f8f7fc;
            border: 1px solid #e0dce8;
            border-radius: 6px;
            font-size: 10px;
            line-height: 1.55;
            color: #555;
        }
        .pdf-footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 10px;
            color: #888;
        }
        @media print {
            body { padding: 20px; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="pdf-header">
        <div class="pdf-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="180" height="20" viewBox="0 0 600 65">
                <path fill="#2006f7" d="M4.48,4.35v28.3c0,4.8,2.6,9.21,6.79,11.54l29.46,16.35.19.11,29.6-16.45c4.19-2.33,6.79-6.74,6.79-11.53V4.35H4.48ZM51.89,37.88c-2.2,1.22-4.67,1.86-7.18,1.86l-27.32-.08,15.32-8.54c1.48-.83,3.14-1.26,4.84-1.27l28.92-.09-14.57,8.13ZM51.47,23.9c-1.48.83-3.14,1.26-4.84,1.27l-28.92.09,14.57-8.13c2.2-1.22,4.67-1.86,7.18-1.86l27.32.08-15.32,8.54Z"/>
                <path fill="#001a47" d="M578.8,25h-46.42c-2.12,0-3.84-1.72-3.84-3.84,0-2.12,1.72-3.84,3.84-3.84h60.4s0-12.88,0-12.88h-60.4c-9.22,0-16.72,7.5-16.72,16.72,0,9.22,7.5,16.72,16.72,16.72h46.42c2.12,0,3.84,1.75,3.84,3.86,0,2.12-1.72,3.77-3.84,3.77h-60.53v12.88h60.53c9.22,0,16.72-7.42,16.72-16.64,0-9.22-7.5-16.74-16.72-16.74Z"/>
                <path fill="#001a47" d="M228.84,4.47h-25.15c-14.89,0-27.01,12.12-27.01,27.01,0,14.89,12.12,27.01,27.01,27.01h25.15c14.89,0,27.01-12.12,27.01-27.01,0-14.89-12.12-27.01-27.01-27.01ZM228.84,45.6h-25.15c-7.78,0-14.11-6.33-14.11-14.11,0-7.78,6.33-14.11,14.11-14.11h25.15c7.78,0,14.11,6.33,14.11,14.11,0,7.78-6.33,14.11-14.11,14.11Z"/>
                <path fill="#001a47" d="M483.22,4.47h-25.15c-14.89,0-27.01,12.12-27.01,27.01,0,14.89,12.12,27.01,27.01,27.01h25.15c14.89,0,27.01-12.12,27.01-27.01,0-14.89-12.12-27.01-27.01-27.01ZM483.22,45.6h-25.15c-7.78,0-14.11-6.33-14.11-14.11,0-7.78,6.33-14.11,14.11-14.11h25.15c7.78,0,14.11,6.33,14.11,14.11,0,7.78-6.33,14.11-14.11,14.11Z"/>
                <polygon fill="#001a47" points="410.52 4.53 410.52 24.96 360.14 24.96 360.14 4.53 347.24 4.53 347.24 58.42 360.14 58.42 360.14 37.86 410.52 37.86 410.52 58.42 423.42 58.42 423.42 4.53 410.52 4.53"/>
                <path fill="#001a47" d="M155.11,25h-46.42c-2.12,0-3.84-1.72-3.84-3.84,0-2.12,1.72-3.84,3.84-3.84h60.4V4.44h-60.4c-9.22,0-16.72,7.5-16.72,16.72,0,9.22,7.5,16.72,16.72,16.72h46.42c2.12,0,3.84,1.75,3.84,3.86s-1.72,3.77-3.84,3.77h-60.53v12.88s60.53,0,60.53,0c9.22,0,16.72-7.42,16.72-16.64,0-9.22-7.5-16.74-16.72-16.74Z"/>
                <path fill="#001a47" d="M319.66,4.53h-43.49s-5.2,0-5.2,0h-7.7s0,53.89,0,53.89h12.9s0-14.44,0-14.44h43.49c10.88,0,19.73-8.85,19.73-19.73,0-10.88-8.85-19.73-19.73-19.73ZM319.66,31.08h-43.49s0-13.66,0-13.66h43.49c3.77,0,6.83,3.06,6.83,6.83,0,3.77-3.06,6.83-6.83,6.83Z"/>
            </svg>
        </div>
        <div class="pdf-subtitle">IMR Advisory Services Questionnaire</div>
    </div>

    <div class="pdf-contact">
        <div class="pdf-contact-title">Contact Information</div>
        <div class="pdf-contact-grid">
            ${name ? `<div><b>Name:</b> ${escapeHtml(name)}</div>` : ''}
            ${company ? `<div><b>Company:</b> ${escapeHtml(company)}</div>` : ''}
            ${email ? `<div><b>Email:</b> ${escapeHtml(email)}</div>` : ''}
            ${phone ? `<div><b>Phone:</b> ${escapeHtml(phone)}</div>` : ''}
        </div>
    </div>

    <div class="pdf-services-header">SELECTED SERVICES (${interestedServices.length})</div>
    
    ${servicesHTML}

    <div class="pdf-disclaimer">
        This export is a convenience summary for discussion only. It is not a commitment to purchase or schedule services. Service Units, scope, initiation (including ticketing, email, or partner paths), and delivery terms are governed by the official IMR services catalog and your agreement with Secureworks or your partner. Treat the contents as sensitive if they describe your environment or incidents.
    </div>

    <div class="pdf-footer">
        Generated on ${date} | © ${new Date().getFullYear()} Sophos Ltd. All rights reserved.
    </div>

    <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="background: #2006F7; color: white; border: none; padding: 12px 30px; font-size: 14px; border-radius: 6px; cursor: pointer; font-weight: bold;">
            📄 Save as PDF
        </button>
        <p style="margin-top: 10px; color: #666; font-size: 12px;">Click the button above, then choose "Save as PDF" as the destination</p>
    </div>
</body>
</html>
    `);
    
    printWindow.document.close();
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

function clearForm() {
    if (confirm('Clear all responses? This will also clear saved data.')) {
        document.getElementById('questionnaire-form').reset();
        document.querySelectorAll('.service-block.interested').forEach(b => b.classList.remove('interested'));
        localStorage.removeItem('questionnaire_data');
        localStorage.removeItem('questionnaire_saved_at');
        updateProgressStats();
        updateNavIndicators();
        showSection('intro', false);
        const indicator = document.getElementById('autosave-indicator');
        if (indicator) indicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Cleared';
    }
}
