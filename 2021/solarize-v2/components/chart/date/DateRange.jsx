// Imports components
import DateInput from "./DateInput";

// Imports hooks
import { useEffect } from "react";
import useLogging from "./../../../hooks/logging";

/**
 * Displays a date input 
 *
 * @param label - The date input's label
 * @param onUpdate - The callback which is called whenever the user's input changes
 * @returns A input
 */
const DateRange = ({ start, end }) => {

	const [startDate, setStartDate] = start;
	const [endDate, setEndDate] = end;
	const { logError } = useLogging ();

	// Checks if the dates are in a valid range
	useEffect (() => {
		if ( !startDate || !endDate ) 
			return; 

		if ( startDate.getTime () >= endDate.getTime () ) {
			logError ({
				code: "date/invalid-range",
				message: "Invalid date range!"
			}, null, true );
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