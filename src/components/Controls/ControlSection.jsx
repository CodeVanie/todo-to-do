import ControlItem from "./ControlItem";

function ControlSection({ title, items, onControlClick, control }) {
    return (
        <section className="flex flex-col pb-2">
            <h3 className="font-bold self-center">{title}</h3>
            <ol className="grid grid-cols-3 gap-2">
                {items.map((item, index) => 
                    <ControlItem key={index} itemLabel={item.label} 
                        onClick={() => onControlClick(item.label)} 
                            isActive={control === item.label} />
                )}
            </ol>
        </section>
    )
}

export default ControlSection