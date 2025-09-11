import { NavLink } from "react-router-dom"
import { NavIcon } from "../../shared/icons/IconCollection";

export default function NavItem({ page, label, currentPage }) {
    return (
        <li id={page} className={`${currentPage === "/modify" ? "hover:bg-yellow-950/20" : "hover:bg-ptlbrown-100/20"} 
        flex-1 z-1 rounded-xl`}>
            <NavLink key={page} to={`/${page}`} className={({ isActive }) => 
                `${isActive ? currentPage === "/modify" ? "max-sm:bg-yellow-950/20" : 
                    "max-sm:bg-ptlbrown-100/20" : "opacity-80 border-ptlbrown-100/0"}  
                 flex flex-col h-full items-center lg:justify-end justify-center sm:border-b-2 gap-y-1 hover:opacity-100 transition-allout-500`}>

                <NavIcon name={page} className="w-6 xs:scale-115"/>
                <h6 className="font-bold text-xs max-lg:hidden">{label}</h6>
            </NavLink>
        </li>
    )
}