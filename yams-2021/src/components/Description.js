// Imports React Router components
import { Link } from "react-router-dom";

const Description = ({ Name, Description, Sources, Uses }) => {

    return (
        <div className="w-full py-4 px-12">

            <h1 className="text-2xl font-poppins font-extrabold mb-3">{ Name }</h1>
            <p className="text-md font-source-sans">{ Description }</p>
            <Link to={ Sources } className="text-sm font-semibold text-blue-600 font-source-sans block mt-4">Sources</Link>

            <h1 className="text-xl font-poppins font-bold mt-6 mb-3">Uses</h1>
            { Uses.map ( ( use, i ) => {

                return (
                    <div className="w-full mt-3">
                        <p className="text-md font-poppins font-semibold">{ i + 1 }. { use.title }</p>
                        <p className="text-md font-source-sans">{ use.content }</p>
                    </div>
                )

            })}

        </div>
    )

}

export default Description;