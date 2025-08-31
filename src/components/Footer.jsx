import { useLocation } from "react-router-dom";

function Footer() {
    const { pathname } = useLocation();
    const footerClass = `px-20 py-5 text-center text-[14px] bg-center font-bold transition duration-300 ease-in-out 
    ${pathname === "/modify" ? "bg-rough-brown text-red-950" : 
                                "bg-smooth-brown bg-cover text-ptlbrown-100"}`;
    return (
        <footer className={footerClass}> 
            Copyright © 2025 CodeVANIE. All rights reserved.
        </footer>
    )
}

export default Footer