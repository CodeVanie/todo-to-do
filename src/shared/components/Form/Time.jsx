import { getDeadline } from '../../../utils';
import { CorrectIcon, WrongIcon } from '../../icons/IconCollection'

export default function Time({ value, onChange, error }) {

function handleTimeChange(e) {
    let due = value.dueDate;
    let newValue;
    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(e.target.value)) {
        let [hour, minute] = e.target.value.split(":");
        due.setHours(hour);
        due.setMinutes(minute);
        console.log("PASOK");
    }
    newValue = { ...value, dueDate: getDeadline({type: value.type, dueDate: due, datenums: value.datenums}), time: e.target.value };
    onChange(newValue);
}
    return(
        <div className='flex items-center gap-x-1 hover:scale-110 transition-out-200 xm:right-0'>
            <input className={`font-semibold border-2 rounded-lg p-1 outline-0 text-center w-24 tracking-[2px] placeholder:text-yellow-800/50 
           ${error ? "border-red-700 bg-red-200/50 req" : 
                     "border-red-950 focus:border-green-500 focus:bg-green-100"}`} 
            type="text" placeholder='HH:MM' maxLength={5} value={value.time} 
            onChange={handleTimeChange} />

            {error ? <WrongIcon className='w-6 h-6 text-wrong'/> : 
                     <CorrectIcon className='w-6 h-6 text-correct'/>}
        </div>
    )
}