function NavBar({ children }) {
    return (
        <nav>
            <ul className="flex justify-evenly">
                {children}
            </ul>
        </nav>
    )
}

export default NavBar