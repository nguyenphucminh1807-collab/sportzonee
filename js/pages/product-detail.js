/**
 * SPORTZONE - Product Detail Script
 * Dynamic Image Gallery, Variant Picker, Add to Cart Validation, Tabs, Related & Recently Viewed
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductDetail();
});

function initProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 1;
  const product = getProductById(productId);

  if (!product) {
    window.location.href = 'products.html';
    return;
  }

  // Record this product in Recently Viewed
  StorageUtil.addRecentView(product.id);

  // Update Page Title
  document.title = `${product.name} - SPORTZONE`;

  // Update Breadcrumb
  const breadcrumbCat = document.getElementById('breadcrumb-cat');
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  if (breadcrumbCat) {
    breadcrumbCat.textContent = product.category;
    breadcrumbCat.setAttribute('href', `products.html?category=${encodeURIComponent(product.category)}`);
  }
  if (breadcrumbTitle) breadcrumbTitle.textContent = product.name;

  // --- Render Gallery ---
  const mainImg = document.getElementById('detail-main-img');
  const thumbsContainer = document.getElementById('detail-thumbs-container');
  if (mainImg) mainImg.src = product.image;

  if (thumbsContainer) {
    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    thumbsContainer.innerHTML = images.map((imgUrl, i) => `
      <div class="gallery-thumb-item ${i === 0 ? 'is-active' : ''}" data-src="${imgUrl}">
        <img src="${imgUrl}" alt="${product.name} góc ${i + 1}" />
      </div>
    `).join('');

    thumbsContainer.querySelectorAll('.gallery-thumb-item').forEach(thumb => {
      thumb.onclick = () => {
        thumbsContainer.querySelectorAll('.gallery-thumb-item').forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
        const newSrc = thumb.getAttribute('data-src');
        if (mainImg) mainImg.src = newSrc;
      };
    });
  }

  // --- Render Info ---
  const brandEl = document.getElementById('detail-brand');
  const titleEl = document.getElementById('detail-title');
  const ratingEl = document.getElementById('detail-rating');
  const priceEl = document.getElementById('detail-price');
  const oldPriceEl = document.getElementById('detail-oldprice');
  const discountEl = document.getElementById('detail-discount');
  const stockEl = document.getElementById('detail-stock');
  const descEl = document.getElementById('detail-desc');

  if (brandEl) brandEl.textContent = product.brand;
  if (titleEl) titleEl.textContent = product.name;
  if (ratingEl) ratingEl.innerHTML = renderRatingStars(product.rating, product.reviewCount);
  if (priceEl) priceEl.textContent = formatCurrency(product.price);
  
  if (oldPriceEl) {
    if (product.oldPrice > product.price) {
      oldPriceEl.textContent = formatCurrency(product.oldPrice);
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }

  if (discountEl) {
    if (product.discount > 0) {
      discountEl.textContent = `-${product.discount}%`;
      discountEl.style.display = 'inline-block';
    } else {
      discountEl.style.display = 'none';
    }
  }

  if (stockEl) {
    if (product.stock > 10) {
      stockEl.className = 'stock-badge stock-in';
      stockEl.innerHTML = '<i class="fa-solid fa-check"></i> Còn hàng';
    } else if (product.stock > 0) {
      stockEl.className = 'stock-badge stock-low';
      stockEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Chỉ còn ${product.stock} sản phẩm`;
    } else {
      stockEl.className = 'stock-badge stock-out';
      stockEl.innerHTML = '<i class="fa-solid fa-xmark"></i> Hết hàng tạm thời';
    }
  }

  if (descEl) descEl.textContent = product.description;

  // --- Variant Options (Sizes & Colors) ---
  let selectedSize = product.sizes && product.sizes.length === 1 ? product.sizes[0] : '';
  let selectedColor = product.colors && product.colors.length === 1 ? product.colors[0].name : '';
  let quantity = 1;

  const sizeChipsWrap = document.getElementById('detail-size-chips');
  const sizeLabel = document.getElementById('selected-size-label');
  const sizeError = document.getElementById('detail-size-error');

  if (sizeChipsWrap && product.sizes) {
    sizeChipsWrap.innerHTML = product.sizes.map(s => `
      <button type="button" class="size-chip ${s === selectedSize ? 'is-selected' : ''}" data-val="${s}">${s}</button>
    `).join('');

    sizeChipsWrap.querySelectorAll('.size-chip').forEach(chip => {
      chip.onclick = () => {
        sizeChipsWrap.querySelectorAll('.size-chip').forEach(c => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        selectedSize = chip.getAttribute('data-val');
        if (sizeLabel) sizeLabel.textContent = selectedSize;
        if (sizeError) sizeError.style.display = 'none';
      };
    });
  }

  const colorChipsWrap = document.getElementById('detail-color-chips');
  const colorLabel = document.getElementById('selected-color-label');
  const colorError = document.getElementById('detail-color-error');

  if (colorChipsWrap && product.colors) {
    colorChipsWrap.innerHTML = product.colors.map(c => `
      <button type="button" class="color-chip ${c.name === selectedColor ? 'is-selected' : ''}" 
              data-val="${c.name}" 
              style="background-color: ${c.hex};" 
              title="${c.name}"></button>
    `).join('');

    colorChipsWrap.querySelectorAll('.color-chip').forEach(chip => {
      chip.onclick = () => {
        colorChipsWrap.querySelectorAll('.color-chip').forEach(c => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        selectedColor = chip.getAttribute('data-val');
        if (colorLabel) colorLabel.textContent = selectedColor;
        if (colorError) colorError.style.display = 'none';
      };
    });
  }

  // --- Quantity Stepper ---
  const qtyInput = document.getElementById('detail-qty-input');
  const qtyMinus = document.getElementById('detail-qty-minus');
  const qtyPlus = document.getElementById('detail-qty-plus');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.onclick = () => {
      if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity;
      }
    };
    qtyPlus.onclick = () => {
      if (quantity < (product.stock || 20)) {
        quantity++;
        qtyInput.value = quantity;
      }
    };
  }

  // --- Wishlist Button ---
  const wishlistBtn = document.getElementById('detail-wishlist-btn');
  if (wishlistBtn) {
    const isWishlisted = StorageUtil.isInWishlist(product.id);
    wishlistBtn.classList.toggle('is-active', isWishlisted);
    wishlistBtn.querySelector('i').className = isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

    wishlistBtn.onclick = () => {
      const added = StorageUtil.toggleWishlist(product.id);
      wishlistBtn.classList.toggle('is-active', added);
      wishlistBtn.querySelector('i').className = added ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      if (added) {
        Toast.success('Yêu thích', 'Đã thêm sản phẩm vào danh sách yêu thích!');
      } else {
        Toast.info('Yêu thích', 'Đã xóa khỏi danh sách yêu thích.');
      }
    };
  }

  // --- Validation & Add to Cart Helper ---
  function validateAndAddToCart() {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      if (sizeError) sizeError.style.display = 'block';
      Toast.warning('Chọn kích thước', 'Vui lòng chọn size sản phẩm!');
      return false;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      if (colorError) colorError.style.display = 'block';
      Toast.warning('Chọn màu sắc', 'Vui lòng chọn màu sắc sản phẩm!');
      return false;
    }

    StorageUtil.addToCart(
      product,
      selectedSize || 'Tiêu chuẩn',
      selectedColor || 'Mặc định',
      quantity
    );
    return true;
  }

  // Add to Cart Button
  const addToCartBtn = document.getElementById('detail-add-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      if (validateAndAddToCart()) {
        Toast.success('Giỏ hàng', `Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
      }
    };
  }

  // Buy Now Button
  const buyNowBtn = document.getElementById('detail-buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.onclick = () => {
      if (validateAndAddToCart()) {
        window.location.href = 'checkout.html';
      }
    };
  }

  // --- Tabs Switcher ---
  const tabBtns = document.querySelectorAll('.product-tabs-section .tab-btn');
  const tabPanes = document.querySelectorAll('.product-tabs-section .tab-pane');
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      tabPanes.forEach(p => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = document.getElementById(btn.getAttribute('data-tab'));
      if (target) target.classList.add('is-active');
    };
  });

  // Populate Specs Tab
  const specsTable = document.getElementById('detail-specs-table');
  if (specsTable && product.specs) {
    specsTable.innerHTML = `
      <tbody>
        <tr><td>Chất liệu</td><td>${product.specs.material || 'Vải cao cấp'}</td></tr>
        <tr><td>Xuất xứ thương hiệu</td><td>${product.brand}</td></tr>
        <tr><td>Nơi sản xuất</td><td>${product.specs.origin || 'Chính hãng'}</td></tr>
        <tr><td>Môn thể thao phù hợp</td><td>${product.specs.sport || product.category}</td></tr>
        <tr><td>Chính sách bảo hành</td><td>${product.specs.warranty || '12 tháng'}</td></tr>
      </tbody>
    `;
  }

  // Populate Features List in Desc Tab
  const featuresList = document.getElementById('detail-features-list');
  if (featuresList && product.features) {
    featuresList.innerHTML = product.features.map(f => `
      <li style="margin-bottom: 0.5rem; display: flex; align-items: baseline; gap: 0.5rem;">
        <i class="fa-solid fa-circle-check text-primary" style="font-size: 0.8rem;"></i>
        <span>${f}</span>
      </li>
    `).join('');
  }

  // --- Related Products ---
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = getRelatedProducts(product.category, product.id, 4);
    if (related.length > 0) {
      relatedGrid.innerHTML = related.map(p => renderProductCard(p)).join('');
      bindProductCardEvents(relatedGrid);
    } else {
      relatedGrid.innerHTML = '<p class="text-muted">Chưa có sản phẩm liên quan.</p>';
    }
  }

  // --- Recently Viewed ---
  const recentGrid = document.getElementById('recently-viewed-grid');
  if (recentGrid) {
    const recentIds = StorageUtil.getRecentViews().filter(id => id !== product.id).slice(0, 4);
    if (recentIds.length > 0) {
      const recentProducts = recentIds.map(id => getProductById(id)).filter(Boolean);
      recentGrid.innerHTML = recentProducts.map(p => renderProductCard(p)).join('');
      bindProductCardEvents(recentGrid);
    } else {
      const recentSection = document.getElementById('recently-viewed-section');
      if (recentSection) recentSection.style.display = 'none';
    }
  }
}
