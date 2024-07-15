/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form')
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_3gbu6r9','template_2wj3pob','#contact-form','t3iCzJaYskxTTTUBa')
    .then(() =>{
        // Show sent message
        contactMessage.textContent = 'Message sent successfully ✅'

        // Remove message after five seconds
        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 5000)

        // Clear input fields
        contactForm.reset()

    }, () =>{
        // Show error message
        contactMessage.textContent = 'Message not sent (service error) ❌'
    })
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const SECTIONS = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    SECTIONS.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionID = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionID + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if(selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

//Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () =>{
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true //Animations repeat
})

sr.reveal(`.home__perfil, .about__image, .contact__mail`, {origin: 'right'})
sr.reveal(`.home__name, .home__info,
           .about__container .section__title-1, .about__info
           .contact__social, .contact__data`, {origin: 'left'})
sr.reveal(`.services__card, .projects__video-wrapper`, {interval: 100})

/*=============== SCROLL AUTOPLAY VIDEOS ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.projects__video');
    const progressBarInner = document.getElementById('progress-bar-inner');
    const nextBtn = document.getElementById('next-video');
    const prevBtn = document.getElementById('prev-video');
    const videoContainer = document.querySelector('.projects__video-container');
    let currentIndex = 0;

    const updateProgressBar = () => {
        const video = videos[currentIndex];
        const duration = video.duration;
        if (duration) {
            const progress = (video.currentTime / duration) * 100;
            progressBarInner.style.width = `${progress}%`;
        }
    };

    const showVideo = (index) => {
        videoContainer.style.transform = `translateX(-${index * 100}%)`;
        videos.forEach((video, i) => {
            if (i === index) {
                video.currentTime = 0;
                video.play();
            } else {
                video.pause();
            }
        });
    };

    const nextVideo = () => {
        currentIndex = (currentIndex + 1) % videos.length;
        showVideo(currentIndex);
    };

    const prevVideo = () => {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        showVideo(currentIndex);
    };

    videos.forEach((video) => {
        video.addEventListener('timeupdate', updateProgressBar);
        video.addEventListener('ended', nextVideo);
    });

    nextBtn.addEventListener('click', nextVideo);
    prevBtn.addEventListener('click', prevVideo);

    showVideo(currentIndex);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videos[currentIndex].play();
            } else {
                videos[currentIndex].pause();
            }
        });
    });

    observer.observe(document.getElementById('projects'));
});

/*=============== FADE-OUT EFFECT ===============*/
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionScroll = scrollPosition - sectionTop;

        if (sectionScroll > 0 && sectionScroll < sectionHeight) {
            const opacity = 1 - sectionScroll / sectionHeight;
            const translateX = 50 * (sectionScroll / sectionHeight); // Move 50px to left/right

            section.style.opacity = opacity;
            section.style.transform = index % 2 === 0 
                ? `translateX(-${translateX}px)`
                : `translateX(${translateX}px)`;
        } else if (sectionScroll >= sectionHeight) {
            section.style.opacity = 0;
            section.style.transform = index % 2 === 0 
                ? `translateX(-50px)`
                : `translateX(50px)`;
        } else {
            section.style.opacity = 1;
            section.style.transform = 'translateX(0)';
        }
    });
});

/*=============== EXPERIENCE TIMELINE LINES FILLING ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const lines = document.querySelectorAll('.experience__line-inner');
    const items = document.querySelectorAll('.experience__item');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -20% 0px', // Adjust this margin to ensure the effect is visible before reaching the bottom of the viewport
        threshold: Array.from(Array(101).keys()).map(x => x / 100) // Create a threshold array [0, 0.01, 0.02, ..., 1]
    };

    function updateLine(entry, index) {
        const line = lines[index];
        const ratio = entry.intersectionRatio;

        if (entry.isIntersecting) {
            line.style.transform = `scaleY(${ratio})`;
        } else {
            if (entry.boundingClientRect.top < 0) {
                // If the item is above the viewport, set it to 0
                line.style.transform = 'scaleY(0)';
            } else if (entry.boundingClientRect.top > 0) {
                // If the item is below the viewport, set it to 0
                line.style.transform = 'scaleY(0)';
            }
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = Array.from(items).indexOf(entry.target);
            if (index !== -1) {
                updateLine(entry, index);
            }
        });
    }, observerOptions);

    items.forEach(item => observer.observe(item));
});

/*=============== SERVICES TRANSITION ===============*/
document.querySelectorAll('.service__title-wrapper').forEach(item => {
    item.addEventListener('mouseover', function() {
        const targetClass = this.getAttribute('data-target');
        document.querySelectorAll('.service__content').forEach(div => {
            div.classList.remove('active');
        });
        document.querySelector('.' + targetClass).classList.add('active');
        document.querySelectorAll('.service__title-wrapper').forEach(wrapper => {
            wrapper.classList.remove('active-service');
        });
        this.classList.add('active-service');
    });
});

// Initial default display
document.querySelector('.service1').classList.add('active');
document.querySelector('[data-target="service1"]').classList.add('active-service');

/*=============== FOLLOW POINTER HOVER EFFECT ===============*/
document.addEventListener('DOMContentLoaded', function() {
    addHoverFollowEffect('.hover-effect');
});

function addHoverFollowEffect(selector) {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            item.style.transform = `translate(${(x - rect.width / 2) * 0.3}px, ${(y - rect.height / 2) * 0.3}px)`;
        });

        item.addEventListener('mouseleave', function() {
            item.style.transform = ''; // Reset transform to initial state
        });
    });
}