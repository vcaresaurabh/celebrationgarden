(function () {
  // load main site script
  const addScript = src => {
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    document.head.appendChild(s);
  };
  addScript('assets/js/main.js');

  // fetch and inject header/footer HTML into elements with ids "header" and "footer"
  ['header', 'footer'].forEach(id => {
    fetch(`includes/${id}.html`)
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.text(); })
      .then(html => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      })
      .catch(e => console.error('Include load error:', e));
  });
})();

// Gallery Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Gallery Data - Replace with your actual images
  const galleryData = {
    'grand-entry': [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540946485067-953f20a4c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'main-hall': [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'lawn-area': [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549451371-58112a87b7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'food-court': [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'coffee-section': [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'parking': [
      'https://images.unsplash.com/photo-1551524164-6caac0541f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577702318035-229d8f6f6970?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590673846740-33c8e8f4f6f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'kitchen': [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583778176476-4a8b7d6f8c33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583778176476-4a8b7d6f8c33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'food': [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540420828647-4f5d3ad9e2c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  };

  // DOM Elements
  const galleryModal = document.querySelector('.cg-gallery-modal');
  const modalClose = document.querySelector('.cg-modal-close');
  const collageItems = document.querySelectorAll('.cg-collage-item');
  const tabButtons = document.querySelectorAll('.cg-tab-button');
  const slideshowTrack = document.querySelector('.cg-slideshow-track');
  const dotsContainer = document.querySelector('.cg-slideshow-dots');
  const prevArrow = document.querySelector('.cg-arrow-prev');
  const nextArrow = document.querySelector('.cg-arrow-next');

  let currentCategory = 'grand-entry';
  let currentSlide = 0;

  // Open modal when collage item is clicked
  collageItems.forEach(item => {
    item.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      openGalleryModal(category);
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeGalleryModal);
  galleryModal.addEventListener('click', function(e) {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
      closeGalleryModal();
    }
  });

  // Tab switching
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Load category images
      loadCategoryImages(category);
    });
  });

  // Navigation arrows
  prevArrow.addEventListener('click', showPrevSlide);
  nextArrow.addEventListener('click', showNextSlide);

  // Functions
  function openGalleryModal(category) {
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set active tab
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      }
    });
    
    // Load images for the category
    loadCategoryImages(category);
  }

  function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function loadCategoryImages(category) {
    currentCategory = category;
    currentSlide = 0;
    
    const images = galleryData[category] || [];
    
    // Clear existing slides and dots
    slideshowTrack.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Create slides
    images.forEach((imageUrl, index) => {
      const slide = document.createElement('div');
      slide.className = `cg-slideshow-slide ${index === 0 ? 'active' : ''}`;
      
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = `${category} image ${index + 1}`;
      
      slide.appendChild(img);
      slideshowTrack.appendChild(slide);
      
      // Create dot
      const dot = document.createElement('span');
      dot.className = `cg-slideshow-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('data-slide', index);
      
      dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
      });
      
      dotsContainer.appendChild(dot);
    });
    
    // If no images, show message
    if (images.length === 0) {
      const message = document.createElement('div');
      message.className = 'cg-slideshow-slide active';
      message.style.display = 'flex';
      message.style.alignItems = 'center';
      message.style.justifyContent = 'center';
      message.style.color = '#5d6d7e';
      message.style.fontFamily = '"Cormorant Garamond", serif';
      message.style.fontSize = '1.2rem';
      message.style.fontStyle = 'italic';
      message.innerHTML = 'No images available for this category';
      
      slideshowTrack.appendChild(message);
    }
  }

  function showSlide(n) {
    const slides = document.querySelectorAll('.cg-slideshow-slide');
    const dots = document.querySelectorAll('.cg-slideshow-dot');
    
    if (slides.length === 0) return;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adjust currentSlide index if out of bounds
    if (n >= slides.length) currentSlide = 0;
    else if (n < 0) currentSlide = slides.length - 1;
    else currentSlide = n;
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  function showPrevSlide() {
    showSlide(currentSlide - 1);
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  // Initialize with first category
  loadCategoryImages('grand-entry');
});