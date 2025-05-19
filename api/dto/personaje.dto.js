/*// api/dto/personaje.dto.js
class PersonajeDTO {
    constructor({ id_pers, nombre, apellido, seudonimo, descripcion, linkref, fechanac, fechamrt, imagenurl }) {
      this.id         = id_pers;
      this.nombre     = nombre;
      this.apellido   = apellido;
      this.seudonimo  = seudonimo;
      this.descripcion= descripcion;
      this.linkRef    = linkref;
      this.fechaNac   = fechanac;
      this.fechaMrt   = fechamrt;
      this.imagenURL  = imagenurl;
    }
  }
  module.exports = PersonajeDTO;
  */
  class PersonajeDTO {
    constructor({ id_pers, nombre, ap_pat, ap_mat, seudonimo, descripcion, linkref, fechanac, fechamrt, imagenurl }) {
      this.id         = id_pers;
      this.nombre     = nombre;
      this.ap_pat   = ap_pat;
      this.ap_mat   = ap_mat;
      this.seudonimo  = seudonimo;
      this.descripcion= descripcion;
      this.linkRef    = linkref;
      this.fechaNac   = fechanac;
      this.fechaMrt   = fechamrt;
      this.imagenURL  = imagenurl;
    }
  }
  module.exports = PersonajeDTO;
  