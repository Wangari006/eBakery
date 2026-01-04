// Shopping cart functionality
let cartCount = 0;

// Theme management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.textContent = 'Light Mode';
        }
    }
    
    // Set up theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = 'Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = 'Dark Mode';
            }
        });
    }
}

// Update cart count display
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Add to cart functionality
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            updateCartCount();
            
            // Visual feedback
            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.backgroundColor = '#2E8B57';
            
            // Play a subtle sound (optional browser feature)
            if (window.AudioContext || window.webkitAudioContext) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            }
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1000);
        });
    });
}

// Dynamic greeting and date
function updateGreetingAndDate() {
    const greetingElement = document.getElementById('greeting');
    const dateElement = document.getElementById('date-display');
    
    if (!greetingElement && !dateElement) return;
    
    const now = new Date();
    const hours = now.getHours();
    let greeting = '';
    
    if (hours < 12) {
        greeting = 'Habari ya asubuhi!';
    } else if (hours < 18) {
        greeting = 'Habari ya mchana!';
    } else {
        greeting = 'Habari ya jioni!';
    }
    
    if (greetingElement) {
        greetingElement.textContent = `${greeting} Karibu to Viola Sweet Bakers!`;
    }
    
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = `Leo ni ${now.toLocaleDateString('en-US', options)}`;
    }
}

// Form validation
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Get form elements
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formMessage = document.getElementById('formMessage');
        
        // Name validation
        if (!nameInput.value.trim()) {
            document.getElementById('nameError').textContent = 'Jina linahitajika';
            isValid = false;
        }
        
        // Phone validation (Kenyan format)
        const phoneRegex = /^07[0-9]{8}$/;
        const cleanPhone = phoneInput.value.replace(/\s/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            document.getElementById('phoneError').textContent = 'Tafadhali ingiza nambari sahihi (07XXXXXXXX)';
            isValid = false;
        }
        
        // Email validation (optional)
        if (emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                document.getElementById('emailError').textContent = 'Tafadhali ingiza barua pepe sahihi';
                isValid = false;
            }
        }
        
        // Message validation
        if (!messageInput.value.trim()) {
            document.getElementById('messageError').textContent = 'Ujumbe unahitajika';
            isValid = false;
        }
        
        // Handle form submission
        if (isValid) {
            // Show success message
            formMessage.textContent = 'Asante! Ujumbe wako umepokelewa. Tutawasiliana nawe hivi karibuni.';
            formMessage.className = 'success-message';
            
            // Reset form
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        } else {
            // Show error message
            formMessage.textContent = 'Tafadhali sahihisha makosa hapo juu.';
            formMessage.className = 'error-message-display';
        }
    });
}

// Format phone number as user types
function formatPhoneNumber() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('0')) {
                value = value.substring(0, 10);
                if (value.length > 3 && value.length <= 6) {
                    value = value.substring(0, 3) + ' ' + value.substring(3);
                } else if (value.length > 6) {
                    value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
                }
            }
            e.target.value = value;
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Update cart count display
    updateCartCount();
    
    // Setup add to cart buttons
    setupAddToCartButtons();
    
    // Update greeting and date
    updateGreetingAndDate();
    
    // Setup contact form validation
    setupContactForm();
    
    // Format phone number
    formatPhoneNumber();
    
    // Display cart count in console for debugging
    console.log('Viola Sweet Bakers website loaded successfully!');
    console.log('Location: Gataka, Karen, Nairobi');
    console.log('Contact: 0791 565 621');
});