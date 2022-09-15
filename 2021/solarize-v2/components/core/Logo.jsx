import Image from "next/image";
import LogoSvg from "./../../public/logo.svg";

/**
 * Displays a logo
 * 
 * @returns A Logo
 * @example
 * import Logo from "./Logo";
 * 
 * <Logo />
 */
const Logo = () => {
	
	/* Logo */
	/* Logo provided by Logoipsum */
	/* https://www.logoipsum.com */
	return <Image 
		src={ LogoSvg } 
		alt="Logo"
		width={ 36 }
		height={ 36 } 
		className="w-9 h-9" />
}

export default Logo;