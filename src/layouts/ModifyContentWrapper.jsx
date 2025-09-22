
export default function ModifyContentWrapper({ children }) {
    
    return (
        <div className="flex flex-col py-3 h-full bg-yellow-950/50 rounded-xl">
            {children}
        </div>
    )
}