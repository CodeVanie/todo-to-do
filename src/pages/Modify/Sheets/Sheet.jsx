
function Sheet({ title, children }) {
    return (
        <div className="flex flex-col shrink-0 w-full h-[73vh] rounded-3xl snap-center max-w-xl">
            <h1 className="flex text-center rounded-t-3xl h-10 justify-center items-center font-bold flex-shrink-0 text-ptlbrown-100 relative bg-red-700/25 border-dashed border-2 border-ptlbrown-100/50">{title}</h1>
            <div className="flex w-full h-full rounded-b-3xl bg-ptlbrown-100/75 justify-center overflow-hidden">
                {children}
            </div>
        </div>
    )
}

export default Sheet