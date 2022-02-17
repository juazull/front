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

								<div v-if="showError">
									<div class="alert alert-warning" role="alert">
										<div v-for="error in errors">
											{{ error }}
										</div>                 
									</div>
								</div>

								<div class="form-group">
									<label class="sr-only">Titulo de la publicacion:</label>
									<input v-model="posteo.titulo_posteo" type="text" id="name" name="titulo_posteo" required placeholder="Titulo" class="form-control" maxlength="100">
									<small class="form-text text-muted">Maximo 100 caracteres y minimo 4</small>
								</div>
<!-- 								<div class="form-group"> -->
<!-- 									<label class="sr-only" for="imagenPublicacion">Url de la imagen</label> -->
<!-- 									<input type="file" id="imagenPublicacion" class="form-control"> -->
<!-- 									<input type="hidden" id="fileName" class="form-control"> -->
<!-- 								</div> -->
								<div class="form-group">
									<label class="sr-only">Texto de la publicacion:</label>
									<textarea v-model="posteo.texto_posteo" name="texto_posteo" placeholder="Escribe una publicacion..." class="form-control"  maxlength="1000"></textarea>
									<small class="form-text text-muted">Maximo 1000 caracteres y minimo 4</small>
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
			errors: [],
			showAlert:false, 

			posteo:{
				titulo_posteo: null,
				imagen_posteo: null,
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

			if(!this.validates()){
				posteos.crearPublicacion(this.posteo.titulo_posteo, this.posteo.texto_posteo, this.auth.user.id).then(response => {
					if (response.error){
						//alert(response.descripcion.lista[0]);
						this.showError=true;
						this.errors.push(response.descripcion.lista[0]);

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
		this.errors=[];            
        this.showError= false; 
		

		if(this.user.id == null || this.user.id === '' ){
			this.errors.id_usuario_posteo= 'No se escribio ningun posteo por parte del usuario';
			this.showError= true;	

		}
		if(this.posteo.titulo_posteo == null || this.posteo.titulo_posteo === '' ){
			this.errors.push ('No se encontro ningun titulo');
			this.showError= true;			
		}

		if(this.posteo.texto_posteo == null || this.posteo.texto_posteo === '' ){
			this.errors.push ('No escribio ningun texto');
			this.showError = true;			
		}

		if(this.posteo.titulo_posteo.length < 4 || this.posteo.titulo_posteo.length > 100){
			this.errors.push ('El titulo debe contener un minimo de 4 caracteres y un maximo de 100');
			this.showError = true;				
		}

		if(this.posteo.texto_posteo.length < 4 || this.posteo.texto_posteo.length > 1000){
			this.errors.push ('El posteo debe contener un minimo de 4 caracteres y un maximo de 1000');
			this.showError = true;				
		}
		console.log (this.showError);
		return this.showError;
	},
		},
	mounted() {
		this.logUser();
		if(this.auth.user.id === null){
			this.$router.push('/login');
		}
	}
		
}
</script>
