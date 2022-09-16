// Imports components
import Description from "./../components/core/Description";
import DataPage from "./../components/pages/DataPage";

const Frost = () => {
	return <DataPage
		parameter="T2MDEW"
		xAxis="Weeks"
		yAxis="Dew / Frost (C)"
		title="Dew / Frost"
		description={ 
		
			<Description
                name="Dew / Frost"
                description="The dew/frost point temperature at 2 meters above the surface of the earth measured in C."
                sources="https://power.larc.nasa.gov/#resources"
                uses={[
                    {
                        title: "Agriculture",
                        content: "Numerous plants can be affected severly by low temperatures and frost. For example, grapes can die or be harmed by light frosts reachin -2 C"
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

export default Frost;