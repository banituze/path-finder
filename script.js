/**
 * =========================================
 * PathFinder - BSE Specialisation Advisor
 * JavaScript Controller
 * Author: Winebald Banituze
 * =========================================
 */

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // GLOBAL VARIABLES & CONFIGURATION
    // =========================================
    
    /**
     * Quiz configuration object
     * Stores all quiz-related settings and state
     */
    const quizConfig = {
        totalQuestions: 10,
        currentQuestion: 1,
        scores: {
            lowlevel: 0,
            arvr: 0,
            fullstack: 0,
            ml: 0
        },
        maxSkillSelections: 3,
        rankingOrder: []
    };

    /**
     * Specialisation data object
     * Contains detailed information for each specialisation result
     */
    const specialisationData = {
        lowlevel: {
            name: "Low-Level Programming",
            tagline: "The Machine Whisperer",
            icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="8" y="8" width="32" height="32" rx="4"/>
                <path d="M16 16h16M16 24h16M16 32h10"/>
                <circle cx="38" cy="32" r="2" fill="currentColor"/>
            </svg>`,
            reasoning: `Based on your responses, you show a strong affinity for understanding how things work at their core. 
                You're drawn to performance optimization, enjoy working close to hardware, and appreciate the elegance of efficient code.
                Your problem-solving approach tends to be systematic and detail-oriented.`,
            traits: [
                "Detail-oriented thinking",
                "Performance-focused mindset",
                "Systems-level curiosity",
                "Patience for debugging complex issues"
            ],
            steps: [
                { title: "Learn C/C++", desc: "Start with fundamentals of systems programming" },
                { title: "Study Computer Architecture", desc: "Understand how CPUs and memory work" },
                { title: "Build an OS Component", desc: "Try writing a simple bootloader or driver" },
                { title: "Explore Embedded Systems", desc: "Get hands-on with Arduino or Raspberry Pi" }
            ]
        },
        arvr: {
            name: "AR/VR Development",
            tagline: "The Reality Architect",
            icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 16a4 4 0 014-4h32a4 4 0 014 4v16a4 4 0 01-4 4H8a4 4 0 01-4-4V16z"/>
                <circle cx="16" cy="24" r="5"/><circle cx="32" cy="24" r="5"/>
            </svg>`,
            reasoning: `Your responses reveal a creative spirit combined with technical aptitude. 
                You're excited by the possibility of creating immersive experiences and new worlds.
                You value both aesthetics and functionality, and you're drawn to cutting-edge technology.`,
            traits: [
                "Creative and imaginative thinking",
                "Strong spatial awareness",
                "User experience focused",
                "Enthusiasm for emerging tech"
            ],
            steps: [
                { title: "Learn Unity or Unreal", desc: "Master a game engine for XR development" },
                { title: "Study 3D Graphics", desc: "Understand rendering, shaders, and optimization" },
                { title: "Build a VR Experience", desc: "Create a simple interactive VR project" },
                { title: "Explore Spatial Design", desc: "Learn UX principles for immersive environments" }
            ]
        },
        fullstack: {
            name: "Full-Stack Web Development",
            tagline: "The Digital Bridge Builder",
            icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="6" y="8" width="36" height="32" rx="4"/>
                <path d="M6 16h36M18 24v12M30 24v12"/>
            </svg>`,
            reasoning: `Your answers show you're motivated by creating products that reach and impact real users.
                You enjoy the full picture - from database design to beautiful interfaces.
                You're pragmatic, user-focused, and energized by seeing your work deployed and used.`,
            traits: [
                "End-to-end thinking",
                "User-centric mindset",
                "Versatility and adaptability",
                "Product-oriented approach"
            ],
            steps: [
                { title: "Master JavaScript", desc: "Deepen your frontend and backend JS skills" },
                { title: "Learn a Framework", desc: "Pick React, Vue, or Angular and go deep" },
                { title: "Build Full-Stack Projects", desc: "Create apps with databases and authentication" },
                { title: "Deploy to Production", desc: "Learn cloud platforms and DevOps basics" }
            ]
        },
        ml: {
            name: "Machine Learning",
            tagline: "The Pattern Seeker",
            icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="24" cy="24" r="6"/>
                <path d="M24 6v6M24 36v6M6 24h6M36 24h6"/>
                <path d="M11.76 11.76l4.24 4.24M32 32l4.24 4.24M11.76 36.24l4.24-4.24M32 16l4.24-4.24"/>
            </svg>`,
            reasoning: `Your responses indicate a fascination with data, patterns, and intelligent systems.
                You're drawn to solving complex problems through algorithmic thinking.
                You're curious about how machines can learn and make decisions.`,
            traits: [
                "Analytical and mathematical thinking",
                "Curiosity about intelligence",
                "Data-driven decision making",
                "Research-oriented mindset"
            ],
            steps: [
                { title: "Strengthen Python & Math", desc: "Master Python, linear algebra, and statistics" },
                { title: "Learn ML Fundamentals", desc: "Study algorithms, models, and evaluation methods" },
                { title: "Practice with Datasets", desc: "Work on Kaggle competitions and real data" },
                { title: "Explore Deep Learning", desc: "Dive into neural networks and frameworks" }
            ]
        }
    };

    // =========================================
    // UTILITY FUNCTIONS
    // =========================================

    /**
     * Debounce function to limit how often a function can be called
     * @param {Function} func - Function to debounce
     * @param {number} wait - Milliseconds to wait
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Animate counter from 0 to target value
     * @param {HTMLElement} element - Element to animate
     * @param {number} target - Target number
     * @param {number} duration - Animation duration in ms
     */
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }

    // =========================================
    // NAVIGATION FUNCTIONALITY
    // =========================================

    /**
     * Initialize navigation toggle for mobile
     * Handles hamburger menu click and navigation state
     */
    function initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (navToggle && navLinks) {
            // Toggle navigation menu on click
            navToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            
            // Close menu when clicking a link
            navLinks.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    }

    /**
     * Handle navigation scroll effect
     * Adds 'scrolled' class to nav when page is scrolled
     */
    function initScrollEffect() {
        const nav = document.getElementById('mainNav');
        
        if (nav) {
            const handleScroll = debounce(function() {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }, 10);
            
            window.addEventListener('scroll', handleScroll);
        }
    }

    // =========================================
    // LANDING PAGE FUNCTIONALITY
    // =========================================

    /**
     * Initialize typing effect for hero subtitle
     * Creates typewriter animation effect
     */
    function initTypingEffect() {
        const typingElement = document.getElementById('typingText');
        
        if (typingElement) {
            const texts = [
                'INITIALIZING NEURAL PATHWAYS...',
                'MAPPING YOUR POTENTIAL...',
                'READY TO DISCOVER YOUR PATH?'
            ];
            
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 50;
            
            function type() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    // Remove characters
                    typingElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 30;
                } else {
                    // Add characters
                    typingElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 50;
                }
                
                // Check if word is complete
                if (!isDeleting && charIndex === currentText.length) {
                    typingSpeed = 2000; // Pause at end
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typingSpeed = 500; // Pause before next word
                }
                
                setTimeout(type, typingSpeed);
            }
            
            // Start typing after a short delay
            setTimeout(type, 1000);
        }
    }

    /**
     * Initialize neural network canvas animation
     * Creates animated particle/constellation background
     */
    function initNeuralCanvas() {
        const canvas = document.getElementById('neural-canvas');
        
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // Initialize particles
        function initParticles() {
            particles = [];
            const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        // Draw connections between nearby particles
        function drawConnections() {
            const maxDistance = 150;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            drawConnections();
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Initialize
        resizeCanvas();
        initParticles();
        animate();
        
        // Handle resize
        window.addEventListener('resize', debounce(function() {
            resizeCanvas();
            initParticles();
        }, 200));
    }

    /**
     * Initialize stat counters animation
     * Animates numbers when they come into view
     */
    function initStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    // =========================================
    // QUIZ FUNCTIONALITY
    // =========================================

    /**
     * Initialize quiz page functionality
     * Sets up all quiz interactions and navigation
     */
    function initQuiz() {
        const quizForm = document.getElementById('quizForm');
        
        if (!quizForm) return;
        
        // DOM elements
        const sections = document.querySelectorAll('.question-section');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const progressFill = document.getElementById('progressFill');
        const currentQSpan = document.getElementById('currentQ');
        const progressPercent = document.getElementById('progressPercent');
        
        /**
         * Update progress bar and indicators
         */
        function updateProgress() {
            const progress = ((quizConfig.currentQuestion - 1) / quizConfig.totalQuestions) * 100;
            progressFill.style.width = `${progress}%`;
            currentQSpan.textContent = quizConfig.currentQuestion;
            progressPercent.textContent = `${Math.round(progress)}%`;
        }
        
        /**
         * Show specific question section
         * @param {number} questionNum - Question number to show
         */
        function showQuestion(questionNum) {
            sections.forEach((section, index) => {
                if (index + 1 === questionNum) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Update navigation buttons
            prevBtn.disabled = questionNum === 1;
            
            if (questionNum === quizConfig.totalQuestions) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'flex';
            } else {
                nextBtn.style.display = 'flex';
                submitBtn.style.display = 'none';
            }
            
            updateProgress();
            
            // Scroll to top of quiz
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        /**
         * Validate current question before proceeding
         * @returns {boolean} Whether the question is valid
         */
        function validateCurrentQuestion() {
            const currentSection = document.querySelector(`.question-section[data-question="${quizConfig.currentQuestion}"]`);
            const errorElement = document.getElementById(`error-q${quizConfig.currentQuestion}`);
            
            let isValid = false;
            
            // Different validation based on question type
            switch (quizConfig.currentQuestion) {
                case 1: // Visual cards - radio
                case 3: // Icon options - radio
                case 4: // Matrix - radio
                case 5: // Word cloud - radio
                case 7: // Scenario - radio
                case 9: // Philosophy - radio
                case 10: // Final - radio
                    const radioName = `q${quizConfig.currentQuestion}`;
                    isValid = document.querySelector(`input[name="${radioName}"]:checked`) !== null;
                    break;
                    
                case 2: // Slider - always valid (has default)
                    isValid = true;
                    break;
                    
                case 6: // Checkbox - exactly 3
                    const checked = document.querySelectorAll('input[name="q6"]:checked');
                    isValid = checked.length === 3;
                    break;
                    
                case 8: // Ranking - all must be ranked
                    isValid = quizConfig.rankingOrder.length === 4;
                    break;
            }
            
            // Show/hide error
            if (errorElement) {
                if (isValid) {
                    errorElement.classList.remove('show');
                } else {
                    errorElement.classList.add('show');
                }
            }
            
            return isValid;
        }
        
        /**
         * Record answer for current question
         * Updates scores based on selected answers
         */
        function recordAnswer() {
            switch (quizConfig.currentQuestion) {
                case 1: // Visual cards
                case 3: // Icon
                case 4: // Matrix
                case 5: // Word cloud
                case 7: // Scenario
                case 9: // Philosophy
                case 10: // Final
                    const radioName = `q${quizConfig.currentQuestion}`;
                    const selected = document.querySelector(`input[name="${radioName}"]:checked`);
                    if (selected) {
                        quizConfig.scores[selected.value] += 1;
                    }
                    break;
                    
                case 2: // Slider
                    const sliderValue = parseInt(document.getElementById('q2-slider').value);
                    // 1 = High-level (fullstack), 4 = Low-level (lowlevel)
                    if (sliderValue === 1) {
                        quizConfig.scores.fullstack += 1;
                    } else if (sliderValue === 2) {
                        quizConfig.scores.fullstack += 0.5;
                        quizConfig.scores.arvr += 0.5;
                    } else if (sliderValue === 3) {
                        quizConfig.scores.lowlevel += 0.5;
                        quizConfig.scores.ml += 0.5;
                    } else {
                        quizConfig.scores.lowlevel += 1;
                    }
                    break;
                    
                case 6: // Checkboxes
                    const checked = document.querySelectorAll('input[name="q6"]:checked');
                    checked.forEach(checkbox => {
                        const spec = checkbox.value.split('-')[0];
                        quizConfig.scores[spec] += 0.5;
                    });
                    break;
                    
                case 8: // Ranking
                    // First place gets more points
                    quizConfig.rankingOrder.forEach((spec, index) => {
                        const points = [1.5, 1, 0.5, 0.25][index];
                        quizConfig.scores[spec] += points;
                    });
                    break;
            }
        }
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            if (quizConfig.currentQuestion > 1) {
                quizConfig.currentQuestion--;
                showQuestion(quizConfig.currentQuestion);
            }
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            if (validateCurrentQuestion()) {
                recordAnswer();
                quizConfig.currentQuestion++;
                showQuestion(quizConfig.currentQuestion);
            }
        });
        
        // Form submit
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateCurrentQuestion()) {
                recordAnswer();
                showResults();
            }
        });
        
        // Initialize first question
        showQuestion(1);
        
        // Initialize question-specific interactions
        initSlider();
        initSkillCheckboxes();
        initRanking();
        initCharCounter();
    }

    /**
     * Initialize slider interaction (Question 2)
     * Updates display value based on slider position
     */
    function initSlider() {
        const slider = document.getElementById('q2-slider');
        const valueDisplay = document.getElementById('slider-value-2');
        
        if (!slider || !valueDisplay) return;
        
        const valueLabels = {
            1: 'High-Level Abstractions',
            2: 'Balanced Approach',
            3: 'Getting Closer to Metal',
            4: 'Bare Metal & Binary'
        };
        
        slider.addEventListener('input', function() {
            valueDisplay.textContent = valueLabels[this.value];
        });
    }

    /**
     * Initialize skill checkboxes (Question 6)
     * Limits selection to exactly 3 items
     */
    function initSkillCheckboxes() {
        const checkboxes = document.querySelectorAll('input[name="q6"]');
        const countDisplay = document.getElementById('skill-count');
        
        if (checkboxes.length === 0) return;
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checked = document.querySelectorAll('input[name="q6"]:checked');
                const count = checked.length;
                
                // Update count display
                if (countDisplay) {
                    countDisplay.textContent = count;
                }
                
                // Disable unchecked if at limit
                if (count >= quizConfig.maxSkillSelections) {
                    checkboxes.forEach(cb => {
                        if (!cb.checked) {
                            cb.closest('.skill-checkbox').classList.add('disabled');
                        }
                    });
                } else {
                    checkboxes.forEach(cb => {
                        cb.closest('.skill-checkbox').classList.remove('disabled');
                    });
                }
            });
        });
    }

    /**
     * Initialize ranking interaction (Question 8)
     * Allows click-to-rank functionality
     */
    function initRanking() {
        const rankingItems = document.querySelectorAll('.ranking-item');
        const resetBtn = document.getElementById('resetRanking');
        
        if (rankingItems.length === 0) return;
        
        rankingItems.forEach(item => {
            item.addEventListener('click', function() {
                const spec = this.dataset.spec;
                const badge = this.querySelector('.rank-badge');
                
                // If already ranked, remove from order
                const existingIndex = quizConfig.rankingOrder.indexOf(spec);
                if (existingIndex !== -1) {
                    quizConfig.rankingOrder.splice(existingIndex, 1);
                    this.classList.remove('ranked');
                    badge.textContent = '-';
                    
                    // Update all badges
                    updateRankingDisplay();
                } else if (quizConfig.rankingOrder.length < 4) {
                    // Add to ranking
                    quizConfig.rankingOrder.push(spec);
                    this.classList.add('ranked');
                    badge.textContent = quizConfig.rankingOrder.length;
                    
                    // Update hidden inputs
                    updateRankingInputs();
                }
            });
        });
        
        // Reset button
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                quizConfig.rankingOrder = [];
                rankingItems.forEach(item => {
                    item.classList.remove('ranked');
                    item.querySelector('.rank-badge').textContent = '-';
                });
                updateRankingInputs();
            });
        }
        
        function updateRankingDisplay() {
            rankingItems.forEach(item => {
                const spec = item.dataset.spec;
                const badge = item.querySelector('.rank-badge');
                const index = quizConfig.rankingOrder.indexOf(spec);
                
                if (index !== -1) {
                    item.classList.add('ranked');
                    badge.textContent = index + 1;
                } else {
                    item.classList.remove('ranked');
                    badge.textContent = '-';
                }
            });
            updateRankingInputs();
        }
        
        function updateRankingInputs() {
            for (let i = 1; i <= 4; i++) {
                const input = document.getElementById(`q8-rank${i}`);
                if (input) {
                    input.value = quizConfig.rankingOrder[i - 1] || '';
                }
            }
        }
    }

    /**
     * Initialize character counter for text input (Question 10)
     */
    function initCharCounter() {
        const customInput = document.getElementById('customGoal');
        const charCount = document.getElementById('charCount');
        
        if (!customInput || !charCount) return;
        
        customInput.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    /**
     * Calculate and display quiz results
     * Determines winner and shows result page
     */
    function showResults() {
        const quizForm = document.getElementById('quizForm');
        const resultsSection = document.getElementById('resultsSection');
        
        // Hide quiz, show results
        quizForm.style.display = 'none';
        resultsSection.style.display = 'block';
        document.querySelector('.quiz-progress').style.display = 'none';
        
        // Calculate winner
        const scores = quizConfig.scores;
        const maxScore = Math.max(...Object.values(scores));
        const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
        
        // Find winner (handles ties by taking first)
        let winner = Object.keys(scores).find(key => scores[key] === maxScore);
        
        // Get winner data
        const winnerData = specialisationData[winner];
        
        // Populate result card
        document.getElementById('resultIcon').innerHTML = winnerData.icon;
        document.getElementById('resultName').textContent = winnerData.name;
        document.getElementById('resultTagline').textContent = winnerData.tagline;
        document.getElementById('shareSpec').textContent = winnerData.name;
        
        // Populate reasoning
        const reasoningContent = document.getElementById('reasoningContent');
        reasoningContent.innerHTML = `
            <p>${winnerData.reasoning}</p>
            <ul>
                ${winnerData.traits.map(trait => `<li>${trait}</li>`).join('')}
            </ul>
        `;
        
        // Populate next steps
        const stepsGrid = document.getElementById('stepsGrid');
        stepsGrid.innerHTML = winnerData.steps.map((step, index) => `
            <div class="step-card">
                <span class="step-num">Step ${index + 1}</span>
                <h4>${step.title}</h4>
                <p>${step.desc}</p>
            </div>
        `).join('');
        
        // Animate score bars
        setTimeout(() => {
            Object.keys(scores).forEach(spec => {
                const percentage = totalPoints > 0 ? Math.round((scores[spec] / totalPoints) * 100) : 0;
                const fill = document.getElementById(`score-${spec}`);
                const value = document.getElementById(`score-${spec}-val`);
                
                if (fill && value) {
                    fill.style.width = `${percentage}%`;
                    value.textContent = `${percentage}%`;
                }
            });
        }, 500);
        
        // Scroll to results
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Initialize result interactions
        initResultInteractions();
    }

    /**
     * Initialize result page interactions
     * Copy result and retake quiz functionality
     */
    function initResultInteractions() {
        const copyBtn = document.getElementById('copyResult');
        const retakeBtn = document.getElementById('retakeQuiz');
        
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const specName = document.getElementById('resultName').textContent;
                const text = `I just discovered my ideal BSE specialisation: ${specName}! Find yours at PathFinder.`;
                
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = this.querySelector('span').textContent;
                    this.querySelector('span').textContent = 'Copied!';
                    setTimeout(() => {
                        this.querySelector('span').textContent = originalText;
                    }, 2000);
                }).catch(() => {
                    alert('Could not copy to clipboard');
                });
            });
        }
        
        if (retakeBtn) {
            retakeBtn.addEventListener('click', function() {
                // Reset quiz state
                quizConfig.currentQuestion = 1;
                quizConfig.scores = { lowlevel: 0, arvr: 0, fullstack: 0, ml: 0 };
                quizConfig.rankingOrder = [];
                
                // Reset form
                document.getElementById('quizForm').reset();
                
                // Reset UI
                document.querySelectorAll('.ranking-item').forEach(item => {
                    item.classList.remove('ranked');
                    item.querySelector('.rank-badge').textContent = '-';
                });
                
                document.querySelectorAll('.skill-checkbox').forEach(cb => {
                    cb.classList.remove('disabled');
                });
                
                if (document.getElementById('skill-count')) {
                    document.getElementById('skill-count').textContent = '0';
                }
                
                // Show quiz, hide results
                document.getElementById('quizForm').style.display = 'block';
                document.getElementById('resultsSection').style.display = 'none';
                document.querySelector('.quiz-progress').style.display = 'block';
                
                // Show first question
                document.querySelectorAll('.question-section').forEach((section, index) => {
                    section.classList.toggle('active', index === 0);
                });
                
                // Reset progress
                document.getElementById('progressFill').style.width = '0%';
                document.getElementById('currentQ').textContent = '1';
                document.getElementById('progressPercent').textContent = '0%';
                
                // Reset buttons
                document.getElementById('prevBtn').disabled = true;
                document.getElementById('nextBtn').style.display = 'flex';
                document.getElementById('submitBtn').style.display = 'none';
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // =========================================
    // CONTACT PAGE FUNCTIONALITY
    // =========================================

    /**
     * Initialize contact form validation and submission
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectSelect = document.getElementById('subject');
        const messageTextarea = document.getElementById('message');
        const messageCount = document.getElementById('messageCount');
        const formSuccess = document.getElementById('formSuccess');
        const sendAnotherBtn = document.getElementById('sendAnother');
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Name validation regex (letters, spaces, hyphens, apostrophes)
        const nameRegex = /^[A-Za-z\s'-]+$/;
        
        /**
         * Validate individual field
         * @param {HTMLElement} field - Field to validate
         * @returns {boolean} Whether field is valid
         */
        function validateField(field) {
            const errorElement = document.getElementById(`${field.id}-error`);
            let isValid = true;
            let errorMessage = '';
            
            switch (field.id) {
                case 'name':
                    if (!field.value.trim()) {
                        isValid = false;
                        errorMessage = 'Name is required';
                    } else if (field.value.trim().length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters';
                    } else if (!nameRegex.test(field.value.trim())) {
                        isValid = false;
                        errorMessage = 'Please enter a valid name (letters only)';
                    }
                    break;
                    
                case 'email':
                    if (!field.value.trim()) {
                        isValid = false;
                        errorMessage = 'Email is required';
                    } else if (!emailRegex.test(field.value.trim())) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                    
                case 'subject':
                    if (!field.value) {
                        isValid = false;
                        errorMessage = 'Please select a subject';
                    }
                    break;
                    
                case 'message':
                    if (!field.value.trim()) {
                        isValid = false;
                        errorMessage = 'Message is required';
                    } else if (field.value.trim().length < 10) {
                        isValid = false;
                        errorMessage = 'Please enter at least 10 characters';
                    }
                    break;
            }
            
            // Update UI
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.toggle('show', !isValid);
            }
            field.classList.toggle('error', !isValid);
            
            return isValid;
        }
        
        // Real-time validation on blur
        [nameInput, emailInput, subjectSelect, messageTextarea].forEach(field => {
            if (field) {
                field.addEventListener('blur', function() {
                    validateField(this);
                });
                
                // Clear error on input
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                    const errorElement = document.getElementById(`${this.id}-error`);
                    if (errorElement) {
                        errorElement.classList.remove('show');
                    }
                });
            }
        });
        
        // Message character counter
        if (messageTextarea && messageCount) {
            messageTextarea.addEventListener('input', function() {
                messageCount.textContent = this.value.length;
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check honeypot
            const honeypot = document.getElementById('website');
            if (honeypot && honeypot.value) {
                // Bot detected, silently fail
                return;
            }
            
            // Validate all fields
            const isNameValid = validateField(nameInput);
            const isEmailValid = validateField(emailInput);
            const isSubjectValid = validateField(subjectSelect);
            const isMessageValid = validateField(messageTextarea);
            
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Simulate form submission (in real app, would send to server)
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Sending...';
                
                // Simulate network delay
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                }, 1500);
            }
        });
        
        // Send another message
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
                
                if (messageCount) {
                    messageCount.textContent = '0';
                }
            });
        }
    }

    /**
     * Initialize terminal typing animation on contact page
     */
    function initTerminalAnimation() {
        const typingCmd = document.getElementById('typingCmd');
        
        if (!typingCmd) return;
        
        const commands = [
            'echo "Let\'s connect!"',
            'cat contact_info.txt',
            'ping collaboration',
            './send_message.sh'
        ];
        
        let cmdIndex = 0;
        let charIndex = 0;
        let isTyping = true;
        
        function typeCommand() {
            const currentCmd = commands[cmdIndex];
            
            if (isTyping) {
                if (charIndex < currentCmd.length) {
                    typingCmd.textContent = currentCmd.substring(0, charIndex + 1) + '_';
                    charIndex++;
                    setTimeout(typeCommand, 100);
                } else {
                    typingCmd.textContent = currentCmd + '_';
                    isTyping = false;
                    setTimeout(typeCommand, 2000);
                }
            } else {
                // Start deleting
                if (charIndex > 0) {
                    typingCmd.textContent = currentCmd.substring(0, charIndex - 1) + '_';
                    charIndex--;
                    setTimeout(typeCommand, 50);
                } else {
                    isTyping = true;
                    cmdIndex = (cmdIndex + 1) % commands.length;
                    setTimeout(typeCommand, 500);
                }
            }
        }
        
        setTimeout(typeCommand, 1000);
    }

    /**
     * Initialize FAQ accordion functionality
     */
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            item.addEventListener('toggle', function() {
                // Close other items when one opens
                if (this.open) {
                    faqItems.forEach(other => {
                        if (other !== this) {
                            other.removeAttribute('open');
                        }
                    });
                }
            });
        });
    }

    // =========================================
    // INITIALIZATION
    // =========================================

    /**
     * Initialize all functionality based on current page
     */
    function init() {
        // Common initialization
        initNavigation();
        initScrollEffect();
        
        // Page-specific initialization
        const body = document.body;
        
        if (body.classList.contains('landing-page')) {
            initTypingEffect();
            initNeuralCanvas();
            initStatCounters();
        }
        
        if (body.classList.contains('quiz-page')) {
            initQuiz();
        }
        
        if (body.classList.contains('contact-page')) {
            initContactForm();
            initTerminalAnimation();
            initFAQ();
        }
    }
    
    // Run initialization
    init();
    
});