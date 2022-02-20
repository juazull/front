import { apiFetch } from "../functions/fetch.js";

/*Perfil*/
const perfiles = {
	loadPerfil(id) {
		return apiFetch('/traerPerfil', {
			method: 'POST',
			body: JSON.stringify({
				id_usuario: id
			})
		})
			.then(data => {
				return data;
			});
	},
	ediarPerfil(id_usuario, nombre_usuario, apellido_usuario, pais_usuario, edad_usuario,fecha_nacimiento) {
		return apiFetch("/editarperfil", {
      method: "POST",
      body: JSON.stringify({
        id_usuario: id_usuario,
        nombre_usuario: nombre_usuario,
        apellido_usuario: apellido_usuario,
        pais_usuario: pais_usuario,
        edad_usuario: edad_usuario,
        fecha_nacimiento: fecha_nacimiento
      }),
    }).then((rta) => {
      return rta;
    });
	}
}


export default perfiles;