import header from '../../assets/images/todotodologo.png'

function Logo() {
    return (
        <a href='/' className='basis-1/5 max-sm:basis-2/10 flex justify-start items-center max-sm:justify-around lg:hover:scale-110 transition-out-200'>
            <img src={header} alt="header" className='w-11 max-lg:hover:scale-110 transition-out-200'/>
            <h1 className='text-2xl font-extrabold max-lg:hidden'>TODO-To-Do</h1>
            <h1 className='text-2xl font-extrabold opacity-50 sm:hidden'> | </h1>
        </a> 
    )
}

export default Logo