import header from '../../assets/images/todotodologo.png'

function Logo() {
    return (
        <a href='/' className='flex grow max-sm:justify-around max-sm:basis-2/10 basis-1/5 justify-start items-center'>
            <img src={header} alt="header" className='w-11 h-auto'/>
            <h1 className='text-2xl font-extrabold max-lg:hidden'>TODO-To-Do</h1>
            <h1 className='text-2xl opacity-50 font-extrabold sm:hidden'> | </h1>
        </a>
    )
}

export default Logo