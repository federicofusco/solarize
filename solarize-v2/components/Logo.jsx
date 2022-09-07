import Image from "next/image";
import LogoSvg from "../public/logo.svg";

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
	return <Image src={ LogoSvg } alt="Logo" />
}

export default Logo;