
function ActionButton({ logo, alt, onClick }) {
    return (
        <div className='bg-ptlbrown-100 rounded-full border-2 border-red-950 w-14 p-2' 
             onClick={onClick}>
            <img src={logo} alt={alt} className='w-full'/>
        </div>
    )    
}

export default ActionButton
