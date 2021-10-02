// Imports components
import Logo from "./Logo";

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
            <h1 className="font-poppins my-auto font-bold text-4xl">Solarize</h1>

            {/* Logo */}
            {/* Logo provided by Logoipsum */}
            {/* https://www.logoipsum.com */}
            <div className="my-auto">
                <Logo />
            </div>
        </div>
    );

}

export default Navbar;