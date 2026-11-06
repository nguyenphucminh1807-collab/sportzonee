/**
 * SPORTZONE - Home Page Script
 * Hero Slider, Flash Sale Countdown, Featured Products, and Sport Finder Banner
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initFlashSaleCountdown();
  renderHomeProducts();
  initHomeTabs();
});

// --- 1. Hero Slider ---
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval = null;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };

  const prevSlide = () => {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  };

  const startAutoPlay = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(slideInterval);
  };

  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      showSlide(i);
      startAutoPlay();
    });
  });

  const sliderContainer = document.querySelector('.hero-slider-section');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

// --- 2. Flash Sale Countdown Timer ---
function initFlashSaleCountdown() {
  const hoursEl = document.getElementById('fs-hours');
  const minsEl = document.getElementById('fs-mins');
  const secsEl = document.getElementById('fs-secs');

  if (!hoursEl || !minsEl || !secsEl) return;

  // Set target end time (e.g., 8 hours from first page load or midnight)
  let targetTime = localStorage.getItem('sportzone_flashsale_target');
  if (!targetTime) {
    targetTime = Date.now() + (8 * 3600 * 1000) + (45 * 60 * 1000);
    localStorage.setItem('sportzone_flashsale_target', targetTime);
  } else {
    targetTime = parseInt(targetTime, 10);
  }

  const updateTimer = () => {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      const notice = document.getElementById('fs-status-notice');
      if (notice) notice.textContent = 'Flash Sale đợt này đã kết thúc! Chờ đợt tiếp theo.';
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- 3. Render Home Products ---
function renderHomeProducts() {
  // Flash Sale Grid
  const flashSaleGrid = document.getElementById('flash-sale-grid');
  if (flashSaleGrid) {
    const flashProducts = getFlashSaleProducts(4);
    flashSaleGrid.innerHTML = flashProducts.map(p => renderProductCard(p)).join('');
    bindProductCardEvents(flashSaleGrid);
  }

  // Featured Products Grid
  const featuredGrid = document.getElementById('featured-products-grid');
  if (featuredGrid) {
    const featuredProducts = getFeaturedProducts(8);
    featuredGrid.innerHTML = featuredProducts.map(p => renderProductCard(p)).join('');
    bindProductCardEvents(featuredGrid);
  }
}

// --- 4. Home Filter Tabs ---
function initHomeTabs() {
  const tabs = document.querySelectorAll('.home-product-tab');
  const featuredGrid = document.getElementById('featured-products-grid');

  if (!tabs || !featuredGrid) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active', 'btn-primary'));
      tab.classList.add('is-active', 'btn-primary');

      const cat = tab.getAttribute('data-cat');
      let products = getAllProducts();

      if (cat !== 'all') {
        products = products.filter(p => p.category === cat);
      }

      featuredGrid.innerHTML = products.slice(0, 8).map(p => renderProductCard(p)).join('');
      bindProductCardEvents(featuredGrid);
    });
  });
}
