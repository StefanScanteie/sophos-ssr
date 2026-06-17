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
    initializeScopingRecommendations();
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

const CATALOG_ADVISORY_BASE =
    'https://docs.sophos.com/servicescatalog/en-us/pages/advisory-services/';
const CATALOG_ADVISORY_OVERVIEW =
    'https://docs.sophos.com/servicescatalog/en-us/pages/advisory-services.html';
const CATALOG_PROFESSIONAL_OVERVIEW =
    'https://docs.sophos.com/servicescatalog/en-us/pages/professional-services.html';

function getCatalogDocUrl(serviceName, docSlug) {
    const external = serviceExternalUrls[serviceName];
    if (external) return external;

    const proPath = serviceProDocPaths[serviceName];
    if (proPath) {
        return `https://docs.sophos.com/servicescatalog/en-us/${proPath}`;
    }

    const slug = docSlug || serviceDocSlugs[serviceName];
    if (slug) {
        return `${CATALOG_ADVISORY_BASE}${slug}.html`;
    }

    return serviceCatalogOverview[serviceName] || CATALOG_ADVISORY_OVERVIEW;
}

const serviceCatalogOverview = {
    'Taegis Guided Onboarding (Enablement: Core)': CATALOG_PROFESSIONAL_OVERVIEW,
    'Taegis Guided Onboarding - Enterprise (Enablement: Plus)': CATALOG_PROFESSIONAL_OVERVIEW,
    'Taegis Administrator Training': CATALOG_PROFESSIONAL_OVERVIEW,
    'Taegis Analyst Training': CATALOG_PROFESSIONAL_OVERVIEW,
    'Taegis Advanced Search Training': CATALOG_PROFESSIONAL_OVERVIEW,
    'Taegis Custom Parser Training': CATALOG_PROFESSIONAL_OVERVIEW,
    'Taegis Scenario Based Training (1 Scenario)': CATALOG_PROFESSIONAL_OVERVIEW,
    'Custom-scoped Engagement': CATALOG_ADVISORY_OVERVIEW,
};

const serviceExternalUrls = {
    'Emergency Incident Response':
        'https://www.sophos.com/products/incident-response-services/emergency-response',
};

const serviceProDocPaths = {
    'Taegis Solution Review – per tenant': 'pages/Pro-services/PRPDIA-taegis-solution-review.html',
    'Taegis Native Response Playbook configuration': 'pages/Pro-services/PRAOAA-add-on-svcs.html',
    'Sophos Central Security posture assessment': 'pages/Pro-services/PCAZ3C-security-posture-assessment.html',
    'Sophos MDR guided onboarding': 'pages/Pro-services/PRPE0A-guided-onboarding.html',
    'Sophos Hybrid XDR guided onboarding': 'pages/Pro-services/hybrid-xdr-guided-onboarding.html',
};

// Service name to advisory documentation slug mapping
const serviceDocSlugs = {
    'Incident Response Plan Development': 'incident-response-plan-development',
    'Incident Response Plan Review': 'incident-response-plan-review',
    'Incident Response Playbook Development': 'incident_response_playbook_development',
    'AI LLM Security Assessment': 'ai-llm-security-assessment',
    'Custom Application Security Assessment': 'custom-application-security-assessment',
    'Mobile Application Security Assessment': 'mobile-application-security-assessment',
    'Secure Code Analysis': 'secure-code-analysis',
    'Web Application Security Assessment': 'web-application-security-assessment',
    'Web API Test': 'web-service-test',
    'Cloud Penetration Test': 'cloud-penetration-test',
    'External Penetration Test': 'external-penetration-test',
    'Internal Penetration Test': 'internal-penetration-test',
    'Physical Security Testing': 'physical_security_testing',
    'Wireless Network Penetration Test': 'wireless-network-penetration-test',
    'Device Penetration Test': 'device-penetration-test',
    'Laptop Penetration Test': 'laptop-penetration-test',
    'Medical Device Test': 'medical-device-test',
    'SAP Penetration Test': 'sap-penetration-test',
    'Phishing Drills': 'phishing_drill',
    'Vishing Drill': 'vishing_drill',
    'Active Directory Security Assessment': 'active_directory_security_assessment',
    'Microsoft Entra ID Security Assessment': 'microsoft_entra_id_security_assessment',
    'Password Cracking and Analysis Assessment': 'password-analysis',
    'Threat Hunting Assessment': 'threat-hunting-assessment',
    'Enterprise Brand Surveillance (EBS) Information Brief': 'ebs_info_brief',
    'Threat Landscape Brief': 'threat-brief',
    'Threat Intelligence Support Services': 'threat_intelligence_support_services',
    'Purple Team Exercise': 'collaborative_adversary_exercise',
    'Red Team Exercise - Intel Led': 'adversary_emulation_exercise',
    'Red Team Exercise - Full Spectrum': 'adversary_simulation_exercise',
    'Functional Exercise': 'functional-exercise',
    'Principles of Incident Response Training': 'principles-of-incident-response-training',
    'Incident Commander Training': 'incident-commander-training',
    'Attacking and Defending Active Directory': 'attacking_and_defending_active_directory',
    'Incident Response Tabletop Exercise': 'tabletop-exercise',
};

