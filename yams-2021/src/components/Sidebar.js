// Imports React Router components
import { Link } from "react-router-dom";

/**
 * Displays a sidebar on the screen
 * 
 * @param {boolean} Visible Whether or not the menu should be visible 
 * @returns A sidebar
 */
const Sidebar = ({ Visible }) => {

    return (
        <div className={ `${ Visible ? "visible": "invisible" } absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-white p-12` }>
            <h1 className="font-poppins font-black text-6xl mb-8">MENU</h1>

            {/* Links */}
            <Link className="menuLink" to="/windspeed">Windspeed</Link>
            <Link className="menuLink" to="/temperature">Temperature</Link>
            <Link className="menuLink" to="/dew">Dew / Frost</Link>
            <Link className="menuLink" to="/humidity">Humidity</Link>
            <Link className="menuLink" to="/precipitation">Precipitation</Link>
            <Link className="menuLink" to="/custom">Custom Chart</Link>
            
        </div>
    )

}

export default Sidebar;