// Imports React
import React from "react";

// Imports components
import Navbar from "./../components/Navbar";

// Imports dependencies
import ApiHandler from "../utils/ApiHandler";

// Defines the page
class App extends React.Component {

    constructor ( props ) {

        super ( props );

        // Binds  method

        // Creates refs

        // Sets the state
        this.state = {
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

                if ( rawData[x].includes ( "\n" ) ) {

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

            console.log( values );

        });

    }

    render () {

        return (
            <div className="w-full h-screen">
                <Navbar />

            </div>
        )

    }

}

export default App;