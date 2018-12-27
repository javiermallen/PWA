

///El SW controla la carpeta, por lo tanto si queremos que controle la página tiene que estar con el archivo index.html

//console.log( 'Hola Mundo 2' );

self.addEventListener( 'fetch', respuesta => {

    //console.log( respuesta )
    //respuesta.respondWith( fetch( respuesta.request) );
/*     if( respuesta.request.url.includes( 'style.css' )){
        respuesta.respondWith( null );

    } else {
        respuesta.respondWith( fetch( respuesta.request) );
    }
 */
/*     console.log( respuesta.request.url )
    console.log( respuesta.request.url.includes( '.css' ) ) */
    //8
   /*  if ( respuesta.request.url.includes( 'style.css' )){
        let cambio = new Response(`
            body {
                background: red;
                color: blue;
            }
        `,{
            headers: {
                'Content-Type': 'text/css'
            }

        })
        respuesta.respondWith ( cambio );
    }
     */
    //Tarea
    if ( respuesta.request.url.includes ( 'main.jpg' ) ){
        respuesta.respondWith( fetch( '/img/main-patas-arriba.jpg'))
    }

} )