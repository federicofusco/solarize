import Papa from "papaparse";

const useCsv = () => {

    const processCsv = path => {
        return new Promise ( ( resolve, _reject ) => {
            Papa.parse ( path, {
                download: true,
                complete: result => resolve ( result ),
                worker: true,
                header: true,
            });
        });
    } 

    return {
        processCsv,
    }

}

export default useCsv;