
function Form({ children, onSubmit }) {
    return (
        <form className="flex flex-col mt-3 gap-y-3 w-full" onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default Form