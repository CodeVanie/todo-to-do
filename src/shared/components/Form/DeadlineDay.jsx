import { createTodoDeadline, getDefaultDeadline, getDefaultDueDate } from "../../../utils";

const DAYS = [
    {id: 0, name: "Su"},
    {id: 1, name: "Mo"},
    {id: 2, name: "Tu"},
    {id: 3, name: "We"},
    {id: 4, name: "Th"},
    {id: 5, name: "Fr"},
    {id: 6, name: "Sa"},
];
const DTYPE = "day";

export default function DeadlineDay ({ value, handleUpdate }) {
    const isDTypeDay = value.type === DTYPE;
    const isEveryday = value.datenums.length !== 7;

    function onDeadlineClick(e) {
        const id = Number(e.target.dataset.value);
        let newDues = value.type === DTYPE ? [...value.datenums] : [];
        if (newDues.includes(id)) {
            newDues = newDues.filter((dayId) => dayId !== id);
        // Not selecting any day will go back to time only deadline type
            if (newDues.length === 0)
                return handleUpdate(getDefaultDeadline(getDefaultDueDate(value.time)));
        } else {
            newDues.push(id);
            newDues.sort();
        }

        handleUpdate({
            type: DTYPE,
            dueDate: createTodoDeadline(DTYPE, value.time, newDues),
            datenums: newDues
        });
    }

    return (
        <div className={`flex border-2 items-center p-1 rounded-2xl mx-auto max-xs:pt-7 relative max-w-md z-1
            ${isDTypeDay ? isEveryday ? "border-red-950" : "border-wrong" : "border-yellow-700"}`}>
            <h3 className='text-left tracking-widest max-xs:absolute max-xs:top-1'>DAYS</h3>
            <ol className='flex gap-x-1 w-full justify-end'>
                {DAYS.map((day, index) => 
                    <li key={index} data-value={day.id} 
                        onClick={onDeadlineClick} 
                        className={`max-w-13 grid aspect-square rounded-full flex-1 place-items-center cursor-pointer text-sm hover:scale-110 
                        ${(value.datenums.includes(day.id) && isDTypeDay) ? 
                            "border-2 scale-110 border-red-950" : "border border-yellow-700"}`}>
                        {day.name}
                    </li>
                )}
            </ol>
        </div>
    )
}