import SheetItem from "./SheetItem"

function SheetList({ children }) {
    return (
        <div className="max-h-[70vh] bg-ptlbrown-100/75 overflow-y-auto scrollbar-hide">
            <ol>
                {children}
            </ol>
        </div>
    )
}

export default SheetList