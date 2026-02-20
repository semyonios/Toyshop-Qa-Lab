document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartCount = document.createElement('div');
    cartCount.id = 'cart-count';
    cartCount.style.marginBottom = '20px';
    productsContainer.parentNode.insertBefore(cartCount, productsContainer);

    // Загружаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCount.textContent = `В корзине: ${cart.length} товар(ов)`;
    }

    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(p => {
                const div = document.createElement('div');
                div.className = 'product';
                div.innerHTML = `
                    <h3>${p.name}</h3>
                    <p>${p.price} ₽</p>
                    <button>Добавить в корзину</button>
                `;
                const btn = div.querySelector('button');
                btn.addEventListener('click', () => {
                    cart.push(p);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                });
                productsContainer.appendChild(div);
            });
            updateCartCount();
        })
        .catch(err => console.error('Ошибка загрузки товаров', err));
});
