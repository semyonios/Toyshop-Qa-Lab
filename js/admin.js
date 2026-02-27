document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('admin-products');
  const roleInfo = document.getElementById('admin-role');
  const status = document.getElementById('admin-status');

  roleInfo.textContent = `Текущая роль: ${toyshopApi.getRole()}`;

  if (toyshopApi.getRole() !== toyshopApi.ROLES.ADMIN) {
    container.innerHTML = '<h2>Доступ запрещен. Нужна роль admin.</h2>';
    return;
  }

  function setStatus(message) {
    status.textContent = message;
  }

  function renderProducts() {
    const products = toyshopApi.getProducts();
    container.innerHTML = '';

    products.forEach(product => {
      const div = document.createElement('article');
      div.className = 'product';

      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Текущий остаток: <strong class="stock-value">${product.stock}</strong></p>
        <label>
          Пополнить на:
          <input type="number" min="1" value="1" inputmode="numeric">
        </label>
        <button type="button">Пополнить</button>
      `;

      const input = div.querySelector('input');
      const button = div.querySelector('button');

      button.addEventListener('click', () => {
        const amount = Number.parseInt(input.value, 10);
        const result = toyshopApi.replenishStock(product.id, amount);

        if (!result.ok) {
          setStatus(result.message);
          return;
        }

        setStatus(`Остаток товара «${product.name}» обновлен: ${result.stock} шт.`);
        renderProducts();
      });

      container.appendChild(div);
    });
  }

  try {
    await toyshopApi.ensureProductsLoaded();
    renderProducts();
  } catch (error) {
    console.error(error);
    setStatus('Не удалось загрузить товары.');
  }
});
