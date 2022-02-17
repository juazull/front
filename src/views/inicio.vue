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
						</div>
					</div>	
							<ul class="panel-activity__list">
								<li v-for="posteo in posteos" :key="posteo.id_posteo">								
									<!--<div class="activity__list__header">
																			<img src={{posteo.usuario.foto}} alt={{posteo.usuario.foto}} /> 
										<a v-bind:href="'#/posteo/'+posteo.id_posteo">{{posteo.titulo_posteo}}</a>
																				<a v-bind:href="'#/posteo'">{{posteo.titulo_posteo}}</a> 
									</div>
									<div class="activity__list__body entry-content">{{posteo.texto_posteo}}</div>
									<div class="activity__list__footer">
										<a href="#">Likes {{posteo.likes}}</a> <a href="#">Comentarios</a> <span>{{posteo.fecha}}</span>
									</div>-->

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
														<img :src="posteo.imagen_usuario" alt="Foto de " width="35" align="left"/>
														<h5 class="card-title" style="padding-left:50px; padding-top:5px">{{posteo.nombre_usuario}} {{posteo.apellido_usuario}}</h5>
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
								</li>
							</ul>						
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	//import {apiFetch} from "../functions/fetch.js";
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