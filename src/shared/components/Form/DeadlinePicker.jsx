import DeadlineDay from "./DeadlineDay";
import DeadlineMonth from "./DeadlineMonth";

export default function DeadlinePicker({ value, onChange }) {

function handleUpdate(updates) {
    let newValue;
    newValue = { ...value, ...updates };
    onChange(newValue);
}
    return (
        <>
            <DeadlineDay value={value} handleUpdate={handleUpdate}/>
            <DeadlineMonth value={value} handleUpdate={handleUpdate}/>
        </>
    )
}