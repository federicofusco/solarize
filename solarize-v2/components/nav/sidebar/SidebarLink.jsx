import Link from "next/link";

const SidebarLink = ({ text, href }) => {
	return (
		<Link href={ href }><p className="font-poppins mb-3 block text-2xl text-green-500 font-semibold">{ text }</p></Link>
	)
}

export default SidebarLink;