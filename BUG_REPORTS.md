# Bug Reports — ToyShop QA Lab

## BUG-001: Cart total price is not updated after removing item

**Status:** Closed (fixed)  
**Priority:** High  
**Severity:** Major  
**Resolution Date:** 27/02/2026  

### Resolution Notes
Cart storage was redesigned from product objects to `id + qty`, and total is recalculated from current cart state on every render in `js/cart.js`.

---

## BUG-002: Cart counter does not reset after clearing cart

**Status:** Closed (fixed)  
**Priority:** Medium  
**Severity:** Minor  
**Resolution Date:** 27/02/2026  

### Resolution Notes
Cart counter is now derived from aggregated quantity (`getCartCount`) and always reflects current localStorage state.

---

## BUG-003: Products data is cached and not refreshed after JSON update

**Status:** Mitigated  
**Priority:** Low  
**Severity:** Minor  
**Resolution Date:** 27/02/2026  

### Resolution Notes
Initial products fetch now uses `cache: 'no-store'` in `js/api.js`.

### Remaining Limitation
If products are already copied into localStorage, they are used as local source of truth. To refresh from file, clear localStorage.

---

## BUG-004: Admin-only stock actions were visible to non-admin users

**Status:** Closed (fixed)  
**Priority:** High  
**Severity:** Major  
**Resolution Date:** 27/02/2026  

### Resolution Notes
Stock management was removed from storefront and is now available only in `admin.html` after role check.
