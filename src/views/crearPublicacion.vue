<template>
	<div class="container">
		<div class="container mt-4">
			<div class="row d-flex justify-content-center">
				<div class="col-md-8">
					<div class="card p-3 py-6">
						<div class="d-flex flex-column ml-3">
							<div class="panel-heading">
								<h1 class="panel-title">Publicaciones</h1>
							</div>
							<form action="#" class="panel-fondo" @submit.prevent="crearPublicacion">
								<div class="form-group">
									<label class="sr-only">Titulo de la publicacion:</label>
									<input v-model="posteo.titulo_posteo" type="text" id="name" name="titulo_posteo" required placeholder="Titulo" class="form-control">
								</div>
<!-- 								<div class="form-group"> -->
<!-- 									<label class="sr-only" for="imagenPublicacion">Url de la imagen</label> -->
<!-- 									<input type="file" id="imagenPublicacion" class="form-control"> -->
<!-- 									<input type="hidden" id="fileName" class="form-control"> -->
<!-- 								</div> -->
								<div class="form-group">
									<label class="sr-only">Texto de la publicacion:</label>
									<textarea v-model="posteo.texto_posteo" name="texto_posteo" placeholder="Escribe una publicacion..." class="form-control"></textarea>
								</div>
								<div class="actions">
									<button type="submit" class="btn btn-verde">Publicar</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
// @ is an alias to /src
import {apiFetch} from "../functions/fetch.js";
import authService from "../services/auth.js";
import posteos from "../functions/publicaciones.js";

export default {
	name: 'crearPublicacion',
	data(){
		return {
			posteo:{
				titulo_posteo: null,
				imagen_posteo: null,
				texto_posteo: null,
			},
			errors:{
				titulo_posteo:null,
				texto_posteo: null,
			},
			auth: {
				user: {
					id: null,
					email: null,
					usuario: null,
				},
			},
			loading: false,
			notification: {text:null,type:'success'}
		}
	},
	methods: {
		logUser() {
			this.auth.user = authService.getUserData();
		},
		crearPublicacion(){
			if(this.loading) return;
			this.loading = true;

			posteos.crearPublicacion(this.posteo.titulo_posteo, this.posteo.texto_posteo, this.auth.user.id).then(response => {
				if (response.error){
					alert(response.descripcion.lista[0]);
				}
				else if (response.success) {
					this.$router.push('/perfil');
				}
				this.loading = false;
				return response;
				
			});
		}
	}, 
	validates(){
		let hasError = false;

		if(this.user.id == null || this.user.id === '' ){
			this.errors.id_usuario_posteo= 'No se escribio ningun posteo por parte del usuario';
			hasError = true;
			
		}
		if(this.posteo.titulo_posteo == null || this.posteo.titulo_posteo === '' ){
			this.errors.titulo_posteo= 'No se encontro ningun titulo';
			hasError = true;			
		}

		if(this.posteo.texto_posteo == null || this.posteo.texto_posteo === '' ){
			this.errors.id_usuario= 'No escribio ningun texto';
			hasError = true;			
		}

		return !hasError;
	},
	mounted() {
		this.logUser();
		if(this.auth.user.id === null){
			this.$router.push('/login');
		}
	}
		
}
</script>
