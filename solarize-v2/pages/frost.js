// Imports components
import Description from "./../components/Description";
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
		
		} />
}

export default Frost;