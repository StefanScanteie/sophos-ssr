/**
 * Curated summaries and Service Unit (SU) sizing aligned with the Sophos services catalog.
 * Keys must match `.service-title` text in index.html exactly.
 */
window.IMR_SERVICE_BLURBS = {
    'Incident Response Plan Development':
        'Develop strategic and tactical IR plan materials, integrate security policy, and build response capability with Sophos guidance.',
    'Incident Response Plan Review':
        'Structured review of your existing IR plan for gaps, clarity, and fit to current threats and regulations.',
    'Incident Response Playbook Development':
        'Build scenario-specific playbooks with incident-specific guidance your teams can follow under pressure.',
    'AI LLM Security Assessment':
        'Evaluate your AI chatbot or LLM for vulnerabilities in model behavior, integrations, and backend systems using Sophos application-testing methodology.',
    'Custom Application Security Assessment':
        'Assess thick-client and associated systems for security and compliance risks across the application and its interactions.',
    'Mobile Application Security Assessment':
        'Evaluate mobile app security for each in-scope operating system (public store, MDM, or internal distribution).',
    'Secure Code Analysis':
        'Static analysis combining manual review and automated scanning to find security flaws in application source code.',
    'Web Application Security Assessment':
        'Test web applications for injection, cross-site scripting, broken access control, and other common risks using Sophos methodology.',
    'Web API Test':
        'Analyze APIs and web services for authentication flaws, data exposure, and unsafe configuration patterns.',
    'Cloud Penetration Test':
        'Simulate real-world cloud attack scenarios to find misconfigurations and dangerous privilege paths in your cloud environment.',
    'External Penetration Test':
        'Discover and demonstrate perimeter weaknesses an external adversary could use to reach internal networks or resources.',
    'Internal Penetration Test':
        'Assume internal network access; test lateral movement, privilege escalation, and segmentation effectiveness.',
    'Physical Security Testing':
        'Controlled evaluation of physical controls such as access control, tailgating resistance, and visitor handling.',
    'Wireless Network Penetration Test':
        'Test Wi-Fi at one physical location (or one building floor) including corporate and guest segments where in scope.',
    'Device Penetration Test':
        'Security testing for dedicated hardware such as IoT, embedded, or OT-adjacent devices.',
    'Laptop Penetration Test':
        'Assess standard corporate laptop builds for realistic loss, theft, or break-and-inspect scenarios.',
    'Medical Device Test':
        'Security evaluation for connected medical devices in clinical, hospital, or laboratory settings.',
    'SAP Penetration Test':
        'SAP-specific configuration, authorization, and classic attack paths reviewed under a fixed catalog scope.',
    'Phishing Drills':
        'Simulated phishing campaigns (click-and-log or credential capture) to measure awareness, reporting behavior, and detection response.',
    'Vishing Drill':
        'Voice-based social engineering exercises for targeted teams or high-risk roles.',
    'Active Directory Security Assessment':
        'Understand how attackers exploit on-premises Active Directory configuration using Sophos Incident Response insights.',
    'Microsoft Entra ID Security Assessment':
        'Understand how attackers exploit Microsoft Entra ID configuration to achieve their objectives.',
    'Password Cracking and Analysis Assessment':
        'Authorized analysis of password hashes you supply to quantify weak, reused, or easily guessed patterns.',
    'Threat Hunting Assessment':
        'Review endpoint, network, and log telemetry to identify indicators and behaviors of compromise using Sophos hunting methodology.',
    'Enterprise Brand Surveillance (EBS) Information Brief':
        'Tailored intelligence on brand-related threats and fraud relevant to your digital footprint and enterprise brand surveillance program.',
    'Threat Landscape Brief':
        'Executive brief on current threats and adversary TTPs from Sophos threat intelligence and research.',
    'Threat Intelligence Support Services':
        'Ongoing access to Sophos threat intelligence support aligned to your intelligence requirements.',
    'Purple Team Exercise':
        'Live-fire exercise: defend and hunt in your network with real-time collaboration with the Sophos Adversary Group.',
    'Red Team Exercise - Intel Led':
        'Threat-intelligence-led exercise simulating a defined actor known to target organizations like yours.',
    'Red Team Exercise - Full Spectrum':
        'Full-spectrum exercise against an unknown sophisticated actor with objectives tailored to your organization.',
    'Functional Exercise':
        'Timed, multi-role readiness exercise where IR team members practice roles and communications without live keyboard attacks.',
    'Principles of Incident Response Training':
        'Instructor-led training for IT and first-line security staff on essential incident response components.',
    'Incident Commander Training':
        'Prepare leaders to manage high-stress major cybersecurity incidents with structured incident-command skills.',
    'Attacking and Defending Active Directory':
        'Hands-on training on how threat actors abuse Active Directory and how defenders detect and disrupt those attack paths.',
    'Incident Response Tabletop Exercise':
        'Discussion-based scripted scenario with controlled information releases to practice IR decision-making and coordination.',
    'Taegis Solution Review – per tenant':
        'Posture review of your Taegis deployment, content use, and alignment to recommended operating practices.',
    'Taegis Guided Onboarding (Enablement: Core)':
        'Core Taegis onboarding and tuning so you operationalize detections, investigations, and related workflows efficiently.',
    'Taegis Guided Onboarding - Enterprise (Enablement: Plus)':
        'Enterprise-scale Taegis enablement for advanced detections, automation, and integrations beyond the baseline program.',
    'Sophos MDR guided onboarding':
        'Guided onboarding to operationalize Sophos MDR, align workflows, and integrate with your security operations.',
    'Sophos Hybrid XDR guided onboarding':
        'Guided onboarding to deploy and operationalize Sophos Hybrid XDR across your environment.',
    'Taegis Administrator Training':
        'Role-based remote training so Taegis administrators configure and manage the platform effectively.',
    'Taegis Analyst Training':
        'Role-based remote training so analysts investigate alerts and use Taegis in day-to-day operations.',
    'Taegis Advanced Search Training':
        'Training focused on advanced search techniques and investigation workflows in Taegis.',
    'Taegis Custom Parser Training':
        'Training to build and maintain custom parsers for onboarding log sources into Taegis.',
    'Taegis Scenario Based Training (1 Scenario)':
        'Instructor-led scenario-based training to practice investigation and response using a defined Taegis scenario.',
    'Taegis Native Response Playbook configuration':
        'Implementation support to configure Taegis native response playbooks for your environment.',
    'Sophos Central Security posture assessment':
        'Review of your Sophos Central deployment and security posture against recommended practices.',
    'Emergency Incident Response':
        'Rapid Sophos Incident Response support for active emergencies; scope and duration confirmed with your account team.',
    'Custom-scoped Engagement':
        'Custom advisory or professional engagement scoped with your Sophos representative; SU count estimated before commencement.',
};

