// Imports React
import React from "react";

// Imports components
import Sidebar from "../components/Sidebar";
import Navbar from "./../components/Navbar";
import Chart from "../components/Chart";
import Description from "../components/Description";

// Imports utils
import ApiHandler from "../utils/ApiHandler";

// Defines the page
class App extends React.Component {

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

        const parameter = "ALLSKY_SFC_SW_DWN";

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
                    <Chart 
                    Data={ () => { 

                        var labels = [];
                        for ( var x = 0; x < this.state.apiData.length; x++ ) {
                            labels.push ( ( x + 1 ).toString () );
                        }

                        return {
                            labels: labels,
                            datasets: [{
                                label: 'Solar Irradiance (kWh / m²)',
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
                    Parameter="ALLSKY_SFC_SW_DWN" />
                }

                <Description 
                Name="Solar Irradiation" 
                Description="Solar irradiance is the power per unit area received from the Sun in the form of electromagnetic radiation as measured in the wavelength range of the measuring instrument. The solar irradiance is measured in watt per square metre (W/m2) in SI units." 
                Sources="https://en.wikipedia.org/wiki/Solar_irradiance#Applications"
                Uses={[
                    {
                        title: "Solar Power",
                        content: "Solar Irradiation can be usedd to calculate how effective solar panels courld be in a given region"
                    },
                    {
                        title: "Climate Research",
                        content: "Solar Irradiation is a key part of modelling the global climate, even on a small scale."
                    }
                ]} />

            </div>
        )

    }

}

export default App;