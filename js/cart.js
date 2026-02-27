document.addEventListener('DOMContentLoaded', async () => {
  const cartContainer = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  const statusEl = document.getElementById('cart-status');

  function setStatus(message) {
    statusEl.textContent = message;
  }

  function renderCart() {
    const cart = toyshopApi.getCart();
    const products = toyshopApi.getProducts();

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Корзина пуста.</p>';
      totalPriceEl.textContent = 'Итого: 0 ₽';
      return;
    }

    let total = 0;

    cart.forEach(cartItem => {
      const product = products.find(item => item.id === cartItem.id);
      if (!product) {
        return;
      }

      const subtotal = product.price * cartItem.qty;
      total += subtotal;

      const div = document.createElement('article');
      div.className = 'product';

      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Цена: ${product.price} ₽</p>
        <p>Количество: ${cartItem.qty}</p>
        <p>Сумма: ${subtotal} ₽</p>
        <div class="cart-actions">
          <button type="button" class="remove-one">Убрать 1 шт.</button>
          <button type="button" class="remove-line">Удалить позицию</button>
        </div>
      `;

      const removeOneBtn = div.querySelector('.remove-one');
      const removeLineBtn = div.querySelector('.remove-line');

      removeOneBtn.addEventListener('click', () => {
        const result = toyshopApi.removeOneFromCart(product.id);
        if (!result.ok) {
          setStatus(result.message);
          return;
        }
        setStatus('Один товар удален из корзины.');
        renderCart();
      });

      removeLineBtn.addEventListener('click', () => {
        const result = toyshopApi.removeLineFromCart(product.id);
        if (!result.ok) {
          setStatus(result.message);
          return;
        }
        setStatus('Позиция удалена из корзины.');
        renderCart();
      });

      cartContainer.appendChild(div);
    });

    totalPriceEl.textContent = `Итого: ${total} ₽`;
  }

  try {
    await toyshopApi.ensureProductsLoaded();
    renderCart();
  } catch (error) {
    console.error(error);
    setStatus('Ошибка загрузки корзины.');
  }
});
