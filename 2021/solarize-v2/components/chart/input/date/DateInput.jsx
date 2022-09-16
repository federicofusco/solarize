// Imports components
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateInput = ({ label, onUpdate, date }) => {
	return (
		<div className="w-full mb-4">
			<LocalizationProvider dateAdapter={ AdapterDayjs }>
				<DatePicker
					label={ label }
					value={ date }
					className="w-full"
					onChange={ _date => onUpdate ( _date ) }
					renderInput={ params => <TextField { ...params } />}/>
			</LocalizationProvider>
		</div>
	);
}

export default DateInput;