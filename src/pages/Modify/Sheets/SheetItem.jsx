import { useNavigate } from "react-router-dom"

export default function SheetItem({ item, onSelect, selected, isTodo }) {
    const navigate = useNavigate();
    return (
        <li onMouseDown={onSelect} onDoubleClick={() => isTodo && navigate(`view/${item.id}`)}
            className={`text-center py-4 font-bold border-b-3 border-yellow-900 text-2xl text-ptlbrown-100 cursor-pointer ${selected.has(item.id) ? 'bg-ptlbrown-300/20 hover:bg-ptlbrown-300/20' : 
                "hover:bg-ptlbrown-300/10 active:bg-ptlbrown-300/10"}`}>
            <span>{item.label}</span>
        </li>
    )
}