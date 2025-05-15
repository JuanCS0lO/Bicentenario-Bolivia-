const express = require('express');
const router = express.Router();
const CategoriaService = require('../services/categoria.service');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, async (req, res) => {
  const data = await CategoriaService.getAll();
  res.json(data);
});
router.get('/:id', auth, async (req, res) => {
  const item = await CategoriaService.getById(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrada' });
  res.json(item);
});
router.post('/', auth, async (req, res) => {
  const created = await CategoriaService.create(req.body);
  res.status(201).json(created);
});
router.patch('/:id', auth, async (req, res) => {
  const updated = await CategoriaService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'No encontrada' });
  res.json(updated);
});
router.delete('/:id', auth, async (req, res) => {
  const ok = await CategoriaService.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'No encontrada' });
  res.status(204).send();
});
module.exports = router;