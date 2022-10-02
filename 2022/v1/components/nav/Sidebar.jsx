import Legend from "./Legend";
import ResolutionSelector from "./ResolutionSelector";

const Sidebar = ({ visible, toggleSidebar, onResolutionChange, toggleDeepMoonQuakes, toggleShallowMoonQuakes, toggleNaturalImpacts, toggleStations }) => {
    return (
        <div className={`overflow-auto transition-all duration-150 z-50 w-screen sm:w-1/2 md:w-2/5 lg:w-1/3 h-screen fixed transform top-1/2 left-0 ${ visible ? "translate-x-0 -translate-y-1/2" : "-translate-x-full -translate-y-1/2" } bg-hiati px-8 pb-6`}>
				
				<div className="w-full h-20 mt-8 sm:mt-0 flex justify-between">

					{/* Title */}
					<h1 className="font-poppins font-bold text-white text-4xl my-auto">Settings</h1>

					{/* Close button */}
					<div onClick={ toggleSidebar } className="h-14 w-14 flex justify-center my-auto">
						<i aria-hidden className="my-auto text-white text-3xl fas fa-times"></i>
					</div>
				</div>

				<ResolutionSelector onChangeCallback={ onResolutionChange } />

                <Legend 
					toggleDeepMoonQuakes={ toggleDeepMoonQuakes }
					toggleShallowMoonQuakes={ toggleShallowMoonQuakes }
					toggleNaturalImpacts={ toggleNaturalImpacts }
					toggleStations={ toggleStations } />
		</div>
    )
}

export default Sidebar;