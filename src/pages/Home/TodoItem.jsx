import HeartIcon from "../../shared/icons/IconCollection"

export default function TodoItem({ todo, onView }) {

    return (
        <li className="block shrink-0 border-2 border-red-950/50 hover:border-ptlbrown-100 h-14 bg-yellow-950 rounded-4xl cursor-pointer text-ptlbrown-200 transition-out-200 relative" 
        onClick={() => onView({data: todo,status: true})}>
            <HeartIcon className="absolute w-5 h-5 top-[19px] xs:top-[17px] right-2 xs:right-4 xs:scale-140" 
                fill={todo.favorite ? "#E7B574" : "#E7B57400"}/>
            <h2 className="font-bold text-xl xs:text-2xl text-center">{todo.label}</h2>
            <div className="flex justify-around mx-auto max-xs:w-9/11 w-6/8 h-5 text-sm rounded-t-4xl bg-red-950/50 border-ptlbrown-100/50 border border-dashed font-medium tracking-widest">
                <span>{todo.priority}</span>
                <span>{todo.category}</span>
                <span>{todo.deadline.label}</span>
            </div>
        </li>
    )
}