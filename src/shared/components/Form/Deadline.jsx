
function Deadline({ children }) {
    // const now = new Date();
    // const sixMonthsFromNow = new Date(now);
    // sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    // const shortDateTime = sixMonthsFromNow.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
    return (
        <div className='flex flex-col gap-y-1 items-center'>
            {children}
        </div>
    )
}

export default Deadline