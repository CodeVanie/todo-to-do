import { ActionButtonIcon } from "../../icons/IconCollection"

export default function ActionButton({ isActive = true, name, onClick }) {
    
    return (
        <button onClick={onClick} disabled={!isActive} 
        className='bg-ptlbrown-100 rounded-full border-2 border-red-950 w-14 p-2 enabled:cursor-pointer enabled:hover:scale-110 transition-out-200 disabled:bg-ptlbrown-100/20 disabled:border-red-950/20 shadow-[2px_0_8px_#160403,-2px_0_8px_#160403]'>
            <ActionButtonIcon name={name} className="text-red-950"/>
        </button>
    )    
}
