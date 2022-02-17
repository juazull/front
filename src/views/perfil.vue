<template>
	<div class="container algo">
		<div class="container mt-4">
			<div class="row d-flex justify-content-center">
				<div class="col-md-8">
					<div class="card p-3 py-6">
						<div class="col-sm-12">
							<div class="pull-left image">
								<!-- 								<img src="../assets/img/juan.jpg" class="img-perfil" alt="Foto de Juan Manuel Zullo"> -->
							</div>
						</div>
						<div class="col-sm-12">
							<div class="text-center">
								<h1>{{perfil.nombre_usuario}} {{perfil.apellido_usuario}}</h1>
								<p>Pais: {{pais}}</p>
								<p>Edad: {{perfil.edad_Usuario}} años</p>
								<p>{{auth.user.email}}</p>
								<div class="buttons">
									<button class="btn btn-verde" v-on:click="irEditarPerfil">Editar Perfil</button>
								</div>
							</div>
						</div>
					</div>
					<div class="caja2">
						<div class="card p-3 py-6">
							<div class="panel-heading">
								<h2 class="panel-title">Publicaciones</h2>
							</div>
							<div class="panel-content panel-activity">
								<div class="actions">
									<button class="btn btn-verde" v-on:click="irCrearPublicacion">Publicar posteo</button>
								</div>
							</div>
						</div>

						<ul class="panel-activity__list">
							<li v-for="posteo in posteos" :key="posteo.id">
								<div class="card p-3 py-6">
									<div class="card-header">
										<img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/1336.png" alt="Foto de " width="35" align="left"/>
										<h5 class="card-title" style="padding-left:50px; padding-top:5px">Juan ...</h5>
									</div>
									<div class="card-body">
										<h5 class="card-title">
											<a v-bind:href="'#/posteo/'+posteo.id_posteo">{{posteo.titulo_posteo}}</a>
										</h5>
										<p>{{posteo.texto_posteo}}</p>
										<div class="activity_list_footer">
											<a href="#">Likes {{posteo.likes}}</a> <a href="#">Comentarios</a> <span>{{posteo.fecha}}</span>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import authService from "../services/auth.js";
import {API_IMGS_FOLDER} from "../constants/api.js";
import perfiles from "../functions/perfiles.js";
import posteos from "../functions/publicaciones.js";

export default {
	name: 'perfil',
	data(){
		return {
			perfil:{
				nombre_usuario: null,
				apellido_usuario: null,
				pais_usuario: null,
				edad_usuario: null
			},
			posteos:[],
			errors:{
				nombre_usuario: null,
				apellido_usuario: null,
				pais_usuario: null,
				edad_usuario: null
			},
			auth: {
				user: {
					id: null,
					email: null,
					usuario: null,
				},
			},
			pais : '',
			loading: false,
			notification: {text:null,type:'success'},
			datos: []
		}
	},
	methods: {
		logUser() {
			this.auth.user = authService.getUserData();
		},
		imageUrl(image) {
			return `${API_IMGS_FOLDER}/${image}`;
		},
		irEditarPerfil() {
			this.$router.push('/editarPerfil');
		},
		irCrearPublicacion() {
			this.$router.push('/crearPublicacion');
		},
		loadPerfil() {
			perfiles.loadPerfil(this.auth.user.id).then(response => {
				this.perfil = response.data;
				this.pais = response.pais[0].nombre_pais;
			});
		},
		loadPosteos() {
			posteos.loadPosteosUsusario(this.auth.user.id).then(response => {
				this.posteos = response;
			});
		}
	},
	mounted() {
		this.logUser();
		if(this.auth.user.id === null){
			this.$router.push('/login');
		}
		
		this.loadPerfil();
		this.loadPosteos();
	}
}
</script>
