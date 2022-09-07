// Imports hooks
import { useState, createRef } from "react";


// Imports components
import ChartSidebar from "./nav/sidebar/ChartSidebar";
import "chart.js/auto";
import { Chart as ReactChart } from "react-chartjs-2";
// import Input from "./Input";
// import Button from "./Button";
// import Radio from "./Radio";

const Chart = ({ data, onUpdate, parameter }) => {

    // const longitude = createRef ( null );
    // const latitude = createRef ( null );

    // const startDay = createRef ( null );
    // const startMonth = createRef ( null );
    // const startYear = createRef ( null );

    // const endDay = createRef ( null );
    // const endMonth = createRef ( null );
    // const endYear = createRef ( null ); 

    // const yearRadioRef = createRef ( null ); 
    // const monthRadioRef = createRef ( null ); 
    // const weekRadioRef = createRef ( null );  
    // const dayRadioRef = createRef ( null );  

	// Whether or not the chart's sidebar are visible
    const [sidebarVisible, setSidebarVisibility] = useState ( false );

	/**
	 * Called when the user changes the chart's parameters
	 */
    const updateParameters = ( position, startDate, endDate ) => {
        onUpdate ( 
            position[1], 
            position[0],
            `${ startDate["$d"].getFullYear () }${ String ( startDate["$d"].getMonth () + 1 ).padStart ( 2, "0" ) }${ String ( startDate["$d"].getDate () ).padStart ( 2, "0" ) }`,
            `${ endDate["$d"].getFullYear () }${ String ( endDate["$d"].getMonth () + 1 ).padStart ( 2, "0" ) }${ String ( endDate["$d"].getDate () ).padStart ( 2, "0" ) }`,
            parameter
        );
    }

	/**
	 * No clue what this is supposed to do I'm not going to touch it
	 */
    // const updateResolution = () => {
    //     // ... Do something ...
    // }

	/**
	 * Toggles the visibility of the chart's sidebar
	 */
    const toggleSidebar = () => {
        setSidebarVisibility ( !sidebarVisible );
    }

    return (
        <div className="w-full px-4 my-8">
            <div className="relative w-full p-2 bg-gray-200 bg-opacity-30 rounded-lg">

				{/* Sidebar icon */}
				<div onClick={ toggleSidebar } className="absolute top-2 right-5">
					<i aria-hidden className="text-lg text-gray-700 fas fa-ellipsis"></i>
				</div>
				{/* <div onClick={ toggleSidebar } className="h-14 w-14 flex justify-center">
					<i className="my-auto text-3xl text-gray-700 fas fa-times"></i>
				</div> */}


				<ChartSidebar 
					visible={ sidebarVisible } 
					toggleSidebar={ toggleSidebar }
					onUpdate={ updateParameters } />

				{/* The actual chart */}
                <ReactChart type="line" data={ data.config } options={ data.options } />

                {/* { visible &&
                    <div className="w-full p-4">
                        
                        {/* Latitude / Longitude /}
                        <Input placeholder="45.5" label="Longitude" type="number" ref={ longitude } />
                        <Input placeholder="8.3" label="Latitude" type="number" ref={ latitude } />
                        
                        {/* Start / End /}
                        <div className="w-full flex justify-between">
                            <div className="w-1/3">
                                <Input placeholder="DD" label="From" type="number" ref={ startDay } />
                            </div>
                            <div className="w-1/3 ml-2">
                                <Input placeholder="MM" type="number" ref={ startMonth } />
                            </div>
                            <div className="w-1/3 ml-2">
                                <Input placeholder="YYYY" type="number" ref={ startYear } />
                            </div>
                        </div>

                        <div className="w-full flex justify-between">
                            <div className="w-1/3">
                                <Input placeholder="DD" label="To" type="number" ref={ endDay } />
                            </div>
                            <div className="w-1/3 ml-2">
                                <Input placeholder="MM" type="number" ref={ endMonth } />
                            </div>
                            <div className="w-1/3 ml-2">
                                <Input placeholder="YYYY" type="number" ref={ endYear } />
                            </div>
                        </div>

                        {/* Temporal Resolution /}
                        <div className="w-full flex justify-between">
                            <Radio value="1 Year" ref={ yearRadioRef } onChange={ updateResolution } group="resolution" checked />
                            <Radio value="1 Month" ref={ monthRadioRef } onChange={ updateResolution } group="resolution" />
                            <Radio value="1 Week" ref={ weekRadioRef } onChange={ updateResolution } group="resolution" />
                            <Radio value="1 Day" ref={ dayRadioRef } onChange={ updateResolution } group="resolution" />
                        </div>

                        <Button text="Update" onClick={ updateParameters } />

                        <div onClick={ toggleVisibility } className="w-full flex justify-center">
                            <p className="my-3 text-sm">Minimize</p>
                        </div>
                    </div>
                } */}

                {/* { !visible &&
                    <div onClick={ toggleVisibility } className="w-full flex justify-center">
                        <p className="my-3 text-sm">Maximise</p>
                    </div>
                } */}

            </div>
        </div>
    )

}

export default Chart;