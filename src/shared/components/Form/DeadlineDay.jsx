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
        <div className={`flex border-2 items-center p-1 rounded-2xl mx-auto max-xs:pt-7 max-xs:relative max-w-md
            ${value.type === "day" ? "border-red-950" : "border-yellow-700"}`}>
            <h3 className='text-left tracking-widest max-xs:absolute max-xs:top-1'>DAYS</h3>
            <ol className='flex gap-x-1 w-full justify-end'>
                {days.map((day, index) => 
                    <li key={index} data-value={day.id} 
                        onClick={onDeadlineClick} 
                        className={`max-w-13 grid aspect-square rounded-full flex-1 place-items-center cursor-pointer text-sm hover:scale-110 
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