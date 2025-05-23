/**
 * BloomVue Landing Page JavaScript
 * For interactive elements, animations, and mobile menu
 */

document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactInfo = document.querySelector('.contact-info');
    const header = document.querySelector('.header');
    
    if (menuToggle) {
        let isOpen = false;
        
        menuToggle.addEventListener('click', function() {
            isOpen = !isOpen;
            
            // Toggle active class on menu button
            this.classList.toggle('active');
            
            // Animate the menu button spans
            const spans = this.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                
                // Show mobile menu
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <div class="mobile-menu-links">
                        ${navLinks.innerHTML}
                    </div>
                    <div class="mobile-menu-contact">
                        ${contactInfo.innerHTML}
                    </div>
                `;
                
                header.appendChild(mobileMenu);
                
                // Add transition after a small delay
                setTimeout(() => {
                    mobileMenu.style.transform = 'translateY(0)';
                    mobileMenu.style.opacity = '1';
                }, 50);
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Hide and remove mobile menu
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) {
                    mobileMenu.style.transform = 'translateY(-20px)';
                    mobileMenu.style.opacity = '0';
                    
                    setTimeout(() => {
                        mobileMenu.remove();
                    }, 300);
                }
            }
        });
    }
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) {
                    menuToggle.click();
                }
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .hero-content, .hero-image, .value-content, .value-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight * 0.85) {
                element.classList.add('animate');
            }
        });
    };
    
    // Handle initial animations with a small delay
    setTimeout(function() {
        // Just animate elements in the first viewport without any scroll check
        const firstViewportElements = document.querySelectorAll('.hero-content, .hero-image');
        firstViewportElements.forEach(element => {
            element.classList.add('animate');
        });
        
        // Add scroll listener for remaining elements
        window.addEventListener('scroll', animateOnScroll);
        
        // Manually trigger once after a small delay for elements just below the fold
        setTimeout(animateOnScroll, 500);
    }, 100);
    
    // Add the CSS for animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .step, .hero-content, .hero-image, .value-content, .value-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .step.animate, .hero-content.animate, .hero-image.animate, .value-content.animate, .value-image.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--navbar);
            padding: 1rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-20px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 99;
        }
        
        .mobile-menu-links ul {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .mobile-menu-links li {
            margin: 0;
        }
        
        .mobile-menu-contact {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
        }
        
        .mobile-menu-contact a {
            color: var(--primary);
            font-weight: 500;
            text-decoration: none;
        }
        
        .mobile-menu-contact a:hover {
            text-decoration: underline;
        }
    `;
    
    document.head.appendChild(style);
});