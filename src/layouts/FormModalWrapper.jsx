
function FormModalWrapper({ isOpen, children, onAnimationEnd }) {
    return (
        <div onAnimationEnd={onAnimationEnd} className={`flex flex-col w-full h-full relative p-3 items-center bg-ptlbrown-100 border-20 border-double border-red-950 max-w-3xl max-h-[80vh] rounded-3xl overflow-y-auto  ${isOpen ? "animate-modalentry" : "animate-modalexit"}`}>
            {children}
        </div>
    )
}

export default FormModalWrapper