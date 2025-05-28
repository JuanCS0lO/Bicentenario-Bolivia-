const db = require('../db');
const PeriodoDTO = require('../dto/periodo.dto');

class PeriodoService {
  static async getAll() {
    const res = await db.query('SELECT * FROM PeriodoHistorico ORDER BY fechainicio');
    return res.rows.map(r => new PeriodoDTO(r));
  }
  static async getById(id) {
    const { rows } = await db.query('SELECT * FROM PeriodoHistorico WHERE ID_Periodo=$1', [id]);
    return rows[0] ? new PeriodoDTO(rows[0]) : null;
  }
  static async create({ nombre, fechainicio, fechafinal }) {
    const { rows } = await db.query(
      `INSERT INTO PeriodoHistorico (nombre, fechainicio, fechafinal)
       VALUES($1,$2,$3) RETURNING *`,
      [nombre, fechainicio, fechafinal]
    );
    return new PeriodoDTO(rows[0]);
  }
  static async update(id, data) {
    const { nombre, fechainicio, fechafinal } = data;
    const { rows, rowCount } = await db.query(
      `UPDATE PeriodoHistorico SET nombre=$1, fechainicio=$2, fechafinal=$3
       WHERE ID_Periodo=$4 RETURNING *`,
      [nombre, fechainicio, fechafinal, id]
    );
    return rowCount ? new PeriodoDTO(rows[0]) : null;
  }
  static async delete(id) {
    const res = await db.query('DELETE FROM PeriodoHistorico WHERE ID_Periodo=$1', [id]);
    return res.rowCount > 0;
  }
}
module.exports = PeriodoService;