const days = [
    {id: 0, name: "Su"},
    {id: 1, name: "Mo"},
    {id: 2, name: "Tu"},
    {id: 3, name: "We"},
    {id: 4, name: "Th"},
    {id: 5, name: "Fr"},
    {id: 6, name: "Sa"},
];
function DeadlineDay ({ value, handleUpdate }) {
    function onDeadlineClick(e) {
        const id = Number(e.target.dataset.value);
        let newDue = value.type === "day" ? [...value.due] : [];
        if (newDue.includes(id)) {
            newDue = newDue.filter((dayId) => dayId !== id);
            if (newDue.length === 0) {
                handleUpdate("timeonly", { 
                    type: "timeonly", 
                    due: [], 
                    label: `Time: ${value.time}` });
                return;
            }
        } else {
            newDue.push(id);
        }
        handleUpdate("day", {
            type: "day",
            label: `Day/s(${
                [...newDue].map(d => 
                    (days.find(day => day.id === d).name)).join(",")})`,
            due: newDue,
        });
    }

    return (
        <div className={`flex flex-col justify-center border-2 p-1 rounded-2xl sm:relative w-full max-w-lg 
            ${value.type === "day" ? "border-red-950" : "border-yellow-700"}`}>
            <h3 className='text-left sm:absolute tracking-widest'>DAYS</h3>
            <ol className='flex gap-x-1 justify-center'>
                {days.map((day, index) => 
                    <li key={index} data-value={day.id} 
                        onClick={onDeadlineClick} 
                        className={`grid rounded-full p-1 w-10 h-9 place-items-center cursor-pointer select-none text-xs hover:scale-110 
                        ${(value.due.includes(day.id) && value.type === "day") ? 
                        "border-2 scale-110 border-red-950" : 
                        "border border-yellow-700"}`}>
                        {day.name}
                    </li>
                )}
            </ol>
        </div>
    )
}


export default DeadlineDay