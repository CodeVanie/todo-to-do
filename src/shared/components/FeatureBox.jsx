
export default function FeatureBox({ children, size, variant }) {
    const base = "rounded-lg flex justify-center hvr-radial-out select-none items-center group";
    const sizes = {
        sm: `h-5 flex-1 px-1 basis-auto ring-1 gap-x-1 ${children.length <= 2 && "max-w-[130px]"}`,
        lg: "px-3 py-2 ring-2 gap-x-3"
    }
    const variants = {
        folio: "ring-purple-400 text-ptlpink bg-ptlpink/20 before:bg-ptlpink hover:text-purple-950 focus:text-purple-950 active:text-purple-950",
        todo: "ring-ptlbrown-100 text-ptlbrown-100 bg-ptlbrown-100/20 before:bg-ptlbrown-100  hover:text-red-950 focus:text-red-950 active:text-red-950",
        quiz: "ring-[#a6b1ff] text-[#a6b1ff] bg-[#a6b1ff]/20 before:bg-[#a6b1ff] hover:text-[#0b002e] focus:text-[#0b002e] active:text-[#0b002e]"
    }
    return (
        <div className={`${base} ${sizes[size]} ${variants[variant]}`}>
            {children}
        </div>
    )
}