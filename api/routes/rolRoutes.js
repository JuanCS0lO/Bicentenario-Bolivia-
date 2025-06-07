const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth.service');

router.get('/roles', async (req, res) => {
  try {
    const roles = await AuthService.getAllRoles();
    res.json(roles);
  } catch (err) {
    console.error('Error al obtener roles:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
