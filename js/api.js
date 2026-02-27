const toyshopApi = (() => {
  const STORAGE_KEYS = {
    role: 'toyshop_role_v1',
    cart: 'toyshop_cart_v1',
    products: 'toyshop_products_v1'
  };

  const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
  };

  function safeJsonParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function getRole() {
    const storedRole = localStorage.getItem(STORAGE_KEYS.role);
    if (storedRole === ROLES.ADMIN || storedRole === ROLES.USER) {
      return storedRole;
    }
    return ROLES.USER;
  }

  function setRole(role) {
    if (role !== ROLES.ADMIN && role !== ROLES.USER) {
      throw new Error('Unknown role');
    }
    localStorage.setItem(STORAGE_KEYS.role, role);
  }

  function getProducts() {
    const raw = localStorage.getItem(STORAGE_KEYS.products);
    const products = safeJsonParse(raw, []);
    return Array.isArray(products) ? products : [];
  }

  function saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
  }

  async function ensureProductsLoaded() {
    const stored = getProducts();
    if (stored.length > 0) {
      return stored;
    }

    const response = await fetch('data/products.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to load products');
    }

    const products = await response.json();
    saveProducts(products);
    return products;
  }

  function getCart() {
    const raw = localStorage.getItem(STORAGE_KEYS.cart);
    const cart = safeJsonParse(raw, []);
    if (!Array.isArray(cart)) {
      return [];
    }

    return cart
      .filter(item => Number.isInteger(item.id) && Number.isInteger(item.qty) && item.qty > 0)
      .map(item => ({ id: item.id, qty: item.qty }));
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }

  function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function addToCart(productId) {
    const products = getProducts();
    const cart = getCart();

    const product = products.find(item => item.id === productId);
    if (!product) {
      return { ok: false, message: 'Товар не найден.' };
    }

    if (product.stock <= 0) {
      return { ok: false, message: 'Товара нет в наличии.' };
    }

    product.stock -= 1;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: productId, qty: 1 });
    }

    saveProducts(products);
    saveCart(cart);
    return { ok: true };
  }

  function replenishStock(productId, amount) {
    const products = getProducts();
    const product = products.find(item => item.id === productId);

    if (!product) {
      return { ok: false, message: 'Товар не найден.' };
    }

    if (!Number.isInteger(amount) || amount <= 0) {
      return { ok: false, message: 'Укажите корректное количество.' };
    }

    product.stock += amount;
    saveProducts(products);

    return { ok: true, stock: product.stock };
  }

  function removeOneFromCart(productId) {
    const products = getProducts();
    const cart = getCart();
    const cartItem = cart.find(item => item.id === productId);

    if (!cartItem) {
      return { ok: false, message: 'Товар уже удален из корзины.' };
    }

    const product = products.find(item => item.id === productId);
    if (product) {
      product.stock += 1;
    }

    cartItem.qty -= 1;
    const nextCart = cart.filter(item => item.qty > 0);

    saveProducts(products);
    saveCart(nextCart);

    return { ok: true };
  }

  function removeLineFromCart(productId) {
    const products = getProducts();
    const cart = getCart();
    const cartItem = cart.find(item => item.id === productId);

    if (!cartItem) {
      return { ok: false, message: 'Товар уже удален из корзины.' };
    }

    const product = products.find(item => item.id === productId);
    if (product) {
      product.stock += cartItem.qty;
    }

    const nextCart = cart.filter(item => item.id !== productId);
    saveProducts(products);
    saveCart(nextCart);

    return { ok: true };
  }

  return {
    ROLES,
    getRole,
    setRole,
    ensureProductsLoaded,
    getProducts,
    getCart,
    getCartCount,
    addToCart,
    replenishStock,
    removeOneFromCart,
    removeLineFromCart
  };
})();

window.toyshopApi = toyshopApi;
