// Imports components
import Description from "./../components/Description";
import DataPage from "./../components/pages/DataPage";

const Humidity = () => {
	return <DataPage
		parameter="QV2M"
		xAxis="Weeks"
		yAxis="Humidity (g / kg)"
		title="Humidity"
		description={ 
		
			<Description
                name="Humidity"
                description="Humidity is the concentration of water vapour present in the air. Water vapor, the gaseous state of water, is generally invisible to the human eye. Humidity indicates the likelihood for precipitation, dew, or fog to be present."
                sources="https://en.wikipedia.org/wiki/Humidity#Climate"
                uses={[
                    {
                        title: "Global Climate",
                        content: "Humidity affects the energy budget and thereby influences temperatures in two major ways. First, water vapor in the atmosphere contains \"latent\" energy. During transpiration or evaporation, this latent heat is removed from surface liquid, cooling the earth's surface. This is the biggest non-radiative cooling effect at the surface. It compensates for roughly 70% of the average net radiative warming at the surface."
                    },
                    {
                        title: "Human Health",
                        content: "Higher humidity reduces the infectivity of aerosolized influenza virus. A study concluded, \"Maintaining indoor relative humidity >40% will significantly reduce the infectivity of aerosolized virus.\""
                    },
                    {
                        title: "Transportation",
                        content: "The basic principles for buildings, above, also apply to vehicles. In addition, there may be safety considerations. For instance, high humidity inside a vehicle can lead to problems of condensation, such as misting of windshields and shorting of electrical components. In vehicles and pressure vessels such as pressurized airliners, submersibles and spacecraft, these considerations may be critical to safety, and complex environmental control systems including equipment to maintain pressure are needed."
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

export default Humidity;