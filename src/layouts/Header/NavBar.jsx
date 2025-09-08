function NavBar({ children }) {

    return (
        <ul className="basis-11/14 sm:basis-3/5 flex">
            {children}
        </ul>
    )
}

export default NavBar