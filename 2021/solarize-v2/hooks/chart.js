// Imports hooks
import useApi from "./api";
import useLogging from "./logging";
import useLocalStorage from "./localStorage";

/**
 * A hook to handle chart data such as formatting and processing data
 * @version 0.0.1
 */
const useChart = () => {

	const { fetchApiData } = useApi ();
	const { logError } = useLogging ();
	const [startDate, setStartDate] = useLocalStorage ( "startDate", null );
	const [endDate, setEndDate] = useLocalStorage ( "endDate", null );

	/**
	 * Fetches data of a specified parameter from the API and processes it to be placed 
	 * onto a chart by `fetchChartData ()`
	 * 
	 * @param parameter - The parameter which should be fetched from the API
	 * @param longitude - The data's longitude
	 * @param latitude - The data's latitude
	 * @param start - The data's start date
	 * @param end - The data's end dat
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
							message: "Something went wrong!",
							data: error
						}, reject, true );
					}

				})
				.catch ( error => {

					// Failed to fetch data from API
					logError ({
						code: "chart/request-failed",
						message: "Failed to fetch data from API",
						data: error
					}, reject , false );
				});
		});
	} 

	/**
	 * @param  callback - The callback which is ran when the chart's data has been processed and formatted
	 * @param  parameter - The API parameter
	 * @param  xAxis - The chart's label for the X axis
	 * @param  yAxis - The chart's label for the Y axis
	 * @param  longitude - The data's longitude
	 * @param  latitude - The data's latitude
	 * @param  start - The data's start date
	 * @param  end - The data's end date
	 * @returns Chart data
	 */
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
						message: "Failed to process and format chart data",
						data: error
					}, reject, false );
				})
		});
	}

	const getStartDate = () => {
		return new Date ( startDate );
	}

	const getEndDate = () => {
		return new Date ( endDate );
	}

	return {
		fetchChartData,
		getStartDate,
		setStartDate,
		getEndDate,
		setEndDate
	}

}

export default useChart;