/*// api/services/hecho.service.js
const db = require('../db');
const HechoDTO = require('../dto/hecho.dto');

class HechoService {
  static async getAll() {
    const res = await db.query('SELECT * FROM HechosHistorico ORDER BY fechainicio');
    return res.rows.map(r => new HechoDTO(r));
  }
  static async getById(id) {
    const res = await db.query(
      'SELECT * FROM HechosHistorico WHERE id_hecho = $1',
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
    const res = await db.query('SELECT * FROM HechosHistorico ORDER BY fechaInicio');
    return res.rows.map(r => new HechoDTO(r));
  }
  static async getById(id) {
    const res = await db.query('SELECT * FROM HechosHistorico WHERE ID_hecho=$1 ', [id]);
    if (res.rowCount === 0) return null;
    return new HechoDTO(res.rows[0]);
  }
  // static async create({ nombre, descripcion, fechaInicio, fechaFinal, linkRef, imagenURL, idCategoria }) {
  //   const res = await db.query(
  //     `INSERT INTO HechosHistorico
  //        (nombre, descripcion, fechainicio, fechafinal, linkref, imagenurl, id_categoria)
  //      VALUES ($1,$2,$3,$4,$5,$6,$7)
  //      RETURNING *`,
  //     [nombre, descripcion, fechaInicio, fechaFinal, linkRef, imagenURL, idCategoria]
  //   );
  //   return new HechoDTO(res.rows[0]);
  // }
  static async create(data) {
    const cols = ['nombre','descripcion','fechainicio','fechafinal','destacado','imagen','video','linkref','audio','modeloar','lat','lng','periodohistorico_id_periodo'];
    const vals = cols.map((c,i) => `$${i+1}`).join(',');
    const values = cols.map(c => data[c]);
    const { rows } = await db.query(
      `INSERT INTO HechosHistorico (${cols.join(',')}) VALUES (${vals}) RETURNING *`,
      values
    );
    return new HechoDTO(rows[0]);
  }
  static async update(id, data) {
    const fields = Object.keys(data);
    const setClause = fields.map((f,i) => `${f}=$${i+1}`).join(',');
    const values = fields.map(f => data[f]).concat(id);
    const { rows, rowCount } = await db.query(
      `UPDATE HechosHistorico SET ${setClause} WHERE ID_hecho=$${fields.length+1} RETURNING *`,
      values
    );
    return rowCount ? new HechoDTO(rows[0]) : null;
  }
  // static async update(id, { nombre, descripcion, fechaInicio, fechaFinal, linkRef, imagenURL, idCategoria }) {
  //   const res = await db.query(
  //     `UPDATE HechosHistorico SET
  //        nombre = $1, descripcion = $2, fechainicio = $3, fechafinal = $4,
  //        linkref = $5, imagenurl = $6, id_categoria = $7
  //      WHERE id_hecho = $8
  //      RETURNING *`,
  //     [nombre, descripcion, fechaInicio, fechaFinal, linkRef, imagenURL, idCategoria, id]
  //   );
  //   if (res.rowCount === 0) return null;
  //   return new HechoDTO(res.rows[0]);
  // }
  static async delete(id) {
    const res = await db.query('DELETE FROM HechosHistorico WHERE id_hecho = $1', [id]);
    return res.rowCount > 0;
  }
}

module.exports = HechoService;
