import { useState } from "react";
import useLogging from "./logging";

/**
 * Author: https://usehooks.com/useLocalStorage/
 * Modified: Federico Fusco
 * 
 * A hook for handling local storage
 * 
 * @param {String} key - The localStorage key
 * @param {String} initialValue - The state's initial value
 * @returns A persistent state
 */
 const useLocalStorage = ( key, initialValue ) => {

	 const { useError } = useLogging ();

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState (() => {
		if ( typeof window === "undefined" ) {
			return initialValue;
		}

		try {
			// Get from local storage by key
			const item = window.localStorage.getItem ( key );

			// Parse stored json or if none return initialValue
			return item ? JSON.parse ( item ) : initialValue;
		} catch ( error ) {

			// If error also return initialValue
			logError ({
				code: "storage/read-failed",
				message: `Failed to read data from localStorage`,
				data: error
			});

			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = ( value ) => {
		try {

			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value ( storedValue ) : value;

			// Save state
			setStoredValue ( valueToStore );

			// Save to local storage
			if ( typeof window !== "undefined" ) {
				window.localStorage.setItem ( key, JSON.stringify ( valueToStore ) );
			}
		} catch ( error ) {
			useError ({
				code: "storage/write-failed",
				message: "Failed to write data to localStorage"
			}, console.warn ( "Data: ", valueToStore ) );
		}
	};

	return [storedValue, setValue];
}

export default useLocalStorage;