// api/dto/usuario.dto.js
class UsuarioDTO {
    constructor({ idusuario, nombre, ap_pat, ap_mat, username }) {
      this.idUsuario = idusuario;
      this.nombre    = nombre;
      this.ap_pat    = ap_pat;
      this.ap_mat    = ap_mat;
      this.username  = username;
    }
  }
  module.exports = UsuarioDTO;
  