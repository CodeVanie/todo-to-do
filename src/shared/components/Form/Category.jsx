import { useState } from "react";
import CategoryOptions from "./CategoryOptions";

function Category({ value, onChange }) {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className='modal-form-field'>
            <label htmlFor='select-category'>
                CATEGORY
            </label>
            <div className="relative w-full">
                <button className={`${value ? "border-red-950" : "border-yellow-700"} flex w-full text-base bg-ptlbrown-100 border-2 text-red-950 px-4 py-2 rounded justify-between items-center cursor-pointer hover:text-lg transition-[font-size] duration-200 tracking-widest`}  
                type='button' onClick={() => setShowOptions(!showOptions)} >
                    <span className="ml-2">▼</span>
                    <span className={`${value && "font-bold text-lg"}`}>{value.toUpperCase() || `SELECT A CATEGORY`}</span>
                    <span className="ml-2">▼</span>
                </button>
                <CategoryOptions 
                    onChange={onChange} 
                    showOptions={showOptions} 
                    setShowOptions={setShowOptions} />
            </div>
        </div>
    )
}

export default Category