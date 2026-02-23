document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('admin-products');
    const roleInfo = document.getElementById('admin-role');

    let role = localStorage.getItem('role') || 'user';

    roleInfo.textContent = `Current role: ${role}`;

    // Проверка доступа
    if (role !== 'admin') {
        container.innerHTML = '<h2>❌ Access denied. Admins only.</h2>';
        return;
    }

    // Загружаем товары
    fetch('data/products.json')
        .then(res => res.json())
        .then(products => {

            products.forEach(p => {

                const div = document.createElement('div');
                div.className = 'product';

                div.innerHTML = `
                    <h3>${p.name}</h3>

                    <p>
                        Stock:
                        <span class="stock-value">${p.stock}</span>
                    </p>

                    <input type="number" min="1" value="1">

                    <button>Add stock</button>
                `;

                const input = div.querySelector('input');
                const btn = div.querySelector('button');
                const stockEl = div.querySelector('.stock-value');

                btn.addEventListener('click', () => {

                    let value = Number(input.value);

                    if (value <= 0) {
                        alert('Enter valid number');
                        return;
                    }

                    p.stock += value;

                    stockEl.textContent = p.stock;

                    alert('Stock updated (local session only)');
                });

                container.appendChild(div);

            });

        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<p>Error loading products</p>';
        });

});