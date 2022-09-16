// Imports components
import DateRange from "./DateRange";
import Button from "../../../core/Button";

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
			<Button text="Update" disabled={ !dates.valid } onClick={() => onUpdate ( dates ) } />
		</>
	)
}

export default Container;