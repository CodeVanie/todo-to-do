
function HeaderWrapper({ children, currentPage }) {
    return (
        <header className={`h-14 sticky top-0 z-20 bg-center 
            ${currentPage === "/modify" ? 
                "bg-rough-brown text-red-950" : 
                "bg-smooth-brown bg-cover text-ptlbrown-100"}`}>

            <div className='h-full max-w-6xl flex px-3 mx-auto'>
                {children}
            </div>
        </header>
    )
}

export default HeaderWrapper