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
								<div class="form-group">
									<label class="sr-only">Email:</label>
									<input v-model="user.usuario" type="text" name="usuario" class="form-control input_user" placeholder="email" />
								</div>
								<div class="form-group">
									<label class="sr-only">Contraseña:</label>
									<input v-model="user.password" type="password" name="password" class="form-control input_pass" placeholder="***********" />
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
        };
    },
	methods: {
        login() {
            // TODO: Validar el form...
            this.loading = true;
            authService
                .login(this.user.usuario, this.user.password)
                .then(response => {
                    this.loading = false;
                    if(response.success) {
                        this.$emit('logged', response);

						this.$router.push('/perfil');
                    }
                }
                );
        }
    }
};
</script>
