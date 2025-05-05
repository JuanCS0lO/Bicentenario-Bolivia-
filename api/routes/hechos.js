/*// api/routes/hechos.js
const express = require('express');
const router = express.Router();
const HechoService = require('../services/hecho.service');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const data = await HechoService.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await HechoService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const HechoService = require('../services/hecho.service');
const authenticateToken = require('../middlewares/auth.middleware');

// GET all
router.get('/', authenticateToken, async (req, res) => {
  try { res.json(await HechoService.getAll()); }
  catch (e) { res.status(500).json({error: e.message}); }
});

// GET by id
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await HechoService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (e) { res.status(500).json({error: e.message}); }
});

// POST create
router.post('/', authenticateToken, async (req, res) => {
  try {
    const created = await HechoService.create(req.body);
    res.status(201).json(created);
  } catch (e) { res.status(500).json({error: e.message}); }
});

// PATCH update
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await HechoService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json(updated);
  } catch (e) { res.status(500).json({error: e.message}); }
});

// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const ok = await HechoService.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
  } catch (e) { res.status(500).json({error: e.message}); }
});

module.exports = router;
