# Bug Reports — ToyShop QA Lab

---

## BUG-001: Cart total price is not updated after removing item

**Status:** Open  
**Priority:** High  
**Severity:** Major  
**Environment:** Chrome / macOS / localhost:5500  

### Description
При удалении товара из корзины общая сумма не всегда пересчитывается корректно.

### Steps to Reproduce
1. Открыть index.html  
2. Добавить несколько товаров в корзину  
3. Перейти в cart.html  
4. Удалить один товар  
5. Посмотреть на итоговую сумму  

### Actual Result
Общая сумма отображается некорректно.

### Expected Result
Общая сумма должна пересчитываться автоматически после удаления товара.

### Attachments
Screenshots / Console logs (if available)

---

## BUG-002: Cart counter does not reset after clearing cart

**Status:** Open  
**Priority:** Medium  
**Severity:** Minor  
**Environment:** Chrome / macOS / localhost:5500  

### Description
После удаления всех товаров из корзины счётчик корзины не обнуляется.

### Steps to Reproduce
1. Добавить товары в корзину  
2. Перейти в cart.html  
3. Удалить все товары  
4. Вернуться на главную страницу  

### Actual Result
Счётчик корзины продолжает показывать ненулевое значение.

### Expected Result
Счётчик должен быть равен 0.

### Attachments
N/A

---

## BUG-003: Products data is cached and not refreshed after JSON update

**Status:** Open  
**Priority:** Low  
**Severity:** Minor  
**Environment:** Chrome / macOS / localhost:5500  

### Description
Изменения в products.json не отображаются без Hard Reload.

### Steps to Reproduce
1. Изменить название товара в products.json  
2. Сохранить файл  
3. Обновить страницу обычным Reload  

### Actual Result
Отображается старое название товара.

### Expected Result
Новое название должно отображаться сразу после обновления страницы.

### Attachments
N/A