window.IMR_SERVICE_SU = {
    'Incident Response Plan Development': 'S: 15, M: 20, L: 30',
    'Incident Response Plan Review': 'S: 10, M: 20, L: 25',
    'Incident Response Playbook Development': '5–10 (by scenario and existing planning)',
    'AI LLM Security Assessment': 'Standard: 10; add-on objectives: 10 each',
    'Custom Application Security Assessment': 'S: 20, L: 30',
    'Mobile Application Security Assessment': '10 per OS',
    'Secure Code Analysis': 'S: 13, M: 20, L: 30',
    'Web Application Security Assessment': 'S: 10, M: 15, L: 20',
    'Web API Test': 'S: 10, M: 15, L: 20',
    'Cloud Penetration Test': '13',
    'External Penetration Test': 'S: 10, M: 20, L: 40',
    'Internal Penetration Test': 'S: 10, M: 20, L: 40',
    'Physical Security Testing': '20',
    'Wireless Network Penetration Test': '10 per location or floor',
    'Device Penetration Test': '20',
    'Laptop Penetration Test': '10',
    'Medical Device Test': '20',
    'SAP Penetration Test': '20',
    'Phishing Drills': 'Click and Log — S: 20, M: 30; Credential Capture — S: 20, M: 30',
    'Vishing Drill': 'S: 10, M: 20',
    'Active Directory Security Assessment': 'S: 13, M: 25, L: 50',
    'Microsoft Entra ID Security Assessment': '15',
    'Password Cracking and Analysis Assessment': '5',
    'Threat Hunting Assessment': 'S: 13, M: 23, L: 30',
    'Enterprise Brand Surveillance (EBS) Information Brief': '10',
    'Threat Landscape Brief': '5',
    'Threat Intelligence Support Services': '3',
    'Purple Team Exercise': 'Standard: 10; Replay: 5',
    'Red Team Exercise - Intel Led': 'Lite: 40; Standard: 80; +10 per extra week',
    'Red Team Exercise - Full Spectrum':
        'Lite: 40; Standard: 80; +10 per week; physical attacks: 20 per location; wireless: 10 per location',
    'Functional Exercise': 'S: 20, M: 30',
    'Principles of Incident Response Training': '10',
    'Incident Commander Training': '10',
    'Attacking and Defending Active Directory': '10',
    'Incident Response Tabletop Exercise': '12',
    'Taegis Solution Review – per tenant': '7',
    'Taegis Guided Onboarding (Enablement: Core)': '7',
    'Taegis Guided Onboarding - Enterprise (Enablement: Plus)': '15',
    'Sophos MDR guided onboarding': '6',
    'Sophos Hybrid XDR guided onboarding': '6',
    'Taegis Administrator Training': '1',
    'Taegis Analyst Training': '1',
    'Taegis Advanced Search Training': '1',
    'Taegis Custom Parser Training': '1',
    'Taegis Scenario Based Training (1 Scenario)': '1',
    'Taegis Native Response Playbook configuration': '1',
    'Sophos Central Security posture assessment': '2',
    'Emergency Incident Response': '1 SU = 3 hours, or priced hourly',
    'Custom-scoped Engagement': 'Unique per engagement',
};
