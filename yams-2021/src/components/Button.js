const Button = ({ Text, OnClick }) => {

    return (
        <button onClick={ OnClick } className="w-full rounded-md bg-green-500 p-4 text-white font-semibold font-poppins text-xl">
            { Text }
        </button>
    );

}

export default Button;