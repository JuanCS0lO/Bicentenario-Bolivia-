const db = require('../db');
const UsuarioDTO = require('../dto/usuario.dto');

class UsuarioService {
  static async getAll() {
    const res = await db.query('SELECT * FROM Usuarios ORDER BY nombre');
    return res.rows.map(r => new UsuarioDTO(r));
  }
  static async getById(id) {
    const { rows } = await db.query('SELECT * FROM Usuarios WHERE idUsuario=$1', [id]);
    return rows[0] ? new UsuarioDTO(rows[0]) : null;
  }
  static async create(data) {
    const cols = ['nombre','ap_pat','ap_mat','username','contrasenia','imagen','rol_id_rol'];//cambie password por contrasenia
    const vals = cols.map((_,i) => `$${i+1}`).join(',');
    const values = cols.map(c => data[c]);
    const { rows } = await db.query(
      `INSERT INTO Usuarios (${cols.join(',')}) VALUES (${vals}) RETURNING *`,
      values
    );
    return new UsuarioDTO(rows[0]);
  }
  static async update(id, data) {
    const fields = Object.keys(data);
    const setClause = fields.map((f,i) => `${f}=$${i+1}`).join(',');
    const values = fields.map(f => data[f]).concat(id);
    const { rows, rowCount } = await db.query(
      `UPDATE Usuarios SET ${setClause} WHERE idUsuario=$${fields.length+1} RETURNING *`,
      values
    );
    return rowCount ? new UsuarioDTO(rows[0]) : null;
  }
  static async delete(id) {
    const res = await db.query('DELETE FROM Usuarios WHERE idUsuario=$1', [id]);
    return res.rowCount > 0;
  }
}
module.exports = UsuarioService;