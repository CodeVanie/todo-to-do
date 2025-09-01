import correct from '../../assets/images/correct-logo.svg'
import wrong from '../../assets/images/wrong-logo.svg'

function Time({ value, onChange, error }) {
    console.log(value);
    return(
        <div className='flex items-center gap-x-1'>
            <input className={`font-semibold border-2 rounded-lg p-1 outline-0 text-center w-24 tracking-[2px] placeholder:text-yellow-800/50 
           ${error ? "border-red-700 bg-red-200/50 req" : 
                     "border-red-950 focus:border-green-500 focus:bg-green-100"}`} 
            type="text" placeholder='HH:MM' maxLength={5} value={value} 
            onChange={(e) => onChange(e.target.value)} />

            <div className='w-6 h-6'>
                {error ? <img src={wrong} alt="invalid" /> : <img src={correct} alt="valid" />}
            </div>
        </div>
    )
}

export default Time