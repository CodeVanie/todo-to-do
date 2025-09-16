
export default function FormWrapper({ children, onSubmit }) {
    return (
        <form className="relative flex flex-col mt-3 gap-y-3 text-center" onSubmit={onSubmit}>
            {children}
        </form>
    )
}