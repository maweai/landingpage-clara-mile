// Form validation and submission
const demoForm = document.getElementById('demo-form');
if (demoForm) {
    demoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(demoForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = demoForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you for your interest!</h3>
                <p>We'll contact you shortly to schedule your demo.</p>
                <p>In the meantime, check out our <a href="#case-studies">case studies</a> to learn more about how we've helped other companies.</p>
            `;
            
            demoForm.innerHTML = '';
            demoForm.appendChild(successMessage);
            
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'demo_request', {
                    'event_category': 'conversion',
                    'event_label': 'Demo Request Form'
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            submitButton.textContent = 'Error. Please try again.';
            submitButton.disabled = false;
        }
    });
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add exit intent popup
let hasShownExitIntent = false;
document.addEventListener('mouseout', (e) => {
    if (!hasShownExitIntent && e.clientY <= 0) {
        hasShownExitIntent = true;
        const popup = document.createElement('div');
        popup.className = 'exit-intent-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h3>Wait! Don't miss out on transforming your training program</h3>
                <p>Get a free demo and see how Clara MiLe can help you achieve 95% knowledge retention.</p>
                <form id="exit-form">
                    <div class="form-group">
                        <input type="email" placeholder="Work Email" required>
                    </div>
                    <button type="submit" class="cta-button primary">Get Free Demo</button>
                </form>
                <button class="close-popup">&times;</button>
            </div>
        `;
        document.body.appendChild(popup);
        
        // Handle popup close
        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
        });
        
        // Handle exit form submission
        popup.querySelector('#exit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            popup.remove();
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exit_intent_capture', {
                    'event_category': 'conversion',
                    'event_label': 'Exit Intent Form'
                });
            }
        });
    }
});

// Add scroll-based animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial check

// Add hover effects for cards
const cards = document.querySelectorAll('.card, .metric-card, .solution-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add styles for new elements
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: #007AFF;
        z-index: 1000;
        transition: width 0.1s ease;
    }
    
    .exit-intent-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .popup-content {
        background: #fff;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 500px;
        width: 90%;
        position: relative;
    }
    
    .close-popup {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
    
    .success-message {
        text-align: center;
        padding: 2rem;
    }
    
    .success-message h3 {
        color: #007AFF;
        margin-bottom: 1rem;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

// Language switching functionality
const languageSelector = document.querySelector('.language-selector');
const langButtons = document.querySelectorAll('.lang-btn');

// Get saved language preference or default to English
let currentLang = localStorage.getItem('preferredLanguage') || 'en';

// Function to update the active language button
const updateActiveButton = (lang) => {
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
};

// Function to translate the page
const translatePage = (lang) => {
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        const translation = key.split('.').reduce((obj, i) => obj[i], translations[lang]);
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update active button
    updateActiveButton(lang);
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
};

// Add click event listeners to language buttons
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        currentLang = lang;
        translatePage(lang);
    });
});

// Initial translation
translatePage(currentLang); 