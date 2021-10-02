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
        .then ( ( result ) => {
            console.log(result.data);
        })

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