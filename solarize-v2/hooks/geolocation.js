import useLogging from "./logging";
import useLocalStorage from "./localStorage";

/**
 * A util to handler all geolocation related methods
 * @version 0.0.1
 */
const useGeo = () => {

	const { logInfo, logError } = useLogging ();
	const [userPosition, setUserPosition] = useLocalStorage ( "userPosition", undefined );
	const [chartPosition, setChartPosition] = useLocalStorage ( "chartPosition", undefined );

	const transformFromLocalStorage = ( position ) => {
		const _coords = typeof position === "string" ? JSON.parse ( position ).coords : position.coords;
		const coords = [_coords.latitude, _coords.longitude];

		return coords;
	}

	/**
	 * Gets the user's current latitude and longitude 
	 * (if the user gives the necessary permissions)
	 * 
	 * @returns A promise
	 */
	const getPosition = () => {
		return new Promise ( ( resolve, reject ) => {
			
			if ( typeof window === "undefined" ) {
				logError ({ 
					code: "geo/server-side-hook",
					message: "Attempted to run geolocation hook on server-side"
				}, reject );
			}

			const geolocation = navigator.geolocation;

			// Checks if the user has already specified a specific position for chart data
			if ( !chartPosition ) {

				// Checks if the user's position has already been cached
				if ( !userPosition ) {

					// Attemps to fetch the user's current location
					geolocation.getCurrentPosition ( ( coords ) => {

						// Caches position
						setUserPosition ( JSON.stringify({
							coords: {
								latitude: coords.coords.latitude,
								longitude: coords.coords.longitude
							}
						}) );

						logInfo ({
							code: "geo/coords-fetched",
							message: "Fetched user's location",
							data: transformFromLocalStorage ( coords )
						}, resolve );

					}, ( error ) => {

						logError ({
							code: "geo/coords-not-fetched",
							message: "Failed to fetch user's location\nUser probably didn't give permission",
							data: error
						}, reject );

					}, {
						enableHighAccuracy: true
					});

				} else {
					logInfo ({
						code: "geo/fetched-user-coords",
						message: "User\'s coordinates have already been cached",
						data: transformFromLocalStorage ( userPosition )
					}, resolve );
				}

			} else {
				logInfo ({
					code: "geo/fetched-chart-coords",
					message: "User has already specified specific coordinates",
					data: transformFromLocalStorage ( chartPosition )
				}, resolve );
			}
        });
	}

	const setChartCoords = ( coords ) => {
		setChartPosition ( JSON.stringify({
			coords: {
				latitude: coords.coords.latitude,
				longitude: coords.coords.longitude
			}
		}) );
	}

	return {
		getPosition,
		setChartCoords,
		transformFromLocalStorage
	}

}

export default useGeo;