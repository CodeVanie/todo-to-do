function Details({ register }) {

    return (
        <div className='modal-form-field'>
            <label htmlFor="modal-form-details" className='items-center'>Details: </label>
            <textarea id='modal-form-details' placeholder='Add task details...' 
            className="border-2 p-2 border-red-950 rounded-lg text-lg outline-0 basis-full text-red-950 caret-red-950 min-h-10 resize-none overflow-hidden" 
            {...register("details", {
                maxLength: {
                    value: 500,
                    message: "Details cannot exceed 500 characters"
                }
            })} 
            ref={(el) => {
                register("details").ref(el);
                if (el) {
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                }
            }}
            onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
            }} />
        </div>
    )
}

export default Details