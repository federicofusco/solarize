import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="overflow-hidden h-screen w-screen">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;
