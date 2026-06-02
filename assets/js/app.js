/* ============================================
   ETHIO REAL ESTATE APP
   Main Application Logic
   ============================================ */

// State Management
const AppState = {
    currentPage: 'home',
    currentLang: 'en',
    darkMode: false,
    favorites: JSON.parse(localStorage.getItem('ere_favorites') || '[]'),
    compareList: [],
    filters: {
        developers: [],
        types: [],
        statuses: [],
        maxPrice: 1000000
    },
    sortBy: 'featured',
    searchQuery: ''
};

// DOM Elements cache
const DOM = {};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    cacheDOM();
    initApp();
});

function cacheDOM() {
    DOM.loadingScreen = document.getElementById('loading-screen');
    DOM.navbar = document.getElementById('navbar');
    DOM.mobileToggle = document.getElementById('mobile-toggle');
    DOM.navMenu = document.getElementById('nav-menu');
    DOM.mobileOverlay = document.getElementById('mobile-overlay');
    DOM.darkModeToggle = document.getElementById('dark-mode-toggle');
    DOM.langToggle = document.getElementById('lang-toggle');
    DOM.favoritesBtn = document.getElementById('favorites-btn');
    DOM.favoritesCount = document.getElementById('favorites-count');
    DOM.favoritesDrawer = document.getElementById('favorites-drawer');
    DOM.closeFavorites = document.getElementById('close-favorites');
    DOM.favoritesOverlay = document.getElementById('favorites-overlay');
    DOM.favoritesList = document.getElementById('favorites-list');
    DOM.mainContent = document.getElementById('main-content');
    DOM.toastContainer = document.getElementById('toast-container');
    
    // Search & Filters
    DOM.heroSearch = document.getElementById('hero-search');
    DOM.searchType = document.getElementById('search-type');
    DOM.searchStatus = document.getElementById('search-status');
    DOM.btnSearch = document.getElementById('btn-search');
    DOM.filterDeveloper = document.getElementById('filter-developer');
    DOM.filterType = document.getElementById('filter-type');
    DOM.filterStatus = document.getElementById('filter-status');
    DOM.priceRange = document.getElementById('price-range');
    DOM.priceValue = document.getElementById('price-value');
    DOM.resetFilters = document.getElementById('reset-filters');
    DOM.resultsCount = document.getElementById('results-count');
    DOM.sortBy = document.getElementById('sort-by');
    DOM.compareToggle = document.getElementById('compare-toggle');
    DOM.compareCount = document.getElementById('compare-count');
    
    // Sections
    DOM.featuredGrid = document.getElementById('featured-grid');
    DOM.propertiesGrid = document.getElementById('properties-grid');
    DOM.detailsContainer = document.getElementById('details-container');
    DOM.roiList = document.getElementById('roi-list');
    DOM.downloadList = document.getElementById('download-list');
    DOM.awardResidential = document.getElementById('award-residential');
    DOM.awardCommercial = document.getElementById('award-commercial');
    DOM.awardSustainable = document.getElementById('award-sustainable');
    DOM.awardDeveloper = document.getElementById('award-developer');
    DOM.topProjectsList = document.getElementById('top-projects-list');
    DOM.sponsorsPlatinum = document.getElementById('sponsors-platinum');
    DOM.sponsorsGold = document.getElementById('sponsors-gold');
    DOM.sponsorsSilver = document.getElementById('sponsors-silver');
    DOM.magazineFeatured = document.getElementById('magazine-featured');
    DOM.magazineGrid = document.getElementById('magazine-grid');
    
    // Modals
    DOM.shareModal = document.getElementById('share-modal');
    DOM.closeShare = document.getElementById('close-share');
    DOM.compareModal = document.getElementById('compare-modal');
    DOM.closeCompare = document.getElementById('close-compare');
    DOM.compareTable = document.getElementById('compare-table');
}

function initApp() {
    // Remove loading screen
    setTimeout(() => {
        DOM.loadingScreen.classList.add('hidden');
    }, 1500);
    
    // Check system preferences
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode(true);
    }
    
    // Load saved language
    const savedLang = localStorage.getItem('ere_lang');
    if (savedLang) {
        switchLanguage(savedLang);
    }
    
    // Initialize all sections
    initNavigation();
    initRouting();
    initSearch();
    initFilters();
    initEventListeners();
    renderAllSections();
    updateFavoritesUI();
    
    // Scroll animations
    initScrollAnimations();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
    });
}

/* ============================================
   ROUTING
   ============================================ */
function initRouting() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
}

