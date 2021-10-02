// Imports React
import React from "react";

// Imports components
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

        // Creates refs

        // Sets the state
        this.state = {
            solarIrradianceData: undefined
        }

    }

    componentDidMount () {

        ApiHandler.FetchAllSkySurfaceShortwaveDownwardIrradiance ()
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

    render () {

        return (
            <div className="w-full h-screen">

                <Navbar />

                { this.state.solarIrradianceData &&
                <div className="w-full px-8 my-16">
                    <div className="w-full px-4 pb-4 pt-2 bg-gray-100 bg-opacity-50 rounded-lg">
                        <Line data={() => { 

                            var labels = [];
                            for ( var x = 0; x < this.state.solarIrradianceData.length; x++ ) {
                                labels.push ( ( x + 1 ).toString () );
                            }

                            return {
                                labels: labels,
                                datasets: [{
                                    label: 'Solar Irradiance',
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
                                            console.log(1)
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