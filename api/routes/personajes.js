/*// api/routes/personajes.js
const express = require('express');
const router = express.Router();
const PersonajeService = require('../services/personaje.service');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const data = await PersonajeService.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await PersonajeService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
*/
/*
const express = require('express');
const router = express.Router();
const PersonajeService = require('../services/personaje.service');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, async (req, res) => {
  try { res.json(await PersonajeService.getAll()); }
  catch (e) { res.status(500).json({error: e.message}); }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await PersonajeService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (e) { res.status(500).json({error: e.message}); }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const created = await PersonajeService.create(req.body);
    res.status(201).json(created);
  } catch (e) { res.status(500).json({error: e.message}); }
});

router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await PersonajeService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json(updated);
  } catch (e) { res.status(500).json({error: e.message}); }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const ok = await PersonajeService.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
  } catch (e) { res.status(500).json({error: e.message}); }
});

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const PersonajeService = require('../services/personaje.service');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, async (req, res) => {
  try { res.json(await PersonajeService.getAll()); }
  catch (e) { res.status(500).json({error: e.message}); }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await PersonajeService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (e) { res.status(500).json({error: e.message}); }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const created = await PersonajeService.create(req.body);
    res.status(201).json(created);
  } catch (e) { res.status(500).json({error: e.message}); }
});

router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await PersonajeService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json(updated);
  } catch (e) { res.status(500).json({error: e.message}); }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const ok = await PersonajeService.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
  } catch (e) { res.status(500).json({error: e.message}); }
});

module.exports = router;
