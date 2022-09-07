// Creates Express server
const express = require ( "express" );
const app = express ();

// Imports Axios
// Used to make requests to other servers
const Axios = require ( "axios" ).default;

// Express middleware
app.use ( express.json () );
app.use ( ( _, response, next ) => {

    // Sets up CORS Proxy
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, Set-Cookie, *');
	response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next ();

});

app.get ( "/proxy/:url", async ( request, response ) => {

    // Checks that the URL query param has been passed
    if ( !request.params.url ) {
        response.sendStatus ( 400 );
    }

    // Fetches data
    Axios.get ( request.params.url )
    .then ( ( result ) => {
        response.status ( 200 ).json ( result.data );
    })
    .catch ( ( error ) => {
        response.status ( error.response.status || 500 ).json ( error.response.data );
    });

});

app.listen ( 5000, () => {
	console.log ( "[ONLINE]: Proxy online at port 5000" );
});

module.exports = app;