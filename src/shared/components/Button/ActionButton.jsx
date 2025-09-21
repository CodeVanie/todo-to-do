import { ActionButtonIcon } from "../../icons/IconCollection"

const base = "rounded-full border-2 shadow-[2px_0_8px_#160403,-2px_0_8px_#160403] transition-out-200";
const sizes = {
    sm: "w-8 p-1 intrct-btn-1",
    md: "w-14 p-2 intrct-btn-2",
    lg: "w-22 p-3 intrct-btn-2"
};
const variants = {
    cream: "bg-ptlbrown-100 text-red-950 disabled:bg-ptlbrown-100/20",
    wine: "bg-yellow-950 text-ptlbrown-200 disabled:bg-yellow-950/20"
}

export default function ActionButton({ onClick, name, size, variant, className, isActive = true }) {
    
    return (
        <button onClick={onClick} disabled={!isActive} 
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
            <ActionButtonIcon name={name} />
        </button>
    )    
}
