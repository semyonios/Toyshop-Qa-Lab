document.addEventListener('DOMContentLoaded', async () => {
  const roleEl = document.getElementById('current-role');
  const adminBtn = document.getElementById('login-admin');
  const userBtn = document.getElementById('login-user');
  const productsContainer = document.getElementById('products');
  const cartCount = document.getElementById('cart-count');
  const statusMessage = document.getElementById('status-message');

  function setStatus(message) {
    statusMessage.textContent = message;
  }

  function currentRoleText(role) {
    return role === toyshopApi.ROLES.ADMIN ? 'Текущая роль: admin' : 'Текущая роль: user';
  }

  function updateRoleLabel() {
    roleEl.textContent = currentRoleText(toyshopApi.getRole());
  }

  function updateCartCount() {
    cartCount.textContent = `В корзине: ${toyshopApi.getCartCount()} шт.`;
  }

  function createProductCard(product) {
    const div = document.createElement('article');
    div.className = 'product';

    const role = toyshopApi.getRole();
    const canBuy = role === toyshopApi.ROLES.USER;

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Цена: ${product.price} ₽</p>
      <p class="stock">В наличии: ${product.stock}</p>
      <button type="button" ${!canBuy ? 'disabled' : ''}>Добавить в корзину</button>
    `;

    const button = div.querySelector('button');
    button.addEventListener('click', () => {
      const result = toyshopApi.addToCart(product.id);
      if (!result.ok) {
        setStatus(result.message);
        return;
      }
      renderProducts();
      updateCartCount();
      setStatus('Товар добавлен в корзину.');
    });

    return div;
  }

  function renderProducts() {
    const products = toyshopApi.getProducts();
    productsContainer.innerHTML = '';
    products.forEach(product => {
      productsContainer.appendChild(createProductCard(product));
    });

    if (toyshopApi.getRole() === toyshopApi.ROLES.ADMIN) {
      setStatus('Роль admin: покупки на витрине отключены. Управление остатками доступно на странице Admin.');
    }
  }

  adminBtn.addEventListener('click', () => {
    toyshopApi.setRole(toyshopApi.ROLES.ADMIN);
    updateRoleLabel();
    renderProducts();
  });

  userBtn.addEventListener('click', () => {
    toyshopApi.setRole(toyshopApi.ROLES.USER);
    updateRoleLabel();
    renderProducts();
    setStatus('');
  });

  try {
    await toyshopApi.ensureProductsLoaded();
    updateRoleLabel();
    updateCartCount();
    renderProducts();
  } catch (error) {
    console.error(error);
    setStatus('Ошибка загрузки каталога.');
  }
});
