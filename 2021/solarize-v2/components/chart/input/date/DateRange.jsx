// Imports components
import DateInput from "./DateInput";

// Imports hooks
import { useEffect, useState } from "react";
import useLogging from "../../../../hooks/logging";
import useChart from "../../../../hooks/chart";

/**
 * Displays a date input 
 *
 * @param label - The date input's label
 * @param onUpdate - The callback which is called whenever the user's input changes
 * @returns A input
 */
const DateRange = ({ onUpdate }) => {

	const { getStartDate, setStartDate, getEndDate, setEndDate } = useChart ();
	const [startDate, updateStartDate] = useState ( getStartDate () );
	const [endDate, updateEndDate] = useState ( getEndDate () );
	const { logError } = useLogging ();

	const _onUpdate = valid => {
		if ( !startDate || !endDate )	
			return;

		onUpdate ({
			valid: valid,
			startDate: startDate,
			endDate: endDate
		});
	} 

	// Checks if the dates are in a valid range
	useEffect (() => {

		if ( !startDate || !endDate || isNaN ( startDate.getTime () ) || isNaN ( endDate.getTime () ) ) { 

			// The dates haven't been set yet
			_onUpdate ( false );
			return; 
		}

		if ( startDate.getTime () >= endDate.getTime () ) {
			
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

	const _updateStartDate = date => {
		setStartDate ( date );
		updateStartDate ( date );
	}

	const _updateEndDate = date => {
		setEndDate ( date );
		updateEndDate ( date );
	} 

	return (
		<>
			<h2 className="font-poppins text-xl font-semibold mb-2 mt-4">Date</h2>
			<DateInput label="Start Date" onUpdate={ _updateStartDate } date={ startDate } />
			<DateInput label="End Date" onUpdate={ _updateEndDate } date={ endDate } />
		</>
	)

}

export default DateRange;