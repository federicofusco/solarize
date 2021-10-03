const Input = ({ Type, Placeholder, Ref }) => {

    return <input className="w-full p-4 rounded-md mb-3 outline-none font-poppins" type={ Type } placeholder={ Placeholder } ref={ Ref } required />

}

export default Input;