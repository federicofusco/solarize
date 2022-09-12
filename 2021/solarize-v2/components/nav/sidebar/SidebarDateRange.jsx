// Imports hooks
import { useState } from "react";

// Imports components
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/**
 * Displays a date input 
 *
 * @param label - The date input's label
 * @param onUpdate - The callback which is called whenever the user's input changes
 * @returns A input
 */
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