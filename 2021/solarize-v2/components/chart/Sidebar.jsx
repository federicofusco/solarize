// Imports components
import CoreSidebar from "./../nav/Sidebar";
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

	const Map = dynamic (() => import ( "./input/Map" ), {
		ssr: false 
	});

	return (
		<CoreSidebar
			title="Chart"
			visible={ visible }
			toggleSidebar={ toggleSidebar }>
				<Map onUpdate={ onUpdate} /> 
		</CoreSidebar>
	)
}

export default Sidebar;