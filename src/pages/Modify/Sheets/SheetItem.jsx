import { useContext } from "react"
import { SheetContext } from "../ModifyContent"

function SheetItem({ item, type }) {
    const { selectedItems, handleSelectedItems } = useContext(SheetContext);
    return (
        <li onClick={() => handleSelectedItems(item, type)} 
            className={`flex w-full shrink-0 flex-col justify-around items-center h-18 font-bold border-b-3 border-yellow-900 text-2xl hover:bg-ptlbrown-200 active:bg-ptlbrown-200 cursor-pointer
            ${selectedItems.has(item) && 'bg-ptlbrown-300'}`}>
            <div>{item.label}</div>
        </li>
    )
}

export default SheetItem