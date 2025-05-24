/*// services/film.service.js
const db = require('../db');
const Film = require('../models/film.entity');

class FilmService {
    // Obtener todas las películas
    static async getAllFilms() {
        try {
            const [rows] = await db.query('SELECT * FROM film');
            return rows.map(row => new Film(row)); // Convertimos a entidad Film
        } catch (error) {
            throw new Error('Error al obtener las películas');
        }
    }

    // Obtener una película por ID
    static async getFilmById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM film WHERE film_id = ?', [id]);
            if (rows.length === 0) return null;
            return new Film(rows[0]); // Convertimos a entidad Film
        } catch (error) {
            throw new Error('Error al obtener la película');
        }
    }
}

module.exports = FilmService;
*/

// api/services/ciudad.service.js
const db = require('../db');
const CiudadDTO = require('../dto/ciudad.dto');

class CiudadService {
  static async getAll() {
    const res = await db.query(
      'SELECT * FROM departamento ORDER BY nombre'
    );
    return res.rows.map(r => new CiudadDTO(r));
  }

  static async getById(id) {
    const res = await db.query(
      'SELECT * FROM departamento WHERE id_departamento = $1',
      [id]
    );
    if (res.rowCount === 0) return null;
    return new CiudadDTO(res.rows[0]);
  }

  static async create({ nombre, descripcion, linkRef }) {
    const res = await db.query(
      `INSERT INTO departamento (nombre, descripcion, linkref)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, descripcion, linkRef]
    );
    return new CiudadDTO(res.rows[0]);
  }

  static async update(id, { nombre, descripcion, linkRef }) {
    const res = await db.query(
      `UPDATE departamento
         SET nombre = $1, descripcion = $2, linkref = $3
       WHERE id_departamento = $4
       RETURNING *`,
      [nombre, descripcion, linkRef, id]
    );
    if (res.rowCount === 0) return null;
    return new CiudadDTO(res.rows[0]);
  }

  static async delete(id) {
    const res = await db.query(
      'DELETE FROM departamento WHERE id_departamento = $1',
      [id]
    );
    return res.rowCount > 0; // true si borró algo
  }
}

module.exports = CiudadService;
