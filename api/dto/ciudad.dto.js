/*// enmascarar campos
class FilmDTO{
    constructor({film_id,title,description,release_year}){
        this.id = film_id;
        this.title = title;
        this.description = description;
        this.releaseYear = release_year;
    }
}

module.exports = FilmDTO;
*/

// api/dto/ciudad.dto.js
class CiudadDTO {
    constructor({ id_departamento, nombre, descripcion, linkref }) {
      this.id         = id_departamento;
      this.nombre     = nombre;
      this.descripcion= descripcion;
      this.linkRef    = linkref;
    }
  }
  module.exports = CiudadDTO;
  
