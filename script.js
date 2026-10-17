// A database (Catalog of items) representing archival records (Spans Requirements 1b, 2a, 2b, 2c)
const archiveData = [
    {
        id: 0,
        title: "Declaration of Independence",
        type: "declaration",
        era: "march-1971",
        date: "March 26, 1971",
        description: "The historical original manuscript transcript declaiming the sovereign status of the state of Bangladesh, officially dispatching independence on the first hours of March 26, after major martial crackdown.",
        source: "Kalurghat radio transmission registry & early government documentation archives",
        relevance: "Primary cornerstone proclamation of nationhood.",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 1,
        title: "The Instrument of Surrender",
        type: "treaty",
        era: "dec-1971",
        date: "December 16, 1971",
        description: "The official signing paperwork signed at Ramna Racecourse (Dhaka) between Lieut Gen Aurora of Indian-Bangladeshi command & Niazi of Pakistani command, executing ceasefire and concluding the war.",
        source: "The Bangladesh National Museum Archives",
        relevance: "Definitive closure & historic official verification of Victory Day (Bijoy Dibosh).",
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        title: "Frontline Combat Directives",
        type: "correspondence",
        era: "war-months",
        date: "July 12, 1971",
        description: "Encrypted battlefield letters coordinating sector attacks under Colonel M.A.G. Osmani, giving tactical support briefs for the guerilla Muktibahini operations.",
        source: "Sector 2 Battlefield Recovery Papers",
        relevance: "Authentic raw field data demonstrating coordinated guerilla warfare methodologies.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Wartime Radio Broadcast Audio Transcript",
        type: "media",
        era: "war-months",
        date: "May 1971",
        description: "Recorded vocal speeches and cultural encouragement from Shadhin Bangla Betar Kendro, the wartime clandestine radio broadcasting to raise morale for common citizens and guerillas alike.",
        source: "Broadcast Collection & Personal Recorded Tapes",
        relevance: "Essential audio and testimonial validation of non-violent rebellion and communication.",
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        title: "Civil Refugee Camp Registers (Tripura)",
        type: "correspondence",
        era: "war-months",
        date: "September 1971",
        description: "Registration catalogs highlighting local families fleeing the interior violence. Includes logistics reports, health details and aid allocations provided by humanitarian efforts.",
        source: "Relief Committee and International Aid Archive Files",
        relevance: "Direct evidence of the displacement of 10 million civilians into neighboring border states.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 5,
        title: "6-Point Movement Memorial",
        type: "declaration",
        era: "pre-1971",
        date: "February 1966 (Prelude)",
        description: "A foundational text on the 6-point demand that laid the cornerstone for autonomous sovereignty, addressing economic disparity, the currency program, and the militia requirement.",
        source: "Awami League Original Political Circulars",
        relevance: "The political precursor demanding democratic equity before full independence.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400"
    }
];

// Reference Selectors
const catalogGrid = document.getElementById('catalog-grid');
const searchInput = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const dateFilter = document.getElementById('date-filter');
const modal = document.getElementById('doc-detail-modal');
const modalBody = document.getElementById('modal-details-body');
const modalClose = document.getElementById('modal-close');

