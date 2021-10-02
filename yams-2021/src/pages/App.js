// Imports React
import React from "react";

// Imports components
import Sidebar from "../components/Sidebar";
import Navbar from "./../components/Navbar";

// Imports utils
import ApiHandler from "../utils/ApiHandler";

// Imports dependencies
import { Line } from "react-chartjs-2";

// Defines the page
class App extends React.Component {

    constructor ( props ) {

        super ( props );

        // Binds  method
        this.ToggleMenu = this.ToggleMenu.bind ( this );

        // Sets the state
        this.state = {
            solarIrradianceData: undefined,
            menuVisible: false
        }

    }

    componentDidMount () {

        ApiHandler.FetchAPIData (["ALLSKY_SFC_SW_DWN"])
        .then ( async ( result ) => {

            var rawData = result.data.data[9];
            var temp = [];
            var values = [];

            // Loops through the raw data and removes all the dates
            // Then valculates the average for each week
            for ( var x = 6; x < rawData.length; x++ ) {

                if ( rawData[x].includes ( "\n" ) && rawData[x].split ( "\n" )[0] > 0 ) {

                    if ( temp.length < 7 ) {
                        
                        temp.push ( Number ( rawData[x].split ( "\n" )[0] ) );
        
                    } else {


                        // Calculates the average value of each day
                        var average = 0;
                        for ( var y = 0; y < temp.length; y++ ) {

                            average += temp[y];

                        }

                        average /= temp.length + 1;

                        values.push ( average );

                        temp = [];
                        temp.push ( Number ( rawData[x].split ( "\n" )[0] ) );

                    }

                }

            }

            this.setState ({
                solarIrradianceData: values
            });

        });

    }

    ToggleMenu () {

        // Updates the state
        this.setState ({
            menuVisible: !this.state.menuVisible
        });

    }

    render () {

        return (
            <div className="w-full h-screen">

                <Sidebar Visible={ this.state.menuVisible } ToggleMenu={ this.ToggleMenu } />

                <Navbar ToggleMenu={ this.ToggleMenu } />

                { this.state.solarIrradianceData &&
                <div className="w-full px-4 my-8">
                    <div className="w-full p-2 bg-gray-100 bg-opacity-50 rounded-lg">
                        <Line data={() => { 

                            var labels = [];
                            for ( var x = 0; x < this.state.solarIrradianceData.length; x++ ) {
                                labels.push ( ( x + 1 ).toString () );
                            }

                            return {
                                labels: labels,
                                datasets: [{
                                    label: 'Solar Irradiance (kWh / m²)',
                                    data: this.state.solarIrradianceData,
                                    fill: false,
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgba(255, 99, 132, 0.2)'
                                }]
                            }
                        }} options={{
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
                        }} />
                    </div>
                </div>
            }
                
            </div>
        )

    }

}

export default App;