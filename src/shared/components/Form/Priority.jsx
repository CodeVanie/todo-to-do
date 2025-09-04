
function Priority({ value, onChange }) {
    const lowPriorityClass = `${value == "!" ? "border-red-950 scale-110 border-dotted text-red-950" : 
                                                "border-yellow-700 border-dotted text-yellow-700"}`
    const midPriorityClass = `${value == "!!" ? "border-red-950 scale-110 border-dashed text-red-950" : 
                                                "border-yellow-700 border-dashed text-yellow-700"}`
    const highPriorityClass = `${value == "!!!" ? "border-red-950 scale-110 text-red-950" : 
                                                "border-yellow-700 text-yellow-700"}`
    return (
        <div className='modal-form-field'>
            <label>PRIORITY</label>
            <div className='modal-form-priority'>
                <h3 className={lowPriorityClass} onClick={() => onChange("!")}>!</h3>
                <h3 className={midPriorityClass} onClick={() => onChange("!!")}>!!</h3>
                <h3 className={highPriorityClass} onClick={() => onChange("!!!")}>!!!</h3>
            </div>
        </div>
    )
}

export default Priority