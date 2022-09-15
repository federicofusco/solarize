// Imports components
import { MapContainer } from "react-leaflet";
import Layer from "./Layer";
import SelectedPosition from "./SelectedPosition";

// Imports styles
import "leaflet-defaulticon-compatibility";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

const Container = ({ position }) => {
	return (
		<MapContainer center={ position } zoom={ 14 } scrollWheelZoom={ true } className="h-64 w-full">
			
			{/* Displays the map */}
			<Layer />
			
			{/* Displays the user's currently selected position */}
			<SelectedPosition position={ position } />
		</MapContainer>
	)
}

export default Container;