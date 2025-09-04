
function Title({ register }) {
    return (
        <div className='modal-form-field'>
            <label>TITLE</label>
            <input {...register("label", {
                required: "Title is required.",
                maxLength: {
                    value: 21,
                    message: "Title cannot exceed 21 characters. Please use the 'Details' field."
                }
            })} className="border-2 p-2 border-yellow-700 rounded-lg text-xl outline-0 basis-full text-red-950 caret-red-950 w-full hover:outline-1 hover:border-red-950 valid:border-red-950" 
            placeholder='Add a title...' type="text" required/>
        </div>
    )
}

export default Title