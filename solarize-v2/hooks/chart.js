// Imports hooks
import useApi from "./api";
import useLogging from "./logging";

const useChart = () => {

	const { fetchApiData } = useApi ();
	const { logError, logInfo } = useLogging ();

	/**
	 * Fetches data of a specified parameter from the API and processes it to be placed 
	 * onto a chart by `fetchChartData ()`
	 * 
	 * @param {String|Array} parameter The parameter which should be fetched from the API
	 * @returns A promise
	 */
	const processRawApiData = ( parameter, longitude, latitude, start, end ) => {
		return new Promise ( ( resolve, reject ) => {

			// Fetches data from the API
			fetchApiData ( [parameter], longitude, latitude, start, end )
				.then ( async result => {

					// Parses the API's response
					try {
						const parsed = JSON.parse ( result.data ).properties.parameter[parameter];

						const parsedValues = Object.values ( parsed );
						const parsedLabels = Object.keys ( parsed );

						// Temporary values to calculate weekly averages
						let temp = [];
						let average = 0;

						// Final results
						let finalValues = [];
						let finalLabels = [];

						// Loops through the values and calculates each week's average (and label)
						for ( let x = 0; x < parsedLabels.length; x++ ) {


							// Verifies that the data has been properly indexed
							if ( parsedValues[x] > 0 ) {

								// Calculates the average
								if ( temp.length < 7 )
									temp.push ( parsedValues[x] );
								else {	

									// Pretty prints dates (for the chart labels)
									// Original format is YYYMMDD
									const dd = `${parsedLabels[x][6]}${parsedLabels[x][7]}`;
									const mm = `${parsedLabels[x][4]}${parsedLabels[x][5]}`;
									const yyyy = `${parsedLabels[x][0]}${parsedLabels[x][1]}${parsedLabels[x][2]}${parsedLabels[x][3]}`;
									finalLabels.push ( `${dd}/${mm}/${yyyy}` );

									// Calculates the average
									for ( let y = 0; y < temp.length; y++ )
										average += temp[y];
									average /= temp.length + 1;
									finalValues.push ( average );

									// Resets the average for the next week
									average = 0;
									temp = [];
									temp.push ( parsedValues[x] );
								}
							}

						}

						// Finished processing raw API data
						resolve ({
							data: finalValues,
							labels: finalLabels
						});

					} catch ( error ) {

						// Failed to parse response
						logError ({
							code: "chart/parse-failed",
							message: "Failed to parse API response",
							data: error
						}, reject );
					}

				})
				.catch ( error => {

					// Failed to fetch data from API
					logError ({
						code: "chart/request-failed",
						message: "Failed to fetch data from API",
						data: error
					}, reject);
				});
		});
	} 

	const fetchChartData = ( callback, parameter, xAxis, yAxis, longitude, latitude, start, end ) => {
		return new Promise ( ( resolve, reject ) => {

			// Fetches and processes data from the API
			processRawApiData ( parameter, longitude, latitude, start, end )
				.then ( data => {

					// Formats the data into a chart
					const chart = {
						config: {
							labels: data.labels,
							axis: "x",
							datasets: [
								{
									label: 'Solar Irradiance (kWh / m²)',
									data: data.data,
									borderColor: 'rgb(255, 99, 132)',
									backgroundColor: 'rgba(255, 99, 132, 0.2)',
									cubicInterpolationMode: 'monotone',
      								tension: 0.4
								}
							]
						},
						options: {
							scales: {
								x: {
									title: {
										display: xAxis ? true : false,
										text: xAxis ? xAxis : null
									},
								},
								y: {
									title: {
										display: yAxis ? true : false,
										text: yAxis ? yAxis : null
									}
								}
							}
						}
					};

					callback ( chart );
					resolve ( chart );
				})
				.catch ( error => {
					logError ({
						code: "chart/process-failed",
						message: "Failed to process chart data from API",
						data: error
					}, reject);
				})
		});
	}

	return {
		fetchChartData
	}

}

export default useChart;