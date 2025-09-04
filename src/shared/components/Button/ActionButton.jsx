import { ActionButtonIcon } from "../../icons/IconCollection"

function ActionButton({ name, onClick }) {
    return (
        <button className='bg-ptlbrown-100 rounded-full border-2 border-red-950 w-14 p-2 cursor-pointer hover:scale-110 transition duration-100 ease-in' 
             onClick={onClick}>
            <ActionButtonIcon name={name} className="text-red-950"/>
        </button>
    )    
}

export default ActionButton
