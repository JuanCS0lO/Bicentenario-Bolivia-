/*// services/auth.service.js
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.entity');

class AuthService {
    // Registrar un usuario
    static async register(username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('INSERT INTO staff(first_name,last_name,address_id,store_id,username, password) VALUES (\' \',\' \',3,1,?,?)', [username, hashedPassword]);
            return { message: 'Usuario registrado correctamente' };
        } catch (error) {
            throw new Error('Error al registrar el usuario');
        }
    }
    // Iniciar sesión
    static async login(username, password) {
        try {
            const [rows] = await db.query('SELECT * FROM staff WHERE username = ?', [username]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const user = new User(rows[0]);
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }
            // Generar el token JWT
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AuthService;
*/
// api/services/auth.service.js
const db      = require('../db');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const UsuarioDTO = require('../dto/usuario.dto');
require('dotenv').config();

class AuthService {
  static async register({ nombre, ap_pat, ap_mat, username, contrasenia }) {
    // 1) hasheo de password
    const hash = await bcrypt.hash(contrasenia, 10);
    // 2) inserción en BD
    const res = await db.query(
      `INSERT INTO usuarios (nombre, ap_pat, ap_mat, username, contrasenia)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING idusuario, nombre, ap_pat, ap_mat, username`,
      [nombre, ap_pat, ap_mat, username, hash]
    );
    // 3) devolvemos DTO (sin contrasenia)
    return new UsuarioDTO(res.rows[0]);
  }

  static async login({ username, contrasenia }) {
    // 1) buscamos usuario
    const res = await db.query(
      'SELECT * FROM usuarios WHERE username = $1',
      [username]
    );
    if (res.rowCount === 0) throw new Error('Usuario no encontrado');
    const user = res.rows[0];
    // 2) comparamos contraseñas
    const ok = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!ok) throw new Error('Contraseña inválida');
    // 3) firmamos JWT
    const payload = { idUsuario: user.idusuario, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    return { token };
  }

  static async getUserById(id) {
    const res = await db.query(
      `SELECT idusuario, nombre, ap_pat, ap_mat, username
       FROM usuarios
       WHERE idusuario = $1`,
      [id]
    );
    if (res.rowCount === 0) return null;
    return new UsuarioDTO(res.rows[0]);
  }
}

module.exports = AuthService;

