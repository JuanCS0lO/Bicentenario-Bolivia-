const express = require('express');
const router = express.Router();
const UsuarioService = require('../services/usuario.service');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const data = await UsuarioService.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await UsuarioService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const created = await UsuarioService.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await UsuarioService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const ok = await UsuarioService.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
