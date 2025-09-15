
export default function Sheet({ title, onSelect, isSelected, children }) {
    
    return (
        <div className={`shrink-0 basis-full rounded-3xl snap-center max-w-xl overflow-hidden border-x-5 border-ptlbrown-300
             ${isSelected ? "border-dotted" : "border-none"}`}>
            <h1 className="py-2 text-center text-2xl font-bold text-yellow-950 bg-ptlbrown-100/50 cursor-pointer" onClick={onSelect}>
                {title}
            </h1>
            
            {children}
        </div>
    )
}