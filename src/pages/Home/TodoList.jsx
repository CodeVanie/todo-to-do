import TodoItem from "./TodoItem";

function TodoList({ children, todoList }) {

    return (
        <div className="flex relative bg-ptlbrown-100/70 flex-1 rounded-4xl overflow-hidden max-h-[80vh] border-red-950">
            <ol className="flex flex-1 flex-col w-full overflow-y-auto px-3 pt-3 pb-25 gap-y-2">
                {todoList.map((todo, index) => 
                    <TodoItem key={index} todo={todo} />
                )}
            </ol>
            {children}
        </div>
    )
}

export default TodoList