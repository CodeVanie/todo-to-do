
function Statement({ errors, statement }) {
    const errorMessages = Object.values(errors).map(err => err.message);
    return (
        <section className={`self-center text-[10px] w-70 h-4 text-center font-semibold whitespace-pre-line
            ${errorMessages.length > 0 ? "text-wrong" : "text-yellow-950"}`}>
                {errorMessages.length > 0 ? 
                    errorMessages.map((msg, i) => (
                        <p key={i}>{msg}</p>
                )) : statement}
        </section>
    )
}

export default Statement