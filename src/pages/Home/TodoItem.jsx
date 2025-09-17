import { useNavigate } from "react-router-dom"
import { HeartIcon } from "../../shared/icons/IconCollection"
import { toLocaleDate } from "../../utils"

export default function TodoItem({ todo }) {
    const navigate = useNavigate();
    const isCompleted = todo.status === "Completed";
    return (
        <li className={`home-todo ${isCompleted ? "home-todo-completed group" : "home-todo-notcompleted"}`} onClick={() => navigate(`view/${todo.id}`)}>
            <h2 className="home-todo-title">{todo.label}</h2>
            <div className={`home-todo-deets ${isCompleted ? "home-todo-deets-completed group-hover:w-7/8" : "home-todo-deets-notcompleted"}`}>
                {isCompleted ? 
                    <span className="tracking-widest md:tracking-[10px] transition-allout-200">COMPLETED</span> : 
                    <>
                        <span className="max-xs:hidden">{todo.priority}</span>
                        {todo.category && <span className="max-md:hidden">{todo.category}</span>}
                        <span>{toLocaleDate(todo.deadline.dueDate)}</span>
                    </>
                }
            </div>
            <HeartIcon className="home-todo-heart" fill={`${todo.favorite ? "#e7b574" : "#00000000"}`}/>
        </li>
    )
}