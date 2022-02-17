// Este archivo main.js es el punto de arranque de cualquier proyecto de npm.
// Con npm basamos nuestro trabajo de desarrollo ampliamente con lo que los módulos de JS (ES6+).

// "import" es la keyword para importar código que otro archivo haya exportado.
// Hay varias formas de usarlo, que iremos mencionando a medida que las necesitemos o veamos.
// Las dos maneras más básicas de usarlo es importando el módulo "por defecto" de un archivo,
// como en los casos que vemos con "App" y "router".
// En el 'from" vemos el archivo de donde se está importando, con su respectiva ruta.
// La otra forma, es importar uno de varios elementos exportados en un archivo, indicando el nombre
// del mismo. Por ejemplo, el caso de importar la función "createApp" de "vue".

// Por último, la keyword "from" indica la proveniencia de lo que importamos.
// Puede ser una de dos cosas:
// a. El nombre de un módulo de npm que hayamos instalado (ej: 'vue').
// b. La ruta a un archivo local (ej: './App.vue').
// Si no ponemos indicación de una ruta (ej: './' para indicar directorio local), por defecto se
// asume que es un módulo de npm.
// En el caso del archivo local, puede escribirse de 3 maneras:
// 1. El nombre del archivo con su extensión. Ej: 'App.vue'
// 2. El nombre del archivo sin su extensión, siempre y cuando sea un archivo js. Ej: 'main' en vez de
//  'main.js'.
// 3. La ruta una carpeta que contenga un archivo 'index.js'. Ej: './router'.
import { createApp } from 'vue';
import App from './App.vue';
// import router from './router/index.js'; // Esto se puede abreviar como vemos abajo.
import router from './router';

// Incluimos Bootstrap del paquete de npm que instalamos :)
// import 'bootstrap'; // Esto trata de incluir TODOS los archivos de Bootstrap: Incluyendo los JS que requiere de Popperjs.
// Si solo quiero importar los estilos.
// import 'bootstrap/dist/css/bootstrap.min.css'; // Esto es equivalente al <link> de HTML.
import 'bootstrap/scss/bootstrap.scss'; // Agrega bootstrap _compilando_ el código SASS.
import './assets/css/estilos.scss';
import './assets/css/estilos.css';


// Y este es finalmente el código que arranca la aplicación.
// createApp() es la función de Vue 3, que recibe por parámetro en este caso el componente raíz
// para la app.
// Después llama al use para agregar Vue Router.
// Y finalmente, monta el proyecto en el elemento con el id app.
createApp(App).use(router).mount('#app');
