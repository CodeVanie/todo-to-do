import TodoItem from "./TodoItem";

function TodoList({ children, todoList }) {

    return (
        <div className="flex flex-col relative bg-ptlbrown-100/70 rounded-4xl mt-14 overflow-hidden">
            {children}
            <ol className="flex flex-col w-full overflow-y-auto p-2 pb-25 gap-y-1 scrollbar-hide">
                {todoList.map((todo, index) => 
                    <TodoItem key={index} todo={todo} />
                )}
            </ol>
        </div>
    )
}

export default TodoList