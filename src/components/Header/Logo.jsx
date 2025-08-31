import header from '../../assets/images/todotodologo.png'

function Logo() {
    return (
        <a href='/' className='flex w-auto items-center'>
            <img src={header} alt="header" className='w-8 h-auto'/>
            <h1 className='text-lg leading-tight font-bold'>To-Do-TODO</h1>
        </a>
    )
}

export default Logo