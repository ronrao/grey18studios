document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* -------------------------------------------------------------------------- */
    /* Animation observer                                                         */
    /* -------------------------------------------------------------------------- */
    const animatedElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    /* -------------------------------------------------------------------------- */
    /* Hero typing effect                                                         */
    /* -------------------------------------------------------------------------- */
    const typingWrapper = document.querySelector('[data-typed]');
    if (typingWrapper) {
        const textTarget = typingWrapper.querySelector('.hero__typing-text');
        const phrases = [
            'Capture your vision',
            'Record your sound',
            'Create your story',
            'Elevate your brand',
            'Transform your ideas'
        ];

        if (!textTarget) {
            typingWrapper.remove();
        } else if (preferReducedMotion.matches) {
            textTarget.textContent = phrases[0];
        } else {
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            const type = () => {
                const currentPhrase = phrases[phraseIndex];
                if (isDeleting) {
                    textTarget.textContent = currentPhrase.slice(0, charIndex - 1);
                    charIndex -= 1;
                } else {
                    textTarget.textContent = currentPhrase.slice(0, charIndex + 1);
                    charIndex += 1;
                }

                let delay = isDeleting ? 45 : 110;

                if (!isDeleting && charIndex === currentPhrase.length) {
                    delay = 1600;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    delay = 500;
                }

                setTimeout(type, delay);
            };

            setTimeout(type, 900);
        }
    }

    /* -------------------------------------------------------------------------- */
    /* Smooth anchor scrolling (without interfering with router links)            */
    /* -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const destination = document.querySelector(targetId);
            if (!destination) return;

            event.preventDefault();
            destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* -------------------------------------------------------------------------- */
    /* Service modal                                                              */
    /* -------------------------------------------------------------------------- */
    const serviceModal = document.querySelector('.service-modal');
    const modalTitle = serviceModal?.querySelector('[data-modal-title]');
    const modalLead = serviceModal?.querySelector('[data-modal-lead]');
    const modalBullets = serviceModal?.querySelector('[data-modal-bullets]');
    const modalGallery = serviceModal?.querySelector('[data-modal-gallery]');
    const modalLink = serviceModal?.querySelector('[data-modal-link]');
    const modalIcon = serviceModal?.querySelector('[data-modal-icon] i');
    const serviceCards = document.querySelectorAll('[data-service]');
    let lastFocusedElement = null;

    const serviceDetails = {
        'video-production': {
            title: 'Video Production',
            icon: 'fas fa-video',
            lead: 'Our professional video production services cover everything from concept development to final delivery, creating high-quality videos for commercials, films, corporate videos, and events.',
            highlights: [
                'Concept development, scripting, crew and direction',
                'Commercials, corporate profiles, events and documentaries',
                '4K+ filming, multi-camera setups and cinematic lighting'
            ],
            gallery: [
                {
                    src: 'images/portfolio/editing-video.jpg',
                    alt: 'Commercial video production set',
                    title: 'Commercial Production',
                    description: 'Brand commercials and advertisements'
                },
                {
                    src: 'images/portfolio/photography-corporate.jpg',
                    alt: 'Corporate video filming',
                    title: 'Corporate Video',
                    description: 'Corporate profiles and training films'
                },
                {
                    src: 'images/portfolio/grading-commercial.jpg',
                    alt: 'Event video coverage',
                    title: 'Event Coverage',
                    description: 'Live events and experiential shoots'
                }
            ],
            link: 'portfolio.html#video-production'
        },
        'photography': {
            title: 'Photography',
            icon: 'fas fa-camera',
            lead: 'Our professional photography services cover a wide range of needs, from portrait sessions to commercial product shoots and event coverage.',
            highlights: [
                'Portrait, product, wedding and event expertise',
                'Studio and on-location lighting setups',
                'Colour-accurate retouching for print and digital'
            ],
            gallery: [
                {
                    src: 'images/portfolio/photography-portrait.jpg',
                    alt: 'Portrait photography session',
                    title: 'Portrait Session',
                    description: 'Studio and lifestyle portraits'
                },
                {
                    src: 'images/portfolio/photography-product.jpg',
                    alt: 'Product photography setup',
                    title: 'Product Showcase',
                    description: 'Commercial product photography'
                },
                {
                    src: 'images/portfolio/photography-corporate.jpg',
                    alt: 'Corporate photography',
                    title: 'Corporate Photography',
                    description: 'Professional corporate imagery'
                }
            ],
            link: 'portfolio.html#photography'
        },
        'editing-grading': {
            title: 'Editing & Colour Grading',
            icon: 'fas fa-photo-video',
            lead: 'Our professional editing and colour grading services enhance and transform your visual content, whether it\'s photo retouching, video editing, or cinematic colour treatment.',
            highlights: [
                'Narrative and commercial video editing',
                'Advanced colour correction and grading workflows',
                'Photo retouching for campaigns and publications'
            ],
            gallery: [
                {
                    src: 'images/portfolio/editing-video.jpg',
                    alt: 'Video editor working on commercial edit',
                    title: 'Commercial Edit',
                    description: 'TV commercial post-production'
                },
                {
                    src: 'images/portfolio/editing-photo.jpg',
                    alt: 'Photo retouching process',
                    title: 'Photo Retouching',
                    description: 'High-end photo finishing'
                },
                {
                    src: 'images/portfolio/grading-film.jpg',
                    alt: 'Colour grading for film project',
                    title: 'Film Colour Treatment',
                    description: 'Cinematic colour grading'
                }
            ],
            link: 'portfolio.html#editing-grading'
        },
        'sound-recording': {
            title: 'Sound Recording',
            icon: 'fas fa-microphone-alt',
            lead: 'Our state-of-the-art recording studio provides the perfect environment for capturing vocals, instruments, and full bands with exceptional clarity and precision.',
            highlights: [
                'Voice, instrument, podcast and full band recording',
                'Acoustically treated rooms and premium microphones',
                'Experienced engineers and live monitoring'
            ],
            gallery: [
                {
                    src: 'images/portfolio/audio-music.jpg',
                    alt: 'Singer recording vocals in studio',
                    title: 'Vocal Sessions',
                    description: 'Professional vocal recording'
                },
                {
                    src: 'images/portfolio/audio-voiceover.jpg',
                    alt: 'Voice-over recording in studio',
                    title: 'Voice-over Recording',
                    description: 'Professional voice-over sessions'
                },
                {
                    src: 'images/portfolio/audio-podcast.jpg',
                    alt: 'Podcast recording setup',
                    title: 'Podcast Production',
                    description: 'Podcast and voice-over suites'
                }
            ],
            link: 'portfolio.html#sound-recording'
        },
        'dubbing': {
            title: 'Dubbing',
            icon: 'fas fa-headphones',
            lead: 'Our professional voice-over and dubbing services provide high-quality audio in multiple languages for films, commercials, animations, and more.',
            highlights: [
                'Multi-lingual voice-over and dubbing',
                'ADR, localization and character voice casting',
                'Dialogue editing and mix-ready delivery'
            ],
            gallery: [
                {
                    src: 'images/portfolio/dubbing-commercial.jpg',
                    alt: 'Voice-over artist in recording booth',
                    title: 'Commercial Voice-over',
                    description: 'Campaign and promo dubbing'
                },
                {
                    src: 'images/portfolio/dubbing-animation.jpg',
                    alt: 'Animation dubbing session',
                    title: 'Animation Project',
                    description: 'Character voice performance'
                },
                {
                    src: 'images/portfolio/dubbing-film.jpg',
                    alt: 'Film dubbing session',
                    title: 'Film Dubbing',
                    description: 'Feature film dubbing and ADR'
                }
            ],
            link: 'portfolio.html#dubbing'
        },
        'mixing': {
            title: 'Audio Mixing & Mastering',
            icon: 'fas fa-sliders-h',
            lead: 'Our expert mixing and mastering services ensure your audio projects sound professional, balanced, and ready for distribution on any platform.',
            highlights: [
                'Stereo, surround and immersive audio mixing',
                'Mastering for streaming, broadcast and cinema',
                'Analogue and digital hybrid workflow'
            ],
            gallery: [
                {
                    src: 'images/portfolio/mixing-music.jpg',
                    alt: 'Mixing engineer at console',
                    title: 'Album Production',
                    description: 'Albums and EP mastering'
                },
                {
                    src: 'images/portfolio/mixing-film.jpg',
                    alt: 'Film soundtrack mixing session',
                    title: 'Film Soundtrack',
                    description: 'Cinema-grade audio finishing'
                },
                {
                    src: 'images/portfolio/mixing-commercial.jpg',
                    alt: 'Commercial audio mixing',
                    title: 'Commercial Mixing',
                    description: 'Commercial and broadcast audio'
                }
            ],
            link: 'portfolio.html#mixing'
        }
    };

    const populateServiceModal = (serviceKey) => {
        if (!serviceModal) return;
        const details = serviceDetails[serviceKey];
        if (!details) return;

        if (modalTitle) modalTitle.textContent = details.title;
        if (modalLead) modalLead.textContent = details.lead;
        if (modalIcon) modalIcon.className = details.icon;

        if (modalBullets) {
            modalBullets.innerHTML = '';
            details.highlights.forEach(point => {
                const item = document.createElement('li');
                item.textContent = point;
                modalBullets.appendChild(item);
            });
        }

        if (modalGallery) {
            modalGallery.innerHTML = '';
            details.gallery.forEach(entry => {
                const figure = document.createElement('figure');
                const image = document.createElement('img');
                // Try relative path first (works better with Go Live)
                // Remove leading slash if present for relative path
                const relativePath = entry.src.startsWith('/') ? entry.src.substring(1) : entry.src;
                image.src = relativePath;
                image.alt = entry.alt;
                image.loading = 'lazy';
                image.style.width = '100%';
                image.style.height = '180px';
                image.style.objectFit = 'cover';
                image.style.objectPosition = 'center';
                
                // Try absolute path as fallback if relative fails
                image.onerror = function() {
                    const absolutePath = '/' + relativePath;
                    if (this.src !== absolutePath && !this.dataset.triedAbsolute) {
                        console.warn('Relative path failed, trying absolute:', relativePath, '->', absolutePath);
                        this.dataset.triedAbsolute = 'true';
                        this.src = absolutePath;
                    } else {
                        console.error('Failed to load image from both paths:', relativePath);
                        this.style.backgroundColor = 'rgba(12, 14, 20, 0.8)';
                        this.style.display = 'flex';
                        this.style.alignItems = 'center';
                        this.style.justifyContent = 'center';
                        this.style.color = 'rgba(255, 255, 255, 0.5)';
                        this.style.fontSize = '0.8rem';
                        this.alt = 'Image not available';
                    }
                };
                figure.appendChild(image);

                const caption = document.createElement('figcaption');
                const title = document.createElement('strong');
                title.textContent = entry.title;
                const description = document.createElement('span');
                description.textContent = entry.description;

                caption.appendChild(title);
                caption.appendChild(description);
                figure.appendChild(caption);
                modalGallery.appendChild(figure);
            });
        }

        if (modalLink) {
            modalLink.href = details.link;
        }
    };

    const openServiceModal = (serviceKey) => {
        if (!serviceModal || !serviceDetails[serviceKey]) return;
        populateServiceModal(serviceKey);

        lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        serviceModal.classList.add('is-active');
        serviceModal.setAttribute('aria-hidden', 'false');
        body.classList.add('has-modal');

        const closeButton = serviceModal.querySelector('.service-modal__close');
        if (closeButton instanceof HTMLElement) {
            closeButton.focus({ preventScroll: true });
        }
    };

    const closeServiceModal = () => {
        if (!serviceModal) return;
        serviceModal.classList.remove('is-active');
        serviceModal.setAttribute('aria-hidden', 'true');
        body.classList.remove('has-modal');

        if (lastFocusedElement) {
            lastFocusedElement.focus({ preventScroll: true });
        }
    };

    serviceCards.forEach(card => {
        const serviceKey = card.dataset.service;
        if (!serviceKey) return;

        card.setAttribute('tabindex', '0');

        const open = () => openServiceModal(serviceKey);

        card.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement && event.target.closest('.service-card__action')) {
                return;
            }
            event.preventDefault();
            open();
        });

        const actionButton = card.querySelector('.service-card__action');
        if (actionButton) {
            actionButton.addEventListener('click', event => {
                event.stopPropagation();
                event.preventDefault();
                open();
            });
        }

        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open();
            }
        });
    });

    serviceModal?.querySelectorAll('[data-close]').forEach(trigger => {
        trigger.addEventListener('click', () => closeServiceModal());
    });

    // Handle "Start a project" button - close modal and scroll to collaborate section
    const startProjectButton = serviceModal?.querySelector('[data-start-project]');
    if (startProjectButton) {
        startProjectButton.addEventListener('click', (event) => {
            event.preventDefault();
            closeServiceModal();
            
            // Small delay to ensure modal is closed before scrolling
            setTimeout(() => {
                const collaborateSection = document.querySelector('#collaborate');
                if (collaborateSection) {
                    collaborateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        });
    }

    /* -------------------------------------------------------------------------- */
    /* Showreel modal                                                             */
    /* -------------------------------------------------------------------------- */
    const showreelModal = document.querySelector('.showreel-modal');
    const showreelVideo = showreelModal?.querySelector('[data-showreel-video]');
    const showreelTrigger = document.querySelector('[data-showreel]');
    let showreelLastFocused = null;

    const openShowreel = () => {
        if (!showreelModal) return;
        showreelLastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        showreelModal.classList.add('is-active');
        showreelModal.setAttribute('aria-hidden', 'false');
        body.classList.add('has-modal');
        const closeButton = showreelModal.querySelector('.showreel-modal__close');
        if (closeButton instanceof HTMLElement) closeButton.focus({ preventScroll: true });

        if (showreelVideo instanceof HTMLVideoElement) {
            try {
                showreelVideo.currentTime = 0;
                showreelVideo.play().catch(() => void 0);
            } catch (error) {
                console.warn('Unable to autoplay showreel:', error);
            }
        }
    };

    const closeShowreel = () => {
        if (!showreelModal) return;
        showreelModal.classList.remove('is-active');
        showreelModal.setAttribute('aria-hidden', 'true');
        body.classList.remove('has-modal');

        if (showreelVideo instanceof HTMLVideoElement) {
            showreelVideo.pause();
        }

        if (showreelLastFocused) {
            showreelLastFocused.focus({ preventScroll: true });
        }
    };

    if (showreelTrigger) {
        showreelTrigger.addEventListener('click', () => openShowreel());
        showreelTrigger.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openShowreel();
            }
        });
    }

    showreelModal?.querySelectorAll('[data-close]').forEach(trigger => {
        trigger.addEventListener('click', () => closeShowreel());
    });

    // Open showreel modal by default on page load
    if (showreelModal) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
            openShowreel();
        }, 500);
    }

    /* -------------------------------------------------------------------------- */
    /* Escape key handling                                                        */
    /* -------------------------------------------------------------------------- */
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            if (serviceModal?.classList.contains('is-active')) {
                closeServiceModal();
            }
            if (showreelModal?.classList.contains('is-active')) {
                closeShowreel();
            }
        }
    });

    /* -------------------------------------------------------------------------- */
    /* Testimonial slider                                                         */
    /* -------------------------------------------------------------------------- */
    const slider = document.querySelector('[data-slider]');
    if (slider) {
        const track = slider.querySelector('[data-track]');
        const slides = track ? Array.from(track.children) : [];
        const prevButton = slider.querySelector('[data-prev]');
        const nextButton = slider.querySelector('[data-next]');
        const dotsContainer = slider.querySelector('[data-dots]');

        if (track && slides.length > 0) {
            let currentIndex = 0;
            let autoplayTimer = null;

            slides.forEach(slide => {
                const frame = slide.querySelector('iframe');
                if (frame && !frame.dataset.src) {
                    frame.dataset.src = frame.src;
                }
            });

            const dots = slides.map((_, index) => {
                if (!dotsContainer) return null;
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'testimonial-slider__dot';
                button.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
                button.addEventListener('click', () => {
                    goToSlide(index);
                });
                dotsContainer.appendChild(button);
                return button;
            });

            const updateDots = () => {
                dots.forEach((dot, index) => {
                    if (!dot) return;
                    dot.classList.toggle('is-active', index === currentIndex);
                    if (index === currentIndex) {
                        dot.setAttribute('aria-current', 'true');
                    } else {
                        dot.removeAttribute('aria-current');
                    }
                });
            };

            const updateSlides = () => {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                slides.forEach((slide, index) => {
                    slide.classList.toggle('is-active', index === currentIndex);
                    const frame = slide.querySelector('iframe');
                    if (frame && frame.dataset.src) {
                        if (index === currentIndex) {
                            if (frame.src !== frame.dataset.src) {
                                frame.src = frame.dataset.src;
                            }
                        } else if (frame.src !== 'about:blank') {
                            frame.src = 'about:blank';
                        }
                    }
                });
                updateDots();
            };

            const goToSlide = (index) => {
                const total = slides.length;
                currentIndex = ((index % total) + total) % total;
                updateSlides();
                restartAutoplay();
            };

            const nextSlide = () => goToSlide(currentIndex + 1);
            const previousSlide = () => goToSlide(currentIndex - 1);

            const startAutoplay = () => {
                if (preferReducedMotion.matches) return;
                stopAutoplay();
                autoplayTimer = window.setInterval(() => {
                    nextSlide();
                }, 12000);
            };

            const stopAutoplay = () => {
                if (autoplayTimer) {
                    clearInterval(autoplayTimer);
                    autoplayTimer = null;
                }
            };

            const restartAutoplay = () => {
                stopAutoplay();
                startAutoplay();
            };

            prevButton?.addEventListener('click', previousSlide);
            nextButton?.addEventListener('click', nextSlide);

            slider.addEventListener('mouseenter', stopAutoplay);
            slider.addEventListener('mouseleave', startAutoplay);

            updateSlides();
            startAutoplay();
        }
    }
});

