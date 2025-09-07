import { useContext } from "react";
import { AppContext } from "../../../context/app-context";

function CategoryOptions({ onChange, showOptions, setShowOptions }) {
    const { categories } = useContext(AppContext);

function handleCategorySelect(e) {
    document.getElementById("select-category-options").classList.add("hidden");
    setShowOptions(!showOptions);
    onChange(e.target.dataset.value);
}
    return (
        <ul id="select-category-options" className={showOptions ? "max-h-36" : "max-h-0"}>
            {categories.map((c, index) => 
                <li key={index} data-value={c.label} onClick={handleCategorySelect}>
                    {c.label.toUpperCase()}
                </li>
            )}
        </ul>
    )
}

export default CategoryOptions