const Navbar = () => {

    return (
        <div className="w-full fixed h-16 shadow-md flex justify-between px-4">

            {/* Hamburger Icon */}
            <div className="my-auto">
                <i className="text-2xl fas fa-bars"></i>
            </div>

            {/* App Name */}
            <h1 className="font-poppins my-auto font-bold text-4xl">Name</h1>

            <div></div>
        </div>
    );

}

export default Navbar;