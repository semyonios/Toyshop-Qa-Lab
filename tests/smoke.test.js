const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function readText(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

test('products.json has required fields and valid values', () => {
  const products = JSON.parse(readText('data/products.json'));
  assert.ok(Array.isArray(products), 'products should be an array');
  assert.ok(products.length > 0, 'products should not be empty');

  products.forEach(product => {
    assert.equal(typeof product.id, 'number');
    assert.equal(typeof product.name, 'string');
    assert.equal(typeof product.price, 'number');
    assert.equal(typeof product.stock, 'number');
    assert.ok(product.price > 0, 'price should be positive');
    assert.ok(product.stock >= 0, 'stock should be non-negative');
  });
});

test('all pages include shared api script', () => {
  ['index.html', 'cart.html', 'admin.html'].forEach(file => {
    const content = readText(file);
    assert.match(content, /<script src="js\/api\.js"><\/script>/);
  });
});

test('main page has accessibility live regions', () => {
  const content = readText('index.html');
  assert.match(content, /id="current-role"[^>]*aria-live="polite"/);
  assert.match(content, /id="cart-count"[^>]*aria-live="polite"/);
});
