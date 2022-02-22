<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Millchat</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Abrir/cerrar menú de navegación">
            <span class="navbar-toggler-icon"></span>
        </button>
       <div class="collapse navbar-collapse" id="navbar">
            <ul class="navbar-nav" v-if="auth.user.id != null">
                
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/perfil"> Perfil</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/editarperfil">Editar Perfil</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/crearpublicacion">Crear Publicacion</router-link>
                </li>

                <li class="nav-item">
                    <button class="btn nav-link" @click="logout">
                        {{ auth.user.email }} (Cerrar Sesión)
                    </button>
                </li>
            
            </ul>

            <ul class="navbar-nav" v-else-if="auth.user.id === null">

                <li v-if="auth.user.id === null" class="nav-item">
                    <router-link class="nav-link" to="/login">Iniciar Sesión</router-link>
                </li>

            </ul>

        </div>
    </nav>

    <router-view
        @logged="logUser"
    ></router-view>

<footer id="footer" class="footer">
<p>&copy; Derechos de autor de JMZ - 2021</p>
</footer>

</template>

<script>
import authService from "./services/auth.js";

export default {
    data() {
        return {
            auth: {
                user: {
                    id: null,
                    email: null,
                    usuario: null,
                },
            }
        }
    },
    methods: {
        logUser() {
            this.auth.user = authService.getUserData();
        },
        logout() {
            // TODO: Hacer que el logout realmente elimine la cookie.
            // TODO: Hacer que tanto front como back verifiquen que el usuario esté autenticado.
            authService.logout();
            
            this.auth.user = {
                id: null,
                email: null,
                usuario: null,
            }
            this.$router.push('/login');
        }
    },
	mounted(){
        this.logUser();

		if(this.auth.user.id === null){
			this.$router.push('/login');
		}
	}
};
</script>

<style lang="scss">
#footer {
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
    background-color: #333;
    color: #fff;
}

#footer p {
    margin: 0;
    text-align: center;
}
</style>
