import { useState } from "react";
import DeadlineDay from "./DeadlineDay";
import DeadlineMonth from "./DeadlineMonth";

function DeadlinePicker({ value, onChange }) {
    const [deadlineType, setDeadlineType] = useState("timeonly");
    function handleUpdate(type, updates) {
        let newValue;

        if (type !== deadlineType) {
            newValue = { ...updates, time: value.time };
            console.log("updates:", updates);
        } else {
            newValue = { ...value, ...updates };
        }
        console.log(newValue);
        setDeadlineType(type);
        onChange(newValue);
    }
    return (
        <div className="flex items-center w-full flex-col gap-y-3">
            <DeadlineDay value={value} handleUpdate={handleUpdate} deadlineType={deadlineType}/>
            <DeadlineMonth value={value} handleUpdate={handleUpdate} deadlineType={deadlineType}/>
        </div>
    )
}

export default DeadlinePicker