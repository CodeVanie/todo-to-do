
export default function SmallModalWrapper({ isOpen, children }) {
    return (
        <div className={`flex flex-col relative p-3 items-center bg-ptlbrown-100 border-3 border-dashed  border-red-950 justify-around rounded-3xl overflow-y-auto  ${isOpen ? "animate-modalentry" : "animate-modalexit"}`}>
            {children}
        </div>
    )
}