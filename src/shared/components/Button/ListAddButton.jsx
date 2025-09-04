import { ActionButtonIcon } from "../../icons/IconCollection"

function ListAddButton({ openModal }) {
    return (
        <button 
            className="bg-yellow-950/75 font-bold rounded-full shadow-[2px_0_8px_#160403,-2px_0_8px_#160403] cursor-pointer absolute z-1 bottom-3 right-3 p-3 hover:scale-110 hover:bg-yellow-950 border-2 border-ptlbrown-200 transition duration-200 ease-in-out active:bg-yellow-950 active:scale-105" 
            onClick={openModal}>
            <ActionButtonIcon name="addrow" className="text-ptlbrown-200 w-14 h-14 transition duration-200 ease-in-out" fillInside="#e7b57400"/>
        </button> 
    )
}

export default ListAddButton