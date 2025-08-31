
function FormModalWrapper({ children }) {
    return (
        <div className="flex flex-col w-full h-full relative p-3 items-center bg-ptlbrown-100 border-2 border-red-950 rounded-3xl overflow-y-auto">
            {children}
        </div>
    )
}

export default FormModalWrapper