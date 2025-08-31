import SheetItem from "./SheetItem"

function SheetList({ type, itemList }) {
    return (
        <ol className="flex flex-col w-full overflow-y-auto">
            {itemList.map((item) => 
                <SheetItem key={item.id} type={type} item={item}/>
            )}
        </ol>
    )
}

export default SheetList