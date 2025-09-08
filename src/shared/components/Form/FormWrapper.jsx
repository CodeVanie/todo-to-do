
function FormWrapper({ children, onSubmit }) {
    return (
        <form className="flex flex-col mt-3 gap-y-3 text-center" onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default FormWrapper