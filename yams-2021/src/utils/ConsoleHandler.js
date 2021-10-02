/**
 * A util to render logging and debugging easier and more streamline
 * @version 0.0.1
 */
const ConsoleHandler = {

    /**
     * Sends an success message to the console
     * 
     * @param {object} data An object containing the data which should be logged
     * @param {function} callback The function which should execute when the data has been logged
     * @example 
     * ConsoleHandler.Info ({
     *   code: "auth/user-authenticated",
     *   message: "User friendly success message"
     * }, resolve);
     */
    Info: ( data, callback ) => {

        console.info ( `[${ data.code }]: ${ data.message }` );
        callback ( data );

    },

    /**
     * Sends an error message to the console
     * 
     * @param {object} data An object containing the data which should be logged
     * @param {function} callback The function which should execute when the data has been logged
     * @example 
     * ConsoleHandler.Error ({
     *   code: "auth/user-unauthenticated",
     *   message: "User friendly error message"
     * }, reject);
     */
    Error: ( data, callback ) => {

        console.warn ( `[${ data.code }]: ${ data.message }` );
        callback ( data );

    }

}

export default ConsoleHandler;