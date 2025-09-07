
function SubmitButton({ isSubmitting, isValid, onSave }) {
    return (
        <button onClick={onSave} type='submit' disabled={isSubmitting || !isValid} 
        className="bg-red-950 w-30 self-center valid:cursor-pointer text-white py-2 rounded-3xl text-xl font-bold tracking-widest max-sm:mt-5 disabled:bg-red-950/45 disabled:text-white/45 valid:hover:scale-110 transition-out-200" >
            {isSubmitting ? "Saving..." : "Save"}
        </button>
    )
}

export default SubmitButton