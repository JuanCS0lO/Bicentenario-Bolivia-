/*const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth.service');
const { body, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Endpoints para autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: usuario123
 *               password:
 *                 type: string
 *                 example: "Password.123"
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error en el servidor
 */
/*router.post('/register', // Ruta para registrar un usuario
[
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
        const result = await AuthService.register(username, password);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión y obtiene un token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: usuario123
 *               password:
 *                 type: string
 *                 example: "Password.123"
 *     responses:
 *       200:
 *         description: Devuelve el token JWT
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */
/*router.post('/login', async (req, res) => { // Ruta para iniciar sesión
    const { username, password } = req.body;
    try {
        const result = await AuthService.login(username, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
*/
// api/routes/auth.js
const express     = require('express');
const router      = express.Router();
const AuthService = require('../services/auth.service');
require('dotenv').config();      // para que cargue tu JWT_SECRET


// Registro de usuario
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const userDto = await AuthService.register(req.body);
    res.status(201).json(userDto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Login
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, contrasenia } = req.body;

  // 1️⃣ Validación temprana de campos
  if (!username || !contrasenia) {
    return res
      .status(400)
      .json({ error: 'Falta usuario o contraseña' });
  }

  try {
    // 2️⃣ Llamamos al servicio de login
    const { token } = await AuthService.login({ username, contrasenia });
    return res.json({ token });
  } catch (e) {
    // 3️⃣ Errores de usuario no encontrado o password inválida
    return res
      .status(400)
      .json({ error: e.message });
  }
});

module.exports = router;

