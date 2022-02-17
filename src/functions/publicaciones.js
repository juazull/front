import { apiFetch } from "../functions/fetch.js";
import { API_IMGS_FOLDER } from "../constants/api.js";

/*Perfil*/
const posteos = {
	loadPosteosUsusario(id_usuario) {
		this.loading = true;
		return apiFetch('/posteosUsuario', {
			method: 'POST',
			body: JSON.stringify({
				id_usuario_posteo: id_usuario
			})
		})
			.then(posteo => {
				return posteo.data;
			});
	},
	loadPosteo(id_posteo) {
		return apiFetch('/traerPosteo', {
			method: 'POST',
			body: JSON.stringify({
				id_posteo: id_posteo
			})
		})
			.then(posteo => {
				return posteo;
			});
	},
	loadPosteos() {
		return apiFetch('/listarPosteos', {
			method: 'POST',
			body: ''
		})
			.then(posteo => {
				return posteo;
			});
	},
	crearPublicacion(titulo_posteo, texto_posteo, user_id) {
		return apiFetch('/crearpublicacion', {
			method: 'POST',
			body: JSON.stringify({
				titulo_posteo: titulo_posteo,
				texto_posteo: texto_posteo,
				id_usuario_posteo: user_id
			}),	
		}).then(response => {

			return response;

		});
	}
}

export default posteos;