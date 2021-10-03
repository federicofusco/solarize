// Imports dependencies
import React from "react";
import { Line } from "react-chartjs-2";

// Imports components
import Input from "./Input";
import Button from "./Button";

const Chart = ({ Data, Options, UpdateCallback }) => {

    const LongitudeRef = React.createRef ( null );
    const LatitudeRef = React.createRef ( null );

    const StartDay = React.createRef ( null );
    const StartMonth = React.createRef ( null );
    const StartYear = React.createRef ( null );

    const EndDay = React.createRef ( null );
    const EndMonth = React.createRef ( null );
    const EndYear = React.createRef ( null ); 

    const Update = () => {

        UpdateCallback ( 
            LongitudeRef.current.value, 
            LatitudeRef.current.value,
            `${ StartYear.current.value }${ StartMonth.current.value }${ StartDay.current.value }`,
            `${ EndYear.current.value }${ EndMonth.current.value }${ EndDay.current.value }`
        );

    }

    return (
        <div className="w-full px-4 my-8">
            <div className="w-full p-2 bg-gray-200 bg-opacity-30 rounded-lg">
                <Line data={ Data } options={ Options } />

                <div className="w-full p-4">
                    <Input Placeholder="45.5" Label="Longitude" Type="number" Ref={ LongitudeRef } />
                    <Input Placeholder="8.3" Label="Latitude" Type="number" Ref={ LatitudeRef } />
                    
                    <div className="w-full flex justify-between">
                        <div className="w-1/3">
                            <Input Placeholder="DD" Label="From" Type="number" Ref={ StartDay } />
                        </div>
                        <div className="w-1/3 ml-2">
                            <Input Placeholder="MM" Type="number" Ref={ StartMonth } />
                        </div>
                        <div className="w-1/3 ml-2">
                            <Input Placeholder="YYYY" Type="number" Ref={ StartYear } />
                        </div>
                    </div>

                    <div className="w-full flex justify-between">
                        <div className="w-1/3">
                            <Input Placeholder="DD" Label="To" Type="number" Ref={ EndDay } />
                        </div>
                        <div className="w-1/3 ml-2">
                            <Input Placeholder="MM" Type="number" Ref={ EndMonth } />
                        </div>
                        <div className="w-1/3 ml-2">
                            <Input Placeholder="YYYY" Type="number" Ref={ EndYear } />
                        </div>
                    </div>

                    <Button Text="Update" OnClick={ Update.bind ( this ) } />
                </div>

            </div>
        </div>
    )

}

export default Chart;