const Input = ({ Placeholder, Label, Type, Ref }) => {

    return (
        <div className="w-full">
            <label className={ `${ Label ? "visible" : "invisible" } font-poppins font-black uppercase` }>{ Label || "hidden" }</label>
            <input className="w-full p-4 rounded-md mb-3 outline-none font-poppins border border-gray-600" type={ Type } placeholder={ Placeholder } ref={ Ref } required />
        </div>
    )

}

export default Input;