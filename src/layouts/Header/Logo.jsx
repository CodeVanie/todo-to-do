import header from '../../assets/images/todotodologo.png'

function Logo() {
    return (
        <a href='/' className='basis-2/14 sm:basis-1/5 flex justify-start items-center p-1 lg:hover:scale-110 transition-out-200 z-1'>
            <img src={header} alt="header" className='w-11 max-lg:hover:scale-110 transition-out-200'/>
            <h1 className='text-2xl max-lg:hidden font-extrabold'>TODO-To-Do</h1>
            <h1 className='text-3xl font-black opacity-65 hidden xs:visible mx-auto'>|</h1>
        </a> 
    )
}

export default Logo