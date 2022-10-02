const Legend = ({ toggleDeepMoonQuakes, toggleShallowMoonQuakes, toggleNaturalImpacts, toggleStations }) => {
    return (
        <>
            <p className="text-white font-poppins uppercase font-black text-3xl mt-8">Legend</p>
            <div className="w-full pm-8">
                <div className="flex justify-between mt-3">
                    <div className="flex justify-start mt-3">
                        <div style={{ backgroundColor: "#0000ff" }} className="w-7 h-7 rounded-full text-transparent">a</div>
                        <p className="text-white font-poppins ml-2 my-auto text-xl">Station</p>
                    </div>
                    <input onChange={event => toggleStations ( event.target.checked ) } type="checkbox" id="station" name="station" value="station" />
                </div>

                <div className="flex justify-between mt-3">
                    <div className="flex justify-start mt-3">
                        <div style={{ backgroundColor: "#ff0000" }} className="w-7 h-7 rounded-full text-transparent bg-green-400">a</div>
                        <p className="text-white font-poppins ml-2 my-auto text-xl">Natural Impact</p>
                    </div>
                    <input onChange={event => toggleNaturalImpacts ( event.target.checked ) } type="checkbox" id="natural" name="natural" value="natural" />
                </div>

                <div className="flex justify-between mt-3">
                    <div className="flex justify-start mt-3">
                        <div style={{ backgroundColor: "#00ff00" }} className="w-7 h-7 rounded-full text-transparent bg-green-400">a</div>
                        <p className="text-white font-poppins ml-2 my-auto text-xl">Shallow Moonquake</p>
                    </div>
                    <input onChange={event => toggleShallowMoonQuakes ( event.target.checked ) } type="checkbox" id="shallow" name="shallow" value="shallow" />
                </div>

                <div className="flex justify-between mt-3">
                    <div className="flex justify-start mt-3">
                        <div style={{ backgroundColor: "#00ffff" }} className="w-7 h-7 rounded-full text-transparent bg-green-400">a</div>
                        <p className="text-white font-poppins ml-2 my-auto text-xl">Deep Moonquake</p>
                    </div>
                    <input onChange={event => toggleDeepMoonQuakes ( event.target.checked ) } type="checkbox" id="deep" name="deep" value="deep" />
                </div>
            </div>
        </>
    )
}

export default Legend;