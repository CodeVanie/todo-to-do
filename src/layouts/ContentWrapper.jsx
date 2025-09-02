import { useLocation } from "react-router-dom";

function ContentWrapper({ children }) {
    const { pathname } = useLocation();
    return (
        <main className={`flex flex-grow justify-center bg-center bg-no-repeat bg-cover bg-fixed ${pathname === "/modify" ? "bg-smooth-brown" : "bg-rough-brown"}`}>
            {children}
        </main>
    )
}

export default ContentWrapper