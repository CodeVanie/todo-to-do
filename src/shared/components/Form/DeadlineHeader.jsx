
export default function DeadlineHeader({children}) {
    
    return (
        <div className='flex justify-between items-center px-2 xm:absolute xm:w-full xm:top-1'>
            <h2 className='text-lg font-semibold xm:left-0'>
                Set a Deadline
            </h2>
            {children}
        </div>
    )
}