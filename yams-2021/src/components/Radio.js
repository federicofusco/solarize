const Radio = ({ Value, Ref, OnChange, Group }) => {

    return (
        <div className="my-3">
            <input onChange={ OnChange.bind ( this ) } ref={ Ref } type="radio" id={ Value } name={ Group } value={ Value } />
            <label className="ml-4" htmlFor={ Value }>
                <h3 className="font-poppins text-lg inline-block">{ Value }</h3>
            </label>
        </div>
    )

}

export default Radio;