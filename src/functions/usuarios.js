import { apiFetch } from "../functions/fetch.js";


/*Perfil*/
const usuarios = {
	crearUsuario(email_usuario, password_usuario) {
		return apiFetch('/crearUsuario', {
			method: 'POST',
			body: JSON.stringify({
				email_usuario: email_usuario,
				password_usuario: password_usuario
			})
		})
			.then(data => {	
				return data;
			});
	}
}

export default usuarios;