function TodoItem({ todo, onView }) {

    return (
        <li className="flex flex-col shrink-0 justify-between border-2 border-red-950/50 hover:border-ptlbrown-100 hover:border-2 items-center w-full h-14 bg-yellow-950/75 font-bold text-2xl rounded-4xl cursor-pointer text-ptlbrown-200 transition duration-200 ease-in-out group" onClick={() => onView({data: todo,status: true})}>
            <span>{todo.label}</span>
            <div className="flex items-center max-sm:w-8/10 w-6/8 h-5 text-sm rounded-t-4xl bg-red-950/50 p-1 justify-around gap-x-1 border-ptlbrown-100/50 border-1 border-dashed font-medium tracking-widest">
                <div>{todo.priority}</div>
                <div>{todo.category}</div>
                <div>{todo.deadline.label}</div>
            </div>
        </li>
    )
}

export default TodoItem