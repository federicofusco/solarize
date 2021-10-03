// Imports Chart.js
import { Line } from "react-chartjs-2";

const Chart = ({ Data, Options }) => {

    return (
        <div className="w-full px-4 my-8">
            <div className="w-full p-2 bg-gray-100 bg-opacity-50 rounded-lg">
                <Line data={ Data } options={ Options } />
            </div>
        </div>
    )

}

export default Chart;