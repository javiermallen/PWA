

//Guardar en el cache dinámico
function actualizarCacheDinamico( dynamicCache, req, res ) {

    if( res.ok ) {
        return caches.open( dynamicCache ).then( cache => {
            cache.put( req, res.clone() );

            return res.clone();
        });
    } else {
        //Si no retorna nada es que no funciona el cache ni la red
        return res;
    }


}