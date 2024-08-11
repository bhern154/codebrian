// window.onresize = function(){ location.reload(); }
window.scroll({behavior: 'smooth'});

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (0+(window.innerHeight || document.documentElement.clientHeight)) &&
        rect.bottom >= 0
    );
}

// ************* navbar scripts ****************

var home = document.querySelector('.home-sec');
var navbar = document.querySelector('.navbar');
var offset = home.offsetHeight - navbar.offsetHeight;

window.onscroll = function(){
    if(window.scrollY > offset){
        navbar.classList.add('fixed');
    }else{
        navbar.classList.remove('fixed');
    }
}

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .container-nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // if (scrollY >= sectionTop - sectionHeight / 3) {
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
        
    });

    navLi.forEach((a) => {
        a.classList.remove("active");
        if (a.classList.contains(current)) {
            a.classList.add("active");
        }
    });
});


// ************* parallax script ****************

const parallaxContainer = document.querySelector('.allProjects');

document.addEventListener('scroll', function () {
    if (isInViewport(parallaxContainer)) {
        const parallaxList = document.querySelectorAll('.parallax');
        const parallaxContainers = document.querySelectorAll('.parallax-container');

        parallaxContainers.forEach((container, index) => {
            const visibleScrollPos = -1 * container.getBoundingClientRect().top + window.innerHeight;
            const elementNotVisible = container.offsetHeight + window.innerHeight;

            if (visibleScrollPos > 0 && visibleScrollPos < elementNotVisible) {
                const scrolled = -1 * container.getBoundingClientRect().top + window.innerHeight;
                parallaxList[index].style.transform = `translate3D(0px, ${scrolled * -0.2}px, 0px)`;
                parallaxList[index].style.webkitTransform = `translate3D(0px, ${scrolled * -0.2}px, 0px)`;
            }
        });
    }
}, { passive: true });

// ************* image scroll scripts ****************

function createSlider(nextBtnClass, prevBtnClass, slideClass, slideIconClass) {
    const nextBtn = document.querySelector(nextBtnClass);
    const prevBtn = document.querySelector(prevBtnClass);
    const slides = document.querySelectorAll(slideClass);
    const slideIcons = document.querySelectorAll(slideIconClass);
    const numberOfSlides = slides.length;
    let slideNumber = 0;

    function updateSlides() {
        slides.forEach(slide => slide.classList.remove("active-img"));
        slideIcons.forEach(slideIcon => slideIcon.classList.remove("active-img"));

        slides[slideNumber].classList.add("active-img");
        slideIcons[slideNumber].classList.add("active-img");
    }

    nextBtn.addEventListener("click", () => {
        slideNumber++;
        if (slideNumber > (numberOfSlides - 1)) {
            slideNumber = 0;
        }
        updateSlides();
    });

    prevBtn.addEventListener("click", () => {
        slideNumber--;
        if (slideNumber < 0) {
            slideNumber = numberOfSlides - 1;
        }
        updateSlides();
    });
}

// Initialize sliders
createSlider(".next", ".prev", ".slide", ".slide-icon");
createSlider(".next2", ".prev2", ".slide2", ".slide-icon2");
createSlider(".next3", ".prev3", ".slide3", ".slide-icon3");

//  ************* RBG BEHIND PHOTO SLIDERS *************

// Apply RGB rotation to sliders only when in sight

    const slideContainer = document.querySelector('.about-container');
    const root = document.querySelector(":root"); //grabbing the root
    
    document.addEventListener('scroll', function () {
        if(isInViewport(slideContainer)){
            // console.log("visible");
            root.style.setProperty("--js-rotate", 'rotateImage 4s linear infinite');
        } 
        else {
            // console.log("not visible");
            root.style.setProperty("--js-rotate", 'unset');
        }
    }, {
        passive: true
    });