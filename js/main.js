/**
 * SPORTZONE - Main Script
 * Global Header, Live Search, Mobile Drawer, Badge Counters, Floating Compare Bar, Back-To-Top
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Toast system
  Toast.init();

  // Initialize Header interactions
  initHeader();

  // Initialize Live Search
  initLiveSearch();

  // Initialize Floating Compare Bar
  initCompareBar();

  // Initialize Back to Top
  initBackToTop();

  // Initialize Footer Newsletter
  initNewsletter();

  // Update Badges on initial load
  updateHeaderBadges();

  // Listen to Global Storage Events
  window.addEventListener('cartUpdated', () => updateHeaderBadges());
  window.addEventListener('wishlistUpdated', () => updateHeaderBadges());
  window.addEventListener('compareUpdated', () => updateCompareBar());
  window.addEventListener('userStateChanged', () => updateHeaderUser());
});

// --- 1. Header & Navigation Initialization ---
function initHeader() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  // Active Nav Detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile Drawer Toggle (iOS-friendly, keyboard accessible, and resilient on resize)
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay:not(#filter-drawer-overlay)');
  const closeBtn = drawer ? drawer.querySelector('.mobile-drawer-close') : null;

  if (drawer) {
    drawer.id = drawer.id || 'mobile-navigation-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', drawer.getAttribute('aria-label') || 'Menu điều hướng');
  }
  if (toggleBtn && drawer) {
    toggleBtn.setAttribute('aria-controls', drawer.id);
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('type', 'button');
  }
  if (closeBtn) closeBtn.setAttribute('type', 'button');

  // Ensure every page with a drawer has a search field; the live-search initializer
  // below will attach the existing product-search behavior to this field.
  if (drawer) {
    const drawerBody = drawer.querySelector('.mobile-drawer-body');
    if (drawerBody && !drawerBody.querySelector('.search-input')) {
      const search = document.createElement('div');
      search.className = 'header-search mobile-drawer-search';
      search.innerHTML = '<div class="search-input-wrapper"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><input type="search" class="search-input" placeholder="Tìm kiếm sản phẩm..." aria-label="Tìm kiếm sản phẩm" autocomplete="off" /></div>';
      drawerBody.prepend(search);
    }
  }

  let previousBodyOverflow = '';
  const openDrawer = () => {
    if (!drawer || !overlay) return;
    previousBodyOverflow = document.body.style.overflow;
    drawer.classList.add('is-active');
    overlay.classList.add('is-active');
    document.body.classList.add('mobile-navigation-open');
    document.body.style.overflow = 'hidden';
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    window.setTimeout(() => {
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }, 50);
  };

  const closeDrawer = (restoreFocus = true) => {
    if (!drawer || !overlay) return;
    drawer.classList.remove('is-active');
    overlay.classList.remove('is-active');
    document.body.classList.remove('mobile-navigation-open');
    document.body.style.overflow = previousBodyOverflow;
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    if (restoreFocus && toggleBtn) toggleBtn.focus({ preventScroll: true });
  };

  if (toggleBtn) toggleBtn.addEventListener('click', () => {
    if (drawer && drawer.classList.contains('is-active')) closeDrawer(false);
    else openDrawer();
  });
  if (overlay) overlay.addEventListener('click', () => closeDrawer());
  if (closeBtn) closeBtn.addEventListener('click', () => closeDrawer());
  if (drawer) {
    drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => closeDrawer(false));
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && drawer.classList.contains('is-active')) closeDrawer();
    });
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && drawer && drawer.classList.contains('is-active')) closeDrawer(false);
  }, { passive: true });

  updateHeaderUser();
}

// --- 2. Live Search Dropdown ---
function initLiveSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  
  searchInputs.forEach(input => {
    const wrapper = input.closest('.header-search') || input.parentElement;
    let dropdown = wrapper.querySelector('.search-results-dropdown');
    
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-results-dropdown';
      wrapper.appendChild(dropdown);
    }

    let debounceTimer = null;

    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim().toLowerCase();

      if (query.length < 2) {
        dropdown.classList.remove('is-active');
        dropdown.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(() => {
        const products = getAllProducts();
        const matches = products.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        ).slice(0, 5);

        if (matches.length > 0) {
          dropdown.innerHTML = matches.map(p => `
            <a href="product-detail.html?id=${p.id}" class="search-item">
              <img src="${p.image}" alt="${p.name}" class="search-item-img" />
              <div class="search-item-info">
                <div class="search-item-name">${p.name}</div>
                <div class="search-item-price">${formatCurrency(p.price)}</div>
              </div>
            </a>
          `).join('') + `
            <a href="products.html?search=${encodeURIComponent(query)}" style="display: block; padding: 0.65rem; text-align: center; font-size: 0.75rem; font-weight: bold; color: var(--primary-color); background: var(--bg-subtle);">
              Xem tất cả kết quả cho "${query}" &rarr;
            </a>
          `;
          dropdown.classList.add('is-active');
        } else {
          dropdown.innerHTML = `
            <div style="padding: 1rem; text-align: center; font-size: 0.8rem; color: var(--text-muted);">
              Không tìm thấy sản phẩm phù hợp.
            </div>
          `;
          dropdown.classList.add('is-active');
        }
      }, 250);
    });

    // Enter key submits to products.html
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
      }
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove('is-active');
      }
    });
  });
}

// --- 3. Header Badges & User Status ---
function updateHeaderBadges() {
  const cartCount = StorageUtil.getCartCount();
  const wishlistCount = StorageUtil.getWishlistCount();

  const cartBadges = document.querySelectorAll('.cart-badge');
  cartBadges.forEach(badge => {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'flex' : 'none';
  });

  const wishlistBadges = document.querySelectorAll('.wishlist-badge');
  wishlistBadges.forEach(badge => {
    badge.textContent = wishlistCount;
    badge.style.display = wishlistCount > 0 ? 'flex' : 'none';
  });
}

function updateHeaderUser() {
  const user = StorageUtil.getCurrentUser();
  const userLinks = document.querySelectorAll('.user-auth-link');
  userLinks.forEach(link => {
    if (user && user.fullname) {
      link.innerHTML = `<i class="fa-solid fa-user-check text-primary"></i> <span style="font-size: 0.75rem; font-weight: bold;">${user.fullname.split(' ').pop()}</span>`;
      link.setAttribute('href', 'javascript:void(0)');
      link.onclick = () => {
        if (confirm(`Bạn đang đăng nhập với tài khoản ${user.fullname}. Bạn có muốn đăng xuất không?`)) {
          StorageUtil.logoutUser();
          Toast.info('Tài khoản', 'Đã đăng xuất thành công.');
          window.location.reload();
        }
      };
    } else {
      link.innerHTML = `<i class="fa-regular fa-user"></i>`;
      link.setAttribute('href', 'login.html');
      link.onclick = null;
    }
  });
}

// --- 4. Floating Compare Bar ---
function initCompareBar() {
  let compareBar = document.getElementById('compare-bar');
  if (!compareBar) {
    compareBar = document.createElement('div');
    compareBar.id = 'compare-bar';
    compareBar.className = 'compare-bar';
    document.body.appendChild(compareBar);
  }
  updateCompareBar();
}

function updateCompareBar() {
  const compareBar = document.getElementById('compare-bar');
  if (!compareBar) return;

  const compareList = StorageUtil.getCompareList();
  if (compareList.length === 0) {
    compareBar.classList.remove('is-active');
    return;
  }

  const products = compareList.map(id => getProductById(id)).filter(Boolean);

  compareBar.innerHTML = `
    <div class="compare-bar-inner">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="font-size: 0.85rem; font-weight: bold;">
          <i class="fa-solid fa-code-compare text-primary"></i> So sánh (${products.length}/3):
        </span>
        <div class="compare-items-preview">
          ${products.map(p => `
            <img src="${p.image}" alt="${p.name}" class="compare-thumb" title="${p.name}" />
          `).join('')}
        </div>
      </div>
      <div class="compare-actions">
        <button class="btn btn-sm btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.3);" onclick="StorageUtil.clearCompare()">
          Xóa
        </button>
        <button class="btn btn-sm btn-primary" onclick="Modal.openCompareModal()">
          So Sánh Ngay
        </button>
      </div>
    </div>
  `;
  compareBar.classList.add('is-active');
}

// --- 5. Back to Top ---
function initBackToTop() {
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Cuộn lên đầu trang');
    btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- 6. Footer Newsletter ---
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const email = input ? input.value.trim() : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.error('Đăng ký nhận tin', 'Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng!');
      return;
    }

    Toast.success('Thành công', 'Cảm ơn bạn! Mã giảm giá 10% đã được gửi tới email của bạn.');
    input.value = '';
  });
}
