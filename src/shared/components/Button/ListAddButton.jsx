import { ActionButtonIcon } from "../../icons/IconCollection"

function ListAddButton({ openModal }) {
    return (
        <button 
            className="bg-ptlbrown-100/70 font-bold rounded-full shadow-[2px_0_8px_#160403,-2px_0_8px_#160403] cursor-pointer absolute z-10 bottom-3 right-3 p-3 hover:scale-110 hover:bg-ptlbrown-100 border-2 border-red-950" 
            onClick={openModal}>
            <ActionButtonIcon name="addrow" className="text-red-950 w-14 h-14"/>
        </button> 
    )
}

export default ListAddButton