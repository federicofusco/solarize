// Imports hooks
import { useState, useEffect } from "react";
import useGeo from "../../hooks/geolocation";
import useLogging from "../../hooks/logging";

// Imports components
import CoreSidebar from "./../nav/Sidebar";
import DateRange from "./date/DateRange";
import Button from "../core/Button";
import dynamic from "next/dynamic";

/**
 * Displays a sidebar which allows to user to edit chart parameters
 * 
 * @param visible - Whether or not the sidebar should be visible
 * @param toggleSidebar - The callback which is ran whenever the user clicks the close menu button
 * @param onUpdate - The callback which is ran whenever the chart's parameters are updated 
 * @returns A sidebar
 */
const Sidebar = ({ visible, toggleSidebar, onUpdate }) => {

	const Map = dynamic (() => import ( "./map/Map" ), {
		ssr: false 
	});

	const [position, setPosition] = useState ([45, 13]);
	const startState = useState ( new Date () );
	const endState = useState ( null );
	
	// const updatePosition = _position => setPosition ( _position );

	return (
		<CoreSidebar
			title="Chart Data"
			visible={ visible }
			toggleSidebar={ toggleSidebar }>
			<>
				<Map 
					// position={ position }
					// onDrag={ updatePosition }
					// onDrag={( coords ) => {
					// 	setChartCoords ( coords );
					// 	setPosition ( transformFromLocalStorage ( coords ) );
					/* }} */ /> 


				<DateRange start={ startState } end={ endState } />

				<Button text="Update" disabled={ !position || !startState[0] || !endState[0] || ( startState[0].getTime () >= endState[0].getTime () ) } onClick={() => onUpdate ( position, startDate, endDate ) } />
			</>
		</CoreSidebar>
	)
}

export default Sidebar;