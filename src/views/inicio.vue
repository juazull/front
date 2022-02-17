<template>
	<div class="container algo">
		<div class="container mt-4">
			<div class="row d-flex justify-content-center">
				<div class="col-md-8">
					<div class="card p-3 py-6">
						<div class="col-sm-12">
							<h1>Bienvenidos a Millchat</h1>
							<div class="panel-content panel-activity">
								<div class="actions">
									<button v-on:click="irCrearPublicacion" class="btn btn-verde">Publicar posteo</button>
								</div>
							</div>
							<ul class="panel-activity__list">
								<li v-for="posteo in posteos" :key="posteo.id_posteo">
									<div class="activity__list__header">
										<!-- 										<img src={{posteo.usuario.foto}} alt={{posteo.usuario.foto}} /> -->
										<a v-bind:href="'#/posteo/'+posteo.id_posteo">{{posteo.titulo_posteo}}</a>
										<!-- 										<a v-bind:href="'#/posteo'">{{posteo.titulo_posteo}}</a> -->
									</div>
									<div class="activity__list__body entry-content">{{posteo.texto_posteo}}</div>
									<div class="activity__list__footer">
										<a href="#">Likes {{posteo.likes}}</a> <a href="#">Comentarios</a> <span>{{posteo.fecha}}</span>
									</div>
								</li>
							</ul>
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
//	 import BaseNotification from "../components/BaseNotification.vue";
	import posteos from "../functions/publicaciones.js";

	export default {
		name: 'inicio',
		data(){
			return {
				
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
			loadPosteos() {
				this.loading = true;
				
				posteos.loadPosteos().then(posteo => {
					this.loading = false;
					this.posteos = posteo.data;
				});
			},
			irCrearPublicacion() {
				this.$router.push('/crearPublicacion');
			}
		},
		mounted() {
			this.logUser();
			if(this.auth.user.id === null){
				this.$router.push('/login');
			}
			
			this.loadPosteos();
		}
	}
	</script>