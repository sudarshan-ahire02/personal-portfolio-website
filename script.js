/* 
================================================================
PORTFOLIO INTERACTIONS & ANIMATIONS (VANILLA JAVASCRIPT)
Client: Sudarshan Pradip Ahire
================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PRELOADER & LOADING BAR
    // ==========================================
    const preloader = document.getElementById('preloader');
    const progressPercent = document.querySelector('.loader-progress');
    
    if (preloader) {
        let percentage = 0;
        const progressInterval = setInterval(() => {
            percentage += Math.floor(Math.random() * 15) + 5;
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(progressInterval);
                
                // Smooth fade out
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    
                    // Trigger initial scroll reveals once preloader is gone
                    triggerScrollReveals();
                }, 500);
            }
            if (progressPercent) {
                progressPercent.textContent = `LOADING... ${percentage}%`;
            }
        }, 80);
    }

    // ==========================================
    // 2. SCROLL PROGRESS BAR & STICKY NAVBAR
    // ==========================================
    const navbar = document.querySelector('.navbar-custom');
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;

        // Update progress bar
        if (scrollProgress) {
            scrollProgress.style.width = `${scrolled}%`;
        }

        // Navbar scrolled state
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back To Top visibility
        if (backToTopBtn) {
            if (scrollTop > 600) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Active link tracking
        trackActiveSection();
    });

    // Back to top click event
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 3. COLLAPSIBLE NAV AUTO-CLOSE
    // ==========================================
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Dynamic active tracking logic
    const sections = document.querySelectorAll('section[id]');
    
    function trackActiveSection() {
        const scrollY = window.pageYOffset + 150; // offset for nav header height

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.navbar-custom .nav-link[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.navbar-custom .nav-link[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 4. TYPING TEXT ANIMATION (VANILLA JS)
    // ==========================================
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Frontend Developer", "Web Developer", "Frontend Enthusiast", "Fast Learner"];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newTextDelay = 1500; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (typedTextSpan) {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }
    }

    function erase() {
        if (typedTextSpan) {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingSpeed);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingSpeed + 500);
            }
        }
    }

    // Start typing after a short delay
    setTimeout(() => {
        if (textArray.length) type();
    }, 1200);

    // ==========================================
    // 5. SCROLL REVEALS & ANIMS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    function triggerScrollReveals() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', triggerScrollReveals);

    // ==========================================
    // 6. SKILL BARS FILL-ON-SCROLL
    // ==========================================
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    let skillBarsAnimated = false;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillBarsAnimated) {
                progressBars.forEach(bar => {
                    const widthVal = bar.getAttribute('data-progress');
                    bar.style.width = widthVal;
                });
                skillBarsAnimated = true;
            }
        });
    }, { threshold: 0.15 });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // ==========================================
    // 7. MOCK CODE TYPING SIMULATOR (3D ILLUSTRATION)
    // ==========================================
    const codeLines = [
        '<span class="const">const</span> <span class="keyword">developer</span> = {',
        '  name: <span class="string">"Sudarshan Ahire"</span>,',
        '  role: <span class="string">"Frontend Developer"</span>,',
        '  location: <span class="string">"Pune, India"</span>,',
        '  skills: [',
        '    <span class="string">"React"</span>, <span class="string">"Node"</span>,',
        '    <span class="string">"Bootstrap"</span>, <span class="string">"MongoDB"</span>',
        '  ],',
        '  passionate: <span class="keyword">true</span>,',
        '  code: <span class="function">() =&gt;</span> {',
        '    console.log(<span class="string">"Keep coding!"</span>);',
        '  }',
        '};'
    ];

    const codeContainer = document.getElementById('typing-code-terminal');
    if (codeContainer) {
        let currentLine = 0;
        let currentChar = 0;
        let innerHTMLAccumulator = "";
        
        function typeCode() {
            if (currentLine < codeLines.length) {
                const lineContent = codeLines[currentLine];
                
                // Render HTML directly instead of character-by-character to preserve spans,
                // but do it line by line for smooth typing simulation.
                setTimeout(() => {
                    codeContainer.innerHTML += lineContent + "<br>";
                    currentLine++;
                    codeContainer.scrollTop = codeContainer.scrollHeight;
                    typeCode();
                }, 400);
            } else {
                // Loop or clear
                setTimeout(() => {
                    codeContainer.innerHTML = "";
                    currentLine = 0;
                    typeCode();
                }, 5000);
            }
        }
        
        // Start after loading screen fades
        setTimeout(typeCode, 2000);
    }

    // ==========================================
    // 8. CONTACT FORM SUBMISSION DECORATOR
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Note: Since we are building a purely static web component or sending to massege.php:
            // Let's add aesthetic feedback logic.
            // If they are sending to massege.php, we let the default behavior run or handle with AJAX
            const emailInput = document.getElementById('email').value;
            const nameInput = document.getElementById('name').value;

            if (!emailInput || !nameInput) {
                e.preventDefault();
                alert('Please fill out Name and Email.');
            }
            // Aesthetic button loading state:
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            }
        });
    }
});
