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
class Frost extends React.Component {

    constructor ( props ) {

        super ( props );

        // Binds  method
        this.ToggleMenu = this.ToggleMenu.bind ( this );

        // Sets the state
        this.state = {
            frostData: undefined,
            menuVisible: false
        }

    }

    componentDidMount () {

        const parameter = "T2MDEW";

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
                frostData: values
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

                { this.state.frostData &&
                <div className="w-full px-4 my-8">
                    <div className="w-full p-2 bg-gray-100 bg-opacity-50 rounded-lg">
                        <Line data={() => { 

                            var labels = [];
                            for ( var x = 0; x < this.state.frostData.length; x++ ) {
                                labels.push ( ( x + 1 ).toString () );
                            }

                            return {
                                labels: labels,
                                datasets: [{
                                    label: 'Frost (C)',
                                    data: this.state.frostData,
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

export default Frost;