import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
	return (
		<Html>
			<Head>
				{/* <link rel="apple-touch-icon" href="/logo192.png" />
				<link rel="icon" href="/favicon64.ico" />
				<link rel="manifest" href="/manifest.json" /> */}

				<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Source+Sans+Pro:wght@400;600;700;900&display=swap" rel="stylesheet" />
				
				<script src="https://kit.fontawesome.com/9c3f387736.js" crossOrigin="anonymous" async></script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document;