// Imports Chart.js
import React from "react";
import { Line } from "react-chartjs-2";

// Imports components
import Input from "./Input";
import Button from "./Button";

const Chart = ({ Data, Options, UpdateCallback }) => {

    const LongitudeRef = React.createRef ( null );
    const LatitudeRef = React.createRef ( null );

    const Update = () => {

        UpdateCallback ( LongitudeRef.current.value, LatitudeRef.current.value );

    }

    return (
        <div className="w-full px-4 my-8">
            <div className="w-full p-2 bg-gray-200 bg-opacity-30 rounded-lg">
                <Line data={ Data } options={ Options } />

                <div className="w-full p-4">
                    <Input Placeholder="Longitude" Type="number" Ref={ LongitudeRef } />
                    <Input Placeholder="Latitude" Type="number" Ref={ LatitudeRef } />
                    <Button Text="Search" OnClick={ Update.bind ( this ) } />
                </div>
            </div>
        </div>
    )

}

export default Chart;