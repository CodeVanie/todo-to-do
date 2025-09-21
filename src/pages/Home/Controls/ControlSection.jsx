import ControlItem from "./ControlItem";

export default function ControlSection({ title, items, onControlClick, control }) {
    
    return (
        <section>
            <h3>{title}</h3>

            <ol className="grid grid-cols-3 gap-2 pb-2">
                {items.map((item, index) => 
                    <ControlItem key={index} itemLabel={item.label} 
                        onClick={() => onControlClick(item.id)} 
                            isActive={control === item.id} />
                )}
            </ol>
        </section>
    )
}