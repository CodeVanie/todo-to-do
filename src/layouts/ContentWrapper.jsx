import { useLocation } from "react-router-dom";

function ContentWrapper({ children }) {
    const { pathname } = useLocation();
    return (
        <main className={`grow relative before:absolute before:inset-0 bg-center bg-no-repeat bg-cover bg-fixed before:bg-black/50 
        ${pathname === "/modify" ? "bg-smooth-brown" : "bg-rough-brown"}`}>

            {children}
        </main>
    )
}

export default ContentWrapper