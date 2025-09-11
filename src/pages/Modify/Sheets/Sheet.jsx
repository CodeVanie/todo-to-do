
export default function Sheet({ title, onSelect, isSelected, children }) {
    return (
        <div className={`shrink-0 basis-full rounded-3xl snap-center max-w-xl overflow-hidden border-x-5 border-ptlbrown-300
             ${isSelected ? "border-solid" : "border-none"}`}>
            <h1 className="py-2 text-center rounded-t-3xl font-bold text-ptlbrown-100 bg-red-700/25 cursor-pointer" onClick={onSelect}>
                {title}
            </h1>
            
            {children}
        </div>
    )
}