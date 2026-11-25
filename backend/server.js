const express = require('express');
const path = require('node:path');
const { calculate } = require('./calculator');

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'frontend')));

  app.post('/api/calculate', (req, res) => {
    try {
      const result = calculate(req.body);
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  // Keep malformed JSON errors readable instead of returning an HTML stack trace.
  app.use((error, _req, res, _next) => {
    if (error instanceof SyntaxError && 'body' in error) {
      return res.status(400).json({ error: 'Request body must contain valid JSON.' });
    }

    return res.status(500).json({ error: 'An unexpected server error occurred.' });
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Calculator running at http://localhost:${port}`);
  });
}

module.exports = { createApp };
