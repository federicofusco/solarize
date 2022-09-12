// Imports components
import Description from "./../components/Description";
import DataPage from "./../components/pages/DataPage";

const Home = () => {
	return <DataPage
		parameter="ALLSKY_SFC_SW_DWN"
		xAxis="Weeks"
		yAxis="Irradiance (kWh / m²)"
		title="Solar Irradiance"
		description={ 
		
			<Description 
				name="Solar Irradiation" 
				description="Solar irradiance is the power per unit area received from the Sun in the form of electromagnetic radiation as measured in the wavelength range of the measuring instrument. The solar irradiance is measured in watt per square metre (W/m2) in SI units." 
				sources="https://en.wikipedia.org/wiki/Solar_irradiance#Applications"
				uses={[
					{
						title: "Solar Power",
						content: "Solar Irradiation can be usedd to calculate how effective solar panels courld be in a given region"
					},
					{
						title: "Climate Research",
						content: "Solar Irradiation is a key part of modelling the global climate, even on a small scale."
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

export default Home;