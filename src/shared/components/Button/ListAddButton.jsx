function ListAddButton({ openModal }) {
    return (
        <button 
            className="text-3xl bg-ptlbrown-100/70 text-red-950 font-bold rounded-full shadow-[2px_0_8px_#160403,-2px_0_8px_#160403] cursor-pointer absolute z-10 bottom-3 right-3 w-20 h-20 hover:scale-110" 
            onClick={openModal}>
            +
        </button> 
    )
}

export default ListAddButton