

//imports
importScripts( 'js/sw-utils.js' );

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

//Primero vamos viendo que forma parte del shell de mi aplicación, que es lo que no va a cambiar,  empiezo desde arriba hasta abajo


const APP_SHELL = [
        '/',
        '/index.html',
        'css/style.css',
        'img/favicon.ico',
        'img/avatars/hulk.jpg',
        'img/avatars/ironman.jpg',
        'img/avatars/spiderman.jpg',
        'img/avatars/thor.jpg',
        'img/avatars/wolverine.jpg',
        'js/app.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

//Empezamos creando los contenidos de los caches
self.addEventListener( 'install' , e => {

    const cacheStatic = caches.open( STATIC_CACHE ).then( cache => cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then( cache => cache.addAll( APP_SHELL_INMUTABLE ));
    
    e.waitUntil( Promise.all ([ cacheStatic, cacheInmutable ]));

});

//Evento para borrar los caches antiguos
self.addEventListener( 'activate' , e => {

    const respuesta = caches.keys().then( keys => {
        keys.forEach( key => {
            if( key !== STATIC_CACHE && key.includes( 'static') ) {
                return caches.delete( key );
            }
        });
    });

    e.waitUntil( respuesta );
});

//Cache con Network Fallback
self.addEventListener( 'fetch', e => {

    const respuesta = caches.match( e.request ).then( res => {
        if ( res ) {
            return res;
        } else {
            //console.log( e.request.url );
            //Vemos que no se descargar las fuentes por lo tanto lo tenemos que añadir al cache
            return fetch( e.request ).then( newResp => {
                //Llegados aquí creamos una nuevo archivo SW para que no se haga esté más grande y lo llamamos sw-utils
                //Tengo que hacer una refencia a sw-utils para que reconozca está función
                return actualizarCacheDinamico( DYNAMIC_CACHE, e.request, newResp );
                //Esta aplicación tiene un problema y es que el font-awesome se añade al seleccionar un personaje por lo tanto si el usuario se descargará la aplicación y después la usara en modo offline no se verían los iconos, la solución es añadirle un font awesome al inicio, al index.html.
            });
        }

    })



    e.respondWith( respuesta );

});