// Imports components
import Description from "./../components/Description";
import DataPage from "./../components/pages/DataPage";

const Windspeed = () => {
	return <DataPage
		parameter="WS10M"
		xAxis="Weeks"
		yAxis="Wind Speed (m / s)"
		title="Windspeed"
		description={ 
		
			<Description
				name="Windspeed"
				description="In meteorology, wind speed, or wind flow speed, is a fundamental atmospheric quantity caused by air moving from high to low pressure, usually due to changes in temperature. Wind speed is now commonly measured with an anemometer."
				sources="https://en.wikipedia.org/wiki/Wind_speed"
				uses={[
					{
					title: "Construction",
					content: "Wind speed is a common factor in the design of structures and buildings around the world. It is often the governing factor in the required lateral strength of a structure's design."	
					}
				]} />
		
		} />
}

export default Windspeed;