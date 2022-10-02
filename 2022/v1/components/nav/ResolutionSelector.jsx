const ResolutionSelector = ({ onChangeCallback }) => {

    const updateResolution = event => {
        onChangeCallback ( event.target.value );
    }

    return (
        <>
            <p className="text-white font-poppins uppercase font-black text-3xl mt-8">Resolution</p>

            <div onChange={ updateResolution }>
                <input type="radio" id="1024x512" name="resolution" value="1024x512" />
                <label htmlFor="1024x512" className="text-white font-poppins text-xl ml-4 my-auto">1024x512</label><br />

                <input type="radio" id="2048x1024" name="resolution" value="2048x1024" />
                <label htmlFor="2048x1024" className="text-white font-poppins text-xl ml-4 my-auto">2048x1024</label><br />

                <input type="radio" id="4096x2048" name="resolution" value="4096x2048" />
                <label htmlFor="4096x2048" className="text-white font-poppins text-xl ml-4 my-auto">4096x2048</label><br />
            </div>
        </>
    )
}

export default ResolutionSelector;