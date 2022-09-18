// Imports components
import DateRange from "./DateRange";
import UpdateButton from "./UpdateButton";

// Imports hooks
import { useState } from "react";

const Container = ({ onUpdate }) => {

	const [dates, setDates] = useState ({
		startDate: null,
		endDate: null,
		valid: false
	});

	return (
		<>
			<DateRange onUpdate={ setDates } />
			<UpdateButton disabled={ !dates.valid } onClick={ onUpdate } params={ dates } />
		</>
	)
}

export default Container;