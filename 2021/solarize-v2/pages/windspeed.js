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
		
		} 
		meta={
		
			<>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="The homepage for the Solarize Web App, a project originally started for the 2021 NASA Space Apps Challenge which aims to aid users in the use of open space and earth data provided by NASA" />
			</>
		
		} />
}

export default Windspeed;