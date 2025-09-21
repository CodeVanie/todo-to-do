
export default function NotifFilterButton({ onFilter, isSelected, children }) {
    
    return (
        <button onClick={onFilter} className={`flex-1 md:px-6 md:py-2 md:text-lg text-sm px-4 rounded-full border-2 border-red-950/50  hover:bg-red-950 hover:border-ptlbrown-100 shadow-xl/30 shadow-black 
            ${isSelected ? "bg-red-950" : "bg-red-950/50"}`}>
            {children}
        </button>
    )
}