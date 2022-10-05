import Link from "next/link";

/**
 * A link used in the menu sidebar
 * 
 * @param text - The link's text
 * @param href - The link pointer 
 * @returns A link
 */
const CoreLink = ({ text, href }) => {
	return (
		<Link href={ href }><p className="font-poppins mb-3 block text-2xl text-green-500 font-semibold">{ text }</p></Link>
	)
}

export default CoreLink;