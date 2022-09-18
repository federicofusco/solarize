// Imports components
import Button from "./../../../core/Button";

// Imports hooks
import { useState } from "react";

const UpdateButton = ({ disabled, onClick, params }) => {
	
	const [status, setStatus] = useState ( "Update" );
	const _onClick = () => {
		setStatus ( "Updating..." );
		onClick ( params )
	}

	// This solution is a bit hacky but, basically, when the button is clicked, 
	// the whole component tree containing the button rerenders, resetting the state to the "Update" state,
	// effectively resetting the entire button
	
	return <Button text={ status } disabled={ disabled } onClick={ _onClick } />
}

export default UpdateButton;