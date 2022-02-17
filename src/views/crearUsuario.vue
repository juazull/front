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

                <div v-if="showError">
                  <div class="alert alert-warning" role="alert">
                    <div v-for="error in errors">
                        {{ error }}
                    </div>                 
                  </div>
                </div>

                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input v-model="usuario.email_usuario" type="text" id="email" class="form-control input_user"  placeholder="Email"/>
                  </div>

                  <div  class="form-group">
                    <label for="password">Contraseña:</label>
                    <input v-model="usuario.password_usuario" type="password" id="password" class="form-control input_pass" placeholder="***********"/>
                  </div>

                  <div class="form-group">
                    <label for="password2">Repetir Contraseña:</label>
                    <input v-model="usuario.password2_usuario" type="password" id="password2"  class="form-control input_pass" placeholder="***********"/>
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

            errors: [], /*{
                email_usuario: null,
                password_usuario: null,
                password2_usuario: null
            },*/

            loading: false,
            notification: {text:null,type:'success'}, 
            showError: false

        }
	}, 
	
	methods: {
      crearUsuario(){
          //if(this.loading) return;      
          //if(!this.validates()) return;

          /*this.loading = true;*/
          this.loading = true;

          if(!this.validates()){
              usuarios.crearUsuario(this.usuario.email_usuario, this.usuario.password_usuario)
              .then(data => {
                this.loading = false;
                this.perfil = data.data;
                this.$router.push('/login');
              });
          }else{
             console.log(this.errors);
          }

          
      },
        validates(){            
          /*Seteamos las variables como nulas para borrar valores de validaciones anteriores*/
            /*this.errors.email_usuario=null;
            this.errors.password_usuario=null;
            this.errors.password2_usuario=null;*/
            this.errors=[];            
            this.showError= false; 
            
            if(this.usuario.email_usuario == null || this.usuario.email_usuario === '' ){
                this.errors.push ('No se encontro ningun email');
                this.showError= true;
                //return true;            
            }

            if(this.usuario.password_usuario == null || this.usuario.password_usuario === '' ){
                this.errors.push ('No escribio ninguna contraseña');
                this.showError= true;
                //return true;            
            }       

            if(this.usuario.password2_usuario == null || this.usuario.password2_usuario === '' ){
                this.errors.push ('No escribio de nuevo la contraseña');
                this.showError= true;
                //return true;            
            }   
            if(this.usuario.password2_usuario !=  this.usuario.password_usuario){
                this.errors.push ('Contraseñas distintas');
                this.showError= true;
               //return true;            
            }      
             return this.showError
        }
	}
	
}
</script>
