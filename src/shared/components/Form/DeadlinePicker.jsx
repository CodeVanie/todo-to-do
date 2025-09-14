import DeadlineDay from "./DeadlineDay";
import DeadlineMonth from "./DeadlineMonth";

export default function DeadlinePicker({ value, onChange, setError }) {

function handleUpdate(updates) {
    let newValue;
    newValue = { ...value, ...updates };
    onChange(newValue);
}
    return (
        <>
            <DeadlineDay value={value} handleUpdate={handleUpdate} setError={setError}/>
            <DeadlineMonth value={value} handleUpdate={handleUpdate}/>
        </>
    )
}