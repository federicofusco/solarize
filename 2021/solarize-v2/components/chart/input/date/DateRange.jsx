// Imports components
import DateInput from "./DateInput";

// Imports hooks
import { useEffect, useState } from "react";
import useLogging from "../../../../hooks/logging";

/**
 * Displays a date input 
 *
 * @param label - The date input's label
 * @param onUpdate - The callback which is called whenever the user's input changes
 * @returns A input
 */
const DateRange = ({ onUpdate }) => {

	const [startDate, setStartDate] = useState ( null );
	const [endDate, setEndDate] = useState ( null );
	const { logError } = useLogging ();

	const _onUpdate = valid => {
		if ( !startDate || !endDate )	
			return;

		onUpdate ({
			valid: valid,
			startDate: startDate["$d"],
			endDate: endDate["$d"]
		});
	} 

	// Checks if the dates are in a valid range
	useEffect (() => {

		if ( !startDate || !endDate || isNaN ( startDate["$d"].getTime () ) || isNaN ( endDate["$d"].getTime () ) ) { 

			// The dates haven't been set yet
			_onUpdate ( false );
			return; 
		}

		if ( startDate["$d"].getTime () >= endDate["$d"].getTime () ) {
			
			// The date range is invalid
			_onUpdate ( false );
			logError ({
				code: "date/invalid-range",
				message: "Invalid date range!"
			}, null, true );
			return;
		} else {

			// The date range is valid
			_onUpdate ( true );
		}
	}, [startDate, endDate]);

	return (
		<>
			<h2 className="font-poppins text-xl font-semibold mb-2 mt-4">Date</h2>
			<DateInput label="Start Date" onUpdate={ setStartDate } date={ startDate } />
			<DateInput label="End Date" onUpdate={ setEndDate } date={ endDate } />
		</>
	)

}

export default DateRange;