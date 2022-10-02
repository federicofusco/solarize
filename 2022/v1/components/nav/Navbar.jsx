import Logo from "./Logo";
import SidebarIcon from "./SidebarIcon";

const Navbar = ({ onClick }) => {
    return <div className="w-screen h-20 bg-hiati top-0 left-0 flex px-8">
        <SidebarIcon onClick={ onClick } />
        <Logo />
    </div>
}

export default Navbar;