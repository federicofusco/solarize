// Imports Hooks
import { useEffect, useState } from "react";
import useChart from "./../../hooks/chart";
import useLogging from "../../hooks/logging";

// Imports components
import MenuSidebar from "../nav/sidebar/MenuSidebar";
import Navbar from "../nav/Navbar";
import Chart from "../Chart";
import Head from "next/head";

const DataPage = ({ parameter, xAxis, yAxis, title, description }) => {

	const { fetchChartData } = useChart ();
	const { logError } = useLogging ();

	const [sidebarVisible, setSidebarVisibility] = useState ( false );
	const [chartData, setChartData] = useState ( null );
	
	/**
	 * Toggles the menu's visibility by updating the 
	 * menuVisible state
	 */
	const toggleSidebar = () => setSidebarVisibility ( !sidebarVisible );

	const updateChart = ( longitude, latitude, start, end, parameter ) => {

		fetchChartData ( setChartData, parameter, xAxis, yAxis, longitude, latitude, start, end )
			.catch ( error => {
				logError ({
					code: "index/update-failed",
					message: "Failed to fetch data",
					data: error				
				});
			});
    }

	// Fetches data from the API
	useEffect (() => {
		fetchChartData ( setChartData, parameter, xAxis, yAxis )
			.catch ( error => {
				logError ({
					code: "index/fetch-failed",
					message: "Failed to fetch data",
					data: error
				});
			});
	}, []);

	return (
		<div className="w-full h-full pb-8">

			<Head>
				<title>{ title } - Solarize</title>
			</Head>

			<MenuSidebar visible={ sidebarVisible } toggleSidebar={ toggleSidebar } />

			<Navbar toggleSidebar={ toggleSidebar } />

			{ !chartData &&
				<div className="w-full px-4 my-8">
					<div className="w-full py-8 bg-gray-200 bg-opacity-30 rounded-lg flex justify-center">
						<p>Loading . . .</p>
					</div>
				</div>
			}

			{ chartData &&
				<Chart 
					data={ chartData }
					onUpdate={ updateChart } 
					maximized={ false } 
					parameter={ parameter } />
			}

			{ description }

		</div>
	)
}

export default DataPage;