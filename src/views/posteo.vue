<template>
	<div class="container">
		<div class="container mt-4">
			<div class="row d-flex justify-content-center">
				<div class="col-md-8">
					<div class="card p-3 py-6">
						<div class="d-flex flex-column ml-3">
							<div class="pull-left image">
<!-- 								<img src="../assets/img/juan.jpg" class="img-perfil" alt="Foto de Juan Manuel Zullo"> -->
							</div>
							<div class="d-flex flex-row post-title">
								<h1>{{this.posteo.titulo_posteo}}</h1>
							</div>
							<div class="post-description">
								<p>{{this.posteo.texto_posteo}}</p>
                <p>{{this.posteo.usuario_posteo}}</p>
								<div class="activity__list__footer">
									<a href="#">Likes {{posteo.likes}}</a> <a href="#">Comentarios</a> <span>{{posteo.fecha}}</span>
								</div>
							</div>
						</div>
						<form action="#" class="panel-activity__status" @submit.prevent="crearComentario">
							<div class="d-flex flex-row add-comment-section mt-4 mb-4">
<!-- 								<img class="img-fluid img-responsive mr-2" src="../assets/img/pepino.jpg" width="38"> -->
								<label class="sr-only">Comentario</label>
								<input v-model="comentario.comentario" type="text" class="form-control mr-3" placeholder="Escribe un comentario">
								<button class="btn btn-verde" type="submit">Comentar</button>
							</div>
						</form>
						<ul>
							<li v-for="comentario in comnet" :key="comentario.id">
								<div class="activity__list__header">
<!-- 									<img src="../assets/img/profesor.jpg" alt="Foto de Profesor Davinci" />  -->
									<a href="#">{{comentario.nombre_usuario}}</a>
								</div>
								<div class="activity__list__body entry-content">
									<p>{{comentario.comentario}}</p>
								</div>
								<div class="activity__list__footer">
									<span>{{comentario.fecha}}</span>
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
// @ is an alias to /src
import comentarios from "../functions/comentarios.js";
import posteos from "../functions/publicaciones.js";
import authService from "../services/auth.js";
import {API_IMGS_FOLDER} from "../constants/api.js";


export default {
    name: 'posteo',
    data(){
        return {
            comentario:{
                comentario: null,
                id_posteo: null,
                fecha:null,
                id_usuario: null,
                nombre_usuario: null,
                foto_usuario: null
            },
			posteo:{
				id_posteo: null,
				titulo_posteo: null,
				imagen_posteo: null,
				texto_posteo: null,
				usuario_posteo: null,
        nombre_usuario_posteo:null,
				fecha: null,
				contador_likes: 0
			},
			auth: {
				user: {
					id: null,
					email: null,
					usuario: null,
				},
			},
            errors:{
                comentario: null,
                id_posteo: null,
                fecha:null,
                id_usuario: null
            },
            comnet: [],
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
        crearComentario(){
            if(this.loading) return;
//             if(!this.validates()) return;
            this.loading = true;

            comentarios.crearComentario(this.comentario). then (rta => {
                this.loading = false;
                if(rta.success){
					this.$router.push('/');
                }
            })
        },
        traerPosteo(){
			this.loading = true;
			
			posteos.loadPosteo(this.$route.params.id).then(posteo => {
				this.loading = false;
				this.posteo = posteo.data;


			});
			
			
        },
		loadComentarios() {
			comentarios.loadComentarios(this.$route.params.id).then(coment => {
				this.comnet = coment.data;
			});
		}
    }, 
    validates(){
        let hasError = false;

        if(this.comentario.comentario == null || this.comentario.comentario === '' ){
            this.errors.comentario= 'No se escribio ningun comentario';
            hasError = true;           
        }
         return !hasError;
    },
	mounted() {
		this.logUser();
		if(this.auth.user.id === null){
			this.$router.push('/login');
		}
		this.traerPosteo();
		this.loadComentarios();
		
		this.comentario.id_posteo = this.$route.params.id;
		this.comentario.id_usuario = this.auth.user.id;
	}
}
</script>
