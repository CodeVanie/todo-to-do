
function ControlItem({ itemLabel, onClick, isActive }) {
    return (
        <li className="grid">
            <button className={`place-items-center py-2 rounded-3xl cursor-pointer font-bold border-2
            ${isActive ? "bg-red-950 hover:border-ptlbrown-100 text-ptlbrown-100 border-red-950" : 
                         "bg-ptlbrown-100 hover:border-red-950 text-red-950 border-ptlbrown-100"}`}
                    onClick={onClick}>{itemLabel}</button> 
        </li>
    )
}

export default ControlItem