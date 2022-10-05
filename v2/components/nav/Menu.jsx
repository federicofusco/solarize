// Imports components
import GenericSidebar from "./Sidebar";
import SidebarLink from "./Link";

/**
 * A sidebar containing nav links
 * 
 * @param visible - Whether or not the sidebar should be visible 
 * @param toggleSidebar - The callback which is ran when the user attempts to close the menu 
 * @returns A sidebar
 */
const Menu = ({ visible, toggleSidebar }) => {
	return (
		<GenericSidebar 
			visible={ visible }
			toggleSidebar={ toggleSidebar }
			title="Menu">
			<div>
				<SidebarLink text="Windspeed" href="/windspeed" />
				<SidebarLink text="Temperature" href="/temperature" />
				<SidebarLink text="Dew / Frost" href="/frost" />
				<SidebarLink text="Humidity" href="/humidity" />
				<SidebarLink text="Precipitation" href="/precipitation" />
			</div>
		</GenericSidebar>
	)
}

export default Menu;