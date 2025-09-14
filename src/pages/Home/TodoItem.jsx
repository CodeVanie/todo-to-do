import { useNavigate } from "react-router-dom"
import { HeartIcon } from "../../shared/icons/IconCollection"
import { toLocaleDate } from "../../utils"

export default function TodoItem({ todo }) {
    const navigate = useNavigate();
    return (
        <li className={`flex flex-col shrink-0 h-14 text-ptlbrown-100 rounded-4xl cursor-pointer transition-out-200 relative justify-between overflow-hidden group 
        ${todo.status === "Completed" ? "border-green-800 hover:border-green-700 border-3 bg-green-950" : "border-red-950/50 hover:border-ptlbrown-100 border-2 bg-yellow-950"}`}
        onClick={() => navigate(`view/${todo.id}`)}>
            <HeartIcon className="absolute w-5 h-5 top-[19px] xs:top-[17px] right-2 xs:right-4 xs:scale-140" fill={`${todo.favorite ? "#e7b574" : "#00000000"}`}/>
            <h2 className="font-bold text-xl xs:text-2xl text-center">{todo.label}</h2>
            <div className={`flex justify-evenly h-5 text-sm border tracking-widest overflow-hidden rounded-t-4xl mx-auto transition-allout-200 
                ${todo.status !== "Completed" ? "font-medium bg-red-950/50 max-xs:w-9/11 w-6/8 border-ptlbrown-100/50 border-dashed" : 
                "bg-green-800 text-ptlbrown-100 font-extrabold w-3/8 group-hover:w-7/8 border-solid border-red-950/50"}`}>
                {todo.status !== "Completed" ? (
                    <>
                        <span className="max-xs:hidden">{todo.priority}</span>
                        {todo.category && <span className="max-md:hidden">{todo.category}</span>}
                        <span>{toLocaleDate(todo.deadline.dueDate)}</span>
                    </>
                ) : <span className="tracking-widest md:tracking-[10px] transition-allout-200">COMPLETED</span>}

            </div>
        </li>
    )
}