// Imports React
import React from "react";

// Imports components
import Sidebar from "../components/Sidebar";
import Navbar from "./../components/Navbar";
import Chart from "./../components/Chart";
import Description from "./../components/Description";

// Imports utils
import ApiHandler from "../utils/ApiHandler";

// Defines the page
class Humidity extends React.Component {

    constructor ( props ) {

        super ( props );

        // Binds  method
        this.ToggleMenu = this.ToggleMenu.bind ( this );
        this.UpdateChart = this.UpdateChart.bind ( this );

        // Sets the state
        this.state = {
            apiData: undefined,
            menuVisible: false
        }

    }

    componentDidMount () {

        const parameter = "QV2M";

        ApiHandler.FetchAPIData ([parameter])
        .then ( async ( result ) => {

            const data = Object.values ( JSON.parse ( result.data ).properties.parameter[parameter] );
            var values = [];
            var temp = [];
            var average = 0;

            // Loops the data and calculates each weeks average
            for ( var x = 0; x < data.length; x++ ) {

                // Verifies that the data has been properly indexed
                if ( data[x] > 0 ) {

                    if ( temp.length < 7 ) {
                        temp.push ( data[x] );
                    } else {

                        // Calculates the average
                        for ( var y = 0; y < temp.length; y++ ) {

                            average += temp[y];

                        }
                        average /= temp.length + 1;

                        values.push ( average );
                        temp = [];
                        temp.push ( data[x] );

                    }

                }

            }

            this.setState ({
                apiData: values
            });

        });

    }

    ToggleMenu () {

        // Updates the state
        this.setState ({
            menuVisible: !this.state.menuVisible
        });

    }

    UpdateChart ( longitude, latitude, start, end, parameter ) {

        ApiHandler.FetchAPIData ([parameter], longitude, latitude, start, end )
        .then ( async ( result ) => {

            const data = Object.values ( JSON.parse ( result.data ).properties.parameter[parameter] );
            const values = [];

            // Loops through the values and removes the ones that haven't been indexed
            for ( var x = 0; x < data.length; x++ ) {

                if ( data[x] > 0 ) {
                    values.push ( data[x] );
                }

            }

            this.setState ({
                apiData: values
            });

        });

    }

    render () {

        return (
            <div className="w-full h-screen">

                <Sidebar Visible={ this.state.menuVisible } ToggleMenu={ this.ToggleMenu } />

                <Navbar ToggleMenu={ this.ToggleMenu } />

                { !this.state.apiData &&
                    <div className="w-full px-4 my-8">
                        <div className="w-full py-8 bg-gray-200 bg-opacity-30 rounded-lg flex justify-center">
                            <p>Loading . . .</p>
                        </div>
                    </div>
                }

                { this.state.apiData && 
                    <Chart Data={ () => { 

                    var labels = [];
                    for ( var x = 0; x < this.state.apiData.length; x++ ) {
                        labels.push ( ( x + 1 ).toString () );
                    }

                    return {
                        labels: labels,
                        datasets: [{
                            label: 'Humidity (g / kg)',
                            data: this.state.apiData,
                            fill: false,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgba(255, 99, 132, 0.2)'
                        }]
                    }
                    }}

                    Options={{
                        responsive: true,
                        scales: {
                            yAxes: [{
                                beginAtZero: true,
                                ticks: {
                                    callback: ( value, index ) => {
                                        return value + "@";
                                    }
                                }
                            }]
                        }
                    }} 
                    
                    UpdateCallback={ this.UpdateChart }
                    Maximized={ false }
                    Parameter="QV2M" />
                }

                <Description
                Name="Humidity"
                Description="Humidity is the concentration of water vapour present in the air. Water vapor, the gaseous state of water, is generally invisible to the human eye. Humidity indicates the likelihood for precipitation, dew, or fog to be present."
                Sources="https://en.wikipedia.org/wiki/Humidity#Climate"
                Uses={[
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
                
            </div>
        )

    }

}

export default Humidity;