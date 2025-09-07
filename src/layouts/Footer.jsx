import { useLocation } from "react-router-dom";

function Footer() {
    const { pathname } = useLocation();
    return (
        <footer className={`py-5 relative z-20 text-center text-xs font-bold bg-center transition-over-200 
            ${pathname === "/modify" ? "bg-rough-brown text-red-950" : 
                                       "bg-smooth-brown bg-cover text-ptlbrown-100"}`}> 
            Copyright © 2025 CodeVANIE. All rights reserved.
        </footer>
    )
}

export default Footer