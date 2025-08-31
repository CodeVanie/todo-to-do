import { useContext } from "react"
import { SheetContext } from "../../pages/ModifyContent"

function SheetItem({ item, type }) {
    const { selectedItems, handleSelectedItems } = useContext(SheetContext);
    return (
        <li onClick={() => handleSelectedItems(item.id, type)} 
            className={`flex w-full shrink-0 flex-col justify-around items-center h-18 font-bold border-b-3 border-b-yellow-700/75 text-2xl 
            ${selectedItems.has(item.id) ? 'bg-orange-200' : 'bg-ptlbrown-100'}`}>
            <div>{item.label}</div>
        </li>
    )
}

export default SheetItem