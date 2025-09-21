import { useContext } from "react"
import { ControlContext } from "./Controls"

export default function ControlItem({ itemLabel, onClick, isActive }) {
    const {setShowControl} = useContext(ControlContext);

    function closeControl() {
        setShowControl(false);
        onClick()
    }
    
    return (
        <li className="grid">
            <button onMouseDown={closeControl} className={`py-2 rounded-3xl border-2
            ${isActive ? "bg-red-950 hover:border-ptlbrown-100 text-ptlbrown-100 border-red-950" : 
                         "bg-ptlbrown-100 hover:border-red-950 text-red-950 border-ptlbrown-100"}`}>
                {itemLabel}
            </button> 
        </li>
    )
}