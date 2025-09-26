
export default function AppWrapper({ children }) {
    
    return (
        <div className="flex flex-col min-h-dvh">
            {children}
        </div>
    )
}