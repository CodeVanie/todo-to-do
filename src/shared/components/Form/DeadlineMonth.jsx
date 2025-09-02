
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
            label: `Day ${newDue[0]} of the Month`,
            due: newDue,
        });
    }

    return (
        <div className={`flex flex-col w-full border-2 px-1 pt-1 rounded-2xl  
            ${value.type === "month" ? "border-red-950" : "border-yellow-700"}`}>
            <h3 className='text-left'>Day of the Month ( 1 ~ 31 )</h3>
            <ol className='grid grid-flow-col gap-x-1 w-full p-1 overflow-x-auto scrollbar-hide'>
                {dateNum.map((num, index) => 
                    <li key={index} data-value={num} onClick={onDeadlineClick} 
                    className={`grid place-items-center rounded-sm w-9 h-8 cursor-pointer select-none 
                        ${(value.due.includes(num) && value.type === "month") ? 
                            "border-2 border-red-950 scale-110" : 
                            "border border-yellow-700"}`}>
                        {num}
                    </li>
                )}
            </ol>
        </div>
    )
}


export default DeadlineMonth