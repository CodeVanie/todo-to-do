
function Deadline({ children }) {
    // const now = new Date();
    // const sixMonthsFromNow = new Date(now);
    // sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    // const shortDateTime = sixMonthsFromNow.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
    return (
        <div className='md:relative space-y-1 sm:space-y-3'>
            {children}
        </div>
    )
}

export default Deadline