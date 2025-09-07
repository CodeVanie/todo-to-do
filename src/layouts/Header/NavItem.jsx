import { NavLink } from "react-router-dom"
import { NavIcon } from "../../shared/icons/IconCollection";

function NavItem({ page, label, currentPage }) {
    return (
        <li id={page} className={`${currentPage === "/modify" ? "text-red-950" : "text-ptlbrown-100"} flex-1 pt-2`}>
            <NavLink key={page} to={`/${page}`} className={({ isActive }) => `${isActive ? (page === "modify") ? 
                "border-red-950" : "border-ptlbrown-100 opacity-100" : "border-yellow-700/0 opacity-85"} 
                 sm:border-b-2 hover:scale-110 transition-out-200 hover:opacity block h-full max-lg:pt-2`}>

                <NavIcon name={page} className={`w-7 h-7  mx-auto 
                ${currentPage === "/modify" ? "text-red-950" : "text-ptlbrown-100"}`}/>
                <h6 className="font-bold text-sm max-lg:hidden text-center">{label}</h6>
            </NavLink>
        </li>
    )
}

export default NavItem