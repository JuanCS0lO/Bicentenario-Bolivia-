// api/dto/usuario.dto.js
class UsuarioDTO {
    constructor({ idusuario, nombre, ap_pat, ap_mat, username, imagen, rol_id_rol }) {
    this.id = idusuario;
    this.nombre = nombre;
    this.apellidoPaterno = ap_pat;
    this.apellidoMaterno = ap_mat;
    this.username = username;
    this.imagen = imagen;
    this.rolId = rol_id_rol;
  }
  }
  module.exports = UsuarioDTO;
  