<template>
    <div class="container">
      <div class="container mt-2">
        <div class="row d-flex justify-content-center">
          <div class="col-md-8">
            <div class="card p-3 py-6">
              <div class="d-flex justify-content-center">
                <div class="brand_logo_container">
                  <img src="../assets/img/logo.png" class="brand_logo" alt="Logo de Millchat"/>
                </div>
              </div>
              <h1 class="panel-title2">Crear Usuario</h1>
              <div>
                <form action="#" method="POST" @submit.prevent="crearUsuario">
                  <div class="form-group">
                    <label>Email:</label>
                    <input v-model="usuario.email_usuario" type="text" name="usuario" class="form-control input_user"  placeholder="email"/>
                  </div>

                  <div  class="form-group">
                    <label>Contraseña:</label>
                    <input v-model="usuario.password_usuario" type="password" name="password"  class="form-control input_pass" placeholder="Contraseña"/>
                  </div>

                  <div class="form-group">
                    <label>Repetir Contraseña:</label>
                    <input v-model="usuario.password2_usuario" type="password" name="password"  class="form-control input_pass" placeholder="Repetir Contraseña"/>
                  </div>

                  <div class="form-group">
                    <button id="login" class="btn btn-lg btn-verde btn-block" ><i class="nav-item"></i>Crear Usuario</button>
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
import usuarios from "../functions/usuarios.js";

export default {
	name: 'crearUsuario',
	data(){
        return {
            usuario:{
                email_usuario: null,
                password_usuario: null,
                password2_usuario: null
            },

            errors:{
                email_usuario: null,
                password_usuario: null,
                password2_usuario: null
            },

            loading: false,
            notification: {text:null,type:'success'}
        }
	}, 
	
	methods: {
        crearUsuario(){
            if(this.loading) return;
            if(!this.validates()) return;
            this.loading = true;

            this.loading = true;
			usuarios.crearUsuario(this.usuario.email_usuario, this.usuario.password_usuario)
			.then(data => {
				this.loading = false;
				this.perfil = data.data;

				this.$router.push('/login');
			});
        },
        validates(){
            let hasError = false;
            
            if(this.usuario.email_usuario == null || this.usuario.email_usuario === '' ){
                this.errors.email_usuario= 'No se encontro ningun email';
                hasError = true;            
            }

            if(this.usuario.password_usuario == null || this.usuario.password_usuario === '' ){
                this.errors.password_usuario= 'No escribio ninguna contrase�a';
                hasError = true;            
            }       

            if(this.usuario.password2_usuario == null || this.usuario.password2_usuario === '' ){
                this.errors.password2_usuario= 'No escribio de nuevo la contrase�a';
                hasError = true;            
            }   
            if(this.usuario.password2_usuario !=  this.usuario.password_usuario){
                this.errors.password2_usuario= 'Contraseñas distintas';
                hasError = true;            
            }      
             return !hasError;
        }
	}
	
}
</script>
