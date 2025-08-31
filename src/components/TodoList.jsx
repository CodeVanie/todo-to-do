import TodoItem from "./TodoItem";

function TodoList({ children, todoList }) {

    return (
        <div className="flex bg-ptlbrown-100/70 h-[75vh] rounded-4xl overflow-hidden border-red-950">
            <ol className="flex flex-col w-full overflow-y-auto p-3 gap-y-2">
                {children}
                {todoList.map((todo, index) => 
                    <TodoItem key={index} todo={todo} />
                )}
            </ol>
        </div>
    )
}

export default TodoList