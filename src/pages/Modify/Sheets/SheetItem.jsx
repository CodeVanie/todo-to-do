
export default function SheetItem({ item, onSelect, selected }) {
    
    return (
        <li onMouseDown={onSelect}
            className={`text-center py-4 px-3 font-bold border-b-3 border-yellow-900 text-2xl text-ptlbrown-100 cursor-pointer ${selected.has(item.id) ? 'bg-ptlbrown-300/20 hover:bg-ptlbrown-300/20' : 
                "hover:bg-ptlbrown-300/10 active:bg-ptlbrown-300/10"}`}>
            <span className="block overflow-hidden w-full whitespace-nowrap">{item.label}</span>
        </li>
    )
}