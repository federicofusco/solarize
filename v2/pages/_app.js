// Imports styles
import '../styles/globals.css'

// Imports notification provider
import { SnackbarProvider } from "notistack";

const SolarizeApp = ({ Component, pageProps }) => {
	return ( 
		<SnackbarProvider autoHideDuration={ 5000 } maxSnack={ 1 } preventDuplicate>
			<Component {...pageProps} />
		</SnackbarProvider>
	)
}

export default SolarizeApp;
