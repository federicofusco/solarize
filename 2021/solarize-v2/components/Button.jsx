/**
 * Displays a button
 * 
 * @param text - The button's text
 * @param onClick - The button's click event callback
 * @param disabled - Whether or not the button should be disabled
 * @returns A button
 */
const Button = ({ text, onClick, disabled }) => {
    return (
        <button onClick={ onClick } disabled={ disabled } className={`w-full rounded-md ${ disabled ? "bg-gray-400" : "bg-green-500" } p-4 text-white font-semibold font-poppins text-xl`}>
            { text }
        </button>
    );
}

export default Button;