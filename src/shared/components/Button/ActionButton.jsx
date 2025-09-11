import { ActionButtonIcon } from "../../icons/IconCollection"

export default function ActionButton({ name, onClick }) {
    return (
        <button className='bg-ptlbrown-100 rounded-full border-2 border-red-950 w-14 p-2 cursor-pointer hover:scale-110 transition-out-200' 
             onClick={onClick}>
            <ActionButtonIcon name={name} className="text-red-950"/>
        </button>
    )    
}
