/*// api/dto/hecho.dto.js
class HechoDTO {
    constructor({ id_hecho, nombre, descripcion, fechainicio, fechafinal, linkref, imagenurl, id_categoria }) {
      this.id           = id_hecho;
      this.nombre       = nombre;
      this.descripcion  = descripcion;
      this.fechaInicio  = fechainicio;
      this.fechaFinal   = fechafinal;
      this.linkRef      = linkref;
      this.imagenURL    = imagenurl;
      this.idCategoria  = id_categoria;
    }
  }
  module.exports = HechoDTO;
  */
  class HechoDTO {
    constructor({ id_hecho, nombre, descripcion, fechainicio, fechafinal, linkref, imagenurl, id_categoria }) {
      this.id          = id_hecho;
      this.nombre      = nombre;
      this.descripcion = descripcion;
      this.fechaInicio = fechainicio;
      this.fechaFinal  = fechafinal;
      this.linkRef     = linkref;
      this.imagenURL   = imagenurl;
      this.idCategoria = id_categoria;
    }
  }
  module.exports = HechoDTO;
  