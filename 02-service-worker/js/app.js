
//Comprobamos si el navegador puede utilizar el SW
/* if ( navigator.serviceWorker ) {
    console.log( 'Podemos utilizar el SW' )
} */


if( navigator.serviceWorker ) {
    navigator.serviceWorker.register( '../sw.js' );
}