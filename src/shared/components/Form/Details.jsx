export default function Details({ register }) {

    return (
        <div className='space-y-1'>
            <label htmlFor="details">DETAILS</label>
            <textarea id="details" placeholder='Add todo details...' 
            className="w-full border-2 p-2 border-yellow-700 rounded-lg text-lg outline-0 basis-full text-red-950 caret-red-950 min-h-10 resize-none overflow-hidden hover:border-red-950" 
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