
function Title({ register }) {
    return (
        <div className='modal-form-field'>
            <label htmlFor="modal-form-title" className='items-center'>Title: </label>
            <input {...register("label", {
                required: "Title is required.",
                maxLength: {
                    value: 21,
                    message: "Title must be at most 21 characters. Add more to Details field."
                }
            })} className="border-2 p-2 border-red-950 rounded-lg text-xl outline-0 basis-full text-red-950 caret-red-950" 
            placeholder='Add a title...' type="text" />
        </div>
    )
}

export default Title