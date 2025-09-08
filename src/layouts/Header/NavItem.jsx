import { NavLink } from "react-router-dom"
import { NavIcon } from "../../shared/icons/IconCollection";

function NavItem({ page, label }) {
    return (
        <li id={page} className="flex-1 z-1 rounded-xl hover:bg-ptlbrown-100/20">
            <NavLink key={page} to={`/${page}`} className={({ isActive }) => 
                `${!isActive ? "opacity-80 border-ptlbrown-100/0" : "max-sm:bg-ptlbrown-100/20"}  
                 flex flex-col h-full items-center lg:justify-end justify-center sm:border-b-2 gap-y-1 hover:opacity-100 
                 transition-allout-500`}>

                <NavIcon name={page} className="w-6 xs:scale-115"/>
                <h6 className="font-bold text-xs max-lg:hidden">{label}</h6>
            </NavLink>
        </li>
    )
}

export default NavItem