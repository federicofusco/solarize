// Imports components
import { MapContainer } from "react-leaflet";
import Layer from "./Layer";
import SelectedPosition from "./SelectedPosition";
import UpdateContainer from "./../date/Container";
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';

// Imports styles
import "leaflet-defaulticon-compatibility";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

const Container = ({ position, onUpdate }) => {
	return (
		<>
			<MapContainer fullscreenControl={ true } center={ position } zoom={ 14 } scrollWheelZoom={ true } className="h-64 w-full">
				
				{/* Displays the map */}
				<Layer />
				
				{/* Displays the user's currently selected position */}
				<SelectedPosition position={ position } />
			</MapContainer>

			<UpdateContainer onUpdate={ onUpdate } />
		</>
	)
}

export default Container;