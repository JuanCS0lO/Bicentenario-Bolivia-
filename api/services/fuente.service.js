const db = require('../db');
const FuenteDTO = require('../dto/fuente.dto');

class FuenteService {
  static async getAll() {
    const res = await db.query('SELECT * FROM Fuentes ORDER BY titulo');
    return res.rows.map(r => new FuenteDTO(r));
  }
  static async getById(id) {
    const res = await db.query('SELECT * FROM Fuentes WHERE id_fuente = $1', [id]);
    if (res.rowCount === 0) return null;
    return new FuenteDTO(res.rows[0]);
  }
  static async create({ titulo, url, tipo }) {
    const res = await db.query(
      `INSERT INTO Fuentes (titulo, url, tipo)
       VALUES ($1,$2,$3) RETURNING *`,
      [titulo, url, tipo]
    );
    return new FuenteDTO(res.rows[0]);
  }
  static async update(id, { titulo, url, tipo }) {
    const res = await db.query(
      `UPDATE Fuentes
         SET titulo = $1, url = $2, tipo = $3
       WHERE id_fuente = $4
       RETURNING *`,
      [titulo, url, tipo, id]
    );
    if (res.rowCount === 0) return null;
    return new FuenteDTO(res.rows[0]);
  }
  static async delete(id) {
    const res = await db.query('DELETE FROM Fuentes WHERE id_fuente = $1', [id]);
    return res.rowCount > 0;
  }
}

module.exports = FuenteService;
