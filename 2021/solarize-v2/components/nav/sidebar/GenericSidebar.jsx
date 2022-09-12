/**
 * Displays a sidebar on the screen
 * 
 * @param visible - Whether or not the menu should be visible 
 * @param toggleSidebar - A function which toggles the menu's visibility
 * @param title - The menu's title
 * @param children - The menu's components
 * @returns A sidebar
 */
const GenericSidebar = ({ visible, toggleSidebar, title, children }) => {

	return (
		<div className={`overflow-auto transition-all duration-150 z-50 w-screen sm:w-1/2 md:w-2/5 lg:w-1/3 h-screen border-r border-gray-300 fixed transform top-1/2 left-0 ${ visible ? "translate-x-0 -translate-y-1/2" : "-translate-x-full -translate-y-1/2" } bg-white px-8 pb-6`}>
				
				<div className="w-full h-20 mt-8 sm:mt-0 flex justify-between">

					{/* Title */}
					<h1 className="font-poppins font-bold text-4xl my-auto">{ title }</h1>

					{/* Close button */}
					<div onClick={ toggleSidebar } className="h-14 w-14 flex justify-center my-auto">
						<i aria-hidden className="my-auto text-3xl text-gray-700 fas fa-times"></i>
					</div>
				</div>

				{ children }
		</div>
	)

}

export default GenericSidebar;