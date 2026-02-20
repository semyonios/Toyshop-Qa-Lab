document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Корзина пуста</p>';
            totalPriceEl.textContent = 'Итого: 0 ₽';
            return;
        }

        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.price} ₽</p>
                <button data-index="${index}">Удалить</button>
            `;
            const btn = div.querySelector('button');
            btn.addEventListener('click', () => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
            cartContainer.appendChild(div);
        });

        totalPriceEl.textContent = `Итого: ${total} ₽`;
    }

    renderCart();
});
