import { createTodoDeadline, getDefaultDeadline, getDefaultDueDate } from "../../../utils";

const dateNum = Array.from({ length: 31 }, (_,i) => i + 1);
const deadlineType = "month";

export default function DeadlineMonth ({ value, handleUpdate }) {

function onDeadlineClick(e) {
    const dayNumber = Number(e.target.dataset.value);
    // Unselecting a number will go back to timeonly deadline type
    if (value.datenums.includes(dayNumber)) 
        return handleUpdate(getDefaultDeadline(getDefaultDueDate(value.time)));

    handleUpdate({
        type: deadlineType,
        dueDate: createTodoDeadline(deadlineType, value.time, [dayNumber]),
        datenums: [dayNumber]
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
                        ${(value.datenums.includes(num) && value.type === "month") ? 
                            "border-2 scale-110 border-red-950" : 
                            "border border-yellow-700"}`}>
                        {num}
                    </li>
                )}
            </ol>
        </div>
    )
}