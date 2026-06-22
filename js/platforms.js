/* ====================================================
   GSAP REVEALS
   ==================================================== */
gsap.registerPlugin(ScrollTrigger);

// Hero title letter reveal
window.addEventListener('load', () => {
    const titleEl = document.getElementById('heroTitle');
    if (titleEl) {
        const splitTextIntoWords = (element) => {
            if (!element) return;
            const nodes = Array.from(element.childNodes);
            element.innerHTML = '';
            nodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const words = node.textContent.split(/(\s+)/);
                    words.forEach(word => {
                        if (word.trim() === '') {
                            element.appendChild(document.createTextNode(word));
                        } else {
                            const span = document.createElement('span');
                            span.className = 'word';
                            span.textContent = word;
                            element.appendChild(span);
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    splitTextIntoWords(node);
                    element.appendChild(node);
                }
            });
        };
        splitTextIntoWords(titleEl);
    }

    const tl = gsap.timeline({ delay: 1.6 });
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('.page-hero-title .word', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
      .to('.page-hero-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
});

// Staggered reveal for platform cards
document.querySelectorAll('.platform-entry').forEach((entry) => {
    gsap.fromTo(entry, 
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: entry,
                start: 'top 85%',
                once: true
            }
        }
    );
});

// Staggered reveal for tech section header
gsap.fromTo('.tech-section .reveal',
    { opacity: 0, y: 30 },
    {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.tech-section',
            start: 'top 80%',
            once: true
        }
    }
);

/* ====================================================
   POPULATE TECH MARQUEE
   ==================================================== */
const techList1 = [
    { name: "React", icon: "fa-brands fa-react" },
    { name: "HTML5", icon: "fa-brands fa-html5" },
    { name: "CSS3", icon: "fa-brands fa-css3-alt" },
    { name: "JavaScript", icon: "fa-brands fa-square-js" },
    { name: "AWS", icon: "fa-brands fa-aws" },
    { name: "Docker", icon: "fa-brands fa-docker" },
    { name: "Cloudflare", icon: "fa-solid fa-cloud" }
];

const techList2 = [
    { name: "Node.js", icon: "fa-brands fa-node-js" },
    { name: "Python", icon: "fa-brands fa-python" },
    { name: "Linux", icon: "fa-brands fa-linux" },
    { name: "Salesforce", icon: "fa-brands fa-salesforce" },
    { name: "Shopify", icon: "fa-brands fa-shopify" },
    { name: "Cybersecurity", icon: "fa-solid fa-shield-halved" },
    { name: "Databases", icon: "fa-solid fa-database" }
];

const populateRow = (rowId, items) => {
    const row = document.getElementById(rowId);
    if (!row) return;
    // Repeat items to fill marquee width
    const doubleItems = [...items, ...items, ...items, ...items];
    row.innerHTML = doubleItems.map(item => `
        <div class="tech-card">
            <i class="${item.icon}"></i>
            <span>${item.name}</span>
        </div>
    `).join('');
};

populateRow('techRow1', techList1);
populateRow('techRow2', techList2);

/* ====================================================
   VIEW TOGGLE (Showcase vs Compact)
   ==================================================== */
const viewToggle = document.getElementById('viewToggle');
const viewIndicator = document.getElementById('viewIndicator');
const toggleButtons = viewToggle ? viewToggle.querySelectorAll('button') : [];

const updateToggleState = (activeBtn) => {
    toggleButtons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
    
    viewIndicator.style.left = activeBtn.offsetLeft + 'px';
    viewIndicator.style.width = activeBtn.offsetWidth + 'px';
    
    const view = activeBtn.getAttribute('data-view');
    if (view === 'compact') {
        document.body.classList.add('compact-mode');
    } else {
        document.body.classList.remove('compact-mode');
    }
};

toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => updateToggleState(btn));
});

window.addEventListener('load', () => {
    const activeBtn = viewToggle ? viewToggle.querySelector('button.active') : null;
    if (activeBtn) {
        setTimeout(() => updateToggleState(activeBtn), 200);
    }
});

window.addEventListener('resize', () => {
    const activeBtn = viewToggle ? viewToggle.querySelector('button.active') : null;
    if (activeBtn) {
        updateToggleState(activeBtn);
    }
});

/* ====================================================
   LIVE CHARTS MICRO-ANIMATION
   ==================================================== */
document.querySelectorAll('[data-bars]').forEach(chart => {
    const barCount = 14;
    let barsHTML = '';
    for (let i = 0; i < barCount; i++) {
        barsHTML += `<div class="vis-bar" style="height: ${Math.random() * 60 + 20}%"></div>`;
    }
    chart.innerHTML = barsHTML;

    // Pulse heights slightly
    setInterval(() => {
        chart.querySelectorAll('.vis-bar').forEach(bar => {
            bar.style.height = `${Math.random() * 60 + 20}%`;
        });
    }, 3000 + Math.random() * 2000);
});

