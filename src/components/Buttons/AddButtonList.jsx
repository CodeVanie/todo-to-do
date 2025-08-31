import { useContext } from "react"
import { DataContext } from "../../App";

function AddButtonList() {
    const { isAddModalOpen, setIsAddModalOpen } = useContext(DataContext);
    return (
        <button 
            className="flex justify-center items-center shrink-0 h-14 text-3xl bg-red-950/75 text-ptlbrown-100 font-bold mb-2 rounded-4xl shadow-[2px_0_8px_#160403,-2px_0_8px_#160403]" 
            onClick={() => setIsAddModalOpen(!isAddModalOpen)}>
            +
        </button> 
    )
}

export default AddButtonList