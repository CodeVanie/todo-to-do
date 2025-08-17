
function TaskItem({ task, className }) {
    return (
        <li>
            <span>{task.text}</span>
            <div className={`flex items-center ${className}`}>
                <div>{task.prirty}</div>
                <div>{task.category}</div>
                <div>{task.duedate}</div>
            </div>
        </li>
    )
}

export default TaskItem