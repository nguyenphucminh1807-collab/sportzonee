/**
 * SPORTZONE - Cart Page Script
 * Cart Items List, Quantity Stepper, Free Shipping Progress, Voucher, and Totals
 */

document.addEventListener('DOMContentLoaded', () => {
  initCartPage();
});

function initCartPage() {
  const container = document.getElementById('cart-page-content');
  const emptyState = document.getElementById('cart-empty-state');

  function render() {
    const cart = StorageUtil.getCart();

    if (cart.length === 0) {
      if (container) container.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (container) container.style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';

    // 1. Free Shipping Progress Bar
    const totals = StorageUtil.getCartTotals();
    const freeshipThreshold = 500000;
    const freeshipText = document.getElementById('freeship-status-text');
    const freeshipFill = document.getElementById('freeship-progress-fill');

    if (totals.subtotal >= freeshipThreshold || totals.shipping === 0) {
      if (freeshipText) freeshipText.innerHTML = '<i class="fa-solid fa-circle-check text-success"></i> Chúc mừng! Bạn đã đủ điều kiện được <strong>MIỄN PHÍ VẬN CHUYỂN</strong>!';
      if (freeshipFill) freeshipFill.style.width = '100%';
    } else {
      const remaining = freeshipThreshold - totals.subtotal;
      const percent = Math.min(100, Math.round((totals.subtotal / freeshipThreshold) * 100));
      if (freeshipText) freeshipText.innerHTML = `<i class="fa-solid fa-truck-fast text-primary"></i> Mua thêm <strong>${formatCurrency(remaining)}</strong> để được <strong>MIỄN PHÍ VẬN CHUYỂN</strong>!`;
      if (freeshipFill) freeshipFill.style.width = `${percent}%`;
    }

    // 2. Render Cart Items
    const itemsListEl = document.getElementById('cart-items-list');
    if (itemsListEl) {
      itemsListEl.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
          <!-- Item Info -->
          <div class="cart-item-info">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
            <div class="cart-item-details">
              <a href="product-detail.html?id=${item.id}" class="cart-item-name">${item.name}</a>
              <div class="cart-item-variants">
                <span>Size: <strong>${item.size}</strong></span>
                <span>Màu: <strong>${item.color}</strong></span>
              </div>
            </div>
          </div>

          <!-- Unit Price -->
          <div data-label="Đơn giá:" class="cart-item-price">
            ${formatCurrency(item.price)}
          </div>

          <!-- Quantity Stepper -->
          <div data-label="Số lượng:">
            <div class="quantity-control" style="transform: scale(0.9); transform-origin: left center;">
              <button type="button" class="quantity-btn btn-qty-minus"><i class="fa-solid fa-minus"></i></button>
              <input type="text" readonly class="quantity-input" value="${item.quantity}" />
              <button type="button" class="quantity-btn btn-qty-plus"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>

          <!-- Subtotal -->
          <div data-label="Thành tiền:" class="cart-item-total">
            ${formatCurrency(item.price * item.quantity)}
          </div>

          <!-- Remove -->
          <div>
            <button type="button" class="cart-item-remove-btn btn-remove-item" title="Xóa sản phẩm" aria-label="Xóa">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      `).join('');

      // Bind quantity steppers
      itemsListEl.querySelectorAll('.cart-item-row').forEach(row => {
        const id = parseInt(row.getAttribute('data-id'), 10);
        const size = row.getAttribute('data-size');
        const color = row.getAttribute('data-color');
        const item = cart.find(i => i.id === id && i.size === size && i.color === color);

        const minusBtn = row.querySelector('.btn-qty-minus');
        const plusBtn = row.querySelector('.btn-qty-plus');
        const removeBtn = row.querySelector('.btn-remove-item');

        if (minusBtn) {
          minusBtn.onclick = () => {
            if (item.quantity > 1) {
              StorageUtil.updateCartQty(id, size, color, item.quantity - 1);
              render();
            } else {
              if (confirm(`Bạn có chắc muốn xóa "${item.name}" khỏi giỏ hàng?`)) {
                StorageUtil.removeFromCart(id, size, color);
                Toast.info('Giỏ hàng', 'Đã xóa sản phẩm khỏi giỏ hàng.');
                render();
              }
            }
          };
        }

        if (plusBtn) {
          plusBtn.onclick = () => {
            StorageUtil.updateCartQty(id, size, color, item.quantity + 1);
            render();
          };
        }

        if (removeBtn) {
          removeBtn.onclick = () => {
            StorageUtil.removeFromCart(id, size, color);
            Toast.info('Giỏ hàng', `Đã xóa "${item.name}" khỏi giỏ hàng.`);
            render();
          };
        }
      });
    }

    // 3. Render Totals Summary
    const subtotalEl = document.getElementById('summary-subtotal');
    const discountEl = document.getElementById('summary-discount');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    if (discountEl) discountEl.textContent = `-${formatCurrency(totals.discount)}`;
    if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? 'Miễn phí' : formatCurrency(totals.shipping);
    if (totalEl) totalEl.textContent = formatCurrency(totals.total);

    // 4. Render Active Voucher state
    const voucherMsg = document.getElementById('voucher-message');
    const activeVoucher = StorageUtil.getActiveVoucher();
    if (voucherMsg) {
      if (activeVoucher) {
        voucherMsg.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; color: var(--color-success); font-weight: bold;">
            <span><i class="fa-solid fa-tag"></i> Mã: ${activeVoucher.code} (${activeVoucher.label})</span>
            <a href="javascript:void(0)" id="btn-remove-voucher" style="color: var(--color-danger); text-decoration: underline; font-size: 0.75rem;">Hủy</a>
          </div>
        `;
        const removeVoucherBtn = voucherMsg.querySelector('#btn-remove-voucher');
        if (removeVoucherBtn) {
          removeVoucherBtn.onclick = () => {
            StorageUtil.removeVoucher();
            Toast.info('Mã giảm giá', 'Đã hủy áp dụng mã giảm giá.');
            render();
          };
        }
      } else {
        voucherMsg.innerHTML = '<span class="text-muted">Nhập mã SPORTZONE10, CHAMPION20 hoặc FREESHIP</span>';
      }
    }
  }

  // Voucher Form Submit
  const voucherForm = document.getElementById('voucher-form');
  if (voucherForm) {
    voucherForm.onsubmit = (e) => {
      e.preventDefault();
      const input = voucherForm.querySelector('.voucher-input');
      const code = input ? input.value : '';
      if (!code) {
        Toast.warning('Mã giảm giá', 'Vui lòng nhập mã giảm giá!');
        return;
      }
      const res = StorageUtil.applyVoucher(code);
      if (res.success) {
        Toast.success('Mã giảm giá', res.message);
        if (input) input.value = '';
        render();
      } else {
        Toast.error('Mã giảm giá', res.message);
      }
    };
  }

  // Clear Cart Button
  const clearCartBtn = document.getElementById('btn-clear-cart');
  if (clearCartBtn) {
    clearCartBtn.onclick = () => {
      if (confirm('Bạn có chắc chắn muốn làm trống toàn bộ giỏ hàng không?')) {
        StorageUtil.clearCart();
        Toast.info('Giỏ hàng', 'Đã xóa toàn bộ giỏ hàng.');
        render();
      }
    };
  }

  // Initial render
  render();
}
