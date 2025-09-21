import { useLocation } from "react-router-dom";

export default function Footer() {
    const { pathname } = useLocation();
    
    return (
        <footer className={`py-5 relative z-20 text-center text-xs font-bold min-h-14 transition-allout-500 bg-rough-brown bg-cover border-t
            ${/^\/modify/.test(pathname) ? "text-red-950" : "bg-center bg-black/40 bg-blend-multiply text-ptlbrown-100"}`}> 
            Copyright © 2025 CodeVANIE. All rights reserved.
        </footer>
    )
}