
function DeadlineHeader({children}) {
    return (
        <div className='flex w-full justify-between items-center px-2'>
            <h2 className='text-lg font-semibold'>
                Set a Deadline
            </h2>
            {children}
        </div>
    )
}

export default DeadlineHeader