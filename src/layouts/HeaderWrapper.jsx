
function HeaderWrapper({ children, currentPage }) {
    return (
        <header className={`sticky top-0 z-20 min-h-14 transition-allout-500 bg-rough-brown bg-cover border-b
            ${currentPage === "/modify" ? "text-red-950" : 
            "bg-center before:absolute before:inset-0 before:bg-black/35 text-ptlbrown-100"}`}>

            <nav className='h-full max-w-6xl flex mx-auto'>
                {children}
            </nav>
        </header>
    )
}

export default HeaderWrapper