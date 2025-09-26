
export default function Statement({ errors, statement }) {
    const errorMessages = Object.values(errors).map(err => err.message);
    return (
        <section className={`self-center text-[10px] w-full text-center font-semibold whitespace-pre-line sm:text-[12px] 
            ${errorMessages.length > 0 ? "text-wrong" : "text-yellow-950"}`}>
                {errorMessages.length > 0 ? 
                    errorMessages.map((msg, i) => (
                        <p key={i}>{msg}</p>
                )) : statement}
        </section>
    )
}