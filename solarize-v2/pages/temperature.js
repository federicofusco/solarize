// Imports components
import Description from "./../components/Description";
import DataPage from "./../components/pages/DataPage";

const Temperature = () => {
	return <DataPage
		parameter="T2M"
		xAxis="Weeks"
		yAxis="Temperature (C)"
		title="Temperature"
		description={ 
		
			<Description 
                name="Temperature"
                description="Temperature is a physical quantity that expresses hot and cold. It is the manifestation of thermal energy, present in all matter, which is the source of the occurrence of heat, a flow of energy, when a body is in contact with another that is colder or hotter." 
                sources="https://en.wikipedia.org/wiki/Temperature" 
                uses={[
                    {
                        title: "Coats",
                        content: "With this you can remember last week when you forgot your coat and froze while walking in the street!"
                    }
                ]} />
		
		} />
}

export default Temperature;