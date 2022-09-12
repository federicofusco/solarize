// Imports hooks
import { useState, useEffect } from "react";
import useGeo from "./../../../hooks/geolocation";
import useLogging from "./../../../hooks/logging";

// Imports components
import GenericSidebar from "./GenericSidebar";
import SidebarDateRange from "./SidebarDateRange";
import Button from "./../../Button";
import dynamic from "next/dynamic";

/**
 * Displays a sidebar which allows to user to edit chart parameters
 * 
 * @param visible - Whether or not the sidebar should be visible
 * @param toggleSidebar - The callback which is ran whenever the user clicks the close menu button
 * @param onUpdate - The callback which is ran whenever the chart's parameters are updated 
 * @returns A sidebar
 */
const ChartSidebar = ({ visible, toggleSidebar, onUpdate }) => {

	const SidebarMap = dynamic (() => import ( "./SidebarMap" ), {
		ssr: false 
	});

	const [position, setPosition] = useState ( null );
	const [startDate, setStartDate] = useState ( new Date () );
	const [endDate, setEndDate] = useState ( null );
	
	const { getPosition, setChartCoords, transformFromLocalStorage } = useGeo ();
	const { logError } = useLogging ();

	useEffect (() => {
		getPosition ()
			.then ( result => {
				setPosition ([result.data[0], result.data[1]]);
			})
			.catch ( error => {
				logError ({
					code: "chart/position-denied",
					message: "Failed to geolocate user",
					data: error
				});
			});
	}, []);

	return (
		<GenericSidebar
			title="Chart Data"
			visible={ visible }
			toggleSidebar={ toggleSidebar }>
			<>
				<h2 className="font-poppins text-xl font-semibold mb-2">Position</h2>
				{ position && <SidebarMap 
					position={ position }
					onDrag={( coords ) => {
						setChartCoords ( coords );
						setPosition ( transformFromLocalStorage ( coords ) );
					}} /> }

				<h2 className="font-poppins text-xl font-semibold mb-2 mt-4">Date</h2>

				{/* Start Date */}
				<SidebarDateRange label="Start Date" onUpdate={ setStartDate } />

				{/* End Date */}
				<SidebarDateRange label="End Date" onUpdate={ setEndDate } />

				<Button text="Update" disabled={ !position || !startDate || !endDate } onClick={() => onUpdate ( position, startDate, endDate ) } />
			</>
		</GenericSidebar>
	)
}

export default ChartSidebar;