document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Dispatch event for other components to react to theme change
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
            
            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    // const insuranceForm = document.getElementById('insuranceForm');
    // if (insuranceForm) {
    //     insuranceForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Form validation
    //         const formData = new FormData(this);
    //         let isValid = true;
            
    //         formData.forEach((value, key) => {
    //             if (key !== 'message' && value.trim() === '') {
    //                 isValid = false;
    //                 const input = this.querySelector(`[name="${key}"]`);
    //                 input.style.borderColor = 'var(--danger-color)';
                    
    //                 // Remove error style after 3 seconds
    //                 setTimeout(() => {
    //                     input.style.borderColor = 'var(--border-color)';
    //                 }, 3000);
    //             }
    //         });
            
    //         if (isValid) {
    //             // Simulate form submission (replace with actual AJAX call)
    //             this.querySelector('button').textContent = 'Sending...';
    //             this.querySelector('button').disabled = true;
                
    //             setTimeout(() => {
    //                 alert('Thank you for your request! Our agent will contact you shortly.');
    //                 this.reset();
    //                 this.querySelector('button').textContent = 'Get My Free Quote';
    //                 this.querySelector('button').disabled = false;
    //             }, 1500);
    //         } else {
    //             alert('Please fill in all required fields.');
    //         }
    //     });
    // }
    
    // Form submission handling

    const insuranceForm = document.getElementById('insuranceForm');
    form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop default form action
            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success){
                    // ✅ Redirect to thank-you page (you can customize this)
                    window.location.href="Thankyou.html";
                } else {
                    messageDiv.innerHTML = "<p class='error-message'>❌ Error sending message. Try again later.</p>";
                }
            } catch (error) {
                messageDiv.innerHTML = "<p class='error-message'>❌ Network error. Please check your connection.</p>";
            }
        });

    // Testimonial slider navigation
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px var(--shadow-color)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Responsive adjustments
    function handleResponsive() {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});
