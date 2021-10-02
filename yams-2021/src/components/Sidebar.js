// Imports React Router components
import { Link } from "react-router-dom";

/**
 * Displays a sidebar on the screen
 * 
 * @param {boolean} Visible Whether or not the menu should be visible 
 * @param {function} ToggleMenu A function which toggles the menu's visibility
 * @returns A sidebar
 */
const Sidebar = ({ Visible, ToggleMenu }) => {

    return (
        <div className={ `${ Visible ? "visible": "invisible" } absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-white p-12` }>
            <h1 className="font-poppins font-black text-6xl mb-8">MENU</h1>

            {/* Links */}
            <Link className="menuLink" to="/windspeed">Windspeed</Link>
            <Link className="menuLink" to="/temperature">Temperature</Link>
            <Link className="menuLink" to="/frost">Dew / Frost</Link>
            <Link className="menuLink" to="/humidity">Humidity</Link>
            <Link className="menuLink" to="/precipitation">Precipitation</Link>
            <Link className="menuLink" to="/custom">Custom Chart</Link>

            <div onClick={ ToggleMenu.bind ( this ) } className="absolute top-10 right-10 h-16 w-16 rounded-full bg-gray-100 flex justify-center">
                <i className="my-auto text-3xl text-gray-700 fas fa-times"></i>
            </div>
            
        </div>
    )

}

export default Sidebar;