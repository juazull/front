<template>
	<div class="container">
		<div class="container mt-4">
			<div class="row d-flex justify-content-center">
				<div class="col-md-8">
					<div class="card p-3 py-6">
						<div class="d-flex flex-column ml-3">
							<form action="#" class="panel-activity__status" @submit.prevent="ediarPerfil">
								<h1 class="panel-title">Edite su perfil</h1>
								<!-- 								<div class="form-group"> -->
								<!-- 									<label class="sr-only">Usuario</label> <input v-model="perfil.perfil" type="text" id="usuario" class="form-control" name="name" placeholder="Usuario" required autofocus> -->
								<!-- 								</div> -->
								<div class="form-group">
									<label for="name">Nombre:</label>
									<input v-model="perfil.nombre_usuario" type="text" id="name" class="form-control" placeholder="Nombre">
								</div>
								<div class="form-group">
									<label for="lastname">Apellido:</label>
									<input v-model="perfil.apellido_usuario" type="text" id="lastname" class="form-control" placeholder="Apellido">
								</div>
<!-- 								<div class="form-group"> -->
<!-- 									<label for="imagenPerfil" class="sr-only">Url de la imagen</label> -->
<!-- 									<input type="file" id="imagenPerfil" class="form-control"> -->
<!-- 									<input type="hidden" id="fileName" class="form-control"> -->
<!-- 								</div> -->
								<div class="form-group">
									<label for="edad">Edad</label>
									<input v-model.number="perfil.edad_Usuario" type="number" min="1" id="edad" class="form-control">
								</div>

								<div class="form-group">
									<label for="fecha_nacimiento">Fecha de Nacimiento</label>
									<input v-model="perfil.fecha_nacimiento" type="date" id="fecha_nacimiento" class="form-control">
								</div>

								<div class="form-group">
									<label for="paises">Pais</label>
									<select id="paises" v-model="perfil.pais_usuario" class="form-control">
										<option v-for="pais in paises" :key="pais.id_pais" :value=pais.id_pais>{{pais.nombre_pais}}</option>
									</select>
								</div>
								<button type="submit" class="btn btn-lg btn-verde btn-block">
									<i class="nav-item"></i>Guardar Cambios
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {apiFetch} from "../functions/fetch.js";
import authService from "../services/auth.js";
import {API_IMGS_FOLDER} from "../constants/api.js";
import perfiles from "../functions/perfiles.js";

export default {
	name:'editarPerfil',
	data(){
		return {
			perfil:{
//				 perfil: null,
				nombre_usuario: null,
				apellido_usuario: null,
				pais_usuario: 2,
				edad_Usuario: null,
				fecha_nacimiento: null
			},
			auth: {
				user: {
					id: null,
					email: null,
					usuario: null,
				},
			},
			errors:{
				nombre_usuario: null,
				apellido_usuario: null,
				pais_usuario: null,
				edad_usuario: null,
				fecha_nacimiento: null
			},
			paises: [],
			loading: false,
			notification: {text:null,type:'success'}
		}
	}, 

	methods: {
		logUser() {
			this.auth.user = authService.getUserData();
		},
		imageUrl(image) {
			return `${API_IMGS_FOLDER}/${image}`;
		},
		loadPaises() {
			apiFetch('/recuPaises', {
				method: 'POST',
				body: ""
			})
			.then(data => {
				this.loading = false;
				this.paises = data.data;
			});
		},
		loadPerfil() {
			this.loading = true;
			
			perfiles.loadPerfil(this.auth.user.id)
			.then(data => {
				this.loading = false;
				this.perfil = data.data;
			});
		},
		ediarPerfil(){
			if(this.loading) return;
// 			if(!this.validates()) return;
			this.loading = true;
			perfiles.ediarPerfil(this.auth.user.id, this.perfil.nombre_usuario, this.perfil.apellido_usuario, this.perfil.pais_usuario, this.perfil.edad_Usuario, this.perfil.fecha_nacimiento). then (rta => {
				this.loading = false;
				if(rta.data){
					this.$router.push('/perfil');
				}
				else {
					this.notification={
						text:'No se pudo editar el perfil',
						type:'error'
					};
				}
			})
		},	
		validates(){
			let hasError = false;
	
			if(this.perfil.nombre_usuario == null || this.perfil.nombre_usuario === '' ){
				this.errors.nombre_usuario= 'No se edito el nombre';
				hasError = true;			
			}
			
			if(this.perfil.apellido_usuario == null || this.perfil.apellido_usuario === '' ){
				this.errors.id_usuario= 'No se edito el apellido';
				hasError = true;			
			}
	
			if(this.perfil.pais_usuario == null || this.perfil.pais_usuario === '' ){
				this.errors.pais_usuario= 'No se edito el pais';
				hasError = true;			
			}
			
			if(this.perfil.edad_usuario == null || this.perfil.edad_usuario === '' ){
				this.errors.edad_usuario= 'No se edito la edad';
				hasError = true;			
			}
			
			return !hasError;
		}
	},
	mounted() {
		this.logUser();
		if(this.auth.user.id === null){
			this.$router.push('/login');
		}
		this.loadPerfil();
		this.loadPaises();
	}

}
</script>