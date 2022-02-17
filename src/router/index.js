import { createRouter, createWebHashHistory } from 'vue-router'
import inicio from '../views/inicio.vue';
import login from "../views/login.vue";
import crearUsuario from '../views/crearUsuario.vue';
import perfil from '../views/perfil.vue';
import editarPerfil from '../views/editarPerfil.vue';
import posteo from '../views/posteo.vue';
import crearPublicacion from '../views/crearPublicacion.vue';
import authService from "../services/auth.js";

const routes = [
	{
		path: '/',
		//name: 'Home',
		//component: Home
		component: inicio
	},
	{
		path: '/login',
		name: 'acceso',
		component: login
	},
	{
		path: '/crearUsuario',
		component: crearUsuario
	},
	{
		path: '/perfil',
		component: perfil
	},
	{
		path: '/editarPerfil',
		name: 'Editar el perfil',
		component: editarPerfil
	},
	{
		path: '/crearPublicacion',
		name: 'Crear publicacion',
		component: crearPublicacion
	},
	{
		path: '/posteo/:id',
		name: 'Posteo',
		component: posteo,
	}

	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	linkActiveClass: 'active'
})

// Agregamos un "guard" de navegación para aplicar el chequeo de la autenticación antes de que se
// ejecute una ruta. Esto se logra usando el método beforeEach() del router.
// Este método recibe un callback con dos parámetros: La ruta destino, la ruta origen.
router.beforeEach((to) => {
	// console.log("Ejecutando el beforeEach");
	// Preguntamos si la ruta a la que queremos entrar requiere que el usuario esté autenticado.
	// De requerirlo, entonces vamos a consultar con el servicio de autenticación si el usuario está,
	// en efecto, autenticado. De no estarlo, lo mandamos al login.
	if (to.meta.requiresAuth && !authService.isAuthenticated()) {
		// Retornamos un objeto con los datos de la ruta a la que queremos redireccionar.
		return {
			path: '/login'
		};
	}
});
export default router
