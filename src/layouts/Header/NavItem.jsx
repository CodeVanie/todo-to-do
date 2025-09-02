import { NavLink } from "react-router-dom"

function NavItem({ page, label, icon, darkicon, currentPage }) {
    console.log(currentPage);
    return (
        <li id={page} className={`${currentPage === "/modify" ? "text-red-950" : "text-ptlbrown-100"} flex grow justify-center max-lg:p-2 lg:items-end`}>
            <NavLink key={page} to={`/${page}`} className={({ isActive }) => 
                `${isActive ? (page === "modify") ? "border-red-950" : "border-ptlbrown-100 opacity-100" : "border-yellow-700/0 opacity-85"} flex flex-col justify-center items-center sm:border-b-2 w-full transition duration-300 ease-out hover:opacity-100`}>
                <div className="relative w-7 h-7 max-md:scale-90">
                    <img src={darkicon} alt={darkicon} 
                    className={`absolute object-contain transition duration-300 ease-in-out 
                    ${currentPage === "/modify" ? "opacity-[1]" : "opacity-[0]"}`}/>
                    <img src={icon} alt={icon} 
                    className={`absolute object-contain transition duration-300 ease-in-out 
                    ${currentPage === "/modify" ? "opacity-[0]" : "opacity-[1]"}`}/>
                </div>
                <h6 className="font-bold text-sm max-lg:hidden">{label}</h6>
            </NavLink>
        </li>
    )
}

export default NavItem