class PeriodoDTO {
  constructor({ id_periodo, nombre, fechainicio, fechafinal }) {
    this.id = id_periodo;
    this.nombre = nombre;
    this.fechaInicio = fechainicio;
    this.fechaFinal = fechafinal;
  }
}

module.exports = PeriodoDTO;