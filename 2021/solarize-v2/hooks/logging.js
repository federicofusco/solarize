/**
 * A hook to render logging and debugging easier and more streamline
 * @version 0.0.1
 */
const useLogging = () => {

	/**
     * Sends an success message to the console
     * 
     * @param {object} data An object containing the data which should be logged
     * @param {function} callback The function which should execute when the data has been logged
     * @example 
     * logInfo ({
     *   code: "auth/user-authenticated",
     *   message: "User friendly success message"
     * }, resolve);
     */
	const logInfo = ( data, callback ) => {
		console.info ( `[${ data.code }]: ${ data.message }` );
		if ( callback ) {
			callback ( data );
		}
	}

	/**
     * Sends an error message to the console
     * 
     * @param {object} data An object containing the data which should be logged
     * @param {function} callback The function which should execute when the data has been logged
     * @example 
     * logError ({
     *   code: "auth/user-unauthenticated",
     *   message: "User friendly error message"
     * }, reject);
     */
	 const logError = ( data, callback ) => {
        console.warn ( `[${ data.code }]: ${ data.message }` );
        if ( callback ) {
			callback ( data );
		}
    }

	return {
		logInfo,
		logError
	}
}

export default useLogging;