
function Priority({ value, onChange }) {
    return (
        <fieldset className='space-y-1 flex-1'>
            <label>PRIORITY</label>
            <div className='flex font-bold text-xl justify-evenly px-3 gap-x-4'>
                <label className={`flex-1 grid place-items-center py-2 rounded-full border-3 select-none cursor-pointer hover:scale-110 transition duration-200 
                    ${value == "!" ? "scale-110 border-dotted text-red-950" : "border-yellow-700 border-dotted text-yellow-700"}`}>
                    <input type="radio" name="priority" value="!" checked={value === "!"} 
                    className="hidden" onChange={() => onChange("!")}/>
                    !
                </label>
                <label className={`flex-1 grid place-items-center py-2 rounded-full border-3 select-none cursor-pointer hover:scale-110 transition duration-200 
                    ${value == "!!" ? "scale-110 border-dashed text-red-950" : "border-yellow-700 border-dashed text-yellow-700"}`}>
                    <input type="radio" name="priority" value="!!" checked={value === "!!"} 
                    className="hidden" onChange={() => onChange("!!")}/>
                    !!
                </label>
                <label className={`flex-1 grid place-items-center py-2 rounded-full border-3 select-none cursor-pointer hover:scale-110 transition duration-200 
                    ${value == "!!!" ? "scale-110 text-red-950" : "text-yellow-700"}`}>
                    <input type="radio" name="priority" value="!!!" checked={value === "!!!"} 
                    className="hidden" onChange={() => onChange("!!!")}/>
                    !!!
                </label>
            </div>
        </fieldset>
    )
}

export default Priority