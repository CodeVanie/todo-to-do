import { useNavigate } from "react-router-dom"

export default function SheetItem({ item, onSelect, selected, isTodo }) {
    const navigate = useNavigate();
    return (
        <li onMouseDown={onSelect} onDoubleClick={() => isTodo && navigate(`view/${item.id}`)}
            className={`text-center py-4 font-bold border-b-3 border-yellow-900 text-2xl cursor-pointer text-ptlbrown-100 ${selected.has(item.id) ? 'bg-red-950 hover:bg-red-950' : 
                "hover:bg-red-950/40 active:bg-red-950/40"}`}>
            <span>{item.label}</span>
        </li>
    )
}