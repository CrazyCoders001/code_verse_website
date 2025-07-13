// Main JavaScript file for CodeVerse website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeModal();
    initializeAuthTabs();
    initializeForms();
    initializeRatingStars();
    initializeSmoothScrolling();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('authModal');
    const authBtn = document.querySelector('.auth-btn');
    const closeBtn = document.querySelector('.close');
    const authLinks = document.querySelectorAll('a[href="#auth"]');

    // Open modal when clicking auth button or auth links
    authBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    authLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Authentication tabs functionality
function initializeAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            document.getElementById(targetTab + 'Form').classList.add('active');
        });
    });
}

// Form handling functionality
function initializeForms() {
    // Sign in form
    const signinForm = document.getElementById('signinForm');
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignIn(new FormData(this));
    });

    // Sign up form
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignUp(new FormData(this));
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactForm(new FormData(this));
    });

    // Feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFeedbackForm(new FormData(this));
    });

    // Course enrollment buttons
    const enrollButtons = document.querySelectorAll('.course-card .btn');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleCourseEnrollment(this);
        });
    });
}

// Rating stars functionality
function initializeRatingStars() {
    const stars = document.querySelectorAll('.rating-stars .star');
    let currentRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            updateStarDisplay(stars, currentRating);
        });

        star.addEventListener('mouseenter', function() {
            const hoverRating = parseInt(this.dataset.rating);
            updateStarDisplay(stars, hoverRating);
        });
    });

    // Reset stars on mouse leave
    const ratingContainer = document.querySelector('.rating-stars');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', function() {
            updateStarDisplay(stars, currentRating);
        });
    }
}

function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.course-card, .past-course-card, .feedback-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Form handlers
function handleSignIn(formData) {
    const submitButton = document.querySelector('#signinForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Signing In...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const email = formData.get('signinEmail');
        const password = formData.get('signinPassword');
        
        if (email && password) {
            // Simulate successful sign in
            showMessage('Sign in successful! Welcome back.', 'success');
            document.getElementById('authModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Update UI to show signed in state
            updateAuthUI(email);
        } else {
            showMessage('Please fill in all fields.', 'error');
        }
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function handleSignUp(formData) {
    const submitButton = document.querySelector('#signupForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const name = formData.get('signupName');
        const email = formData.get('signupEmail');
        const mobile = formData.get('signupMobile');
        const password = formData.get('signupPassword');
        const confirmPassword = formData.get('signupConfirmPassword');
        
        if (name && email && mobile && password && confirmPassword) {
            if (password === confirmPassword) {
                // Simulate successful sign up
                showMessage('Account created successfully! Welcome to CodeVerse Academy.', 'success');
                document.getElementById('authModal').style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Update UI to show signed in state
                updateAuthUI(email);
            } else {
                showMessage('Passwords do not match.', 'error');
            }
        } else {
            showMessage('Please fill in all fields.', 'error');
        }
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function handleContactForm(formData) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const name = formData.get('contactName');
        const email = formData.get('contactEmail');
        const subject = formData.get('contactSubject');
        const message = formData.get('contactMessage');
        
        if (name && email && subject && message) {
            showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            document.getElementById('contactForm').reset();
        } else {
            showMessage('Please fill in all fields.', 'error');
        }
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function handleFeedbackForm(formData) {
    const submitButton = document.querySelector('#feedbackForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const name = formData.get('studentName');
        const course = formData.get('courseName');
        const rating = document.querySelectorAll('.rating-stars .star.active').length;
        const feedback = formData.get('feedback');
        
        if (name && course && rating > 0 && feedback) {
            showMessage('Thank you for your feedback! Your review has been submitted.', 'success');
            
            // Add feedback to display
            addFeedbackToDisplay(name, course, rating, feedback);
            
            // Reset form
            document.getElementById('feedbackForm').reset();
            document.querySelectorAll('.rating-stars .star').forEach(star => {
                star.classList.remove('active');
            });
        } else {
            showMessage('Please fill in all fields and select a rating.', 'error');
        }
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function handleCourseEnrollment(button) {
    const courseCard = button.closest('.course-card');
    const courseName = courseCard.querySelector('h3').textContent;
    
    // Check if user is signed in (simulate check)
    if (!localStorage.getItem('userEmail')) {
        showMessage('Please sign in to enroll in courses.', 'info');
        document.getElementById('authModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        return;
    }
    
    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Enrolling...';
    button.disabled = true;
    
    // Simulate enrollment process
    setTimeout(() => {
        showMessage(`Successfully enrolled in ${courseName}! Check your email for course details.`, 'success');
        button.textContent = 'Enrolled ✓';
        button.style.background = '#28a745';
        button.disabled = false;
    }, 1500);
}

// Utility functions
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            messageElement.style.background = '#28a745';
            break;
        case 'error':
            messageElement.style.background = '#dc3545';
            break;
        case 'info':
            messageElement.style.background = '#17a2b8';
            break;
        default:
            messageElement.style.background = '#ff6b35';
    }
    
    // Add to DOM
    document.body.appendChild(messageElement);
    
    // Remove after 4 seconds
    setTimeout(() => {
        messageElement.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 300);
    }, 4000);
}

function updateAuthUI(email) {
    const authBtn = document.querySelector('.auth-btn');
    authBtn.textContent = email.split('@')[0]; // Show username
    authBtn.href = '#profile';
    
    // Store user email for future use
    localStorage.setItem('userEmail', email);
}

function addFeedbackToDisplay(name, course, rating, feedback) {
    const feedbackDisplay = document.querySelector('.feedback-display');
    
    // Create stars string
    const starsString = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
    // Create feedback card
    const feedbackCard = document.createElement('div');
    feedbackCard.className = 'feedback-card';
    feedbackCard.innerHTML = `
        <div class="stars">${starsString}</div>
        <p>"${feedback}"</p>
        <div class="student-info">
            <strong>- ${name}</strong>
            <span>${course.charAt(0).toUpperCase() + course.slice(1).replace('-', ' ')} Course</span>
        </div>
    `;
    
    // Add to top of feedback display
    feedbackDisplay.insertBefore(feedbackCard, feedbackDisplay.firstChild);
}

// Add CSS for message animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('load', function() {
    // Check if user is already signed in
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        updateAuthUI(userEmail);
    }
    
    // Add fade-in effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transition = 'opacity 0.8s ease-out';
        setTimeout(() => {
            hero.style.opacity = '1';
        }, 100);
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ff6b35;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: none;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', scrollToTop);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
        setTimeout(() => {
            scrollToTopBtn.style.display = 'none';
        }, 300);
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 44, 44, 0.98)';
    } else {
        navbar.style.background = 'rgba(44, 44, 44, 0.95)';
    }
});

// Typing effect for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for hero title
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
}, 1000);

// Code animation restart on scroll
function restartCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach(line => {
        line.style.animation = 'none';
        line.offsetHeight; // Trigger reflow
        line.style.animation = null;
    });
}

// Restart animation when hero section comes into view
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(restartCodeAnimation, 500);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);
} 
