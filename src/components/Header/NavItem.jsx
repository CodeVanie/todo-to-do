import { NavLink } from "react-router-dom"

function NavItem({ page, icon, darkicon, currentPage }) {
    
    return (
        <li id={page} className="flex flex-1 justify-center items-center">
            <NavLink key={page} to={`/${page}`} className={({ isActive }) => 
                `${isActive ? (page === "modify") ? "border-red-950" : "border-ptlbrown-100" : "text-yellow-700/0"} flex justify-center py-2 border-b-2 w-full transition duration-300 ease-out`}>
                <div className="relative w-5 h-5">
                    <img src={darkicon} alt={darkicon} 
                    className={`absolute object-contain transition duration-300 ease-in-out 
                    ${currentPage === "/modify" ? "opacity-[1]" : "opacity-[0]"}`}/>
                    <img src={icon} alt={icon} 
                    className={`absolute object-contain transition duration-300 ease-in-out 
                    ${currentPage === "/modify" ? "opacity-[0]" : "opacity-[1]"}`}/>
                </div>
            </NavLink>
        </li>
    )
}

export default NavItem