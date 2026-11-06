/**
 * SPORTZONE - Products Catalog Script
 * Multi-criteria Filtering, Live Search, Sorting, Grid/List View, and Pagination
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductsCatalog();
});

function initProductsCatalog() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';
  const initialSearch = urlParams.get('search') || '';
  const initialBrand = urlParams.get('brand') || '';

  // Catalog State
  const state = {
    category: initialCategory,
    search: initialSearch,
    brands: initialBrand ? [initialBrand] : [],
    maxPrice: 6000000,
    sizes: [],
    minRating: 0,
    sortBy: 'default',
    currentPage: 1,
    itemsPerPage: 9,
    viewMode: 'grid'
  };

  const gridContainer = document.getElementById('products-catalog-grid');
  const countDisplay = document.getElementById('products-count-display');
  const activeFiltersTray = document.getElementById('active-filters-tray');
  const paginationContainer = document.getElementById('products-pagination');
  const sortSelect = document.getElementById('catalog-sort-select');
  const priceSlider = document.getElementById('price-range-slider');
  const priceMaxLabel = document.getElementById('price-max-label');
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewListBtn = document.getElementById('view-list-btn');

  // Mobile Filter Drawer
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const filterSidebar = document.querySelector('.filter-sidebar');
  const filterOverlay = document.getElementById('filter-drawer-overlay');

  if (mobileFilterBtn && filterSidebar) {
    mobileFilterBtn.onclick = () => {
      filterSidebar.classList.add('is-open');
      if (filterOverlay) filterOverlay.classList.add('is-active');
    };
  }
  if (filterOverlay) {
    filterOverlay.onclick = () => {
      filterSidebar.classList.remove('is-open');
      filterOverlay.classList.remove('is-active');
    };
  }

  // --- Filtering & Sorting Core Logic ---
  function getFilteredProducts() {
    let list = getAllProducts();

    // 1. Search filter
    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (state.category !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === state.category.toLowerCase());
    }

    // 3. Brand filter
    if (state.brands.length > 0) {
      list = list.filter(p => state.brands.includes(p.brand));
    }

    // 4. Price range
    list = list.filter(p => p.price <= state.maxPrice);

    // 5. Size filter
    if (state.sizes.length > 0) {
      list = list.filter(p => p.sizes && p.sizes.some(s => state.sizes.includes(s)));
    }

    // 6. Rating filter
    if (state.minRating > 0) {
      list = list.filter(p => p.rating >= state.minRating);
    }

    // 7. Sorting
    if (state.sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating-desc') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === 'newest') {
      list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    } else if (state.sortBy === 'bestseller') {
      list.sort((a, b) => (b.badge === 'Best Seller' ? 1 : 0) - (a.badge === 'Best Seller' ? 1 : 0));
    }

    return list;
  }

  // --- Render Function ---
  function render() {
    const filtered = getFilteredProducts();
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / state.itemsPerPage) || 1;

    // Adjust page bounds
    if (state.currentPage > totalPages) state.currentPage = totalPages;
    if (state.currentPage < 1) state.currentPage = 1;

    // Slice for pagination
    const startIdx = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedItems = filtered.slice(startIdx, startIdx + state.itemsPerPage);

    // Update count display
    if (countDisplay) {
      countDisplay.innerHTML = `Hiển thị <strong>${totalItems === 0 ? 0 : startIdx + 1} - ${Math.min(startIdx + state.itemsPerPage, totalItems)}</strong> trong tổng số <strong>${totalItems}</strong> sản phẩm`;
    }

    // Render active filter chips
    renderActiveFilterChips();

    // Render Products Grid / Empty state
    if (!gridContainer) return;

    if (totalItems === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
          <h3 class="empty-state-title">Không tìm thấy sản phẩm phù hợp</h3>
          <p class="empty-state-desc">Hãy thử thay đổi tiêu chí tìm kiếm hoặc xóa các bộ lọc đang chọn.</p>
          <button class="btn btn-primary" id="btn-reset-filters">
            <i class="fa-solid fa-rotate-left"></i> Xóa tất cả bộ lọc
          </button>
        </div>
      `;
      const resetBtn = gridContainer.querySelector('#btn-reset-filters');
      if (resetBtn) resetBtn.onclick = () => resetAllFilters();
    } else {
      gridContainer.className = `products-catalog-grid ${state.viewMode === 'list' ? 'is-list-view' : ''}`;
      gridContainer.innerHTML = paginatedItems.map(p => renderProductCard(p)).join('');
      bindProductCardEvents(gridContainer);
    }

    // Render Pagination
    renderPagination(totalPages);
  }

  // --- Active Filter Chips ---
  function renderActiveFilterChips() {
    if (!activeFiltersTray) return;
    let chips = [];

    if (state.search) {
      chips.push({ label: `Tìm: "${state.search}"`, clear: () => { state.search = ''; } });
    }
    if (state.category !== 'all') {
      chips.push({ label: `Danh mục: ${state.category}`, clear: () => { state.category = 'all'; updateCategoryUI(); } });
    }
    state.brands.forEach(b => {
      chips.push({ label: `Hiệu: ${b}`, clear: () => { state.brands = state.brands.filter(x => x !== b); updateBrandCheckboxes(); } });
    });
    if (state.maxPrice < 6000000) {
      chips.push({ label: `Giá <= ${formatCurrency(state.maxPrice)}`, clear: () => { state.maxPrice = 6000000; if (priceSlider) priceSlider.value = 6000000; if (priceMaxLabel) priceMaxLabel.textContent = formatCurrency(6000000); } });
    }
    state.sizes.forEach(s => {
      chips.push({ label: `Size: ${s}`, clear: () => { state.sizes = state.sizes.filter(x => x !== s); updateSizeUI(); } });
    });
    if (state.minRating > 0) {
      chips.push({ label: `Từ ${state.minRating} sao`, clear: () => { state.minRating = 0; updateRatingUI(); } });
    }

    if (chips.length > 0) {
      activeFiltersTray.innerHTML = chips.map((chip, idx) => `
        <span class="active-filter-chip">
          ${chip.label}
          <i class="fa-solid fa-xmark" data-idx="${idx}"></i>
        </span>
      `).join('') + `
        <button class="btn btn-sm btn-ghost filter-clear-all" id="btn-clear-all-chips">Xóa tất cả</button>
      `;

      activeFiltersTray.querySelectorAll('.active-filter-chip i').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.getAttribute('data-idx'), 10);
          chips[idx].clear();
          state.currentPage = 1;
          render();
        };
      });

      const clearAll = activeFiltersTray.querySelector('#btn-clear-all-chips');
      if (clearAll) clearAll.onclick = () => resetAllFilters();
    } else {
      activeFiltersTray.innerHTML = '';
    }
  }

  function resetAllFilters() {
    state.category = 'all';
    state.search = '';
    state.brands = [];
    state.maxPrice = 6000000;
    state.sizes = [];
    state.minRating = 0;
    state.currentPage = 1;

    if (priceSlider) priceSlider.value = 6000000;
    if (priceMaxLabel) priceMaxLabel.textContent = formatCurrency(6000000);

    updateCategoryUI();
    updateBrandCheckboxes();
    updateSizeUI();
    updateRatingUI();
    render();
  }

  // --- Pagination Render ---
  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let html = `
      <button class="page-btn" id="page-prev" ${state.currentPage === 1 ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <button class="page-btn ${state.currentPage === i ? 'is-active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    html += `
      <button class="page-btn" id="page-next" ${state.currentPage === totalPages ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;

    paginationContainer.innerHTML = html;

    // Bind page button clicks
    paginationContainer.querySelectorAll('.page-btn[data-page]').forEach(btn => {
      btn.onclick = () => {
        state.currentPage = parseInt(btn.getAttribute('data-page'), 10);
        render();
        window.scrollTo({ top: 180, behavior: 'smooth' });
      };
    });

    const prev = paginationContainer.querySelector('#page-prev');
    if (prev) {
      prev.onclick = () => {
        if (state.currentPage > 1) {
          state.currentPage--;
          render();
          window.scrollTo({ top: 180, behavior: 'smooth' });
        }
      };
    }

    const next = paginationContainer.querySelector('#page-next');
    if (next) {
      next.onclick = () => {
        if (state.currentPage < totalPages) {
          state.currentPage++;
          render();
          window.scrollTo({ top: 180, behavior: 'smooth' });
        }
      };
    }
  }

  // --- Bind Filter Controls in Sidebar ---
  // 1. Category click
  const catItems = document.querySelectorAll('.category-filter-item');
  catItems.forEach(item => {
    item.onclick = () => {
      state.category = item.getAttribute('data-cat');
      state.currentPage = 1;
      updateCategoryUI();
      render();
    };
  });

  function updateCategoryUI() {
    catItems.forEach(item => {
      item.classList.toggle('is-active', item.getAttribute('data-cat') === state.category);
    });
  }

  // 2. Brand Checkboxes
  const brandCheckboxes = document.querySelectorAll('.brand-checkbox');
  brandCheckboxes.forEach(cb => {
    cb.onchange = () => {
      const b = cb.value;
      if (cb.checked) {
        if (!state.brands.includes(b)) state.brands.push(b);
      } else {
        state.brands = state.brands.filter(x => x !== b);
      }
      state.currentPage = 1;
      render();
    };
  });

  function updateBrandCheckboxes() {
    brandCheckboxes.forEach(cb => {
      cb.checked = state.brands.includes(cb.value);
    });
  }

  // 3. Price Range Slider
  if (priceSlider) {
    priceSlider.oninput = (e) => {
      state.maxPrice = parseInt(e.target.value, 10);
      if (priceMaxLabel) priceMaxLabel.textContent = formatCurrency(state.maxPrice);
    };
    priceSlider.onchange = () => {
      state.currentPage = 1;
      render();
    };
  }

  // 4. Sizes chips in sidebar
  const sizeChips = document.querySelectorAll('.filter-size-chip');
  sizeChips.forEach(chip => {
    chip.onclick = () => {
      const s = chip.getAttribute('data-size');
      if (state.sizes.includes(s)) {
        state.sizes = state.sizes.filter(x => x !== s);
        chip.classList.remove('is-selected');
      } else {
        state.sizes.push(s);
        chip.classList.add('is-selected');
      }
      state.currentPage = 1;
      render();
    };
  });

  function updateSizeUI() {
    sizeChips.forEach(chip => {
      chip.classList.toggle('is-selected', state.sizes.includes(chip.getAttribute('data-size')));
    });
  }

  // 5. Rating radio
  const ratingRadios = document.querySelectorAll('input[name="filter-rating"]');
  ratingRadios.forEach(radio => {
    radio.onchange = () => {
      state.minRating = parseFloat(radio.value);
      state.currentPage = 1;
      render();
    };
  });

  function updateRatingUI() {
    ratingRadios.forEach(r => {
      r.checked = parseFloat(r.value) === state.minRating;
    });
  }

  // 6. Sorting
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      state.sortBy = e.target.value;
      render();
    };
  }

  // 7. Grid / List View Toggle
  if (viewGridBtn && viewListBtn) {
    viewGridBtn.onclick = () => {
      state.viewMode = 'grid';
      viewGridBtn.classList.add('is-active');
      viewListBtn.classList.remove('is-active');
      render();
    };
    viewListBtn.onclick = () => {
      state.viewMode = 'list';
      viewListBtn.classList.add('is-active');
      viewGridBtn.classList.remove('is-active');
      render();
    };
  }

  // Sidebar Clear All link
  const sidebarClear = document.querySelector('.filter-clear-all');
  if (sidebarClear) sidebarClear.onclick = () => resetAllFilters();

  // Initial sync & render
  updateCategoryUI();
  updateBrandCheckboxes();
  render();
}
