const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json()); // for parsing JSON bodies

// Route: GET /get-html?url=https://example.com
app.post('/get-html', async (req, res) => {
  const targetUrl = req.body.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing ?url parameter' });
  }

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();

    res.setHeader('Content-Type', 'text/plain');
    res.send(html);
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch HTML' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
