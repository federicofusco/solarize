// Imports components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { createRef, useMemo } from "react";
import "leaflet-defaulticon-compatibility";

// Imports styles
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

const SidebarMap = ({ position, onDrag }) => {

	const markerRef = createRef ( null );
	const eventHandlers = useMemo (() => ({

		// Event is triggered when the map marker is moved to a new position
		dragend () {
			const marker = markerRef.current;
			if ( marker != null ) {
			
				// Gets the marker's new position
				const coords = marker.getLatLng ();	
				onDrag ({
					coords: {
						latitude: coords.lat,
						longitude: coords.lng
					}
				});
			}
		}
	}), []);

	return (
		<MapContainer center={ position } zoom={ 14 } scrollWheelZoom={ true } className="h-64 w-full">
			
			{/* Displays the map */}
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
			
			{/* Displays the user's currently selected position */}
			<Marker 
				position={ position }
				draggable={ true }
				animate={ true }
				eventHandlers={ eventHandlers }
				ref={ markerRef }>
				<Popup>
					Currently viewing data from this location
				</Popup>
			</Marker>
		</MapContainer>
	)
}

export default SidebarMap;