function initializeServiceHelpActions() {
    const blurbs =
        typeof window.IMR_SERVICE_BLURBS === 'object' && window.IMR_SERVICE_BLURBS !== null
            ? window.IMR_SERVICE_BLURBS
            : {};
    const serviceUnits =
        typeof window.IMR_SERVICE_SU === 'object' && window.IMR_SERVICE_SU !== null
            ? window.IMR_SERVICE_SU
            : {};

    document.querySelectorAll('.service-block').forEach(block => {
        const header = block.querySelector('.service-header');
        const titleEl = block.querySelector('.service-title');
        const checkbox = block.querySelector('.interested-checkbox');
        const desc = block.querySelector('.service-description');
        const suEl = block.querySelector('.service-su');

        if (!header || !titleEl || !checkbox) return;

        const serviceName = titleEl.textContent.trim();
        const docSlug = serviceDocSlugs[serviceName];

        if (desc && Object.prototype.hasOwnProperty.call(blurbs, serviceName)) {
            desc.textContent = blurbs[serviceName];
        }

        if (suEl && Object.prototype.hasOwnProperty.call(serviceUnits, serviceName)) {
            suEl.textContent = `Service Units: ${serviceUnits[serviceName]}`;
        }

        const catalogUrl = getCatalogDocUrl(serviceName, docSlug);
        const isProfessional = Boolean(serviceProDocPaths[serviceName] || serviceCatalogOverview[serviceName]);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'service-actions';

        const catalogLink = document.createElement('a');
        catalogLink.className = 'catalog-doc-link';
        catalogLink.href = catalogUrl;
        catalogLink.target = '_blank';
        catalogLink.rel = 'noopener noreferrer';
        catalogLink.setAttribute(
            'aria-label',
            `Official Sophos catalog: ${serviceName}`
        );
        catalogLink.title = isProfessional
            ? 'Open the official Sophos Professional Services catalog page for this service.'
            : 'Open the official Sophos Advisory Services catalog page for this service.';
        catalogLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg><span>Catalog</span>`;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'explain-btn';
        btn.title =
            'Opens Perplexity in a new tab with a prompt grounded in the official catalog. Unofficial summary; verify details in Catalog.';
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg><span>Ask AI (Beta)</span>`;
        btn.onclick = () => explainWithAI(serviceName, docSlug, isProfessional);

        actionsDiv.appendChild(catalogLink);
        actionsDiv.appendChild(btn);
        actionsDiv.appendChild(checkbox);
        header.appendChild(actionsDiv);
    });
}

