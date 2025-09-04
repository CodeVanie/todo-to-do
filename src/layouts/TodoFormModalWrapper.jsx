
export default function TodoFormModalWrapper({ isOpen, children }) {
    return (
        <div className={`flex flex-col w-full h-full relative p-3 items-center bg-ptlbrown-100 sm:border-20 border-3 sm:border-double border-red-950 max-w-3xl scrollbar-hide sm:max-h-[80vh] rounded-3xl overflow-y-auto  ${isOpen ? "animate-modalentry" : "animate-modalexit"}`}>
            {children}
        </div>
    )
}