function handleRoute() {
    const hash = window.location.hash || '#home';
    const [page, query] = hash.replace('#', '').split('?');
    
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${page}`) {
            link.classList.add('active');
        }
    });
    
    // Show target section
    const targetSection = document.getElementById(page);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
        AppState.currentPage = page;
        
        // Handle query params for listings
        if (page === 'listings' && query) {
            const params = new URLSearchParams(query);
            const developer = params.get('developer');
            if (developer) {
                AppState.filters.developers = [developer];
                renderFilters();
                renderProperties();
            }
        }
        
        // Refresh section-specific content
        if (page === 'details') {
            const propertyId = query;
            if (propertyId) {
                renderPropertyDetails(propertyId);
            }
        }
    } else {
        // Default to home
        document.getElementById('home').classList.add('active');
        AppState.currentPage = 'home';
    }
    
    // Close mobile menu
    closeMobileMenu();
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    DOM.mobileToggle.addEventListener('click', toggleMobileMenu);
    DOM.mobileOverlay.addEventListener('click', closeMobileMenu);
    
    DOM.darkModeToggle.addEventListener('click', () => toggleDarkMode());
    DOM.langToggle.addEventListener('click', () => {
        const newLang = AppState.currentLang === 'en' ? 'am' : 'en';
        switchLanguage(newLang);
    });
    
    DOM.favoritesBtn.addEventListener('click', openFavoritesDrawer);
    DOM.closeFavorites.addEventListener('click', closeFavoritesDrawer);
    DOM.favoritesOverlay.addEventListener('click', closeFavoritesDrawer);
}

function toggleMobileMenu() {
    DOM.navMenu.classList.toggle('active');
    DOM.mobileOverlay.classList.toggle('active');
    document.body.style.overflow = DOM.navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    DOM.navMenu.classList.remove('active');
    DOM.mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

/* ============================================
   DARK MODE
   ============================================ */
function toggleDarkMode(forceState = null) {
    AppState.darkMode = forceState !== null ? forceState : !AppState.darkMode;
    document.body.classList.toggle('dark-mode', AppState.darkMode);
    
    const icon = DOM.darkModeToggle.querySelector('i');
    if (AppState.darkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    localStorage.setItem('ere_darkmode', AppState.darkMode);
}

/* ============================================
   LANGUAGE SWITCHER
   ============================================ */
function switchLanguage(lang) {
    AppState.currentLang = lang;
    document.documentElement.lang = lang === 'am' ? 'am' : 'en';
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en][data-am]').forEach(el => {
        if (el.hasAttribute(`data-${lang}`)) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                const placeholder = el.getAttribute(`data-placeholder-${lang}`);
                if (placeholder) {
                    el.placeholder = placeholder;
                }
            } else {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        }
    });
    
    // Update select options
    document.querySelectorAll('select').forEach(select => {
        select.querySelectorAll('option').forEach(option => {
            if (option.hasAttribute(`data-${lang}`)) {
                option.textContent = option.getAttribute(`data-${lang}`);
            }
        });
    });
    
    // Update lang indicator
    DOM.langToggle.querySelector('.lang-indicator').textContent = lang.toUpperCase();
    
    // Re-render dynamic content
    renderAllSections();
    updateFavoritesUI();
    
    localStorage.setItem('ere_lang', lang);
}

function t(en, am) {
    return AppState.currentLang === 'am' ? (am || en) : en;
}

/* ============================================
   SEARCH & FILTERS
   ============================================ */
function initSearch() {
    DOM.btnSearch.addEventListener('click', () => {
        AppState.searchQuery = DOM.heroSearch.value.toLowerCase();
        AppState.filters.types = DOM.searchType.value ? [DOM.searchType.value] : [];
        AppState.filters.statuses = DOM.searchStatus.value ? [DOM.searchStatus.value] : [];
        window.location.hash = '#listings';
        renderProperties();
    });
    
    DOM.heroSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') DOM.btnSearch.click();
    });
}

function initFilters() {
    // Render filter options
    renderFilters();
    
    // Price range
    DOM.priceRange.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        AppState.filters.maxPrice = value;
        DOM.priceValue.textContent = value >= 1000000 ? '$1M+' : `$${(value/1000).toFixed(0)}k`;
        renderProperties();
    });
    
    // Sort
    DOM.sortBy.addEventListener('change', (e) => {
        AppState.sortBy = e.target.value;
        renderProperties();
    });
    
    // Reset
    DOM.resetFilters.addEventListener('click', () => {
        AppState.filters = { developers: [], types: [], statuses: [], maxPrice: 1000000 };
        AppState.searchQuery = '';
        DOM.priceRange.value = 1000000;
        DOM.priceValue.textContent = '$1M+';
        renderFilters();
        renderProperties();
    });
    
    // Compare toggle
    DOM.compareToggle.addEventListener('click', openCompareModal);
    DOM.closeCompare.addEventListener('click', closeCompareModal);
}

function renderFilters() {
    // Developer filters
    DOM.filterDeveloper.innerHTML = AppData.developers.map(dev => `
        <label class="filter-option">
            <input type="checkbox" value="${dev.id}" ${AppState.filters.developers.includes(dev.id) ? 'checked' : ''}>
            <span>${dev.name}</span>
        </label>
    `).join('');
    
    DOM.filterDeveloper.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
                AppState.filters.developers.push(input.value);
            } else {
                AppState.filters.developers = AppState.filters.developers.filter(d => d !== input.value);
            }
            renderProperties();
        });
    });
    
    // Type filters
    const types = [
        { id: 'residential', en: 'Residential', am: 'የመኖሪያ' },
        { id: 'commercial', en: 'Commercial', am: 'የንግድ' },
        { id: 'mixed', en: 'Mixed Use', am: 'ቅሚላ' }
    ];
    
    DOM.filterType.innerHTML = types.map(type => `
        <label class="filter-option">
            <input type="checkbox" value="${type.id}" ${AppState.filters.types.includes(type.id) ? 'checked' : ''}>
            <span>${t(type.en, type.am)}</span>
        </label>
    `).join('');
    
    DOM.filterType.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
                AppState.filters.types.push(input.value);
            } else {
                AppState.filters.types = AppState.filters.types.filter(t => t !== input.value);
            }
            renderProperties();
        });
    });
    
    // Status filters
    const statuses = [
        { id: 'completed', en: 'Completed', am: 'የተጠናቀቀ' },
        { id: 'under-construction', en: 'Under Construction', am: 'በእድገት ላይ' }
    ];
    
    DOM.filterStatus.innerHTML = statuses.map(status => `
        <label class="filter-option">
            <input type="checkbox" value="${status.id}" ${AppState.filters.statuses.includes(status.id) ? 'checked' : ''}>
            <span>${t(status.en, status.am)}</span>
        </label>
    `).join('');
    
    DOM.filterStatus.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
                AppState.filters.statuses.push(input.value);
            } else {
                AppState.filters.statuses = AppState.filters.statuses.filter(s => s !== input.value);
            }
            renderProperties();
        });
    });
}

function getFilteredProperties() {
    let filtered = AppData.properties.filter(p => {
        // Search query
        if (AppState.searchQuery) {
            const query = AppState.searchQuery.toLowerCase();
            const match = p.name.toLowerCase().includes(query) ||
                         p.location.toLowerCase().includes(query) ||
                         p.developerName.toLowerCase().includes(query) ||
                         (p.nameAm && p.nameAm.includes(query));
            if (!match) return false;
        }
        
        // Developer filter
        if (AppState.filters.developers.length > 0 && !AppState.filters.developers.includes(p.developer)) {
            return false;
        }
        
        // Type filter
        if (AppState.filters.types.length > 0 && !AppState.filters.types.includes(p.type)) {
            return false;
        }
        
        // Status filter
        if (AppState.filters.statuses.length > 0 && !AppState.filters.statuses.includes(p.status)) {
            return false;
        }
        
        // Price filter
        if (p.priceMax > AppState.filters.maxPrice && AppState.filters.maxPrice < 1000000) {
            return false;
        }
        
        return true;
    });
    
    // Sort
    switch (AppState.sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.priceMin - b.priceMin);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.priceMax - a.priceMax);
            break;
        case 'newest':
            filtered.sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));
            break;
        default:
            // Featured first
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    return filtered;
}

/* ============================================
   RENDERING
   ============================================ */
function renderAllSections() {
    renderFeatured();
    renderProperties();
    renderInvestorZone();
    renderAwards();
    renderSponsors();
    renderMagazine();
}

function renderFeatured() {
    const featured = AppData.properties.filter(p => p.featured).slice(0, 4);
    DOM.featuredGrid.innerHTML = featured.map(p => createPropertyCard(p)).join('');
}

function renderProperties() {
    const properties = getFilteredProperties();
    
    DOM.resultsCount.textContent = t(
        `${properties.length} properties found`,
        `${properties.length} ንብረቶች ተገኝተዋል`
    );
    
    DOM.propertiesGrid.innerHTML = properties.map(p => createPropertyCard(p)).join('');
    
    // Re-attach event listeners to new cards
    attachPropertyCardEvents();
}

function createPropertyCard(property) {
    const isFav = AppState.favorites.includes(property.id);
    const isCompare = AppState.compareList.includes(property.id);
    const statusClass = property.status === 'completed' ? 'status-completed' : 'status-construction';
    const statusText = property.status === 'completed' ? t('Completed', 'የተጠናቀቀ') : t('Under Construction', 'በእድገት ላይ');
    
    return `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.images[0]}" alt="${property.name}" loading="lazy">
                <div class="property-badges">
                    ${property.featured ? `<span class="badge badge-gold">${t('Featured', 'ተለይቷል')}</span>` : ''}
                    <span class="badge badge-outline">${property.type === 'residential' ? t('Residential', 'መኖሪያ') : property.type === 'commercial' ? t('Commercial', 'ንግድ') : t('Mixed Use', 'ቅሚላ')}</span>
                </div>
                <div class="property-actions-top">
                    <button class="action-btn ${isFav ? 'active' : ''}" data-action="favorite" data-id="${property.id}" title="${t('Favorite', 'የምወደው')}">
                        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="action-btn ${isCompare ? 'active' : ''}" data-action="compare" data-id="${property.id}" title="${t('Compare', 'አወዳድር')}">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                </div>
            </div>
            <div class="property-info">
                <div class="property-developer">${property.developerName}</div>
                <h3 class="property-name">${t(property.name, property.nameAm)}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${t(property.location, property.locationAm)}</span>
                </div>
                <div class="property-meta">
                    <div class="meta-item"><i class="fas fa-bed"></i> ${property.bedrooms}</div>
                    <div class="meta-item"><i class="fas fa-bath"></i> ${property.bathrooms}</div>
                    <div class="meta-item"><i class="fas fa-ruler-combined"></i> ${property.area}</div>
                </div>
                <div class="property-footer">
                    <span class="property-price">${property.priceRange}</span>
                    <span class="property-status ${statusClass}">${statusText}</span>
                </div>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                    <a href="#details?${property.id}" class="btn btn-primary btn-sm" style="flex: 1;">
                        <span>${t('View Details', 'ዝርዝሮችን አስሳ')}</span>
                    </a>
                    <button class="btn btn-outline btn-sm" data-action="view3d" data-id="${property.id}">
                        <i class="fas fa-cube"></i> 3D
                    </button>
                </div>
            </div>
        </div>
    `;
}

function attachPropertyCardEvents() {
    document.querySelectorAll('[data-action="favorite"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(btn.dataset.id);
        });
    });
    
    document.querySelectorAll('[data-action="compare"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCompare(btn.dataset.id);
        });
    });
    
    document.querySelectorAll('[data-action="view3d"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            open3DViewer(btn.dataset.id);
        });
    });
}

function renderPropertyDetails(propertyId) {
    const property = AppData.properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const isFav = AppState.favorites.includes(property.id);
    const statusClass = property.status === 'completed' ? 'status-completed' : 'status-construction';
    const statusText = property.status === 'completed' ? t('Completed', 'የተጠናቀቀ') : t('Under Construction', 'በእድገት ላይ');
    
    DOM.detailsContainer.innerHTML = `
        <div class="details-hero">
            <img src="${property.images[0]}" alt="${property.name}">
            <div class="details-hero-overlay"></div>
        </div>
        <div class="details-content container">
            <div class="details-grid">
                <div class="details-main">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <div>
                            <span class="property-developer">${property.developerName}</span>
                            <h1>${t(property.name, property.nameAm)}</h1>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="icon-btn ${isFav ? 'active' : ''}" onclick="window.toggleFavorite('${property.id}')" style="color: ${isFav ? '#e74c3c' : 'inherit'};">
                                <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                            </button>
                            <button class="icon-btn" onclick="window.openShareModal('${property.id}')">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="details-meta">
                        <div class="details-meta-item"><i class="fas fa-map-marker-alt"></i> ${t(property.location, property.locationAm)}</div>
                        <div class="details-meta-item"><i class="fas fa-calendar"></i> ${t('Completion', 'መጠናቀቂያ')}: ${property.completionDate}</div>
                        <div class="details-meta-item"><i class="fas fa-chart-line"></i> ROI: ${property.roi}</div>
                    </div>
                    
                    <div class="details-section">
                        <h2>${t('Overview', 'አጠቃላይ እይታ')}</h2>
                        <p>${t(property.description, property.descriptionAm)}</p>
                    </div>
                    
                    <div class="details-section">
                        <h2>${t('Gallery', 'ጋሊሪ')}</h2>
                        <div class="gallery-grid">
                            ${property.images.map((img, i) => `
                                <div class="gallery-item">
                                    <img src="${img}" alt="${property.name} - ${i + 1}" loading="lazy">
                                    ${i === 3 && property.images.length > 4 ? `<div class="gallery-more">+${property.images.length - 4}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="details-section">
                        <h2>${t('Amenities', 'መሰንጠቂያዎች')}</h2>
                        <div class="amenities-grid">
                            ${property.amenities.map((amenity, i) => `
                                <div class="amenity-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${t(amenity, property.amenitiesAm[i])}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="details-section">
                        <h2>${t('Specifications', 'ዝርዝሮች')}</h2>
                        <table class="specs-table">
                            <tr><td>${t('Property Type', 'የንብረት አይነት')}</td><td>${property.type === 'residential' ? t('Residential', 'መኖሪያ') : property.type === 'commercial' ? t('Commercial', 'ንግድ') : t('Mixed Use', 'ቅሚላ')}</td></tr>
                            <tr><td>${t('Bedrooms', 'መኝታ ቤቶች')}</td><td>${property.bedrooms}</td></tr>
                            <tr><td>${t('Bathrooms', 'የታጠቢ ክፍሎች')}</td><td>${property.bathrooms}</td></tr>
                            <tr><td>${t('Area', 'ስፋት')}</td><td>${property.area}</td></tr>
                            <tr><td>${t('Floor Range', 'የአካባቢ ክልል')}</td><td>${property.floor}</td></tr>
                            <tr><td>${t('Status', 'ሁኔታ')}</td><td>${statusText}</td></tr>
                            <tr><td>${t('Completion', 'መጠናቀቂያ')}</td><td>${property.completionDate}</td></tr>
                            <tr><td>${t('Expected ROI', 'የሚጠብቀው ROI')}</td><td style="color: var(--gold);">${property.roi}</td></tr>
                        </table>
                    </div>
                    
                    <div class="details-section">
                        <h2>${t('3D Walkthrough', '3D ጉዞ')}</h2>
                        <p style="margin-bottom: 1rem;">${t('Experience this property in immersive 3D. Explore every detail from the comfort of your screen.', 'ይህን ንብረት በሚስብ 3D ውስጥ ያስሱ። ከእርስዉ ማያ ገጽ ምቾት ውስጥ ከፍተኛ ዝርዝርን ይመረምሩ።')}</p>
                        <button class="btn btn-primary" onclick="window.open3DViewer('${property.id}')">
                            <i class="fas fa-cube"></i> ${t('Launch 3D Viewer', '3D ቪወር አስጀምር')}
                        </button>
                    </div>
                    
                    <div class="details-section">
                        <h2>${t('Location', 'ቦታ')}</h2>
                        <div style="background: var(--bg-tertiary); border-radius: var(--border-radius); height: 300px; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
                            <div style="text-align: center;">
                                <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 1rem; color: var(--gold);"></i>
                                <p>${t(property.location, property.locationAm)}</p>
                                <p style="font-size: 0.85rem; margin-top: 0.5rem;">Lat: ${property.coordinates.lat}, Lng: ${property.coordinates.lng}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="details-sidebar">
                    <div class="contact-card glass">
                        <h3>${t('Contact Agent', 'ወኪልን አግኝ')}</h3>
                        <div class="contact-item">
                            <i class="fas fa-building"></i>
                            <span>${property.developerName}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>+251 11 551 1212</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>info@${property.developer.replace(/\s+/g, '').toLowerCase()}.et</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-clock"></i>
                            <span>${t('Mon-Sat: 8:00 - 18:00', 'ሰኞ-ቅዳሜ፡ 8:00 - 18:00')}</span>
                        </div>
                        <div class="contact-buttons">
                            <a href="https://wa.me/251911234567?text=I'm interested in ${encodeURIComponent(property.name)}" class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-whatsapp"></i> ${t('WhatsApp', 'ዋትስአፕ')}
                            </a>
                            <button class="btn btn-brochure" onclick="window.showToast('${t('Brochure download coming soon', 'የብሮሸር አውርዶ በቅርብ ጊዜ ይመጣል')}', 'info')">
                                <i class="fas fa-file-pdf"></i> ${t('Download Brochure', 'ብሮሸር አውርድ')}
                            </button>
                            <button class="btn btn-outline" onclick="window.openShareModal('${property.id}')">
                                <i class="fas fa-share-alt"></i> ${t('Share Project', 'ፕሮጀክት አጋራ')}
                            </button>
                        </div>
                    </div>
                    
                    <div class="contact-card glass" style="margin-top: 1rem;">
                        <h3>${t('Investment Highlights', 'የኢንቨስትሜንት ዋና ነጥቦች')}</h3>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: var(--text-secondary); font-size: 0.9rem;">${t('Expected ROI', 'የሚጠብቀው ROI')}</span>
                                <span style="font-family: var(--font-display); font-weight: 700; color: var(--gold); font-size: 1.25rem;">${property.roi}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: var(--text-secondary); font-size: 0.9rem;">${t('Price Range', 'የዋጋ ክልል')}</span>
                                <span style="font-weight: 600;">${property.priceRange}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: var(--text-secondary); font-size: 0.9rem;">${t('Completion', 'መጠናቀቂያ')}</span>
                                <span style="font-weight: 600;">${property.completionDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    window.scrollTo(0, 0);
}

function renderInvestorZone() {
    // ROI List
    const topROI = [...AppData.properties].sort((a, b) => parseFloat(b.roi) - parseFloat(a.roi)).slice(0, 5);
    DOM.roiList.innerHTML = topROI.map(p => `
        <div class="roi-item">
            <div>
                <div class="roi-project">${t(p.name, p.nameAm)}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${p.developerName}</div>
            </div>
            <div>
                <span class="roi-value">${p.roi}</span>
                <span class="roi-label">ROI</span>
            </div>
        </div>
    `).join('');
    
    // Downloads
    DOM.downloadList.innerHTML = AppData.investorDownloads.map(d => `
        <div class="download-item">
            <div class="download-info">
                <h4>${t(d.title, d.titleAm)}</h4>
                <span>${d.type} • ${d.size}</span>
            </div>
            <button class="download-btn" onclick="window.showToast('${t('Download starting...', 'አውርዶ በመጀመር ላይ...')}', 'info')">
                <i class="fas fa-download"></i>
            </button>
        </div>
    `).join('');
    
    // Form handler
    const form = document.getElementById('investor-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            showToast(t('Thank you! We will contact you soon.', 'አመሰግናለሁ! በቅርብ ጊዜ እንገናኝናለን።'), 'success');
            form.reset();
        };
    }
}

function renderAwards() {
    const renderAwardList = (awards) => awards.map(a => `
        <div class="award-winner">
            <div class="award-winner-name">${a.project || a.name}</div>
            <div class="award-winner-developer">${a.developer || ''} ${a.year ? `• ${a.year}` : ''}</div>
        </div>
    `).join('');
    
    DOM.awardResidential.innerHTML = renderAwardList(AppData.awards.residential);
    DOM.awardCommercial.innerHTML = renderAwardList(AppData.awards.commercial);
    DOM.awardSustainable.innerHTML = renderAwardList(AppData.awards.sustainable);
    DOM.awardDeveloper.innerHTML = renderAwardList(AppData.awards.developer);
    
    DOM.topProjectsList.innerHTML = AppData.awards.topProjects.map((p, i) => `
        <div class="top-project-item">
            <div class="top-project-rank">${i + 1}</div>
            <div class="top-project-info">
                <h4>${p.name}</h4>
                <span>${p.developer} • ${p.category}</span>
            </div>
            <div class="top-project-score">${p.score}</div>
        </div>
    `).join('');
}

function renderSponsors() {
    const renderSponsorGrid = (sponsors) => sponsors.map(s => `
        <div class="sponsor-card">
            <div class="sponsor-logo">${s.logo}</div>
            <div class="sponsor-name">${s.name}</div>
            <div class="sponsor-type">${s.type}</div>
        </div>
    `).join('');
    
    DOM.sponsorsPlatinum.innerHTML = renderSponsorGrid(AppData.sponsors.platinum);
    DOM.sponsorsGold.innerHTML = renderSponsorGrid(AppData.sponsors.gold);
    DOM.sponsorsSilver.innerHTML = renderSponsorGrid(AppData.sponsors.silver);
}

function renderMagazine() {
    const featured = AppData.magazine.featured;
    DOM.magazineFeatured.innerHTML = `
        <div class="magazine-featured-image">
            <img src="${featured.image}" alt="${t(featured.title, featured.titleAm)}">
        </div>
        <div class="magazine-featured-content">
            <span class="magazine-category">${featured.category}</span>
            <h2>${t(featured.title, featured.titleAm)}</h2>
            <p>${t(featured.excerpt, featured.excerptAm)}</p>
            <div class="magazine-meta">
                <span><i class="far fa-calendar"></i> ${featured.date}</span>
                <span><i class="far fa-clock"></i> ${featured.readTime}</span>
            </div>
            <button class="btn btn-primary" style="margin-top: 1rem; width: fit-content;">
                ${t('Read Article', 'ጽሑፍ አንብብ')}
            </button>
        </div>
    `;
    
    DOM.magazineGrid.innerHTML = AppData.magazine.articles.map(a => `
        <div class="magazine-card">
            <div class="magazine-card-image">
                <img src="${a.image}" alt="${t(a.title, a.titleAm)}" loading="lazy">
            </div>
            <div class="magazine-card-content">
                <span class="magazine-category">${a.category}</span>
                <h3>${t(a.title, a.titleAm)}</h3>
                <p>${t(a.excerpt, a.excerpt)}</p>
                <div class="magazine-meta" style="margin-top: 0.75rem; font-size: 0.8rem;">
                    <span><i class="far fa-calendar"></i> ${a.date}</span>
                    <span><i class="far fa-clock"></i> ${a.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

/* ============================================
   FAVORITES SYSTEM
   ============================================ */
function toggleFavorite(propertyId) {
    const index = AppState.favorites.indexOf(propertyId);
    if (index > -1) {
        AppState.favorites.splice(index, 1);
        showToast(t('Removed from favorites', 'ከተወደዱ ተወግዷል'), 'info');
    } else {
        AppState.favorites.push(propertyId);
        showToast(t('Added to favorites', 'ከተወደዱ ታክሏል'), 'success');
    }
    
    localStorage.setItem('ere_favorites', JSON.stringify(AppState.favorites));
    updateFavoritesUI();
    renderProperties();
    renderFeatured();
    
    // Update details view if open
    if (AppState.currentPage === 'details') {
        const favBtn = document.querySelector('.details-main .icon-btn');
        if (favBtn) {
            const isFav = AppState.favorites.includes(propertyId);
            favBtn.style.color = isFav ? '#e74c3c' : 'inherit';
            favBtn.innerHTML = `<i class="${isFav ? 'fas' : 'far'} fa-heart"></i>`;
        }
    }
}

function updateFavoritesUI() {
    DOM.favoritesCount.textContent = AppState.favorites.length;
    
    if (AppState.favorites.length === 0) {
        DOM.favoritesList.innerHTML = `
            <div class="empty-state">
                <i class="far fa-heart"></i>
                <p>${t('No favorites yet', 'እስካሁን ምንም የተወደዱ የሉም')}</p>
            </div>
        `;
    } else {
        const favProperties = AppData.properties.filter(p => AppState.favorites.includes(p.id));
        DOM.favoritesList.innerHTML = favProperties.map(p => `
            <div class="property-card" style="margin-bottom: 1rem;" data-id="${p.id}">
                <div class="property-image" style="height: 160px;">
                    <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
                </div>
                <div class="property-info" style="padding: 0.75rem;">
                    <div class="property-developer">${p.developerName}</div>
                    <h3 class="property-name" style="font-size: 1rem;">${t(p.name, p.nameAm)}</h3>
                    <div class="property-location" style="font-size: 0.8rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${t(p.location, p.locationAm)}</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <a href="#details?${p.id}" class="btn btn-primary btn-sm" style="flex: 1;" onclick="closeFavoritesDrawer()">
                            ${t('View', 'አስሳ')}
                        </a>
                        <button class="btn btn-outline btn-sm" onclick="window.toggleFavorite('${p.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function openFavoritesDrawer() {
    DOM.favoritesDrawer.classList.add('active');
    DOM.favoritesOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFavoritesDrawer() {
    DOM.favoritesDrawer.classList.remove('active');
    DOM.favoritesOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

/* ============================================
   COMPARISON SYSTEM
   ============================================ */
function toggleCompare(propertyId) {
    const index = AppState.compareList.indexOf(propertyId);
    if (index > -1) {
        AppState.compareList.splice(index, 1);
        showToast(t('Removed from comparison', 'ከውድድር ተወግዷል'), 'info');
    } else {
        if (AppState.compareList.length >= 3) {
            showToast(t('Maximum 3 properties can be compared', 'ከፍተኛ 3 ንብረቶች ሊወዳደሩ ይችላሉ'), 'error');
            return;
        }
        AppState.compareList.push(propertyId);
        showToast(t('Added to comparison', 'ከውድድር ታክሏል'), 'success');
    }
    
    updateCompareUI();
    renderProperties();
}

function updateCompareUI() {
    DOM.compareCount.textContent = AppState.compareList.length;
    DOM.compareToggle.disabled = AppState.compareList.length < 2;
}

function openCompareModal() {
    if (AppState.compareList.length < 2) return;
    
    const properties = AppState.compareList.map(id => AppData.properties.find(p => p.id === id));
    
    const rows = [
        { label: t('Image', 'ምስል'), key: 'image' },
        { label: t('Project', 'ፕሮጀክት'), key: 'name' },
        { label: t('Developer', 'አበልጻጅ'), key: 'developerName' },
        { label: t('Location', 'ቦታ'), key: 'location' },
        { label: t('Type', 'አይነት'), key: 'type' },
        { label: t('Price Range', 'የዋጋ ክልል'), key: 'priceRange' },
        { label: t('Bedrooms', 'መኝታ ቤቶች'), key: 'bedrooms' },
        { label: t('Area', 'ስፋት'), key: 'area' },
        { label: t('Status', 'ሁኔታ'), key: 'status' },
        { label: t('ROI', 'ROI'), key: 'roi' },
        { label: t('Completion', 'መጠናቀቂያ'), key: 'completionDate' }
    ];
    
    DOM.compareTable.innerHTML = `
        <thead>
            <tr>
                <th>${t('Feature', 'ባህሪ')}</th>
                ${properties.map(p => `
                    <th>
                        <div class="compare-property-header">
                            <img src="${p.images[0]}" alt="${p.name}">
                            <h4>${t(p.name, p.nameAm)}</h4>
                        </div>
                    </th>
                `).join('')}
            </tr>
        </thead>
        <tbody>
            ${rows.map(row => `
                <tr>
                    <td>${row.label}</td>
                    ${properties.map(p => {
                        let value = p[row.key];
                        if (row.key === 'image') {
                            return `<td><img src="${p.images[0]}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;"></td>`;
                        }
                        if (row.key === 'name') value = t(p.name, p.nameAm);
                        if (row.key === 'location') value = t(p.location, p.locationAm);
                        if (row.key === 'type') {
                            value = p.type === 'residential' ? t('Residential', 'መኖሪያ') : 
                                   p.type === 'commercial' ? t('Commercial', 'ንግድ') : t('Mixed Use', 'ቅሚላ');
                        }
                        if (row.key === 'status') {
                            value = p.status === 'completed' ? t('Completed', 'የተጠናቀቀ') : t('Under Construction', 'በእድገት ላይ');
                        }
                        return `<td style="${row.key === 'roi' || row.key === 'priceRange' ? 'font-weight: 700; color: var(--gold);' : ''}">${value}</td>`;
                    }).join('')}
                </tr>
            `).join('')}
            <tr>
                <td>${t('Action', 'ድርጊት')}</td>
                ${properties.map(p => `
                    <td>
                        <a href="#details?${p.id}" class="btn btn-primary btn-sm" onclick="closeCompareModal()">${t('View', 'አስሳ')}</a>
                    </td>
                `).join('')}
            </tr>
        </tbody>
    `;
    
    DOM.compareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCompareModal() {
    DOM.compareModal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ============================================
   SHARE MODAL
   ============================================ */
function openShareModal(propertyId) {
    const property = AppData.properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const url = `${window.location.origin}${window.location.pathname}#details?${propertyId}`;
    const text = `Check out ${property.name} on Ethio Real Estate 3D Showcase!`;
    
    DOM.shareModal.querySelectorAll('.share-btn').forEach(btn => {
        btn.onclick = () => {
            const platform = btn.dataset.platform;
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        };
    });
    
    document.getElementById('copy-link').onclick = () => {
        navigator.clipboard.writeText(url).then(() => {
            showToast(t('Link copied to clipboard', 'አገናኝ ወደ ክሊፕቦርድ ተቀድቷል'), 'success');
        });
    };
    
    DOM.shareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeShareModal() {
    DOM.shareModal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ============================================
   3D VIEWER
   ============================================ */
function open3DViewer(propertyId) {
    // Dispatch event for Three.js viewer
    window.dispatchEvent(new CustomEvent('open3DViewer', { detail: { propertyId } }));
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.property-card, .feature-card, .investor-card, .award-category, .sponsor-card, .magazine-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/* ============================================
   EVENT LISTENERS
   ============================================ */
function initEventListeners() {
    // Close modals on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCompareModal();
            closeShareModal();
            closeFavoritesDrawer();
            closeMobileMenu();
        }
    });
    
    // Close share modal
    DOM.closeShare.addEventListener('click', closeShareModal);
    
    // Close modal on backdrop click
    DOM.compareModal.addEventListener('click', (e) => {
        if (e.target === DOM.compareModal) closeCompareModal();
    });
    DOM.shareModal.addEventListener('click', (e) => {
        if (e.target === DOM.shareModal) closeShareModal();
    });
}

/* ============================================
   EXPOSE GLOBALS
   ============================================ */
window.toggleFavorite = toggleFavorite;
window.toggleCompare = toggleCompare;
window.open3DViewer = open3DViewer;
window.openShareModal = openShareModal;
window.showToast = showToast;
window.closeCompareModal = closeCompareModal;
window.closeShareModal = closeShareModal;
window.closeFavoritesDrawer = closeFavoritesDrawer;