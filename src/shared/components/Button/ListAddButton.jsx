import { ActionButtonIcon } from "../../icons/IconCollection"

export default function ListAddButton({ onClick }) {
    
    return (
        <button onClick={onClick}
            className="w-22 bg-yellow-950/75 rounded-full transition-out-200 shadow-[2px_0_8px_#160403,-2px_0_8px_#160403] cursor-pointer p-3 hover:scale-110 hover:bg-yellow-950 border-2 border-ptlbrown-200 transition-out-200 active:bg-yellow-950 active:scale-105 fixed z-25 bottom-18 right-5">

            <ActionButtonIcon name="addrow" 
            className="text-ptlbrown-200" fillInside="#e7b57400"/>
        </button> 
    )
}