
export default function TodoList({ hasTodo, onClick, children }) {

    return (
        <section className="relative flex-1 bg-maroon/75 rounded-4xl mt-14 p-2">
            {!hasTodo && 
                <h3 onClick={onClick} className="text-lg sm:text-xl md:text-2xl lg:text-3xl p-2 font-bold text-center text-ptlbrown-100 text-shadow-lg text-shadow-yellow-700 bg-red-950/75 rounded-4xl border-2 border-red-950 hover:border-ptlbrown-100 cursor-pointer">
                    Click me to create a To-Do! +
                </h3>
            }
            {children}
        </section>
    )
}