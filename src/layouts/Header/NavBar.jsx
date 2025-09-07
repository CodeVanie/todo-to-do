function NavBar({ children }) {

    return (
        <nav className="flex basis-3/5 max-sm:basis-7/10">
            <ul className="flex flex-1 items-stretch">
                {children}
            </ul>
        </nav>
    )
}

export default NavBar