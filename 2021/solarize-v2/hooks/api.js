import useLogging from "./logging";
import useGeo from "./geolocation";

/**
 * A hook to handle all API related methods
 * @version 0.0.1
 */
const useApi = () => {

	const { logError, logInfo } = useLogging ();
	const { getPosition } = useGeo ();

	/**
     * Fetches wind speed at 10 meters with the user's current position
     * 
     * @param parameters An array containing all of the parameters which should be requested (Max: 20 parameters)
     * @param longitude The user's specified longitude
     * @param latitude The user's specified latitude
     * @param start The user's specified start date (Format "yearmonthday")
     * @param end The user's specified end date (Format "yearmonthday")
     * @returns Promise
     * @example 
     * fetchApiData (["T2M"], 4.20, 6.90, null, null )
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
     const fetchApiData = ( parameters, longitude, latitude, start, end ) => {
        return new Promise ( ( resolve, reject ) => {

            // Checks if the parameters are valid
            if ( parameters.length === 0 || parameters.length > 20 ) {
                
				logError ({
                    code: "api/invalid-params",
                    message: "Invalid parameters!"
                }, reject);

            }

            // Calculates the date
            const date = new Date ();
            const year = date.getUTCFullYear ();
            const month = ( date.getUTCMonth () + 1 ).toString ().length === 1 ? `0${ date.getUTCMonth () + 1 }` : `${ date.getUTCMonth () + 1 }`;
            const day = date.getUTCDate ().toString ().length === 1 ? `0${ date.getUTCDate () }` : `${ date.getUTCDate () }`;

            if ( !longitude || !latitude ) {

                // Fetches the user's current position
                getPosition ()
					.then ( ( result ) => {
						try {

							// Fetches the CSV file associated with those coordinates
							fetch ( `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${ parameters.toString () }&community=RE&longitude=${ result.data[1] }&latitude=${ result.data[0] }&start=${ start || `${ year - 1 }${ month }${ day }` }&end=${ end || `${ year }${ month }${ day }` }&format=JSON` )
								.then ( ( response ) => response.text () )
								.then ( ( data ) => {

									logInfo ({
										code: "api/fetched-successfully",
										message: "Successfully fetched and parsed data",
										data: data
									}, resolve);

								});

						} catch ( error ) {
							logError ({
								code: "api/fetch-failed",
								message: "Failed to fetch data from API",
								data: error
							}, reject);
						}
					})
					.catch ( ( error ) => {
						logError ({
							code: "api/fetch-failed",
							message: "Failed to fetch data from API",
							data: error
						}, reject);
					});

            } else {

                // Fetches the CSV file associated with those coordinates
                // Passes through a CORS Proxy due to the fact that the API does not send 
                // The correct headers
                fetch ( `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${ parameters.toString () }&community=RE&longitude=${ longitude }&latitude=${ latitude }&start=${ start || `${ year - 1 }${ month }${ day }` }&end=${ end || `${ year }${ month }${ day }` }&format=JSON` )
					.then ( ( response ) => response.text () )
					.then ( ( data ) => {

						logInfo ({
							code: "api/fetched-successfully",
							message: "Successfully fetched and parsed data",
							data: data
						}, resolve);

					});

            }

        });
    }

	return {
		fetchApiData
	}

}

export default useApi;