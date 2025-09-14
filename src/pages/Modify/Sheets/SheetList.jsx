
export default function SheetList({ children }) {
    return (
        <div className="max-h-[70vh] overflow-y-auto scrollbar-hide bg-amber-900/20">
            <ol>
                {children}
            </ol>
        </div>
    )
}