const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../backend/server');

test('POST /api/calculate returns a calculation result', async (t) => {
  const server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/api/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ a: 8, b: 4, operator: '*' })
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 32 });
});

test('POST /api/calculate returns a useful error for division by zero', async (t) => {
  const server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/api/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ a: 8, b: 0, operator: '/' })
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'You cannot divide by zero.' });
});
