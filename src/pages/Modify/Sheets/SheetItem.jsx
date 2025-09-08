
function SheetItem({ item, onSelect, selected }) {
    
    return (
        <li onClick={onSelect} 
            className={`text-center py-4 font-bold border-b-3 border-yellow-900 text-2xl hover:bg-ptlbrown-200 active:bg-ptlbrown-200 cursor-pointer 
            ${selected.has(item.id) && 'bg-ptlbrown-300 hover:bg-ptlbrown-300'}`}>
            <div>{item.label}</div>
        </li>
    )
}

export default SheetItem