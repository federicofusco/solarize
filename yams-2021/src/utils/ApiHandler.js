// Imports dependencies
import Papa from "papaparse";

// Imports utils
import ConsoleHandler from "./ConsoleHandler";
import GeoHandler from "./GeoHandler";

/**
 * A util to handle all API related methods
 * @version 0.0.1
 */
const ApiHandler = {

    /**
     * Fetches solar irradiance with the user's current position
     * 
     * @param {string} longitude The user's specified longitude
     * @param {string} latitude The user's specified latitude
     * @param {string} start The user's specified start date (Format "yearmonthday")
     * @param {string} end The user's specified end date (Format "yearmonthday")
     * @returns Promise
     * @example 
     * ApiHandler.FetchAllSkySurfaceShortwaveDownwardIrradiance ()
     * .then ( ( result ) => {
     * 
     *   // Fetched data
     *   // Can be accessed at result.data
     * 
     * })
     * .catch ( ( error ) => {
     * 
     *   // Failed to fetch data
     * 
     * });
     */
    FetchAllSkySurfaceShortwaveDownwardIrradiance: ( longitude, latitude, start, end ) => {
        return new Promise ( ( resolve, reject ) => {

            // Calculates the date
            const date = new Date ();
            const year = date.getUTCFullYear ();
            const month = date.getUTCMonth ().toString ().length === 1 ? `0${ date.getUTCMonth () }` : `${ date.getUTCMonth () }`;
            const day = date.getUTCDate ().toString ().length === 1 ? `0${ date.getUTCDate () }` : `${ date.getUTCDate () }`;

            if ( !longitude || !latitude ) {

                // Fetches the user's current position
                GeoHandler.GetPosition ()
                .then ( ( result ) => {

                    // Fetches the CSV file associated with those coordinates
                    // Passes through a CORS Proxy due to the fact that the API does not send 
                    // The correct headers
                    fetch ( `https://cors.bridged.cc/https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${ result.data.coords.longitude}&latitude=${ result.data.coords.latitude }&start=${ start || `${ year - 1 }${ month }${ day }` }&end=${ end || `${ year }${ month }${ day }` }&format=CSV` )
                    .then ( ( response ) => response.text () )
                    .then ( ( csvData ) => {

                        // Parses the CSV data into JSON
                        const data = Papa.parse ( csvData, {});

                        if ( data.errors.length > 0 ) {

                            ConsoleHandler.Error ({
                                code: "api/parse-failed",
                                message: "Failed to parse response into JSON"
                            }, reject);

                        } else {

                            ConsoleHandler.Info ({
                                code: "api/fetched-successfully",
                                message: "Successfully fetched and parsed data",
                                data: data
                            }, resolve);

                        }


                    });

                })
                .catch ( () => {

                    ConsoleHandler.Error ({
                        code: "api/fetch-failed",
                        message: "Failed to fetch data due to inaccessible location data"
                    }, reject);

                });

            } else {

                // Fetches the CSV file associated with those coordinates
                // Passes through a CORS Proxy due to the fact that the API does not send 
                // The correct headers
                fetch ( `https://cors.bridged.cc/https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${ longitude}&latitude=${ latitude }&start=20210101&end=20210107&format=CSV` )
                .then ( ( response ) => response.text () )
                .then ( ( csvData ) => {

                    // Parses the CSV data into JSON
                    const data = Papa.parse ( csvData, {});

                    if ( data.errors.length > 0 ) {

                        ConsoleHandler.Error ({
                            code: "api/parse-failed",
                            message: "Failed to parse response into JSON"
                        }, reject);

                    } else {

                        ConsoleHandler.Info ({
                            code: "api/fetched-successfully",
                            message: "Successfully fetched and parsed data",
                            data: data
                        }, resolve);

                    }


                });

            }

        });
    }

}

export default ApiHandler;