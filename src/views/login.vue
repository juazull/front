<template>
	<div class="container">
		<div class="container mt-4">
			<div class="row d-flex justify-content-center">
				<div class="col-md-8">
					<div class="card p-3 py-6">
						<div class="d-flex justify-content-center">
							<div class="brand_logo_container">
								<img src="../assets/img/logo.png" class="brand_logo" alt="Logo de Millchat" />
							</div>
						</div>
						<h1 class="panel-title2">Iniciar Sesion</h1>
						<div>
							<form action="#" method="POST" @submit.prevent="login">

								<div v-if="showError">
									<div class="alert alert-warning" role="alert">
										<div v-for="error in errors">
											{{ error }}
										</div>                 
									</div>
								</div>

								<div class="form-group">
									<label for="email">Email:</label>
									<input v-model="user.usuario" type="text" id="email" class="form-control input_user" placeholder="Email" />
								</div>
								<div class="form-group">
									<label for="password">Contraseña:</label>
									<input v-model="user.password" type="password" id="password" class="form-control input_pass" placeholder="***********" />
								</div>
								<div class="form-group">
									<button type="submit" class="btn btn-lg btn-verde btn-block">Ingresar</button>
								</div>
								<div class="d-flex justify-content-center links">
									¿No tenes usuario? <a href="/#/crearusuario" class="ml-2">Registrate</a>
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

// import {apiFetch} from "../functions/fetch.js";
import authService from "../services/auth.js";

export default {
    name: "Login",
    emits: ['logged'],
    data() {
        return {
            user: {
                usuario: null,
                password: null				
            },
            loading: false,
            notification: {
                text: null,
                type: 'success',
            }, 
			errors: [], 
			showError: false
			
        };
    },
	methods: {
        login() {
            // TODO: Validar el form...
            this.loading = true;
			
			if(!this.validates()){
				authService
                .login(this.user.usuario, this.user.password)
                .then(response => {
                    this.loading = false;
                    if(response.success) {
                        this.$emit('logged', response);

						this.$router.push('/perfil');
                    } else {
						this.errors.push('Usuario no encontrado');
						this.showError = true;
					}
                }
                );
			}
            
        },
		
		validates(){
			this.errors=[];
			this.showError= false;            
            
            if(this.user.usuario == null || this.user.usuario === '' ){
                this.errors.push ('Por favor ingrese un email');
                this.showError= true;
                       
            }

			if(this.user.password == null || this.user.password === '' ){
                this.errors.push ('Por favor ingrese una contraseña');
                this.showError= true;                       
            }
			return this.showError

		},

		logUser(){
			this.user = authService.getUserData();
		}
    },

	mounted(){
		this.logUser();
		
		if(this.user.id !== null){
			this.$router.push('/perfil');
		}
	}
};
</script>
