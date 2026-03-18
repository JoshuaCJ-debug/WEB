document.addEventListener('DOMContentLoaded', function () {

    // --- NEW: Page loading indicator - ULTRA LIGHTWEIGHT ---
    function createLoadingIndicator() {
        var indicator = document.createElement('div');
        indicator.className = 'loading-indicator';
        indicator.id = 'page-loading-indicator';
        document.body.appendChild(indicator);
        return indicator;
    }

    function showLoadingProgress() {
        var indicator = document.getElementById('page-loading-indicator');
        if (!indicator) {
            indicator = createLoadingIndicator();
        }
        
        // Immediate lightweight progress - no delays
        requestAnimationFrame(function() {
            indicator.classList.add('loading');
            indicator.style.width = '50%';
        });
        
        // Complete quickly - just for visual feedback
        requestAnimationFrame(function() {
            indicator.style.width = '100%';
        });
    }

    function completeLoading() {
        var indicator = document.getElementById('page-loading-indicator');
        if (indicator) {
            indicator.classList.remove('loading');
            indicator.classList.add('complete');
            
            // Remove immediately - no waiting
            setTimeout(function() {
                indicator.remove();
            }, 100);
        }
    }

    // --- NEW: Enhance navigation with MINIMAL loading ---
    function enhanceNavigation() {
        var navLinks = document.querySelectorAll('.nav-bar a');
        navLinks.forEach(function(link) {
            // Skip external links and anchors
            if (link.hostname !== window.location.hostname || link.href.includes('#')) {
                return;
            }
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var targetUrl = this.href;
                
                // Show loading indicator IMMEDIATELY
                showLoadingProgress();
                
                // Minimal transition - just slight opacity change
                document.body.classList.add('page-transitioning');
                
                // Navigate immediately - no artificial delays
                setTimeout(function() {
                    window.location.href = targetUrl;
                }, 50); // Reduced from 400ms to 50ms
            });
        });
    }

    // --- Mobile hamburger toggle ---
    var hamburger = document.querySelector('.hamburger');
    var navBar = document.querySelector('.nav-bar');
    if (hamburger && navBar) {
        hamburger.addEventListener('click', function () {
            var isOpen = navBar.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
    }

    // Initialize enhanced navigation
    enhanceNavigation();

    // --- Active nav link highlighting ---
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-bar a');
    navLinks.forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Auto-scroll for profile-scroll containers ---
    var scrollTrack = document.querySelector('.profile-scroll');
    if (scrollTrack) {
        // Duplicate all cards for seamless infinite loop
        var originalCards = scrollTrack.innerHTML;
        scrollTrack.innerHTML = originalCards + originalCards;
    }

    // --- Registration form (demo) ---
    var regForm = document.getElementById('reg-form');
    if (regForm) {
        regForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Demo: registration submitted (no actual POST)');
        });
    }

    // --- Inquiry form (demo) ---
    var inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your inquiry! (Demo — no data sent)');
            inquiryForm.reset();
        });
    }

    // --- Accordion toggle (programs page) ---
    var headers = document.querySelectorAll('.accordion-header');
    headers.forEach(function (header) {
        header.addEventListener('click', function () {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content && content.classList.contains('accordion-content')) {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // --- NEW: Scroll animations ---
    function animateOnScroll() {
        var elements = document.querySelectorAll('.card, .profile-card, .news-card, .event-item, .highlight-card, .quick-nav-card');
        elements.forEach(function(element) {
            var elementTop = element.getBoundingClientRect().top;
            var elementBottom = element.getBoundingClientRect().bottom;
            var isVisible = (elementTop < window.innerHeight && elementBottom >= 0);
            
            if (isVisible && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease';
                
                setTimeout(function() {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }

    // Run scroll animations on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // --- NEW: Typing effect for main headings ---
    function typeWriter(element, text, speed = 50) {
        var i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect to main headings
    var mainHeading = document.querySelector('h1');
    if (mainHeading && !mainHeading.classList.contains('no-typing')) {
        var originalText = mainHeading.textContent;
        typeWriter(mainHeading, originalText, 60);
    }

    // --- NEW: Interactive counter animation for stats ---
    function animateCounter(element, target, duration = 2000) {
        var start = 0;
        var increment = target / (duration / 16);
        var current = start;
        
        function updateCounter() {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        updateCounter();
    }

    // Animate statistics when they come into view
    var stats = document.querySelectorAll('.stat');
    var statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        var statsSection = document.querySelector('.highlights-row');
        if (statsSection) {
            var rect = statsSection.getBoundingClientRect();
            var isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                statsAnimated = true;
                stats.forEach(function(stat) {
                    var text = stat.textContent;
                    var number = parseInt(text.replace(/[^0-9]/g, ''));
                    if (number) {
                        animateCounter(stat, number);
                    }
                });
            }
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();

    // --- NEW: Interactive profile card interactions ---
    var profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            // Create ripple effect
            var ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            var rect = this.getBoundingClientRect();
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });

    // --- NEW: Dynamic year in footer ---
    var footerYear = document.querySelector('footer');
    if (footerYear) {
        var currentYear = new Date().getFullYear();
        var footerText = footerYear.innerHTML;
        footerYear.innerHTML = footerText.replace(/\d{4}/g, currentYear);
    }

    // --- NEW: Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- NEW: Loading animation ---
    window.addEventListener('load', function() {
        // Complete any loading indicators
        completeLoading();
        
        // Remove transition class
        document.body.classList.remove('page-transitioning');
        
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
    });

    // --- Multi-step application form ---
    var applyForm = document.getElementById('apply-form');
    if (applyForm) {
        var steps = document.querySelectorAll('.form-step');
        var stepIndicators = document.querySelectorAll('.steps-bar .step');
        var currentStep = 1;

        // Clear previous errors on a field
        function clearError(field) {
            field.classList.remove('field-error');
            var msg = field.parentNode.querySelector('.error-msg');
            if (msg) msg.remove();
        }

        // Show error on a field
        function showError(field, message) {
            field.classList.add('field-error');
            if (!field.parentNode.querySelector('.error-msg')) {
                var span = document.createElement('span');
                span.className = 'error-msg';
                span.textContent = message;
                field.parentNode.appendChild(span);
            }
        }

        // Validate all required fields in a given step
        function validateStep(stepNum) {
            var stepEl = document.getElementById('step-' + stepNum);
            var fields = stepEl.querySelectorAll('[required]');
            var valid = true;

            fields.forEach(function (field) {
                clearError(field);

                if (field.type === 'radio') {
                    var group = stepEl.querySelectorAll('input[name="' + field.name + '"]');
                    var checked = false;
                    group.forEach(function (r) { if (r.checked) checked = true; });
                    if (!checked) {
                        var container = field.closest('.radio-group') || field;
                        showError(container, 'Please select an option.');
                        valid = false;
                    }
                    return;
                }

                if (!field.value.trim()) {
                    showError(field, 'This field is required.');
                    valid = false;
                } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    showError(field, 'Please enter a valid email address.');
                    valid = false;
                }
            });

            return valid;
        }

        // Go to a specific step
        function goToStep(num) {
            steps.forEach(function (s) { s.classList.remove('active'); });
            stepIndicators.forEach(function (s, i) {
                s.classList.remove('active');
                if (i + 1 < num) {
                    s.classList.add('done');
                } else {
                    s.classList.remove('done');
                }
            });

            document.getElementById('step-' + num).classList.add('active');
            stepIndicators[num - 1].classList.add('active');
            currentStep = num;

            // Scroll to top of form
            applyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Populate review if going to step 4
            if (num === 4) populateReview();
        }

        // Next buttons
        document.querySelectorAll('.btn-next').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var nextStep = parseInt(this.getAttribute('data-next'));
                if (validateStep(currentStep)) {
                    goToStep(nextStep);
                }
            });
        });

        // Back buttons
        document.querySelectorAll('.btn-prev').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var prevStep = parseInt(this.getAttribute('data-prev'));
                goToStep(prevStep);
            });
        });

        // Populate review step
        function populateReview() {
            var personal = document.getElementById('review-personal');
            var education = document.getElementById('review-education');
            var programme = document.getElementById('review-programme');

            function item(label, value) {
                return '<div class="review-item"><div class="review-label">' + label + '</div><div class="review-value">' + (value || '—') + '</div></div>';
            }

            function getRadioValue(name) {
                var checked = document.querySelector('input[name="' + name + '"]:checked');
                return checked ? checked.value.charAt(0).toUpperCase() + checked.value.slice(1) : '—';
            }

            function getSelectText(id) {
                var el = document.getElementById(id);
                return el.selectedIndex > 0 ? el.options[el.selectedIndex].text : '—';
            }

            personal.innerHTML =
                item('First Name', document.getElementById('first-name').value) +
                item('Last Name', document.getElementById('last-name').value) +
                item('Date of Birth', document.getElementById('dob').value) +
                item('Gender', getRadioValue('gender')) +
                item('Nationality', document.getElementById('nationality').value) +
                item('Phone', document.getElementById('phone').value) +
                item('Email', document.getElementById('app-email').value);

            education.innerHTML =
                item('Secondary School', document.getElementById('school').value) +
                item('UCE Year', document.getElementById('uce-year').value) +
                item('UCE Points', document.getElementById('uce-points').value) +
                item('UACE Year', document.getElementById('uace-year').value) +
                item('UACE Points', document.getElementById('uace-points').value) +
                item('Maths Grade', getSelectText('math-grade'));

            programme.innerHTML =
                item('Study Level', getSelectText('level')) +
                item('Programme', getSelectText('programme')) +
                item('Intake', getSelectText('intake')) +
                item('Funding', getSelectText('sponsor')) +
                item('Motivation', document.getElementById('motivation').value);
        }

        // Final submission
        applyForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var checkbox = document.getElementById('confirm-check');
            if (!checkbox.checked) {
                showError(checkbox, 'You must confirm before submitting.');
                return;
            }
            clearError(checkbox);

            // Show success modal
            document.getElementById('success-modal').classList.add('show');
        });

        // Clear field errors on input
        applyForm.addEventListener('input', function (e) {
            clearError(e.target);
        });
        applyForm.addEventListener('change', function (e) {
            clearError(e.target);
        });
    }

});
