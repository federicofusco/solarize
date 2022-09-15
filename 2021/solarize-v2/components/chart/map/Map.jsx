// Imports components
import Container from "./Container"; 

// Imports hooks
import useGeo from "../../../hooks/geolocation";
import useLogging from "../../../hooks/logging";
import { useEffect, useState } from "react";

/**
 * Displays a map which can be used to select a position
 * 
 * @param position - The map's original position
 * @param onDrag - The callback which is called when the user changes the map's position
 * @returns A map
 */
const Map = () => {

	const [position, setPosition] = useState ([45, 13]);
	const { getPosition } = useGeo ();
	const { logError } = useLogging ();
	
	// Fetches the user's selected position
	useEffect (() => {
		getPosition ()
			.then ( result => {
				setPosition ([result.data[0], result.data[1]]);
			})
			.catch ( error => {
				logError ({
					code: "chart/position-denied",
					message: "Something went wrong! Is geolocation enabled?",
					data: error
				}, null, true );
			});
	}, []);

	return (
		<>
			<h2 className="font-poppins text-xl font-semibold mb-2">Position</h2>
			<Container position={ position } />
		</>
	)
}

export default Map;