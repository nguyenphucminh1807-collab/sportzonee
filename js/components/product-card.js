/**
 * SPORTZONE - Product Card Component
 * Formats, renders, and binds interactions for product cards
 */

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount).replace('₫', '').trim() + '₫';
}

function renderRatingStars(rating, reviewCount) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHtml = '';

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fa-solid fa-star"></i>';
  }
  if (hasHalfStar) {
    starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="fa-regular fa-star"></i>';
  }

  return `
    <div class="rating-stars" title="${rating} trên 5 sao">
      ${starsHtml}
      <span class="rating-count">(${reviewCount || 0})</span>
    </div>
  `;
}

function renderProductCard(product) {
  if (!product) return '';

  const isWishlisted = StorageUtil.isInWishlist(product.id);
  const compareList = StorageUtil.getCompareList();
  const isCompared = compareList.includes(product.id);

  let badgeHtml = '';
  if (product.badge) {
    let badgeClass = 'badge-hot';
    if (product.badge === 'New') badgeClass = 'badge-new';
    if (product.badge === 'Best Seller') badgeClass = 'badge-sale';
    if (product.badge === 'Flash Sale') badgeClass = 'badge-hot';
    badgeHtml += `<span class="badge ${badgeClass}">${product.badge}</span>`;
  }
  if (product.discount > 0) {
    badgeHtml += `<span class="badge badge-sale">-${product.discount}%</span>`;
  }

  const oldPriceHtml = product.oldPrice && product.oldPrice > product.price
    ? `<span class="product-card-oldprice">${formatCurrency(product.oldPrice)}</span>`
    : '';

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card-thumb">
        <div class="product-card-badges">
          ${badgeHtml}
        </div>
        
        <div class="product-card-actions">
          <button class="card-action-btn btn-wishlist ${isWishlisted ? 'is-active' : ''}" 
                  data-id="${product.id}" 
                  title="${isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}" 
                  aria-label="Yêu thích">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          
          <button class="card-action-btn btn-compare ${isCompared ? 'is-active' : ''}" 
                  data-id="${product.id}" 
                  title="So sánh sản phẩm" 
                  aria-label="So sánh">
            <i class="fa-solid fa-code-compare"></i>
          </button>
        </div>

        <a href="product-detail.html?id=${product.id}" class="product-card-img-link" tabindex="-1">
          <img src="${product.image}" 
               alt="${product.name}" 
               class="product-card-img" 
               loading="lazy" 
               width="400" 
               height="400" />
        </a>

        <button class="product-card-quickview" data-id="${product.id}" aria-label="Xem nhanh">
          <i class="fa-regular fa-eye"></i> Xem nhanh
        </button>
      </div>

      <div class="product-card-body">
        <div class="product-card-meta">
          <span class="product-card-brand">${product.brand}</span>
          <span class="product-card-cat">${product.category}</span>
        </div>

        <h3 class="product-card-title">
          <a href="product-detail.html?id=${product.id}">${product.name}</a>
        </h3>

        <div class="product-card-rating">
          ${renderRatingStars(product.rating, product.reviewCount)}
        </div>

        <div class="product-card-price-row">
          <span class="product-card-price">${formatCurrency(product.price)}</span>
          ${oldPriceHtml}
        </div>

        <button class="product-card-add-btn btn-card-add" data-id="${product.id}">
          <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
        </button>
      </div>
    </article>
  `;
}

function bindProductCardEvents(container = document) {
  // Wishlist toggle
  container.querySelectorAll('.btn-wishlist').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const isAdded = StorageUtil.toggleWishlist(id);
      const icon = btn.querySelector('i');
      
      if (isAdded) {
        btn.classList.add('is-active');
        icon.className = 'fa-solid fa-heart';
        Toast.success('Yêu thích', 'Đã thêm sản phẩm vào danh sách yêu thích!');
      } else {
        btn.classList.remove('is-active');
        icon.className = 'fa-regular fa-heart';
        Toast.info('Yêu thích', 'Đã xóa sản phẩm khỏi danh sách yêu thích.');
      }
    };
  });

  // Compare toggle
  container.querySelectorAll('.btn-compare').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const res = StorageUtil.toggleCompare(id);
      if (!res.success) {
        Toast.warning('So sánh sản phẩm', res.message);
        return;
      }
      btn.classList.toggle('is-active', res.isAdded);
      if (res.isAdded) {
        Toast.success('So sánh', 'Đã thêm sản phẩm vào bảng so sánh!');
      } else {
        Toast.info('So sánh', 'Đã xóa khỏi bảng so sánh.');
      }
    };
  });

  // Quick View Modal
  container.querySelectorAll('.product-card-quickview').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      Modal.openQuickView(id);
    };
  });

  // Add to Cart from card
  container.querySelectorAll('.btn-card-add').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const product = getProductById(id);
      if (!product) return;

      // If product has multiple sizes or colors, open quickview to let user choose safely
      if ((product.sizes && product.sizes.length > 1) || (product.colors && product.colors.length > 1)) {
        Modal.openQuickView(id);
      } else {
        const defaultSize = product.sizes ? product.sizes[0] : 'Tiêu chuẩn';
        const defaultColor = product.colors ? product.colors[0].name : 'Mặc định';
        StorageUtil.addToCart(product, defaultSize, defaultColor, 1);
        Toast.success('Giỏ hàng', `Đã thêm ${product.name} vào giỏ hàng!`);
      }
    };
  });
}
