
export default function Sheet({ title, onSelect, isSelected, children }) {
    
    return (
        <div className={`lg:flex-1 shrink-0 basis-full rounded-3xl snap-center snap-always max-w-lg overflow-hidden border-x-5 border-amber-700/75
             ${isSelected ? "border-dotted" : "border-none max-md:pointer-events-none"}`}>
            <h1 className={`py-2 text-center text-2xl font-bold text-yellow-950 cursor-pointer 
                ${isSelected ? "bg-ptlbrown-100" : "bg-ptlbrown-100/60 hover:bg-ptlbrown-100/70"}`} onClick={onSelect}>
                {title}
            </h1>
            
            {children}
        </div>
    )
}