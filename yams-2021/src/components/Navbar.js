// Imports components
import Logo from "./Logo";

// Imports React Router components
import { Link } from "react-router-dom";

/**
 * Displays a navbar at the top of the screen
 * 
 * @param {function} ToggleMenu A function which toggles the menu's visibility
 * @returns A Navbar
 * @example
 * import Navbar from "./Navbar";
 * 
 * <Navbar />
 */
const Navbar = ({ ToggleMenu }) => {

    return (
        <div className="w-full z-50 h-20 shadow-md flex justify-between px-6">

            {/* Hamburger Icon */}
            <div onClick={ ToggleMenu.bind ( this ) } className="my-auto">
                <i className="text-2xl fas fa-bars"></i>
            </div>

            {/* App Name */}
            <Link className="my-auto flex justify-center" to="/">
                {/* Logo */}
                {/* Logo provided by Logoipsum */}
                {/* https://www.logoipsum.com */}
                <div className="my-auto mr-2">
                    <Logo />
                </div>

                <h1 className="font-poppins font-bold text-4xl">Solarize</h1>
            </Link>

            <div />

        </div>
    );

}

export default Navbar;