import { useState } from "react";
import CategoryOptions from "./CategoryOptions";

export default function Category({ value, onChange }) {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className='space-y-1 flex-1'>
            <label>CATEGORY</label>
            <div className="relative">
                <button className={`select-category-button 
                ${value ? "border-red-950" : "border-yellow-700"}`} type='button' 
                    onClick={() => setShowOptions(!showOptions)}>
                    ▼<span>{value.toUpperCase() || `SELECT A CATEGORY`}</span>▼
                </button>
                <CategoryOptions 
                    onChange={onChange} 
                    showOptions={showOptions} 
                    setShowOptions={setShowOptions} />
            </div>
        </div>
    )
}