/**
 * SPORTZONE - Checkout Page Script
 * Form Validation, Shipping & Payment Methods, VietQR Demo, and Order Generation
 */

document.addEventListener('DOMContentLoaded', () => {
  initCheckoutPage();
});

function initCheckoutPage() {
  const cart = StorageUtil.getCart();

  // If cart is empty, redirect to products
  if (cart.length === 0) {
    Toast.warning('Thanh toán', 'Giỏ hàng của bạn đang trống! Hãy chọn sản phẩm trước.');
    setTimeout(() => {
      window.location.href = 'products.html';
    }, 1500);
    return;
  }

  // Pre-fill user data if logged in
  const currentUser = StorageUtil.getCurrentUser();
  if (currentUser) {
    const nameInput = document.getElementById('checkout-fullname');
    const emailInput = document.getElementById('checkout-email');
    const phoneInput = document.getElementById('checkout-phone');
    if (nameInput && currentUser.fullname) nameInput.value = currentUser.fullname;
    if (emailInput && currentUser.email) emailInput.value = currentUser.email;
    if (phoneInput && currentUser.phone) phoneInput.value = currentUser.phone;
  }

  // Checkout State
  let shippingMethod = 'standard'; // 'standard' (30k) or 'express' (50k)
  let shippingCost = 30000;
  let paymentMethod = 'cod';       // 'cod', 'card', 'bank'

  // Render Order Review List
  const reviewList = document.getElementById('checkout-review-items');
  if (reviewList) {
    reviewList.innerHTML = cart.map(item => `
      <div class="review-item">
        <img src="${item.image}" alt="${item.name}" class="review-item-thumb" />
        <div style="flex: 1; min-width: 0;">
          <div class="review-item-name">${item.name}</div>
          <div class="review-item-meta">${item.size} / ${item.color} &bull; SL: ${item.quantity}</div>
        </div>
        <div class="review-item-price">${formatCurrency(item.price * item.quantity)}</div>
      </div>
    `).join('');
  }

  // Recalculate totals
  function updateOrderTotals() {
    const baseTotals = StorageUtil.getCartTotals();
    
    // If voucher freeship is active or base total > 500k, standard shipping is free
    let appliedShipping = shippingCost;
    if (baseTotals.subtotal > 500000 || baseTotals.isFreeShip) {
      appliedShipping = shippingMethod === 'express' ? 20000 : 0;
    }

    const grandTotal = Math.max(0, baseTotals.subtotal - baseTotals.discount + appliedShipping);

    const subtotalEl = document.getElementById('checkout-subtotal');
    const discountEl = document.getElementById('checkout-discount');
    const shippingEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(baseTotals.subtotal);
    if (discountEl) discountEl.textContent = `-${formatCurrency(baseTotals.discount)}`;
    if (shippingEl) shippingEl.textContent = appliedShipping === 0 ? 'Miễn phí' : formatCurrency(appliedShipping);
    if (totalEl) totalEl.textContent = formatCurrency(grandTotal);

    return {
      subtotal: baseTotals.subtotal,
      discount: baseTotals.discount,
      shipping: appliedShipping,
      total: grandTotal
    };
  }

  updateOrderTotals();

  // --- Shipping Method Selectors ---
  const shippingCards = document.querySelectorAll('.shipping-method-option');
  shippingCards.forEach(card => {
    card.onclick = () => {
      shippingCards.forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      shippingMethod = card.getAttribute('data-method');
      shippingCost = shippingMethod === 'express' ? 50000 : 30000;
      updateOrderTotals();
    };
  });

  // --- Payment Method Selectors ---
  const paymentCards = document.querySelectorAll('.payment-method-card');
  paymentCards.forEach(card => {
    const header = card.querySelector('.payment-method-header');
    if (header) {
      header.onclick = () => {
        paymentCards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
        paymentMethod = card.getAttribute('data-payment');
      };
    }
  });

  // Copy Bank Account Number Button
  const copyBtn = document.getElementById('btn-copy-bank');
  if (copyBtn) {
    copyBtn.onclick = () => {
      const accNum = '19038472910018';
      navigator.clipboard.writeText(accNum).then(() => {
        Toast.success('Sao chép', `Đã sao chép số tài khoản: ${accNum}`);
      }).catch(() => {
        Toast.info('Sao chép', `Số tài khoản: ${accNum}`);
      });
    };
  }

  // --- Form Validation & Submission ---
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.onsubmit = (e) => {
      e.preventDefault();

      let isValid = true;

      const validateField = (id, errorId, condition, errorMsg) => {
        const input = document.getElementById(id);
        const errorEl = document.getElementById(errorId);
        if (!input || !errorEl) return true;

        if (!condition(input.value.trim())) {
          input.classList.add('is-invalid');
          errorEl.textContent = errorMsg;
          errorEl.style.display = 'block';
          isValid = false;
          return false;
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          errorEl.style.display = 'none';
          return true;
        }
      };

      // Fullname
      validateField(
        'checkout-fullname',
        'error-fullname',
        val => val.length >= 3,
        'Vui lòng nhập họ và tên đầy đủ (tối thiểu 3 ký tự).'
      );

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(
        'checkout-email',
        'error-email',
        val => emailRegex.test(val),
        'Vui lòng nhập địa chỉ email hợp lệ.'
      );

      // Phone (Vietnamese phone regex: 10 digits starting with 03, 05, 07, 08, 09)
      const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
      validateField(
        'checkout-phone',
        'error-phone',
        val => phoneRegex.test(val),
        'Số điện thoại không hợp lệ (gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09).'
      );

      // Address
      validateField(
        'checkout-address',
        'error-address',
        val => val.length >= 5,
        'Vui lòng nhập số nhà, tên đường cụ thể.'
      );

      // City
      validateField(
        'checkout-city',
        'error-city',
        val => val !== '',
        'Vui lòng chọn Tỉnh / Thành phố.'
      );

      // District
      validateField(
        'checkout-district',
        'error-district',
        val => val !== '',
        'Vui lòng chọn Quận / Huyện.'
      );

      if (!isValid) {
        Toast.error('Lỗi thông tin', 'Vui lòng kiểm tra lại các trường thông tin có viền đỏ!');
        return;
      }

      // If credit card selected, validate mock card inputs
      if (paymentMethod === 'card') {
        const cardNum = document.getElementById('card-number')?.value.replace(/\s+/g, '') || '';
        const cardExp = document.getElementById('card-exp')?.value.trim() || '';
        const cardCvv = document.getElementById('card-cvv')?.value.trim() || '';

        if (cardNum.length < 15 || cardExp.length < 4 || cardCvv.length < 3) {
          Toast.error('Thanh toán thẻ', 'Vui lòng nhập đầy đủ thông tin thẻ tín dụng hợp lệ!');
          return;
        }
      }

      // Order Success
      const finalTotals = updateOrderTotals();
      const fullname = document.getElementById('checkout-fullname').value.trim();
      const phone = document.getElementById('checkout-phone').value.trim();
      const address = document.getElementById('checkout-address').value.trim();
      const city = document.getElementById('checkout-city').options[document.getElementById('checkout-city').selectedIndex].text;
      
      let payName = 'Thanh toán khi nhận hàng (COD)';
      if (paymentMethod === 'card') payName = 'Thẻ tín dụng / Ghi nợ quốc tế';
      if (paymentMethod === 'bank') payName = 'Chuyển khoản VietQR';

      const orderData = {
        id: `SZ-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        fullname,
        phone,
        address,
        city,
        paymentMethod: payName,
        total: finalTotals.total,
        items: cart,
        createdAt: new Date().toISOString()
      };

      // Clear cart
      StorageUtil.clearCart();

      // Open Celebration Modal
      Modal.openOrderSuccess(orderData);
    };
  }
}
