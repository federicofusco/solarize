// Imports hooks
import { useState } from "react";


// Imports components
import Sidebar from "./Sidebar";
import "chart.js/auto";
import { Chart as ReactChart } from "react-chartjs-2";

/**
 * A chart which displays data from a given API
 * 
 * @param data - The data which should be displayed on a chart. See chart.js on NPM
 * @param onUpdate - The callback which is called when the chart's parameters are updated by the user
 * @param parameter - The parameter which should be given to the API 
 * @returns A chart
 */
const Chart = ({ data, onUpdate, parameter }) => {

	// Whether or not the chart's sidebar are visible
    const [sidebarVisible, setSidebarVisibility] = useState ( false );

	/**
	 * Called when the user changes the chart's parameters
	 */
    const updateParameters = ( position, startDate, endDate ) => {
        onUpdate ( 
            position[1], 
            position[0],
            `${ startDate["$d"].getFullYear () }${ String ( startDate["$d"].getMonth () + 1 ).padStart ( 2, "0" ) }${ String ( startDate["$d"].getDate () ).padStart ( 2, "0" ) }`,
            `${ endDate["$d"].getFullYear () }${ String ( endDate["$d"].getMonth () + 1 ).padStart ( 2, "0" ) }${ String ( endDate["$d"].getDate () ).padStart ( 2, "0" ) }`,
            parameter
        );
    }

	/**
	 * Toggles the visibility of the chart's sidebar
	 */
    const toggleSidebar = () => {
        setSidebarVisibility ( !sidebarVisible );
    }

    return (
        <div className="w-full px-4 my-8">
            <div className="relative w-full p-2 bg-gray-200 bg-opacity-30 rounded-lg">

				{/* Sidebar icon */}
				<div onClick={ toggleSidebar } className="absolute top-2 right-5">
					<i aria-hidden className="text-lg text-gray-700 fas fa-ellipsis"></i>
				</div>


				<Sidebar 
					visible={ sidebarVisible } 
					toggleSidebar={ toggleSidebar }
					onUpdate={ updateParameters } />

				{/* The actual chart */}
                <ReactChart type="line" data={ data.config } options={ data.options } />

            </div>
        </div>
    )

}

export default Chart;