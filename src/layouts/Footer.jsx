import { useLocation } from "react-router-dom";

export default function Footer() {
    const { pathname } = useLocation();
    
    return (
        <footer className={`py-5 relative z-20 px-10 text-center text-[8px] xs:text-xs font-bold min-h-14 transition-allout-500 bg-rough-brown bg-cover border-t
            ${/^\/modify/.test(pathname) ? "text-red-950" : "bg-center before:absolute before:inset-0 before:bg-black/35 text-ptlbrown-100"}`}> 
            <span className="relative z-1">Copyright © 2025 CodeVANIE. All rights reserved.</span>
        </footer>
    )
}