function explainWithAI(serviceName, docSlug, isProfessional) {
    const baseUrl = 'https://www.perplexity.ai/search?q=';
    const docUrl1 = getCatalogDocUrl(serviceName, docSlug);
    const docUrl2 = isProfessional ? CATALOG_PROFESSIONAL_OVERVIEW : CATALOG_ADVISORY_OVERVIEW;

    const prompt = `Using ONLY the official Sophos documentation at ${docUrl1} and ${docUrl2} - Explain the "${serviceName}" service from the Sophos Security Services catalog: 1. What is this service? 2. What is included? 3. Who should consider this? 4. Service Units required 5. Prerequisites or requirements. Keep it professional but easy to understand.`;

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
    const su = block.querySelector('.service-su')?.textContent?.trim();
    if (title) parts.push(title);
    if (desc) parts.push(desc);
    if (su) parts.push(su);
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

    // Navigate to the first section with hits when: not on a catalog section at all,
    // or on a catalog section that now has zero matches.
    if (q) {
        const active = document.querySelector('.content-section.active');
        const activeId = active?.id || '';
        const isOnCatalogSection = activeId.startsWith('section-');
        const visibleHere = isOnCatalogSection
            ? active.querySelectorAll('.service-block:not(.search-hidden)').length
            : 0;

        if (!isOnCatalogSection || visibleHere === 0) {
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

// ==================== SCOPING RECOMMENDATIONS ====================

let scopingRecommended = new Set();

function initializeScopingRecommendations() {
    const scopingSection = document.getElementById('scoping');
    if (!scopingSection) return;
    scopingSection.addEventListener('change', applyRecommendations);
}

function buildRecommendations() {
    const form = document.getElementById('questionnaire-form');
    const rec = new Set();

    const radio = name => form.querySelector(`[name="${name}"]:checked`)?.value;
    const checked = name => !!form.querySelector(`[name="${name}"]`)?.checked;

    // IR Plan
    const irPlan = radio('scope_ir_plan');
    if (irPlan === 'none' || irPlan === 'partial') rec.add('s1_irp_dev_interested');
    if (irPlan === 'outdated') rec.add('s1_irp_review_interested');

    // Playbooks
    const playbooks = radio('scope_playbooks');
    if (playbooks === 'none' || playbooks === 'partial') rec.add('s1_playbook_interested');

    // Last pentest
    const pentest = radio('scope_last_pentest');
    if (pentest === 'never') {
        rec.add('s2_ext_pentest_interested');
        rec.add('s2_int_pentest_interested');
        rec.add('s2_webapp_interested');
    } else if (pentest === 'over2y') {
        rec.add('s2_ext_pentest_interested');
        rec.add('s2_webapp_interested');
    }

    // Environment checkboxes
    if (checked('scope_env_onprem')) {
        rec.add('s2_int_pentest_interested');
        rec.add('s2_ad_interested');
    }
    if (checked('scope_env_cloud')) rec.add('s2_cloud_pentest_interested');
    if (checked('scope_env_web')) {
        rec.add('s2_webapp_interested');
        rec.add('s2_api_interested');
    }
    if (checked('scope_env_mobile')) rec.add('s2_mobile_app_interested');
    if (checked('scope_env_iot'))    rec.add('s2_device_pentest_interested');
    if (checked('scope_env_sap'))    rec.add('s2_sap_interested');

    // Identity infrastructure
    const identity = radio('scope_identity');
    if (identity === 'ad'   || identity === 'both') rec.add('s2_ad_interested');
    if (identity === 'entraid' || identity === 'both') rec.add('s2_entra_interested');

    // Incident history
    const incidents = radio('scope_incidents');
    if (incidents === 'ransomware') {
        rec.add('s6_emergency_ir_interested');
        rec.add('s2_threat_hunt_interested');
        rec.add('s4_tabletop_interested');
    } else if (incidents === 'other') {
        rec.add('s2_threat_hunt_interested');
        rec.add('s4_tabletop_interested');
    } else if (incidents === 'concerned') {
        rec.add('s6_emergency_ir_interested');
        rec.add('s4_tabletop_interested');
    }

    // Team readiness
    const team = radio('scope_team');
    if (team === 'none') {
        rec.add('s4_ir_training_interested');
        rec.add('s4_incident_commander_interested');
        rec.add('s4_tabletop_interested');
    } else if (team === 'some') {
        rec.add('s4_tabletop_interested');
    } else if (team === 'advanced') {
        rec.add('s4_adv_emul_interested');
        rec.add('s4_collab_adv_interested');
    } else if (team === 'mature') {
        rec.add('s4_adv_sim_interested');
    }

    // Security awareness
    const awareness = radio('scope_awareness');
    if (awareness === 'none' || awareness === 'basic') rec.add('s2_phish_drill_interested');
    else if (awareness === 'advanced') rec.add('s2_vishing_interested');

    // Identity infrastructure — AD training for AD users
    if (identity === 'ad' || identity === 'both') rec.add('s4_ad_training_interested');

    // Threat intelligence
    const intel = radio('scope_intel');
    if (intel === 'sector')  rec.add('s3_landscape_interested');
    else if (intel === 'brand')   rec.add('s3_ebs_interested');
    else if (intel === 'ongoing') rec.add('s3_ti_support_interested');

    // Taegis platform
    const taegis = radio('scope_taegis');
    if (taegis === 'new') {
        rec.add('s5_taegis_core_interested');
        rec.add('s5_taegis_analyst_training_interested');
    } else if (taegis === 'existing_optimize') {
        rec.add('s5_taegis_review_interested');
        rec.add('s5_taegis_plus_interested');
    } else if (taegis === 'existing_integrate') {
        rec.add('s5_taegis_playbook_interested');
        rec.add('s5_taegis_parser_training_interested');
    }

    return rec;
}

function applyRecommendations() {
    const newRec = buildRecommendations();
    const form = document.getElementById('questionnaire-form');

    // Un-check services that were previously recommended but no longer are
    scopingRecommended.forEach(name => {
        if (!newRec.has(name)) {
            const cb = form.querySelector(`[name="${name}"]`);
            if (cb) {
                cb.checked = false;
                cb.closest('.service-block')?.classList.remove('interested');
            }
        }
    });

    // Check newly recommended services
    newRec.forEach(name => {
        const cb = form.querySelector(`[name="${name}"]`);
        if (cb) {
            cb.checked = true;
            cb.closest('.service-block')?.classList.add('interested');
        }
    });

    scopingRecommended = newRec;

    updateProgressStats();
    updateNavIndicators();
    triggerAutoSave();
    updateRecommendationBanner(newRec.size);
}

function updateRecommendationBanner(count) {
    const banner  = document.getElementById('scoping-recommendation-banner');
    const countEl = document.getElementById('scoping-recommendation-count');
    if (!banner || !countEl) return;

    if (count === 0) {
        banner.style.display = 'none';
    } else {
        banner.style.display = 'block';
        countEl.textContent = `${count} service${count === 1 ? '' : 's'} recommended based on your answers. Review and adjust using the sidebar.`;
    }
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
                    const serviceBlock = element.closest('.service-block:not(.scoping-question-block)');
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

        // Sync recommendation set from restored answers (no checkbox toggling)
        scopingRecommended = buildRecommendations();
        updateRecommendationBanner(scopingRecommended.size);

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
        const serviceSu = service.querySelector('.service-su')?.textContent?.trim() || '';

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
                ${serviceSu ? `<div class="pdf-service-su">${escapeHtml(serviceSu)}</div>` : ''}
                ${answersHTML}
            </div>`;
    });

    // Create print window
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <title>Sophos Advisory Services Questionnaire</title>
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
        .pdf-service-su {
            font-size: 11px;
            color: #2006F7;
            font-weight: 600;
            margin: -4px 0 8px 0;
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
        <div class="pdf-subtitle">Sophos Advisory Services Questionnaire</div>
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
        This export is a convenience summary for discussion only. It is not a commitment to purchase or schedule services. Service Units, scope, initiation, and delivery terms are governed by the official Sophos services catalog and your agreement with Sophos or your partner. Treat the contents as sensitive if they describe your environment or incidents.
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
        scopingRecommended = new Set();
        updateRecommendationBanner(0);
        showSection('intro', false);
        const indicator = document.getElementById('autosave-indicator');
        if (indicator) indicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Cleared';
    }
}
