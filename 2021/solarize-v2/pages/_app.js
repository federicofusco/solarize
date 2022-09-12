// Imports styles
import '../styles/globals.css'

// Imports notification provider
import { SnackbarProvider } from "notistack";

const SolarizeApp = ({ Component, pageProps }) => {
	return ( 
		<SnackbarProvider autoHideDuration={ 1500 } maxSnack={ 3 } preventDuplicate>
			<Component {...pageProps} />
		</SnackbarProvider>
	)
}

export default SolarizeApp;
