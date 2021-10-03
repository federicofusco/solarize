// Imports React
import React from "react";

// Imports components
import Sidebar from "../components/Sidebar";
import Navbar from "./../components/Navbar";
import Chart from "../components/Chart";
import DataSelector from "../components/DataSelector";

// Imports utils
import ApiHandler from "../utils/ApiHandler";

// Defines the page
class Custom extends React.Component {

    constructor ( props ) {

        super ( props );

        // Binds  method
        this.ToggleMenu = this.ToggleMenu.bind ( this );
        this.UpdateChart = this.UpdateChart.bind ( this );
        this.UpdateChartList = this.UpdateChartList.bind ( this );

        // Sets the state
        this.state = {
            charts: {
                ALLSKY_SFC_SW_DWN: {
                    chart: ( state ) => {
                        
                        var labels = [];
                        for ( var x = 0; x < state.charts.ALLSKY_SFC_SW_DWN.data.length; x++ ) {
                            labels.push ( ( x + 1 ).toString () );
                        }

                        return {
                            labels: labels,
                            datasets: [{
                                label: 'Solar Irradiance (kWh / m²)',
                                data: state.charts.ALLSKY_SFC_SW_DWN.data,
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.2)'
                            }]
                        }
                    },
                    data: undefined
                },
                T2MDEW: {
                    chart: ( state ) => { 

                        var labels = [];
                        for ( var x = 0; x < state.charts.T2MDEW.data.length; x++ ) {
                            labels.push ( ( x + 1 ).toString () );
                        }

                        return {
                            labels: labels,
                            datasets: [{
                                label: 'Frost (C)',
                                data: state.charts.T2MDEW.data,
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.2)'
                            }]
                        }
                    },
                    data: undefined
                },
                QV2M: {
                    chart: ( state ) => { 

                        var labels = [];
                        for ( var x = 0; x < state.charts.QV2M.data.length; x++ ) {
                            labels.push ( ( x + 1 ).toString () );
                        }

                        return {
                            labels: labels,
                            datasets: [{
                                label: 'Humidity (g / kg)',
                                data: state.charts.QV2M.data,
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.2)'
                            }]
                        }
                    },
                    data: undefined
                },
                PRECTOTCORR: {
                    chart: ( state ) => { 

                        var labels = [];
                        for ( var x = 0; x < state.charts.PRECTOTCORR.data.length; x++ ) {
                            labels.push ( ( x + 1 ).toString () );
                        }

                        return {
                            labels: labels,
                            datasets: [{
                                label: 'Precipitation (mm)',
                                data: state.charts.PRECTOTCORR.data,
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.2)'
                            }]
                        }
                    },
                    data: undefined
                },
                T2M: {
                    chart: ( state ) => { 

                        var labels = [];
                        for ( var x = 0; x < state.charts.T2M.data.length; x++ ) {
                            labels.push ( ( x + 1 ).toString () );
                        }

                        return {
                            labels: labels,
                            datasets: [{
                                label: 'Temperature (C)',
                                data: state.charts.T2M.data,
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.2)'
                            }]
                        }
                    },
                    data: undefined
                },
                WS10M: {
                    chart: ( state ) => { 

                        var labels = [];
                        for ( var x = 0; x < state.charts.WS10M.data.length; x++ ) {
                            labels.push ( ( x + 1 ).toString () );
                        }

                        return {
                            labels: labels,
                            datasets: [{
                                label: 'Windspeed (m / s)',
                                data: state.charts.WS10M.data,
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.2)'
                            }]
                        }
                    },
                    data: undefined
                }
            },
            menuVisible: false,
        }

    }

    componentDidMount () {

        // const parameter = "ALLSKY_SFC_SW_DWN";

        // ApiHandler.FetchAPIData ([parameter])
        // .then ( async ( result ) => {

        //     const data = Object.values ( JSON.parse ( result.data ).properties.parameter[parameter] );
        //     var values = [];
        //     var temp = [];
        //     var average = 0;

        //     // Loops the data and calculates each weeks average
        //     for ( var x = 0; x < data.length; x++ ) {

        //         // Verifies that the data has been properly indexed
        //         if ( data[x] > 0 ) {

        //             if ( temp.length < 7 ) {
        //                 temp.push ( data[x] );
        //             } else {

        //                 // Calculates the average
        //                 for ( var y = 0; y < temp.length; y++ ) {

        //                     average += temp[y];

        //                 }
        //                 average /= temp.length + 1;

        //                 values.push ( average );
        //                 temp = [];
        //                 temp.push ( data[x] );

        //             }

        //         }

        //     }

        //     this.setState ({
        //         apiData: values
        //     });

        // });

    }

    ToggleMenu () {

        // Updates the state
        this.setState ({
            menuVisible: !this.state.menuVisible
        });

    }

    UpdateChart ( longitude, latitude, start, end ) {

        const parameter = "ALLSKY_SFC_SW_DWN";

        ApiHandler.FetchAPIData ([parameter], longitude, latitude, start, end )
        .then ( async ( result ) => {

            const data = Object.values ( JSON.parse ( result.data ).properties.parameter[parameter] );
            const values = [];

            // Loops through the values and removes the ones that haven't been indexed
            for ( var x = 0; x < data.length; x++ ) {

                if ( data[x] > 0 ) {
                    values.push ( data[x] );
                }

            }

            this.setState ({
                apiData: values
            });

        });

    }

    UpdateChartList ( charts ) {

        // Loops through each chart
        Object.entries ( charts ).map ( ( chart ) => {

            // Checks if the chart should be visible
            if ( chart[1] ) {

                ApiHandler.FetchAPIData ([chart[0]])
                .then ( async ( result ) => {

                    const data = Object.values ( JSON.parse ( result.data ).properties.parameter[chart[0]] );
                    const values = [];

                    // Loops through the values and removes the ones that haven't been indexed
                    for ( var x = 0; x < data.length; x++ ) {

                        if ( data[x] > 0 ) {
                            values.push ( data[x] );
                        }

                    }
                    

                    var finalResult = Object.assign ( this.state );
                    finalResult["charts"][chart[0]]["data"] = values;

                    this.setState (finalResult);

                });

            }

        })

    }

    render () {

        return (
            <div className="w-full h-screen">

                <Sidebar Visible={ this.state.menuVisible } ToggleMenu={ this.ToggleMenu } />

                <Navbar ToggleMenu={ this.ToggleMenu } />

                <DataSelector OnChange={ this.UpdateChartList } />

                {/* { !this.state.apiData &&
                    <div className="w-full px-4 my-8">
                        <div className="w-full py-8 bg-gray-200 bg-opacity-30 rounded-lg flex justify-center">
                            <p>Loading . . .</p>
                        </div>
                    </div>
                } */}

                { Object.entries ( this.state.charts ).map ( ( item, i ) => {
                    
                    if ( this.state.charts[item[0]].data ) {
                        return <Chart
                                key={ item[0] }
                                Data={ item[1].chart ( this.state ) }
                                Options={{
                                    responsive: true,
                                    scales: {
                                        yAxes: [{
                                            beginAtZero: true
                                        }]
                                    }
                                }}
                                UpdateCallback={ () => {} }
                                Visible={ false } />;
                    } else {
                        return <p key={ item[0] }>{ item[0] }</p>
                    }

                }) }

                {/* { this.state.charts. &&
                    <Chart 
                    Data={ }

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
                    }} 
                    
                    UpdateCallback={ this.UpdateChart }
                    Visible={ false } />
                } */}
                
            </div>
        )

    }

}

export default Custom;