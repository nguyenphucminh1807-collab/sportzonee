/**
 * SPORTZONE - Wishlist Page Script
 * Render favorites, remove, move to cart, move all to cart, and empty state
 */

document.addEventListener('DOMContentLoaded', () => {
  initWishlistPage();
});

function initWishlistPage() {
  const container = document.getElementById('wishlist-grid');
  const emptyState = document.getElementById('wishlist-empty-state');
  const countBadge = document.getElementById('wishlist-total-count');
  const moveAllBtn = document.getElementById('btn-wishlist-move-all');

  function render() {
    const wishlistIds = StorageUtil.getWishlist();
    const products = wishlistIds.map(id => getProductById(id)).filter(Boolean);

    if (countBadge) countBadge.textContent = products.length;

    if (products.length === 0) {
      if (container) container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (moveAllBtn) moveAllBtn.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (moveAllBtn) moveAllBtn.style.display = 'inline-flex';

    if (container) {
      container.innerHTML = products.map(p => renderProductCard(p)).join('');
      bindProductCardEvents(container);

      // Add a special "Chuyển sang giỏ hàng" banner if needed
    }
  }

  if (moveAllBtn) {
    moveAllBtn.onclick = () => {
      const wishlistIds = StorageUtil.getWishlist();
      const products = wishlistIds.map(id => getProductById(id)).filter(Boolean);

      if (products.length === 0) return;

      let addedCount = 0;
      products.forEach(p => {
        const defaultSize = p.sizes ? p.sizes[0] : 'Tiêu chuẩn';
        const defaultColor = p.colors ? p.colors[0].name : 'Mặc định';
        StorageUtil.addToCart(p, defaultSize, defaultColor, 1);
        addedCount++;
      });

      // Clear wishlist after moving
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist: [] } }));
      
      Toast.success('Giỏ hàng', `Đã chuyển thành công ${addedCount} sản phẩm từ danh sách yêu thích vào giỏ hàng!`);
      render();
    };
  }

  window.addEventListener('wishlistUpdated', () => render());

  render();
}
