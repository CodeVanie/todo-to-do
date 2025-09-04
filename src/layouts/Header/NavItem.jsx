import { NavLink } from "react-router-dom"
import { NavIcon } from "../../shared/icons/IconCollection";

function NavItem({ page, label, currentPage }) {
    return (
        <li id={page} className={`${currentPage === "/modify" ? "text-red-950" : "text-ptlbrown-100"} flex flex-1 justify-center max-lg:p-2 lg:items-end`}>
            <NavLink key={page} to={`/${page}`} className={({ isActive }) => 
                `${isActive ? (page === "modify") ? "border-red-950" : "border-ptlbrown-100 opacity-100" : "border-yellow-700/0 opacity-85"} flex flex-col justify-center items-center sm:border-b-2 w-full hover:scale-110 transition duration-300 ease-out hover:opacity-100`}>
                <NavIcon name={page} className={`w-7 h-7 transition duration-300 ease-in
                ${currentPage === "/modify" ? "text-red-950" : "text-ptlbrown-100"}`}/>
                <h6 className="font-bold text-sm max-lg:hidden">{label}</h6>
            </NavLink>
        </li>
    )
}

export default NavItem