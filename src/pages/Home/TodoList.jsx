
function TodoList({ children }) {

    return (
        <div className="flex flex-col relative bg-yellow-900/70 rounded-4xl mt-14 overflow-hidden">
            {children}
        </div>
    )
}

export default TodoList