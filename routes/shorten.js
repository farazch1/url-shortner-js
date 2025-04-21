const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const BASE = process.env.BASE_URL;

// Create a new short URL
router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });
  const shortCode = nanoid(6);
  try {
    const entry = await Url.create({ url, shortCode });
    res.status(201).json({
      id: entry._id,
      url: entry.url,
      shortCode: entry.shortCode,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      shortUrl: `${BASE}/${entry.shortCode}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Redirect or retrieve original URL
router.get('/:code', async (req, res) => {
  const { code } = req.params;
  const entry = await Url.findOne({ shortCode: code });
  if (!entry) return res.status(404).json({ error: 'Not found' });
  entry.accessCount++;
  await entry.save();
  res.json({
    id: entry._id,
    url: entry.url,
    shortCode: entry.shortCode,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    accessCount: entry.accessCount
  });
});

// Update an existing short URL
router.put('/:code', async (req, res) => {
  const { code } = req.params;
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });
  const entry = await Url.findOneAndUpdate(
    { shortCode: code },
    { url, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );
  if (!entry) return res.status(404).json({ error: 'Not found' });
  res.json({
    id: entry._id,
    url: entry.url,
    shortCode: entry.shortCode,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt
  });
});

// Delete a short URL
router.delete('/:code', async (req, res) => {
  const { code } = req.params;
  const result = await Url.findOneAndDelete({ shortCode: code });
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.sendStatus(204);
});

// Get statistics
router.get('/:code/stats', async (req, res) => {
  const { code } = req.params;
  const entry = await Url.findOne({ shortCode: code });
  if (!entry) return res.status(404).json({ error: 'Not found' });
  res.json({
    id: entry._id,
    url: entry.url,
    shortCode: entry.shortCode,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    accessCount: entry.accessCount
  });
});

module.exports = router;