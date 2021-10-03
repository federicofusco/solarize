// Imports React
import React from "react";

// Imports components
import Checkbox from "./Checkbox";

const DataSelector = ({ OnChange }) => {

    const SolarIrradianceRef = React.createRef ( null );
    const FrostRef = React.createRef ( null );
    const HumidityRef = React.createRef ( null );
    const PrecipitationRef = React.createRef ( null );
    const TemperatureRef = React.createRef ( null );
    const WindspeedRef = React.createRef ( null );

    const Update = () => {

        OnChange ({
            ALLSKY_SFC_SW_DWN: SolarIrradianceRef.current.checked,
            T2MDEW: FrostRef.current.checked,
            QV2M: HumidityRef.current.checked,
            PRECTOTCORR: PrecipitationRef.current.checked,
            T2M: TemperatureRef.current.checked,
            WS10M: WindspeedRef.current.checked
        });

    }

    return (
        <div className="w-full px-4 my-8">
            <div className="w-full p-6 bg-gray-200 bg-opacity-30 rounded-lg">

                <div className="w-full flex justify-center mb-8">
                     
                    <h1 className="font-poppins font-bold text-2xl">Select Charts</h1>
                
                </div>

                <div className="w-full flex justify-center">
                    
                    <div className="w-1/2">
                        <Checkbox Ref={ SolarIrradianceRef } OnChange={ Update } Value="Solar Irradiance" />
                        <Checkbox Ref={ FrostRef } OnChange={ Update } Value="Frost" />
                        <Checkbox Ref={ HumidityRef } OnChange={ Update } Value="Humidity" />
                    </div>

                    <div className="w-1/2">
                        <Checkbox Ref={ PrecipitationRef } OnChange={ Update } Value="Precipitation" />
                        <Checkbox Ref={ TemperatureRef } OnChange={ Update } Value="Temperature" />
                        <Checkbox Ref={ WindspeedRef } OnChange={ Update } Value="Windspeed" />
                    </div>
                
                </div>
            </div>
        </div>
    )

}

export default DataSelector;