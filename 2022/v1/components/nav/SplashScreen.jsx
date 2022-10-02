import { useState, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Image from "next/image";

const SplashScreen = () => {

    const [open, setOpen] = useState ( true );
    useEffect ( () => { 
        setTimeout (() => setOpen( false ), [3_500] ) 
    });

    if ( open ) 
        return <div className="w-screen h-screen absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black">
            <Image layout="fill" src="/resources/splash.jpg" className="w-screen h-screen" alt="Loading..." />

            <div className="h-auto w-72 bg-black absolute transform top-1/2 left-3/4 -tranform-x-full -tranform-y-1/2">
                <LinearProgress />
            </div>
        </div>;
    else 
        return null;
}

export default SplashScreen;