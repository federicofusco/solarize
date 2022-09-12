/**
 * Displays a description
 * 
 * @param name - The description's title
 * @param description - The decription body
 * @param sources - The description's sources
 * @param uses - A list of uses
 * @returns A description
 */
const Description = ({ name, description, sources, uses }) => {
    return (
        <div className="w-full py-4 px-12">

            <h1 className="text-2xl font-poppins font-extrabold mb-3">{ name }</h1>
            <p className="text-md font-source-sans">{ description }</p>
            <a href={ sources } className="text-sm decoration-none font-semibold text-blue-600 font-source-sans block mt-4">Sources</a>

            <h1 className="text-xl font-poppins font-bold mt-6 mb-3">Uses</h1>
            { uses.map ( ( use, i ) => {

                return (
                    <div key={ i } className="w-full mt-3">
                        <p className="text-md font-poppins font-semibold">{ i + 1 }. { use.title }</p>
                        <p className="text-md font-source-sans">{ use.content }</p>
                    </div>
                )

            })}

        </div>
    )

}

export default Description;