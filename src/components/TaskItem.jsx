
function TaskItem({ task }) {
    return (
        <li>
            <span>{task.title}</span>
            <div className="page-home-list-item-propery">
                <div>{task.priority}</div>
                <div>{task.category}</div>
                <div>{task.deadline}</div>
            </div>
        </li>
    )
}

export default TaskItem