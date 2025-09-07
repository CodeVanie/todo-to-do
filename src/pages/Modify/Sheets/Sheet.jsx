
function Sheet({ title, onSelect, isSelected, children }) {
    return (
        <div className={`shrink-0 basis-full rounded-3xl snap-center max-w-xl border-5 border-dotted overflow-hidden 
             ${isSelected ? "border-yellow-600" : "border-amber-50/0"}`}>
            <h1 className="py-2 text-center rounded-t-3xl font-bold text-ptlbrown-100 bg-red-700/25 cursor-pointer" onClick={onSelect}>
                {title}
            </h1>
            <div className="max-h-[70vh] bg-ptlbrown-100/75 overflow-y-auto scrollbar-hide">
                {children}
            </div>
        </div>
    )
}

export default Sheet