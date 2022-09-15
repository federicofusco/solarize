// Imports components
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateInput = ({ label, onUpdate, date }) => {

	const _onUpdate = date => {
		if ( date ) 
			onUpdate ( date["$d"] );
		else 
			onUpdate ( date );
	}

	return (
		<LocalizationProvider dateAdapter={ AdapterDayjs } className="w-full mb-4">
			<DatePicker
				label={ label }
				value={ date }
				className="w-full"
				onChange={ _date => _onUpdate ( _date ) }
				renderInput={ params => <TextField { ...params } />}/>
		</LocalizationProvider>
	);
}

export default DateInput;