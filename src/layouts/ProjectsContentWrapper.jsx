
export default function ProjectsContentWrapper({ children }) {
    return (
        <div className="p-10 z-1 relative max-w-7xl mx-auto h-full space-y-10 bg-yellow-950/50 rounded-xl">
            {children}
        </div>
    )
}