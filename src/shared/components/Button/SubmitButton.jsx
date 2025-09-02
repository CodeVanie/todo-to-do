
function SubmitButton({ isSubmitting, isValid, onSave }) {
    return (
        <button onClick={onSave} className="bg-red-950 w-30 self-center valid:cursor-pointer text-white py-2 rounded-2xl text-xl font-bold tracking-widest mt-5 disabled:bg-red-950/45 disabled:text-white/45" type='submit' disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Saving..." : "Save"}
        </button>
    )
}

export default SubmitButton