
const dateNum = Array.from({ length: 31 }, (_,i) => i + 1);

function DeadlineMonth ({ value, handleUpdate }) {
    function onDeadlineClick(e) {
        const num = Number(e.target.dataset.value);
        let newDue = value.type === "month" ? [value.due[0]] : [];
        if (newDue.includes(num)) {
            newDue = newDue.filter((dayNum) => dayNum !== num);
            if (newDue.length === 0) {
                handleUpdate("timeonly", { type: "timeonly", due: [], label: "" });
                return;
            }
        } else {
            newDue = [num];
        }
        handleUpdate("month", {
            type: "month",
            label: `Month(${newDue[0]})`,
            due: newDue,
        });
    }

    return (
        <div className={`border-2 px-1 py-1 rounded-2xl 
            ${value.type === "month" ? "border-red-950" : "border-yellow-700"}`}>
            <h3 className='text-left'>DAY OF THE MONTH ( 1 ~ 31 )</h3>
            <ol className='w-full flex sm:justify-center sm:flex-wrap gap-1 p-1 max-sm:overflow-x-auto scrollbar-hide'>
                {dateNum.map((num, index) => 
                    <li key={index} data-value={num} onClick={onDeadlineClick} 
                    className={`w-11 h-11 shrink-0 grid place-items-center rounded-sm cursor-pointer select-none hover:scale-110 
                        ${(value.due.includes(num) && value.type === "month") ? 
                            "border-2 scale-110 border-red-950" : 
                            "border border-yellow-700"}`}>
                        {num}
                    </li>
                )}
            </ol>
        </div>
    )
}


export default DeadlineMonth