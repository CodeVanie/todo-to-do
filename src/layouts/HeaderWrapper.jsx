
function HeaderWrapper({ children, currentPage }) {

    const headerClass = `bg-center flex justify-center h-14
        ${currentPage === "/modify" ?
            "bg-rough-brown text-red-950" : 
            "bg-smooth-brown bg-cover text-ptlbrown-100"}`;
    return (
        <header className={headerClass}>
            <div className='flex items-center w-full h-full max-w-6xl px-3'>
                {children}
            </div> 
        </header>
    )
}

export default HeaderWrapper