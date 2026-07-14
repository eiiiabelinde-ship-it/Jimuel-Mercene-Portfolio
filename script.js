function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");

    document.body.classList.toggle("nav-open");

}

/* SCROLLING EFFECT */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section, .details-container").forEach(el => {
  observer.observe(el);
});

/* PROFILE EFFECT */


let currentSlide = 0;
let autoScrollTimer = null;
const TEN_MINUTES = 10 * 60 * 1000; // 600,000 ms

// Core function to slide track and refresh dot statuses
function updateCarouselPosition() {
    const track = document.getElementById('experienceTrack');
    const dots = document.querySelectorAll('.dot');
    
    // Slide track smoothly to target page
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update active visual status on indicator dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Handler for arrow click navigation
function moveCarousel(direction) {
    const pages = document.querySelectorAll('.carousel-page');
    const totalPages = pages.length;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalPages - 1;
    } else if (currentSlide >= totalPages) {
        currentSlide = 0;
    }

    updateCarouselPosition();
    resetAutoScrollTimer(); // Reset standby timer since user interacted manually
}

// Handler for dot navigation clicks
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarouselPosition();
    resetAutoScrollTimer(); // Reset standby timer since user interacted manually
}

// Setup or cycle the automatic 10-minute scroller interval 
function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
        moveCarousel(1);
    }, TEN_MINUTES);
}

// Standard safety procedure to prevent interval stacking overlapping speeds
function resetAutoScrollTimer() {
    clearInterval(autoScrollTimer);
    startAutoScroll();
}

// Function to dynamically generate dots based on total pages found
function createDots() {
    const dotsContainer = document.getElementById('carouselDots');
    const pages = document.querySelectorAll('.carousel-page');
    
    // Safety check if container exists
    if (!dotsContainer) return;
    
    // Clear out any hardcoded manual dots
    dotsContainer.innerHTML = '';
    
    // Create an automated matching dot element for every single page
    pages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // First slide defaults active
        
        // Tie click actions directly to your existing slide navigation function
        dot.onclick = () => goToSlide(index);
        
        dotsContainer.appendChild(dot);
    });
}

// Setup or cycle the automatic 10-minute scroller interval 
function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
        moveCarousel(1);
    }, TEN_MINUTES);
}

// Standard safety procedure to prevent interval stacking overlapping speeds
function resetAutoScrollTimer() {
    clearInterval(autoScrollTimer);
    startAutoScroll();
}

// Launch automated setups when the window has finished reading items
window.addEventListener('DOMContentLoaded', () => {
    createDots();       // 1. Build dots list automatically based on markup pages count
    startAutoScroll();  // 2. Begin timer countdown loop
});

