const db = require('../db');
const CategoriaDTO = require('../dto/categoria.dto');

class CategoriaService {
  static async getAll() {
    const res = await db.query('SELECT * FROM Categoria ORDER BY nombre');
    return res.rows.map(r => new CategoriaDTO(r));
  }
  static async getById(id) {
    const { rows } = await db.query('SELECT * FROM Categoria WHERE ID_Categoria=$1', [id]);
    return rows[0] ? new CategoriaDTO(rows[0]) : null;
  }
  static async create({ nombre }) {
    const { rows } = await db.query(
      'INSERT INTO Categoria (nombre) VALUES($1) RETURNING *',
      [nombre]
    );
    return new CategoriaDTO(rows[0]);
  }
  static async update(id, { nombre }) {
    const { rows, rowCount } = await db.query(
      'UPDATE Categoria SET nombre=$1 WHERE ID_Categoria=$2 RETURNING *',
      [nombre, id]
    );
    return rowCount ? new CategoriaDTO(rows[0]) : null;
  }
  static async delete(id) {
    const res = await db.query('DELETE FROM Categoria WHERE ID_Categoria=$1', [id]);
    return res.rowCount > 0;
  }
}
module.exports = CategoriaService;
