
export default function NotifContentWrapper({ children }) {
    
    return (
        <div className="max-w-4xl p-3 mx-auto relative z-1 space-y-3 rounded-xl border-x bg-yellow-900/50 h-full border-ptlbrown-100">
            {children}
        </div>
    )
}