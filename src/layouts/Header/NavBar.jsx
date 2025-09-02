function NavBar({ children }) {
    return (
        <nav className="grow-2 max-sm:basis-7/10 basis-3/5 h-full">
            <ul className="flex h-full">
                {children}
            </ul>
        </nav>
    )
}

export default NavBar