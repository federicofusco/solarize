// Imports utils
import ConsoleHandler from "./ConsoleHandler";

/**
 * A util to handler all geolocation related methods
 * @version 0.0.1
 */
const geolocation = navigator.geolocation;
const GeoHandler = {

    GetPosition: () => {
        return new Promise ( ( resolve, reject ) => {

            if ( !localStorage.getItem ( "position" ) ) {

                // Attemps to fetch the user's current location
                geolocation.getCurrentPosition ( ( coords ) => {

                    // Caches position
                    localStorage.setItem ( "position", JSON.stringify({
                        coords: {
                            latitude: coords.coords.latitude,
                            longitude: coords.coords.longitude
                        }
                    }));

                    ConsoleHandler.Info ({
                        code: "geo/coords-fetched",
                        message: "Fetched user's location",
                        data: coords
                    }, resolve);

                }, ( error ) => {

                    ConsoleHandler.Error ({
                        code: "geo/coords-not-fetched",
                        message: "Failed to fetch user's location\nUser probably didn't give permission"
                    }, reject);

                }, {
                    enableHighAccuracy: true
                });

            } else {

                ConsoleHandler.Info ({
                    code: "geo/coords-fetched",
                    message: "Fetched user's location",
                    data: JSON.parse ( localStorage.getItem ( "position" ) )
                }, resolve);

            }

        });
    }

}

export default GeoHandler;