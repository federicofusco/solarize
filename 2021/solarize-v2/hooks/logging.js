import { useSnackbar } from "notistack";

/**
 * A hook to render logging and debugging easier and more streamline
 * @version 0.0.1
 */
const useLogging = () => {

	const { enqueueSnackbar } = useSnackbar ();

	/**
     * Sends an success message to the console
     * 
     * @param data - An object containing the data which should be logged
     * @param callback - The function which should execute when the data has been logged
	 * @param displayNotification - Whether or not to display the notification to the user 
     * @example 
     * logInfo ({
     *   code: "auth/user-authenticated",
     *   message: "User friendly success message"
     * }, resolve);
     */
	const logInfo = ( data, callback, displayNotification = true ) => {
		console.info ( `[${ data.code }]: ${ data.message }` );

		if ( callback ) {
			callback ( data );
		}

		if ( displayNotification ) {
			enqueueSnackbar ( data.message, {
				variant: "info"
			});
		}
	}

	/**
     * Sends an error message to the console
     * 
     * @param data - An object containing the data which should be logged
     * @param callback - The function which should execute when the data has been logged
	 * @param displayNotification - Whether or not to display the notification to the user 
     * @example 
     * logError ({
     *   code: "auth/user-unauthenticated",
     *   message: "User friendly error message"
     * }, reject);
     */
	 const logError = ( data, callback, displayNotification = true ) => {
        console.warn ( `[${ data.code }]: ${ data.message }` );

        if ( callback ) {
			callback ( data );
		}

		if ( displayNotification ) {
			enqueueSnackbar ( data.message, {
				variant: "error"
			});
		}
    }

	return {
		logInfo,
		logError
	}
}

export default useLogging;