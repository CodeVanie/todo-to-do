
export default function SheetList({ children }) {
    
    return (
        <div className="max-h-[70vh] overflow-y-auto scrollbar-hide bg-maroon/75">
            <ol>
                {children}
            </ol>
        </div>
    )
}