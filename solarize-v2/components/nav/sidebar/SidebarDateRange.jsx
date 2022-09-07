// Imports hooks
import { useState } from "react";

// Imports components
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const SidebarDateRange = ({ label, onUpdate }) => {


	const [date, setDate] = useState ([null, null]);

	return (
		<div className="w-full mb-4">
			<LocalizationProvider dateAdapter={ AdapterDayjs }>
				<DatePicker
					label={ label }
					value={ date }
					className="w-full"
					onChange={ newDate => {
						setDate ( newDate );
						onUpdate ( newDate );
					}}
					renderInput={ params => <TextField { ...params } />}/>
			</LocalizationProvider>
		</div>
	);
}

export default SidebarDateRange;