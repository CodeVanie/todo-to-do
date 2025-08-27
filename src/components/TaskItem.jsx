import { useState } from "react"

function TaskItem({ task }) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <li>
            <span>{task.title}</span>
            <div className="page-home-list-item-propery">
                <div>{task.priority}</div>
                <div>{task.category}</div>
                <div>{task.deadline.label}</div>
                <div onClick={() => setIsFavorite(!isFavorite)} className="cursor-pointer">
                    {isFavorite ? "❤️" : "🩶"}
                </div>
            </div>
        </li>
    )
}

export default TaskItem