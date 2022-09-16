// Imports components
import { TileLayer } from "react-leaflet";

const Layer = () => {
	return <TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
}

export default Layer;