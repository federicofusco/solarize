// Imports components
import Logo from "./../Logo";

// Imports React Router components
import Link from "next/link";

/**
 * Displays a navbar at the top of the screen
 * 
 * @param {function} toggleSidebar A function which toggles the menu's visibility
 * @returns A Navbar
 * @example
 * import Navbar from "./Navbar";
 * 
 * <Navbar />
 */
const Navbar = ({ toggleSidebar }) => {

    return (
        <div className="w-full z-50 h-20 shadow-md flex justify-between px-6">

            {/* Hamburger Icon */}
            <div onClick={ toggleSidebar } className="my-auto">
                <i aria-hidden className="text-2xl text-gray-700 fas fa-bars"></i>
            </div>

            {/* App Name */}
            <Link className="width-full" href="/">
				<div className="my-auto flex justify-center">
					<div className="my-auto mr-2">
						<Logo />
					</div>

					<h1 className="font-poppins font-bold text-4xl">Solarize</h1>
				</div>
            </Link>

            <div />

        </div>
    );

}

export default Navbar;