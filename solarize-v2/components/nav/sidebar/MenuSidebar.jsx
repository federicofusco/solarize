// Imports components
import GenericSidebar from "./GenericSidebar";
import SidebarLink from "./SidebarLink";

const MenuSidebar = ({ visible, toggleSidebar }) => {
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

export default MenuSidebar;