// Imports components
import { Marker, Popup, useMap } from "react-leaflet";
import { createRef } from "react";

// Imports hooks
import useGeo from "../../../hooks/geolocation";

const SelectedPosition = ({ position }) => {

	const { setChartCoords } = useGeo ();

	const markerRef = createRef ( null );
	const map = useMap ();
	const eventHandlers = {

		// Event is triggered when the map marker is moved to a new position
		dragend: () => {
			const marker = markerRef.current;
			if ( marker != null ) {
			
				// Gets the marker's new position
				const coords = marker.getLatLng ();
				map.flyTo ( coords );	
				setChartCoords ({
					coords: {
						latitude: coords.lat,
						longitude: coords.lng
					}
				});
			}
		}
	}

	return (
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
	)
}

export default SelectedPosition;