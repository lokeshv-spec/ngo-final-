// ========== SHARED UTILITIES ==========

function initLoadingIntro() {
    const loader = document.getElementById('loading-spinner');
    if (!loader) {
        window.dispatchEvent(new CustomEvent('homeLoaderComplete'));
        return;
    }

    const isHomePage = /(^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname === '/' || window.location.pathname.endsWith('/NGO/');
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const isReload = navigationEntry && navigationEntry.type === 'reload';
    const hasSeenLoader = sessionStorage.getItem('homeLoaderSeen') === 'true';
    const shouldShowLoader = isHomePage && (!hasSeenLoader || isReload);
    const scrollToHero = () => {
        const hero = document.getElementById('hero');
        if (hero) {
            hero.scrollIntoView({ block: 'start' });
        }
    };

    if (!shouldShowLoader) {
        loader.classList.add('fade-out');
        document.body.classList.remove('loading-active');
        scrollToHero();
        window.setTimeout(() => {
            window.dispatchEvent(new CustomEvent('homeLoaderComplete'));
        }, 500);
        return;
    }

    document.body.classList.add('loading-active');

    const hideLoader = () => {
        window.setTimeout(() => {
            loader.classList.add('fade-out');
            document.body.classList.remove('loading-active');
            sessionStorage.setItem('homeLoaderSeen', 'true');
            scrollToHero();
            window.dispatchEvent(new CustomEvent('homeLoaderComplete'));
        }, 10000);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader, { once: true });
    }
}

function getNgoDatabase() {
    return JSON.parse(localStorage.getItem('ngo_database') || '{}');
}

function saveNgoDatabase(database) {
    localStorage.setItem('ngo_database', JSON.stringify(database));
}

function openBelCupRegistration() {
    const popup = document.getElementById('event-popup');
    const dialog = popup ? popup.querySelector('.event-popup-dialog') : null;
    const panel = document.getElementById('event-registration-panel');
    if (!popup || !dialog || !panel) {
        return;
    }

    popup.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');
    dialog.classList.add('form-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('loading-active');
    window.setTimeout(() => {
        const nameInput = document.getElementById('event-name');
        if (nameInput) {
            nameInput.focus();
        }
    }, 100);
}

function initBelCupPopup() {
    const popup = document.getElementById('event-popup');
    const form = document.getElementById('event-registration-form');
    if (!popup || !form) {
        return;
    }

    const dialog = popup.querySelector('.event-popup-dialog');
    const closeButton = document.getElementById('event-popup-close');
    const registerToggle = document.getElementById('event-register-toggle');
    const registrationPanel = document.getElementById('event-registration-panel');
    const message = document.getElementById('event-form-message');
    const openPopup = () => {
        if (sessionStorage.getItem('belCupPopupSeen') === 'true') {
            return;
        }
        popup.classList.add('active');
        popup.setAttribute('aria-hidden', 'false');
        document.body.classList.add('loading-active');
        sessionStorage.setItem('belCupPopupSeen', 'true');
    };
    const closePopup = () => {
        popup.classList.remove('active');
        popup.setAttribute('aria-hidden', 'true');
        dialog.classList.remove('form-open');
        registrationPanel.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('loading-active');
    };

    window.addEventListener('homeLoaderComplete', () => {
        window.setTimeout(openPopup, 500);
    }, { once: true });

    closeButton.addEventListener('click', closePopup);
    registerToggle.addEventListener('click', function() {
        openBelCupRegistration();
    });
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            closePopup();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const registration = {
            id: 'BEL' + Date.now().toString(),
            name: document.getElementById('event-name').value.trim(),
            phone: document.getElementById('event-phone').value.trim(),
            age: document.getElementById('event-age').value,
            gender: document.getElementById('event-gender').value,
            category: document.getElementById('event-category').value,
            partner: document.getElementById('event-partner').value.trim(),
            eventName: 'BEL Cup 2026 Badminton Tournament',
            registeredAt: new Date().toISOString()
        };

        if (!validatePhone(registration.phone)) {
            message.textContent = 'Please enter a valid 10-digit phone number.';
            message.style.color = '#f44336';
            return;
        }

        const database = getNgoDatabase();
        database.volunteers = database.volunteers || [];
        database.donations = database.donations || [];
        database.contacts = database.contacts || [];
        database.eventRegistrations = database.eventRegistrations || [];
        database.settings = database.settings || {
            totalRaised: 3250000,
            totalBeneficiaries: 15000,
            totalPrograms: 3
        };
        database.eventRegistrations.push(registration);
        saveNgoDatabase(database);

        form.reset();
        message.textContent = 'Registration saved. Our team will contact you soon.';
        message.style.color = '#00796B';

        window.setTimeout(closePopup, 1500);
    });
}

