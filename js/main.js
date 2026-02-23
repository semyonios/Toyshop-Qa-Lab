// Роли
const roleEl = document.getElementById('current-role');
const adminBtn = document.getElementById('login-admin');
const userBtn = document.getElementById('login-user');

let role = localStorage.getItem('role') || 'user';

function updateRole() {
    roleEl.textContent = `Current role: ${role}`;
}

adminBtn.addEventListener('click', () => {
    role = 'admin';
    localStorage.setItem('role', role);
    updateRole();
});

userBtn.addEventListener('click', () => {
    role = 'user';
    localStorage.setItem('role', role);
    updateRole();
});

updateRole();
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartCount = document.createElement('div');
    cartCount.id = 'cart-count';
    cartCount.style.marginBottom = '20px';
    productsContainer.parentNode.insertBefore(cartCount, productsContainer);

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
                    <p class="stock">В наличии: ${p.stock}</p>
                    <button>Добавить в корзину</button>
                `;

                const btn = div.querySelector('button');
                const stockEl = div.querySelector('.stock');

                btn.addEventListener('click', () => {

    // Проверка роли
    if (role !== 'user') {
        alert('Only users can buy products');
        return;
    }

    // Проверка остатка
    if (p.stock > 0) {

        cart.push(p);
        p.stock--;

        stockEl.textContent = `В наличии: ${p.stock}`;

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

    } else {
        alert('Извините, товара нет в наличии!');
    }

});

                // Кнопка пополнения склада
                const replenishBtn = document.createElement('button');
                replenishBtn.textContent = 'Пополнить склад';
                replenishBtn.style.marginLeft = '5px';
                replenishBtn.addEventListener('click', () => {
                    p.stock += 5; // увеличиваем на 5 единиц
                    stockEl.textContent = `В наличии: ${p.stock}`;
                });
                div.appendChild(replenishBtn);

                productsContainer.appendChild(div);
            });

            updateCartCount();
        })
        .catch(err => console.error('Ошибка загрузки товаров', err));
});