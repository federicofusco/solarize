// Imports React
import React from "react";

// Imports React Router
import { Link } from "react-router-dom";

// Imports components
import Navbar from "./../components/Navbar";

// Imports utils

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

    render () {

        return (
            <div className="w-full h-screen">
                <Navbar />
            </div>
        )

    }

}

export default App;