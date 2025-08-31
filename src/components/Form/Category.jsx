import { useState } from "react";
import CategoryOptions from "./CategoryOptions";

function Category({ value, onChange }) {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className='modal-form-field'>
            <label htmlFor='select-category' className='items-center'>
                Category: 
            </label>
            <div className="relative">
                <button className="flex w-48 bg-ptlbrown-100 border border-red-950 text-red-950 px-4 py-2 rounded justify-between items-center" 
                type='button' onClick={() => setShowOptions(!showOptions)} >
                    {value || `Select a category`}
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