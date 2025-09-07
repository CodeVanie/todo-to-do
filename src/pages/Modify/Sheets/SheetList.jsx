import SheetItem from "./SheetItem"

function SheetList({ type, itemList }) {
    return (
        <ol>
            {itemList.map((item) => 
                <SheetItem key={item.id} type={type} item={item}/>
            )}
        </ol>
    )
}

export default SheetList