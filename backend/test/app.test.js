const test = require('node:test');
const assert = require('node:assert/strict');

const app = require('../src/app');

function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      resolve(server);
    });
  });
}

async function sendJsonRequest(server, path, options = {}) {
  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}${path}`, options);
  const body = await response.json();

  return { response, body };
}

test('GET /health returns a healthy status payload', async (t) => {
  const server = await startServer();
  t.after(() => server.close());

  const { response, body } = await sendJsonRequest(server, '/health');

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.status, 'ok');
});

test('POST /api/track-click records a click and analytics returns it', async (t) => {
  const server = await startServer();
  t.after(() => server.close());

  const clickLabel = `Test CTA ${Date.now()}`;
  const trackingResult = await sendJsonRequest(server, '/api/track-click', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product: clickLabel }),
  });

  assert.equal(trackingResult.response.status, 201);
  assert.equal(trackingResult.body.success, true);
  assert.equal(trackingResult.body.data.label, clickLabel);

  const analyticsResult = await sendJsonRequest(server, '/api/analytics?days=1&limit=5');

  assert.equal(analyticsResult.response.status, 200);
  assert.equal(analyticsResult.body.success, true);
  assert.equal(analyticsResult.body.data.totalClicks >= 1, true);
  assert.equal(
    analyticsResult.body.data.clicksByLabel.some((entry) => entry.label === clickLabel),
    true,
  );
});

test('Unknown routes return a 404 JSON response', async (t) => {
  const server = await startServer();
  t.after(() => server.close());

  const { response, body } = await sendJsonRequest(server, '/missing-route');

  assert.equal(response.status, 404);
  assert.equal(body.success, false);
});
