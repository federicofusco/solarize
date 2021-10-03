const Checkbox = ({ Value, Ref, OnChange }) => {

    return (
        <div>
            <input onChange={ OnChange.bind ( this ) } ref={ Ref } type="checkbox" id={ Value } name={ Value } />
            <label className="ml-4" htmlFor={ Value }>
                <h3 className="font-poppins text-2xl inline-block">{ Value }</h3>
            </label>
        </div>
    )

}

export default Checkbox;