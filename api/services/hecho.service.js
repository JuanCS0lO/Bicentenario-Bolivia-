/*// api/services/hecho.service.js
const db = require('../db');
const HechoDTO = require('../dto/hecho.dto');

class HechoService {
  static async getAll() {
    const res = await db.query('SELECT * FROM hechoshistorico ORDER BY fechainicio');
    return res.rows.map(r => new HechoDTO(r));
  }
  static async getById(id) {
    const res = await db.query(
      'SELECT * FROM hechoshistorico WHERE id_hecho = $1',
      [id]
    );
    if (res.rowCount === 0) return null;
    return new HechoDTO(res.rows[0]);
  }
}
module.exports = HechoService;
*/
const db = require('../db');
const HechoDTO = require('../dto/hecho.dto');

class HechoService {
  static async getAll() {
    const res = await db.query('SELECT * FROM hechoshistorico ORDER BY fechainicio');
    return res.rows.map(r => new HechoDTO(r));
  }



//NUEVA FUNCION PARA OBTENER DATOS ESPECIFICOS
static async getDatosH() {
    const res = await db.query('SELECT nombre,descripcion FROM hechoshistorico ORDER BY fechainicio');
    return res.rows.map(r => new HechoDTO(r));
  }
//...............................................


  static async getById(id) {
    const res = await db.query('SELECT * FROM hechoshistorico WHERE id_hecho = $1', [id]);
    if (res.rowCount === 0) return null;
    return new HechoDTO(res.rows[0]);
  }
  static async create({ nombre, descripcion, fechaInicio, fechaFinal, linkRef, imagenURL, idCategoria }) {
    const res = await db.query(
      `INSERT INTO hechoshistorico
         (nombre, descripcion, fechainicio, fechafinal, linkref, imagenurl, id_categoria)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [nombre, descripcion, fechaInicio, fechaFinal, linkRef, imagenURL, idCategoria]
    );
    return new HechoDTO(res.rows[0]);
  }
  static async update(id, { nombre, descripcion, fechaInicio, fechaFinal, linkRef, imagenURL, idCategoria }) {
    const res = await db.query(
      `UPDATE hechoshistorico SET
         nombre = $1, descripcion = $2, fechainicio = $3, fechafinal = $4,
         linkref = $5, imagenurl = $6, id_categoria = $7
       WHERE id_hecho = $8
       RETURNING *`,
      [nombre, descripcion, fechaInicio, fechaFinal, linkRef, imagenURL, idCategoria, id]
    );
    if (res.rowCount === 0) return null;
    return new HechoDTO(res.rows[0]);
  }
  static async delete(id) {
    const res = await db.query('DELETE FROM hechoshistorico WHERE id_hecho = $1', [id]);
    return res.rowCount > 0;
  }
}

module.exports = HechoService;
