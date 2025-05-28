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
    constructor({ id_hecho, nombre, descripcion, fechainicio, fechafinal, destacado, imagen, video, linkref, audio, modeloar, lat, lng, periodohistorico_id_periodo }) {
    this.id = id_hecho;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaInicio = fechainicio;
    this.fechaFinal = fechafinal;
    this.destacado = destacado;
    this.imagen = imagen;
    this.video = video;
    this.linkRef = linkref;
    this.audio = audio;
    this.modeloAR = modeloar;
    this.lat = lat;
    this.lng = lng;
    this.periodoId = periodohistorico_id_periodo;
  }
  }
  module.exports = HechoDTO;
  