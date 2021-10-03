// Imports React
import React from "react";

// Imports components
import Sidebar from "../components/Sidebar";
import Navbar from "./../components/Navbar";
import Chart from "../components/Chart";

// Imports utils
import ApiHandler from "../utils/ApiHandler";

// Defines the page
class Windspeed extends React.Component {

    constructor ( props ) {

        super ( props );

        // Binds  method
        this.ToggleMenu = this.ToggleMenu.bind ( this );

        // Sets the state
        this.state = {
            windSpeedData: undefined,
            menuVisible: false
        }

    }

    componentDidMount () {

        const parameter = "WS10M";

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
                windSpeedData: values
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

                { this.state.windSpeedData &&
                    <Chart Data={ () => { 

                    var labels = [];
                    for ( var x = 0; x < this.state.windSpeedData.length; x++ ) {
                        labels.push ( ( x + 1 ).toString () );
                    }

                    return {
                        labels: labels,
                        datasets: [{
                            label: 'Wind Speed (m / s)',
                            data: this.state.windSpeedData,
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
                    }} />
                }

            </div>
        )

    }

}

export default Windspeed;