
export default function AppWrapper({ children }) {
    
    return (
        <div id="appwrapper" className="flex flex-col h-dvh overflow-y-auto scrollbar-thin scrollbar-thumb-ptlbrown-100 scrollbar-track-red-950">
            {children}
        </div>
    )
}