const submissionForm = document.getElementById('submission-form');
const contactForm = document.getElementById('contact-form');
const submitFeedback = document.getElementById('submit-feedback');
const contactFeedback = document.getElementById('contact-feedback');
const fileInput = document.getElementById('file-upload');
const fileNameInfo = document.getElementById('file-name-info');

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// --- Render Catalog Grid (Filtering & Searching) (Specification 2a & 2b) ---
function renderArchive(dataToRender) {
    catalogGrid.innerHTML = '';
    
    if (dataToRender.length === 0) {
        catalogGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--gray-color);">
                <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 10px;"></i>
                <p>No archive documents found matching the search criteria.</p>
            </div>`;
        return;
    }

    dataToRender.forEach(doc => {
        const card = document.createElement('div');
        card.classList.add('catalog-card');
        card.setAttribute('onclick', `openDetailsModal(${doc.id})`);
        card.innerHTML = `
            <div class="card-img-holder">
                <span class="badge">${doc.type}</span>
                <img src="${doc.image}" alt="${doc.title}">
            </div>
            <div class="card-body">
                <span class="card-date"><i class="fa-solid fa-calendar-days"></i> ${doc.date}</span>
                <h3 class="card-title">${doc.title}</h3>
                <p class="card-desc">${doc.description}</p>
                <div class="card-foot">
                    <button class="btn btn-primary w-100 btn-sm"><i class="fa-solid fa-eye"></i> View Archived Item</button>
                </div>
            </div>
        `;
        catalogGrid.appendChild(card);
    });
}

// Event Listeners for search & filters
function filterCatalog() {
    const query = searchInput.value.toLowerCase();
    const typeValue = typeFilter.value;
    const dateValue = dateFilter.value;

    const filtered = archiveData.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(query) || 
                              doc.description.toLowerCase().includes(query) || 
                              doc.relevance.toLowerCase().includes(query) ||
                              doc.source.toLowerCase().includes(query);
                              
        const matchesType = typeValue === 'all' || doc.type === typeValue;
        const matchesEra = dateValue === 'all' || doc.era === dateValue;

        return matchesSearch && matchesType && matchesEra;
    });

    renderArchive(filtered);
}

searchInput.addEventListener('input', filterCatalog);
typeFilter.addEventListener('change', filterCatalog);
dateFilter.addEventListener('change', filterCatalog);


// --- Modal Functionality (Specification 2c) ---
function openDetailsModal(id) {
    const doc = archiveData.find(item => item.id === id);
    if (!doc) return;

    modalBody.innerHTML = `
        <span class="badge" style="background-color: var(--accent-red); margin-bottom: 10px;">${doc.type.toUpperCase()}</span>
        <h3>${doc.title}</h3>
        <div class="modal-detail-date"><i class="fa-solid fa-calendar-days"></i> <strong>Historical Date:</strong> ${doc.date}</div>
        
        <div class="modal-img-container">
            <img src="${doc.image}" alt="${doc.title}">
        </div>

        <p>${doc.description}</p>

        <div class="meta-info">
            <span><strong>Archive Reference / Source:</strong> ${doc.source}</span>
            <span style="margin-top: 8px; display: block;"><strong>Significance to Liberation War:</strong> ${doc.relevance}</span>
        </div>
        
        <button class="btn btn-dark" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Document</button>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent bg scrolling
}

// Function to handle opening featured items
function openFeatured(index) {
    openDetailsModal(index);
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // allow scrolling again
}

modalClose.addEventListener('click', closeModal);

// Close on background click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


// --- Contributor Portal Form Handling ---
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        fileNameInfo.textContent = e.target.files[0].name;
    } else {
        fileNameInfo.textContent = "No files chosen";
    }
});

submissionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Process input data (can send to a server endpoint)
    const name = document.getElementById('submit-name').value;
    const title = document.getElementById('material-title').value;

    submitFeedback.innerHTML = `
        <div class="success-msg" style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 12px; border-radius: 4px; margin-top: 15px;">
            <i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your uploaded piece <strong>"${title}"</strong> was securely sent to administration. After historical validation, it will be added to the live catalog.
        </div>`;
        
    submissionForm.reset();
    fileNameInfo.textContent = "No files chosen";
    
    setTimeout(() => {
        submitFeedback.innerHTML = '';
    }, 8000);
});

// Contact administrative form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cName = document.getElementById('contact-name').value;
    
    contactFeedback.innerHTML = `
         <div class="success-msg" style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 12px; border-radius: 4px; margin-top: 15px;">
            Message sent! Thank you, ${cName}. Our archiving team will inspect the request and respond soon.
        </div>`;
    contactForm.reset();
    
    setTimeout(() => {
        contactFeedback.innerHTML = '';
    }, 6000);
});


// --- Responsive mobile navigation drawer toggle ---
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
});

// Auto-close menu drawer when selecting page section
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        
        // Handle Active Highlight update
        document.querySelectorAll('.nav-menu a').forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});


// --- Initiate page loading ---
window.onload = () => {
    renderArchive(archiveData);
};