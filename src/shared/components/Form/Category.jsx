import { useContext, useState } from "react";
import CategoryOptions from "./CategoryOptions";
import { AppContext } from "../../../context/app-context";

export default function Category({ value, onChange }) {
    const { listData } = useContext(AppContext);
    const [showOptions, setShowOptions] = useState(false);
    const hasCateg = listData[0].list.filter((c,_) => c.active).length > 0;

    return (
        <div className='space-y-1 flex-1'>
            <legend>CATEGORY</legend>
            <div className="relative">
                <button className={`select-category-button 
                ${value ? "border-red-950" : "border-yellow-700"}`} type='button' 
                    onClick={() => setShowOptions(!showOptions)}>
                    ▼<span>{value.toUpperCase() || `${hasCateg ? "SELECT A CATEGORY" : "No Available Category"}`}</span>▼
                </button>
                <CategoryOptions 
                    onChange={onChange} 
                    showOptions={showOptions} 
                    setShowOptions={setShowOptions} />
            </div>
        </div>
    )
}