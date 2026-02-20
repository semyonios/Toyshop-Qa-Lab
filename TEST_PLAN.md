# Test Plan for ToyShop QA Lab

**Project:** ToyShop Mini E-Commerce  
**Prepared by:** Semyon Samsonov  
**Date:** 21/02/2026

---

## 1. Introduction / Введение
This document describes the scope, approach, resources, and schedule of testing activities for the ToyShop QA Lab project.

_Этот раздел объясняет цель тестирования и что мы собираемся проверять._

---

## 2. Objectives / Цели
- Verify that all products are displayed correctly on the main page.  
- Ensure that the "Add to Cart" button works for all products.  
- Check that the cart page shows all added products with correct prices.  
- Ensure the "Delete" button removes items correctly.  
- Validate the total price calculation.  
- Ensure data persists in localStorage after page reload.  
- Verify navigation between pages (index.html ↔ cart.html).  

_Здесь перечисляем конкретные цели тестирования._

---

## 3. Scope / Область тестирования
### In Scope / Включено:
- UI functionality (buttons, links, cart counter).  
- Data persistence (localStorage).  
- Product display and price accuracy.  
- Navigation between pages.  

### Out of Scope / Не включено:
- Backend API (since we use local JSON files).  
- Payment processing.  
- User authentication / login.  

_Уточняем, что мы тестируем и что не тестируем, чтобы не распыляться._

---

## 4. Test Environment / Среда тестирования
- Browser: Chrome (latest version)  
- OS: macOS  
- Local server: Python HTTP server on port 5500  
- Tools: VS Code, Chrome DevTools, Postman (for future API tests)  

_Среда, где будет выполняться тестирование._

---

## 5. Test Approach / Подход к тестированию
- Manual testing for all functional scenarios.  
- Visual verification of UI elements.  
- Console monitoring in DevTools for errors.  
- LocalStorage inspection to confirm data persistence.  

_Как мы будем тестировать: вручную, через консоль, проверка localStorage и UI._

---

## 6. Test Items / Объекты тестирования
- `index.html` – main page with products  
- `cart.html` – cart page with delete functionality  
- `css/` – styling  
- `js/main.js` – main page logic  
- `js/cart.js` – cart logic  
- `data/products.json` – product data  

_Что именно мы тестируем._

---

## 7. Test Cases / Тест-кейсы
### Example Test Case 1
**Title:** Add a single product to the cart  
**Steps:**  
1. Open `index.html`  
2. Click "Add to Cart" on a product  
3. Check that cart counter increments  
4. Open `cart.html`  
5. Verify product appears with correct price  

**Expected Result:**  
Product is added, counter updated, and product visible in cart.

_Пример тест-кейса: что делать и какой результат ожидается._

### Example Test Case 2
**Title:** Remove a product from the cart  
**Steps:**  
1. Open `cart.html` with products in cart  
2. Click "Delete" button on a product  
3. Verify product is removed  
4. Check total price recalculated  

**Expected Result:**  
Product removed, total price updated, cart counter synced.

_Ещё один тест-кейс для проверки удаления и пересчёта суммы._

---

## 8. Risks / Риски
- Incorrect price calculation in JS  
- Items not saved correctly in localStorage  
- Browser compatibility issues  

_Что может пойти не так._

---

## 9. Schedule / График
- Manual test execution: 1–2 days  
- Bug reporting and fixes: ongoing  
- Review and final test report: end of week  

_Примерное время на тестирование._

---

## 10. References / Ссылки
- GitHub repository: [ToyShop QA Lab](https://github.com/semyonios/Toyshop-Qa-Lab)  
- VS Code, Chrome DevTools, Python HTTP server  

_Ссылки на проект и инструменты._