import { apiFetch } from "../functions/fetch.js";
import { API_IMGS_FOLDER } from "../constants/api.js";

/*Perfil*/
const comentarios = {
	crearComentario(com) {
		return apiFetch('/crearComentario', {
			method: 'POST',
			body: JSON.stringify({
				comentario: com.comentario,
				id_usuario: com.id_usuario,
				id_posteo: com.id_posteo
			})
		}).then(rta => {
			return rta;
		})
	},
	loadComentarios(id_posteo) {
		return apiFetch('/traerComentarios', {
			method: 'POST',
			body: JSON.stringify({
				id_posteo: id_posteo
			})
		})
			.then(coment => {
				return coment;
			});
	},
}

export default comentarios;