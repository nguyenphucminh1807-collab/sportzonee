/**
 * SPORTZONE - LocalStorage Management Utilities
 * Handles Cart, Wishlist, Compare, Recently Viewed, and User Session
 */

const STORAGE_KEYS = {
  CART: 'sportzone_cart',
  WISHLIST: 'sportzone_wishlist',
  COMPARE: 'sportzone_compare',
  RECENT: 'sportzone_recent',
  USER: 'sportzone_user',
  VOUCHER: 'sportzone_voucher'
};

const StorageUtil = {
  // --- Cart Operations ---
  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  },

  addToCart(product, size, color, quantity = 1) {
    const cart = this.getCart();
    // Unique item key based on id + size + color
    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: size,
        color: color,
        quantity: quantity,
        stock: product.stock
      });
    }

    this.saveCart(cart);
    return true;
  },

  updateCartQty(id, size, color, quantity) {
    let cart = this.getCart();
    const item = cart.find(
      i => i.id === id && i.size === size && i.color === color
    );
    if (item) {
      if (quantity <= 0) {
        cart = cart.filter(i => !(i.id === id && i.size === size && i.color === color));
      } else {
        item.quantity = Math.min(quantity, item.stock || 99);
      }
      this.saveCart(cart);
    }
  },

  removeFromCart(id, size, color) {
    let cart = this.getCart();
    cart = cart.filter(i => !(i.id === id && i.size === size && i.color === color));
    this.saveCart(cart);
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getCartTotals() {
    const cart = this.getCart();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const voucher = this.getActiveVoucher();
    
    let discount = 0;
    let shipping = subtotal > 500000 || subtotal === 0 ? 0 : 30000;

    if (voucher) {
      if (voucher.type === 'percentage') {
        discount = Math.round((subtotal * voucher.value) / 100);
      } else if (voucher.type === 'shipping') {
        shipping = 0;
      }
    }

    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      total,
      isFreeShip: shipping === 0 && subtotal > 0
    };
  },

  // --- Voucher Operations ---
  getActiveVoucher() {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.VOUCHER);
      return v ? JSON.parse(v) : null;
    } catch {
      return null;
    }
  },

  applyVoucher(code) {
    const cleanCode = code.trim().toUpperCase();
    let voucher = null;

    if (cleanCode === 'SPORTZONE10') {
      voucher = { code: cleanCode, type: 'percentage', value: 10, label: 'Giảm 10% tổng đơn' };
    } else if (cleanCode === 'CHAMPION20') {
      voucher = { code: cleanCode, type: 'percentage', value: 20, label: 'Giảm 20% cho thành viên' };
    } else if (cleanCode === 'FREESHIP') {
      voucher = { code: cleanCode, type: 'shipping', value: 0, label: 'Miễn phí vận chuyển toàn quốc' };
    } else {
      return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
    }

    localStorage.setItem(STORAGE_KEYS.VOUCHER, JSON.stringify(voucher));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: this.getCart() } }));
    return { success: true, message: `Áp dụng thành công mã: ${cleanCode}`, voucher };
  },

  removeVoucher() {
    localStorage.removeItem(STORAGE_KEYS.VOUCHER);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: this.getCart() } }));
  },

  // --- Wishlist Operations ---
  getWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isInWishlist(id) {
    const list = this.getWishlist();
    return list.includes(parseInt(id, 10));
  },

  toggleWishlist(id) {
    const numericId = parseInt(id, 10);
    let list = this.getWishlist();
    const index = list.indexOf(numericId);
    let isAdded = false;

    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(numericId);
      isAdded = true;
    }

    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist: list, id: numericId, isAdded } }));
    return isAdded;
  },

  removeFromWishlist(id) {
    const numericId = parseInt(id, 10);
    let list = this.getWishlist().filter(itemId => itemId !== numericId);
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist: list } }));
  },

  getWishlistCount() {
    return this.getWishlist().length;
  },

  // --- Product Comparison (Creative Feature) ---
  getCompareList() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPARE);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleCompare(id) {
    const numericId = parseInt(id, 10);
    let list = this.getCompareList();
    const index = list.indexOf(numericId);
    let isAdded = false;

    if (index > -1) {
      list.splice(index, 1);
    } else {
      if (list.length >= 3) {
        return { success: false, message: 'Bạn chỉ có thể so sánh tối đa 3 sản phẩm cùng lúc.' };
      }
      list.push(numericId);
      isAdded = true;
    }

    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('compareUpdated', { detail: { compareList: list } }));
    return { success: true, isAdded, list };
  },

  clearCompare() {
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('compareUpdated', { detail: { compareList: [] } }));
  },

  // --- Recently Viewed ---
  addRecentView(id) {
    const numericId = parseInt(id, 10);
    let list = this.getRecentViews().filter(itemId => itemId !== numericId);
    list.unshift(numericId);
    if (list.length > 8) list.pop();
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(list));
  },

  getRecentViews() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // --- Mock User Authentication ---
  getCurrentUser() {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER);
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('userStateChanged', { detail: { user } }));
  },

  logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    window.dispatchEvent(new CustomEvent('userStateChanged', { detail: { user: null } }));
  }
};
