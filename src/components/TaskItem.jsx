
function TaskItem({ task }) {
    return (
        <li>
            <span>{task.text}</span>
            <div className="page-home-list-item-propery">
                <div>{task.prirty}</div>
                <div>{task.category}</div>
                <div>{task.duedate}</div>
            </div>
        </li>
    )
}

export default TaskItem