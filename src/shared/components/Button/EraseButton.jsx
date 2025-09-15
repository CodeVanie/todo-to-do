import { EraseIcon } from "../../icons/IconCollection";

export default function EraseButton({ onErase }) {
    
    return (
        <button onClick={onErase} className="absolute top-2 left-2 active:scale-110 hover:scale-110 cursor-pointer text-red-950 transition-out-200">
            <EraseIcon className="w-10 h-10 text-red-950" />
        </button>
    )
}