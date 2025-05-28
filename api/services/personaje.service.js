/*// api/services/personaje.service.js
const db = require('../db');
const PersonajeDTO = require('../dto/personaje.dto');

class PersonajeService {
  static async getAll() {
    const res = await db.query('SELECT * FROM Personajes ORDER BY apellido, nombre');
    return res.rows.map(r => new PersonajeDTO(r));
  }
  static async getById(id) {
    const res = await db.query(
      'SELECT * FROM Personajes WHERE id_pers = $1',
      [id]
    );
    if (res.rowCount === 0) return null;
    return new PersonajeDTO(res.rows[0]);
  }
}
module.exports = PersonajeService;
*/
/*const db = require('../db');
const PersonajeDTO = require('../dto/personaje.dto');

class PersonajeService {
  static async getAll() {
    const res = await db.query('SELECT * FROM Personajes ORDER BY apellido, nombre');
    return res.rows.map(r => new PersonajeDTO(r));
  }
  static async getById(id) {
    const res = await db.query('SELECT * FROM Personajes WHERE id_pers = $1', [id]);
    if (res.rowCount === 0) return null;
    return new PersonajeDTO(res.rows[0]);
  }
  static async create({ nombre, apellido, seudonimo, descripcion, linkRef, fechaNac, fechaMrt, imagenURL }) {
    const res = await db.query(
      `INSERT INTO Personajes
         (nombre, apellido, seudonimo, descripcion, linkref, fechanac, fechamrt, imagenurl)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [nombre, apellido, seudonimo, descripcion, linkRef, fechaNac, fechaMrt, imagenURL]
    );
    return new PersonajeDTO(res.rows[0]);
  }
  static async update(id, { nombre, apellido, seudonimo, descripcion, linkRef, fechaNac, fechaMrt, imagenURL }) {
    const res = await db.query(
      `UPDATE Personajes SET
         nombre = $1, apellido = $2, seudonimo = $3, descripcion = $4,
         linkref = $5, fechanac = $6, fechamrt = $7, imagenurl = $8
       WHERE id_pers = $9
       RETURNING *`,
      [nombre, apellido, seudonimo, descripcion, linkRef, fechaNac, fechaMrt, imagenURL, id]
    );
    if (res.rowCount === 0) return null;
    return new PersonajeDTO(res.rows[0]);
  }
  static async delete(id) {
    const res = await db.query('DELETE FROM Personajes WHERE id_pers = $1', [id]);
    return res.rowCount > 0;
  }
}

module.exports = PersonajeService;
*/
const db = require('../db');
const PersonajeDTO = require('../dto/personaje.dto');

class PersonajeService {
  static async getAll() {
    const res = await db.query('SELECT * FROM Personajes ORDER BY nombre');
    return res.rows.map(r => new PersonajeDTO(r));
  }
  static async getById(id) {
    const res = await db.query('SELECT * FROM Personajes WHERE id_pers = $1', [id]);
    if (res.rowCount === 0) return null;
    return new PersonajeDTO(res.rows[0]);
  }
  // static async create({ nombre, apellido, seudonimo, descripcion, linkRef, fechaNac, fechaMrt, imagenURL }) {
  //   const res = await db.query(
  //     `INSERT INTO Personajes
  //        (nombre, apellido, seudonimo, descripcion, linkref, fechanac, fechamrt, imagenurl)
  //      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  //      RETURNING *`,
  //     [nombre, apellido, seudonimo, descripcion, linkRef, fechaNac, fechaMrt, imagenURL]
  //   );
  //   return new PersonajeDTO(res.rows[0]);
  // }
  static async create(data) {
    const cols = ['nombre','ap_pat','ap_mat','seudonimo','descripcion','fechanac','fechamrt','video','imagen','linkref'];
    const vals = cols.map((_,i) => `$${i+1}`).join(',');
    const values = cols.map(c => data[c]);
    const { rows } = await db.query(
      `INSERT INTO Personajes (${cols.join(',')}) VALUES (${vals}) RETURNING *`,
      values
    );
    return new PersonajeDTO(rows[0]);
  }
   static async update(id, data) {
    const fields = Object.keys(data);
    const setClause = fields.map((f,i) => `${f}=$${i+1}`).join(',');
    const values = fields.map(f => data[f]).concat(id);
    const { rows, rowCount } = await db.query(
      `UPDATE Personajes SET ${setClause} WHERE ID_pers=$${fields.length+1} RETURNING *`,
      values
    );
    return rowCount ? new PersonajeDTO(rows[0]) : null;
  }
  // static async update(id, { nombre, apellido, seudonimo, descripcion, linkRef, fechaNac, fechaMrt, imagenURL }) {
  //   const res = await db.query(
  //     `UPDATE Personajes SET
  //        nombre = $1, apellido = $2, seudonimo = $3, descripcion = $4,
  //        linkref = $5, fechanac = $6, fechamrt = $7, imagenurl = $8
  //      WHERE id_pers = $9
  //      RETURNING *`,
  //     [nombre, apellido, seudonimo, descripcion, linkRef, fechaNac, fechaMrt, imagenURL, id]
  //   );
  //   if (res.rowCount === 0) return null;
  //   return new PersonajeDTO(res.rows[0]);
  // }
  static async delete(id) {
    const res = await db.query('DELETE FROM Personajes WHERE id_pers = $1', [id]);
    return res.rowCount > 0;
  }
}

module.exports = PersonajeService;