function scrollToHeroSection() {
    const hero = document.getElementById('hero');
    if (hero) {
        hero.scrollIntoView({ block: 'start' });
    }
}

function initReloadHeroScroll() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const isReload = navigationEntry && navigationEntry.type === 'reload';
    const hasLoader = Boolean(document.getElementById('loading-spinner'));

    if (!isReload || hasLoader) {
        return;
    }

    window.setTimeout(scrollToHeroSection, 0);
}

// Navigate to different pages
function navigateTo(page) {
    window.location.href = `${page}.html`;
}

// Initialize mobile menu toggle
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (toggle) {
        toggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when link is clicked
    if (navLinks) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Smooth scroll behavior
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animate counters
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Initialize all animated counters on page
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target') || 0);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function renderEventGallery(files) {
    const gallery = document.getElementById('event-photos-grid');
    if (!gallery) {
        return;
    }

    gallery.innerHTML = '';
    if (!files || !files.length) {
        gallery.innerHTML = '<div class="event-empty-message">No event photos have been uploaded yet.</div>';
        return;
    }

    files.forEach(item => {
        const card = document.createElement('div');
        card.className = 'event-photo-card';

        const img = document.createElement('img');
        img.alt = item.name || 'Event photo';
        if (item.src) {
            img.src = item.src;
        } else if (item instanceof File) {
            const reader = new FileReader();
            reader.onload = function(event) {
                img.src = event.target.result;
            };
            reader.readAsDataURL(item);
        }

        const caption = document.createElement('div');
        caption.className = 'event-photo-caption';
        caption.textContent = item.name || item.id || 'Event photo';

        card.appendChild(img);
        card.appendChild(caption);
        gallery.appendChild(card);
    });
}

function initEventGallery() {
    const uploadInput = document.getElementById('event-upload-input');
    const clearButton = document.getElementById('event-clear-btn');
    const gallery = document.getElementById('event-photos-grid');
    if (!uploadInput || !clearButton || !gallery) {
        if (!gallery) {
            return;
        }
        renderEventGallery(backend.getEventPhotos());
        return;
    }

    const selectedPhotos = [];

    function saveSelectedPhotos(files) {
        const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (!validFiles.length) {
            return;
        }

        Promise.all(validFiles.map(file => new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = function(event) {
                resolve({
                    name: file.name,
                    src: event.target.result
                });
            };
            reader.readAsDataURL(file);
        }))).then(photoItems => {
            photoItems.forEach(photo => backend.addEventPhoto(photo));
            renderEventGallery(backend.getEventPhotos());
        });
    }

    uploadInput.addEventListener('change', function(event) {
        const files = event.target.files;
        if (!files || !files.length) {
            return;
        }
        saveSelectedPhotos(files);
        uploadInput.value = '';
    });

    clearButton.addEventListener('click', function() {
        if (confirm('Clear all uploaded event photos?')) {
            backend.clearEventPhotos();
            renderEventGallery(backend.getEventPhotos());
        }
    });

    renderEventGallery(backend.getEventPhotos());
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone.replace(/\D/g, ''));
}

function showMessage(message, type = 'success') {
    let messageElement;
    
    if (type === 'success') {
        messageElement = document.getElementById('success-message');
    } else {
        messageElement = document.getElementById('error-message');
    }
    
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    initBelCupPopup();
    initLoadingIntro();
    initReloadHeroScroll();
    initMobileMenu();
    initSmoothScroll();
    initEventGallery();
    initCounters();
});
