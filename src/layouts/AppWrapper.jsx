
export default function AppWrapper({ children }) {
    return (
        <div className="flex flex-col h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-ptlbrown-100 scrollbar-track-red-950">
            {children}
        </div>
    )
}