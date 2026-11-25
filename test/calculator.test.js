const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../backend/calculator');

test('adds two numbers', () => {
  assert.equal(calculate({ a: 10, b: 5, operator: '+' }), 15);
});

test('subtracts two numbers', () => {
  assert.equal(calculate({ a: 10, b: 5, operator: '-' }), 5);
});

test('multiplies two numbers', () => {
  assert.equal(calculate({ a: 10, b: 5, operator: '*' }), 50);
});

test('divides two numbers', () => {
  assert.equal(calculate({ a: 10, b: 5, operator: '/' }), 2);
});

test('rejects division by zero', () => {
  assert.throws(
    () => calculate({ a: 10, b: 0, operator: '/' }),
    /divide by zero/
  );
});

test('rejects an unsupported operator', () => {
  assert.throws(
    () => calculate({ a: 10, b: 5, operator: '%' }),
    /supported operator/
  );
});

test('rejects non-numeric input', () => {
  assert.throws(
    () => calculate({ a: '10', b: 5, operator: '+' }),
    /first number must be a valid number/
  );
});
