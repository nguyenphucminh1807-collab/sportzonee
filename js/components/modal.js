/**
 * SPORTZONE - Modal Controllers
 * Quick View, Size Guide, Sport Finder Quiz, Compare Modal, and Order Success Modal
 */

const Modal = {
  activeModal: null,

  init() {
    // Global ESC key listener to close active modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close(this.activeModal);
      }
    });
  },

  open(modalEl) {
    if (!modalEl) return;
    this.init();
    modalEl.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    this.activeModal = modalEl;

    // Close on backdrop click
    modalEl.onclick = (e) => {
      if (e.target === modalEl) {
        this.close(modalEl);
      }
    };

    // Close buttons inside modal
    const closeBtns = modalEl.querySelectorAll('.modal-close, .btn-modal-close');
    closeBtns.forEach(btn => {
      btn.onclick = () => this.close(modalEl);
    });
  },

  close(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('is-active');
    document.body.style.overflow = '';
    this.activeModal = null;
  },

  // --- 1. Quick View Modal ---
  openQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;

    let modal = document.getElementById('quickview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quickview-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    let selectedSize = product.sizes && product.sizes.length === 1 ? product.sizes[0] : '';
    let selectedColor = product.colors && product.colors.length === 1 ? product.colors[0].name : '';
    let quantity = 1;

    const sizesHtml = product.sizes ? product.sizes.map(s => `
      <button type="button" class="size-chip ${s === selectedSize ? 'is-selected' : ''}" data-val="${s}">${s}</button>
    `).join('') : '<span class="text-muted">Tiêu chuẩn</span>';

    const colorsHtml = product.colors ? product.colors.map(c => `
      <button type="button" class="color-chip ${c.name === selectedColor ? 'is-selected' : ''}" 
              data-val="${c.name}" 
              style="background-color: ${c.hex};" 
              title="${c.name}"></button>
    `).join('') : '';

    const oldPriceHtml = product.oldPrice > product.price
      ? `<span class="product-card-oldprice" style="font-size: 1rem;">${formatCurrency(product.oldPrice)}</span>`
      : '';

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-lg">
        <div class="modal-header">
          <span class="badge badge-sale">${product.brand}</span>
          <button class="modal-close" aria-label="Đóng"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <div class="quickview-grid">
            <div>
              <img src="${product.image}" alt="${product.name}" class="quickview-img" />
            </div>
            <div class="quickview-options">
              <h2 style="font-size: 1.35rem; font-weight: bold; line-height: 1.3;">${product.name}</h2>
              <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-top: 0.25rem;">
                <span style="font-size: 1.5rem; font-weight: 800; color: var(--primary-color);">${formatCurrency(product.price)}</span>
                ${oldPriceHtml}
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${product.description}</p>
              
              <!-- Size Selector -->
              <div>
                <div class="option-label">
                  <span>Chọn Size: <strong id="qv-selected-size-label">${selectedSize || 'Chưa chọn'}</strong></span>
                  <a href="javascript:void(0)" onclick="Modal.openSizeGuide()" class="text-primary font-bold" style="font-size: 0.75rem;">
                    <i class="fa-solid fa-ruler-horizontal"></i> Bảng Size
                  </a>
                </div>
                <div class="size-chips" id="qv-size-chips">
                  ${sizesHtml}
                </div>
                <span class="form-error" id="qv-size-error" style="display: none;">Vui lòng chọn kích thước trước khi thêm vào giỏ!</span>
              </div>

              <!-- Color Selector -->
              ${product.colors ? `
              <div>
                <div class="option-label">
                  <span>Màu sắc: <strong id="qv-selected-color-label">${selectedColor || 'Chưa chọn'}</strong></span>
                </div>
                <div class="color-chips" id="qv-color-chips">
                  ${colorsHtml}
                </div>
                <span class="form-error" id="qv-color-error" style="display: none;">Vui lòng chọn màu sắc!</span>
              </div>
              ` : ''}

              <!-- Quantity & Add to Cart -->
              <div>
                <div class="option-label"><span>Số lượng:</span></div>
                <div style="display: flex; gap: 0.85rem; align-items: center;">
                  <div class="quantity-control">
                    <button type="button" class="quantity-btn" id="qv-qty-minus"><i class="fa-solid fa-minus"></i></button>
                    <input type="text" readonly class="quantity-input" id="qv-qty-input" value="1" />
                    <button type="button" class="quantity-btn" id="qv-qty-plus"><i class="fa-solid fa-plus"></i></button>
                  </div>
                  <button type="button" class="btn btn-primary" id="qv-btn-add" style="flex: 1;">
                    <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                  </button>
                </div>
              </div>

              <div style="border-top: 1px solid var(--border-color); padding-top: 0.85rem; font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 1rem;">
                <span><i class="fa-solid fa-truck text-primary"></i> Giao nhanh 2h</span>
                <span><i class="fa-solid fa-shield-halved text-primary"></i> 100% Chính hãng</span>
                <span><i class="fa-solid fa-rotate-left text-primary"></i> Đổi trả 30 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind size clicks
    const sizeChips = modal.querySelectorAll('#qv-size-chips .size-chip');
    const sizeError = modal.querySelector('#qv-size-error');
    sizeChips.forEach(chip => {
      chip.onclick = () => {
        sizeChips.forEach(c => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        selectedSize = chip.getAttribute('data-val');
        modal.querySelector('#qv-selected-size-label').textContent = selectedSize;
        if (sizeError) sizeError.style.display = 'none';
      };
    });

    // Bind color clicks
    const colorChips = modal.querySelectorAll('#qv-color-chips .color-chip');
    const colorError = modal.querySelector('#qv-color-error');
    colorChips.forEach(chip => {
      chip.onclick = () => {
        colorChips.forEach(c => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        selectedColor = chip.getAttribute('data-val');
        modal.querySelector('#qv-selected-color-label').textContent = selectedColor;
        if (colorError) colorError.style.display = 'none';
      };
    });

    // Bind quantity clicks
    const qtyInput = modal.querySelector('#qv-qty-input');
    modal.querySelector('#qv-qty-minus').onclick = () => {
      if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity;
      }
    };
    modal.querySelector('#qv-qty-plus').onclick = () => {
      if (quantity < (product.stock || 20)) {
        quantity++;
        qtyInput.value = quantity;
      }
    };

    // Add to cart click
    modal.querySelector('#qv-btn-add').onclick = () => {
      if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        if (sizeError) sizeError.style.display = 'block';
        Toast.warning('Chọn kích thước', 'Vui lòng chọn size sản phẩm trước khi mua!');
        return;
      }
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        if (colorError) colorError.style.display = 'block';
        Toast.warning('Chọn màu sắc', 'Vui lòng chọn màu sắc sản phẩm!');
        return;
      }

      StorageUtil.addToCart(
        product,
        selectedSize || 'Tiêu chuẩn',
        selectedColor || 'Mặc định',
        quantity
      );

      this.close(modal);
      Toast.success('Giỏ hàng', `Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
    };

    this.open(modal);
  },

  // --- 2. Size Guide Modal ---
  openSizeGuide() {
    let modal = document.getElementById('sizeguide-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sizeguide-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-lg">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fa-solid fa-ruler-combined text-primary"></i> Hướng Dẫn Chọn Size Chuẩn</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <div class="tabs-nav" id="sizeguide-tabs" style="margin-bottom: 1.25rem;">
            <button class="tab-btn is-active" data-tab="tab-shoes">Size Giày Thể Thao</button>
            <button class="tab-btn" data-tab="tab-clothes">Size Quần Áo</button>
            <button class="tab-btn" data-tab="tab-measure">Cách Đo Tại Nhà</button>
          </div>

          <div class="tab-pane is-active" id="tab-shoes">
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
              Bảng quy đổi kích thước giày chuẩn quốc tế dành cho người lớn (Nam & Nữ):
            </p>
            <table class="specs-table">
              <thead>
                <tr style="background-color: var(--secondary-color); color: #ffffff;">
                  <td style="color:#ffffff;">EU (Việt Nam)</td>
                  <td style="color:#ffffff;">US Nam</td>
                  <td style="color:#ffffff;">US Nữ</td>
                  <td style="color:#ffffff;">Chiều dài bàn chân (cm)</td>
                </tr>
              </thead>
              <tbody>
                <tr><td>36</td><td>4.5</td><td>6.0</td><td>22.5 - 23.0 cm</td></tr>
                <tr><td>37</td><td>5.0</td><td>6.5</td><td>23.0 - 23.5 cm</td></tr>
                <tr><td>38</td><td>6.0</td><td>7.5</td><td>23.5 - 24.0 cm</td></tr>
                <tr><td>39</td><td>6.5</td><td>8.0</td><td>24.0 - 24.5 cm</td></tr>
                <tr><td>40</td><td>7.5</td><td>9.0</td><td>24.5 - 25.0 cm</td></tr>
                <tr><td>41</td><td>8.0</td><td>9.5</td><td>25.0 - 25.5 cm</td></tr>
                <tr><td>42</td><td>8.5</td><td>10.0</td><td>25.5 - 26.0 cm</td></tr>
                <tr><td>43</td><td>9.5</td><td>11.0</td><td>26.5 - 27.0 cm</td></tr>
                <tr><td>44</td><td>10.0</td><td>11.5</td><td>27.0 - 27.5 cm</td></tr>
              </tbody>
            </table>
          </div>

          <div class="tab-pane" id="tab-clothes">
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
              Bảng gợi ý size áo & quần thể thao theo chiều cao và cân nặng:
            </p>
            <table class="specs-table">
              <thead>
                <tr style="background-color: var(--secondary-color); color: #ffffff;">
                  <td style="color:#ffffff;">Size</td>
                  <td style="color:#ffffff;">Chiều cao (cm)</td>
                  <td style="color:#ffffff;">Cân nặng (kg)</td>
                  <td style="color:#ffffff;">Vòng ngực (cm)</td>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>S</strong></td><td>155 - 165 cm</td><td>48 - 56 kg</td><td>84 - 88 cm</td></tr>
                <tr><td><strong>M</strong></td><td>165 - 172 cm</td><td>57 - 65 kg</td><td>88 - 94 cm</td></tr>
                <tr><td><strong>L</strong></td><td>170 - 178 cm</td><td>66 - 74 kg</td><td>94 - 100 cm</td></tr>
                <tr><td><strong>XL</strong></td><td>175 - 183 cm</td><td>75 - 82 kg</td><td>100 - 106 cm</td></tr>
                <tr><td><strong>XXL</strong></td><td>180 - 190 cm</td><td>83 - 92 kg</td><td>106 - 114 cm</td></tr>
              </tbody>
            </table>
          </div>

          <div class="tab-pane" id="tab-measure">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; font-size: 0.85rem; color: var(--text-main);">
              <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-sm);">
                <h4 style="font-weight: bold; margin-bottom: 0.5rem; color: var(--primary-color);">1. Đo bàn chân để chọn giày</h4>
                <ol style="margin-left: 1.2rem; line-height: 1.6; color: var(--text-muted);">
                  <li>Đặt một tờ giấy trắng sát mép tường.</li>
                  <li>Đặt gót chân chạm nhẹ vào tường, đứng thẳng.</li>
                  <li>Dùng bút đánh dấu điểm xa nhất của ngón chân cái.</li>
                  <li>Dùng thước đo khoảng cách từ mép tường đến điểm đánh dấu (cm).</li>
                  <li>Cộng thêm 0.5cm nếu bạn thích đi giày thoải mái hoặc mang tất dày.</li>
                </ol>
              </div>
              <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-sm);">
                <h4 style="font-weight: bold; margin-bottom: 0.5rem; color: var(--primary-color);">2. Lưu ý khi chọn quần áo thể thao</h4>
                <p style="color: var(--text-muted); line-height: 1.6;">
                  Trang phục thể thao thường có độ co giãn cao (Spandex/Lycra). Nếu số đo của bạn nằm giữa 2 size:
                  <br/>- Chọn size nhỏ hơn nếu bạn thích mặc ôm body nén cơ (Compression).
                  <br/>- Chọn size lớn hơn nếu bạn thích dáng suông thoáng mát (Regular fit).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind tab clicks
    const tabBtns = modal.querySelectorAll('#sizeguide-tabs .tab-btn');
    const tabPanes = modal.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
      btn.onclick = () => {
        tabBtns.forEach(b => b.classList.remove('is-active'));
        tabPanes.forEach(p => p.classList.remove('is-active'));
        btn.classList.add('is-active');
        const targetId = btn.getAttribute('data-tab');
        modal.querySelector(`#${targetId}`).classList.add('is-active');
      };
    });

    this.open(modal);
  },

  // --- 3. Sport Finder Quiz (Creative Feature) ---
  openSportFinder() {
    let modal = document.getElementById('sportfinder-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sportfinder-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    let answers = {
      sport: 'Running',
      level: 'Beginner',
      budget: 'all'
    };

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-lg">
        <div class="modal-header">
          <h3 class="modal-title">
            <i class="fa-solid fa-wand-magic-sparkles text-primary"></i> Sport Finder - Gợi Ý Đồ Thể Thao Phù Hợp
          </h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body" id="sportfinder-body">
          <div id="quiz-step-container">
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
              Chỉ mất 20 giây! Trả lời 3 câu hỏi nhanh dưới đây để AI của SPORTZONE tìm món đồ hoàn hảo nhất cho bạn:
            </p>

            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <!-- Question 1: Sport -->
              <div>
                <label class="form-label font-bold">1. Môn thể thao bạn muốn tập luyện?</label>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;" id="q-sport-group">
                  <button type="button" class="btn btn-outline quiz-opt is-active" data-val="Running">🏃 Chạy bộ</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="Football">⚽ Bóng đá</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="Basketball">🏀 Bóng rổ</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="Gym">🏋️ Gym / Fitness</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="Tennis">🎾 Tennis</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="all">🔥 Tất cả môn</button>
                </div>
              </div>

              <!-- Question 2: Level -->
              <div>
                <label class="form-label font-bold">2. Trình độ & cường độ tập luyện của bạn?</label>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;" id="q-level-group">
                  <button type="button" class="btn btn-outline quiz-opt is-active" data-val="Beginner">Mới bắt đầu / Tập nhẹ</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="Intermediate">Bán chuyên / 3-4 buổi/tuần</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="Pro">Chuyên nghiệp / Cường độ cao</button>
                </div>
              </div>

              <!-- Question 3: Budget -->
              <div>
                <label class="form-label font-bold">3. Ngân sách dự kiến?</label>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;" id="q-budget-group">
                  <button type="button" class="btn btn-outline quiz-opt is-active" data-val="all">Mọi mức giá</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="under1m">Dưới 1.000.000₫</button>
                  <button type="button" class="btn btn-outline quiz-opt" data-val="over1m">Trên 1.000.000₫</button>
                </div>
              </div>

              <button type="button" class="btn btn-primary btn-lg btn-block" id="btn-submit-quiz">
                <i class="fa-solid fa-magnifying-glass"></i> Xem Gợi Ý Sản Phẩm
              </button>
            </div>
          </div>

          <div id="quiz-results-container" style="display: none;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <h4 style="font-weight: 800; font-size: 1.15rem;">Sản phẩm phù hợp nhất cho bạn:</h4>
              <button type="button" class="btn btn-sm btn-outline" id="btn-retake-quiz">
                <i class="fa-solid fa-rotate-left"></i> Làm lại
              </button>
            </div>
            <div class="grid grid-2" id="quiz-results-grid" style="gap: 1rem;">
              <!-- Results injected dynamically -->
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind option toggles
    const bindGroup = (groupId, key) => {
      const btns = modal.querySelectorAll(`#${groupId} .quiz-opt`);
      btns.forEach(btn => {
        btn.onclick = () => {
          btns.forEach(b => b.classList.remove('is-active', 'btn-primary'));
          btn.classList.add('is-active');
          answers[key] = btn.getAttribute('data-val');
        };
      });
    };

    bindGroup('q-sport-group', 'sport');
    bindGroup('q-level-group', 'level');
    bindGroup('q-budget-group', 'budget');

    // Submit quiz
    modal.querySelector('#btn-submit-quiz').onclick = () => {
      let filtered = getAllProducts();
      if (answers.sport !== 'all') {
        filtered = filtered.filter(p => p.sport === answers.sport || p.category.toLowerCase().includes(answers.sport.toLowerCase()));
      }
      if (answers.level) {
        filtered = filtered.filter(p => p.level === answers.level || !p.level);
      }
      if (answers.budget === 'under1m') {
        filtered = filtered.filter(p => p.price < 1000000);
      } else if (answers.budget === 'over1m') {
        filtered = filtered.filter(p => p.price >= 1000000);
      }

      if (filtered.length === 0) {
        filtered = getAllProducts().slice(0, 4);
      } else {
        filtered = filtered.slice(0, 4);
      }

      const resultsGrid = modal.querySelector('#quiz-results-grid');
      resultsGrid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
      bindProductCardEvents(resultsGrid);

      modal.querySelector('#quiz-step-container').style.display = 'none';
      modal.querySelector('#quiz-results-container').style.display = 'block';
    };

    modal.querySelector('#btn-retake-quiz').onclick = () => {
      modal.querySelector('#quiz-step-container').style.display = 'block';
      modal.querySelector('#quiz-results-container').style.display = 'none';
    };

    this.open(modal);
  },

  // --- 4. Product Comparison Modal ---
  openCompareModal() {
    const compareIds = StorageUtil.getCompareList();
    if (compareIds.length === 0) {
      Toast.info('So sánh sản phẩm', 'Chưa có sản phẩm nào trong bảng so sánh.');
      return;
    }

    const products = compareIds.map(id => getProductById(id)).filter(Boolean);

    let modal = document.getElementById('compare-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'compare-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-lg" style="max-width: 950px;">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fa-solid fa-code-compare text-primary"></i> So Sánh Sản Phẩm (${products.length}/3)</h3>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="btn btn-sm btn-ghost" id="modal-clear-compare" style="font-size: 0.75rem; color: var(--color-danger);">
              <i class="fa-solid fa-trash-can"></i> Xóa tất cả
            </button>
            <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
        <div class="modal-body" style="overflow-x: auto;">
          <table class="specs-table" style="min-width: 600px;">
            <thead>
              <tr>
                <td style="width: 180px; font-weight: bold; background: var(--bg-subtle);">Thuộc tính</td>
                ${products.map(p => `
                  <td style="text-align: center; vertical-align: top; width: calc((100% - 180px) / ${products.length});">
                    <img src="${p.image}" alt="${p.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-sm); margin: 0 auto 0.5rem;" />
                    <h4 style="font-size: 0.85rem; font-weight: bold; height: 2.4rem; overflow: hidden;">${p.name}</h4>
                    <span style="font-size: 1rem; font-weight: 800; color: var(--primary-color);">${formatCurrency(p.price)}</span>
                    <button class="btn btn-sm btn-primary btn-block" style="margin-top: 0.5rem;" onclick="Modal.openQuickView(${p.id})">
                      Mua ngay
                    </button>
                  </td>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: bold;">Thương hiệu</td>
                ${products.map(p => `<td style="text-align: center;"><strong>${p.brand}</strong></td>`).join('')}
              </tr>
              <tr>
                <td style="font-weight: bold;">Danh mục</td>
                ${products.map(p => `<td style="text-align: center;">${p.category}</td>`).join('')}
              </tr>
              <tr>
                <td style="font-weight: bold;">Môn thể thao</td>
                ${products.map(p => `<td style="text-align: center;">${p.sport || 'Đa năng'}</td>`).join('')}
              </tr>
              <tr>
                <td style="font-weight: bold;">Đánh giá</td>
                ${products.map(p => `<td style="text-align: center;">⭐ ${p.rating} / 5.0 (${p.reviewCount} lượt)</td>`).join('')}
              </tr>
              <tr>
                <td style="font-weight: bold;">Chất liệu</td>
                ${products.map(p => `<td style="text-align: center; font-size: 0.75rem;">${p.specs?.material || 'Cao cấp'}</td>`).join('')}
              </tr>
              <tr>
                <td style="font-weight: bold;">Bảo hành</td>
                ${products.map(p => `<td style="text-align: center; font-size: 0.75rem;">${p.specs?.warranty || '12 tháng'}</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    modal.querySelector('#modal-clear-compare').onclick = () => {
      StorageUtil.clearCompare();
      this.close(modal);
      Toast.info('So sánh', 'Đã xóa tất cả sản phẩm so sánh.');
    };

    this.open(modal);
  },

  // --- 5. Order Success Celebration Modal ---
  openOrderSuccess(order) {
    let modal = document.getElementById('ordersuccess-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ordersuccess-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog" style="max-width: 520px;">
        <div class="modal-body order-success-content">
          <div class="order-success-icon">
            <i class="fa-solid fa-check"></i>
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.35rem;">Đặt Hàng Thành Công!</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Cảm ơn bạn <strong style="color: var(--text-main);">${order.fullname}</strong> đã tin tưởng SPORTZONE! Đơn hàng của bạn đang được xử lý và chuẩn bị đóng gói.
          </p>

          <div class="order-id-badge">
            Mã đơn hàng: <span>${order.id}</span>
          </div>

          <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-sm); text-align: left; font-size: 0.8rem; margin-bottom: 1.5rem; line-height: 1.6;">
            <div><strong>Người nhận:</strong> ${order.fullname} (${order.phone})</div>
            <div><strong>Địa chỉ:</strong> ${order.address}, ${order.city}</div>
            <div><strong>Phương thức thanh toán:</strong> ${order.paymentMethod}</div>
            <div><strong>Tổng thanh toán:</strong> <span style="font-weight: 800; color: var(--primary-color); font-size: 0.95rem;">${formatCurrency(order.total)}</span></div>
            <div><strong>Thời gian giao dự kiến:</strong> 1-3 ngày làm việc</div>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center;">
            <a href="index.html" class="btn btn-secondary">
              <i class="fa-solid fa-house"></i> Về Trang Chủ
            </a>
            <a href="products.html" class="btn btn-primary">
              <i class="fa-solid fa-bag-shopping"></i> Tiếp Tục Mua Sắm
            </a>
          </div>
        </div>
      </div>
    `;

    this.open(modal);
  }
};
