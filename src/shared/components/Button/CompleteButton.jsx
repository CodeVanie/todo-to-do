
export default function CompleteButton({ onClick, isCompleted }) {
    return (
        <button onClick={onClick} className={`mt-3 py-2 px-4 border-2 border-green-900 rounded-4xl bg-green-800 hover:bg-green-700 block mx-auto transition-allin-300 w-full font-bold  
            ${isCompleted ? "inset-shadow-sm tracking-[10px] inset-shadow-green-900 text-ptlbrown-100 max-w-3xs hover:max-w-full" : 
            "text-ptlbrown-100 shadow-md shadow-black active:scale-95"}`}>
        {isCompleted ? "COMPLETED" : "✔ Mark as Done"}
        </button>
    )
}