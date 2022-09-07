// Imports components
import Description from "./../components/Description";
import DataPage from "./../components/pages/DataPage";

const Precipitation = () => {
	return <DataPage
		parameter="PRECTOTCORR"
		xAxis="Weeks"
		yAxis="Precipitation (mm)"
		title="Precipitation"
		description={ 
		
			<Description
                name="Precipitation"
                description="In meteorology, precipitation is any product of the condensation of atmospheric water vapor that falls under gravitational pull from clouds. The main forms of precipitation include drizzling, rain, sleet, snow, ice pellets, graupel and hail. Precipitation occurs when a portion of the atmosphere becomes saturated with water vapor (reaching 100% relative humidity), so that the water condenses and 'precipitates' or falls."
            	sources="https://en.wikipedia.org/wiki/Precipitation"
                uses={[
                    {
                        title: "Umbrellas",
                        content: "Hate getting rained on? Use the chart above to remember those times you brought an umbrella with you and it started raining on everyone except you!"
                    }
                ]} />
		
		} />
}

export default Precipitation;