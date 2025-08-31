import { useState } from "react"

function TodoItem({ todo }) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <li className="flex flex-col shrink-0 justify-between items-center w-full h-14 bg-red-950/75 font-bold text-2xl rounded-4xl text-ptlbrown-200">
            <span>{todo.label}</span>
            <div className="flex items-center w-7/8 h-5 text-sm rounded-t-2xl bg-yellow-900/75 p-1 justify-around gap-x-1 border border-ptlbrown-100">
                <div>{todo.priority}</div>
                <div>{todo.category}</div>
                <div>{todo.deadline.label}</div>
                <div onClick={() => setIsFavorite(!isFavorite)} className="cursor-pointer">
                    {isFavorite ? "❤️" : "🩶"}
                </div>
            </div>
        </li>
    )
}

export default TodoItem