# Test Plan for ToyShop QA Lab

**Project:** ToyShop Mini E-Commerce  
**Prepared by:** Semyon Samsonov  
**Date:** 27/02/2026

## 1. Introduction / Введение
This document describes scope and approach for manual and basic automated checks of the ToyShop project.

## 2. Objectives / Цели
- Verify product catalog rendering.
- Verify cart operations (`add`, `remove one`, `remove line`) and total price calculation.
- Verify stock synchronization between storefront, cart, and admin panel.
- Verify role-based UI restrictions for stock management.
- Verify localStorage persistence.
- Verify basic quality gates: lint, format, smoke tests.

## 3. Scope / Область тестирования
### In Scope / Включено
- UI flows in `index.html`, `cart.html`, `admin.html`.
- LocalStorage data consistency.
- Basic static checks in CI.

### Out of Scope / Не включено
- Real backend authentication/authorization.
- Payment processing.
- Multi-user server-side concurrency.

## 4. Test Environment / Среда тестирования
- Browser: Chrome (latest)
- OS: macOS
- Local server: Python HTTP server on port 5500
- Node.js: 20+

## 5. Test Approach / Подход к тестированию
- Manual exploratory testing for UI and role scenarios.
- localStorage inspection via DevTools.
- Automated smoke checks with `node --test`.
- CI validation for lint/format/tests.

## 6. Test Items / Объекты тестирования
- `index.html`, `cart.html`, `admin.html`
- `js/api.js`, `js/main.js`, `js/cart.js`, `js/admin.js`
- `data/products.json`
- `tests/smoke.test.js`

## 7. Example Test Cases / Примеры тест-кейсов
### TC-001 Add product to cart
1. Open `index.html`.
2. Ensure role is `user`.
3. Add product to cart.
4. Open `cart.html`.

**Expected:** product appears, quantity increments, total updates.

### TC-002 Remove one item from cart
1. Have quantity >= 2 for one product.
2. Click `Убрать 1 шт.`.

**Expected:** quantity decreases by 1, total decreases, stock returns by 1.

### TC-003 Remove line from cart
1. Click `Удалить позицию`.

**Expected:** item fully removed from cart, stock restored by removed quantity.

### TC-004 Admin stock replenishment
1. Switch role to `admin` on main page.
2. Open `admin.html`.
3. Add stock for a product.
4. Return to `index.html`.

**Expected:** updated stock is visible in storefront.

## 8. Risks / Риски
- Data drift if localStorage contains stale products.
- Frontend-only role model can be bypassed.
- No backend integration coverage.

## 9. Schedule / График
- Manual regression: 1 day
- Automated checks in CI: on every push/PR
- Bug review: ongoing

## 10. References / Ссылки
- GitHub repository: [ToyShop QA Lab](https://github.com/semyonios/Toyshop-Qa-Lab)
