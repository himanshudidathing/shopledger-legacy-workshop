var test = require('node:test');
var assert = require('node:assert/strict');
var invoice = require('../lib/invoice');

function item(overrides) {
  return Object.assign({
    name: 'Test item',
    sku: 'TEST-001',
    hsn: '1006',
    price: 100,
    qty: 1
  }, overrides);
}

test('invoice applies the HSN GST slab when a line has no explicit GST rate', function () {
  var figures = invoice.computeInvoiceFigures({ items: [item({ hsn: '1006' })], coupon: '' });
  assert.equal(figures.rows[0].gstPercent, 5);
  assert.equal(figures.tax, 5);
  assert.equal(figures.total, 105);
});

test('invoice applies the SAVE10 discount cap before tax', function () {
  var figures = invoice.computeInvoiceFigures({
    items: [item({ hsn: '1508', price: 1120, qty: 2 })],
    coupon: 'SAVE10'
  });
  assert.equal(figures.discount, 150);
  assert.equal(figures.tax, 104.5);
  assert.equal(figures.total, 2194.5);
});

