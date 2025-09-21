import header from '../../assets/images/todotodologo.png'

export default function Logo() {
    
    return (
        <a href='/' className='basis-2/14 sm:basis-1/5 flex justify-start items-center p-1 lg:hover:scale-110 transition-out-200'>
            <img src={header} alt="header" className='w-11 max-lg:hover:scale-110 transition-out-200'/>
            <h1 className='text-2xl max-lg:hidden'>TODO-To-Do</h1>
        </a> 
    )
}