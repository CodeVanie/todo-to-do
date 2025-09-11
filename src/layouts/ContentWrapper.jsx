import { useLocation } from "react-router-dom";

export default function ContentWrapper({ children }) {
    const { pathname } = useLocation();
    return (
        <main className={`grow relative before:absolute before:inset-0 bg-center bg-no-repeat bg-cover bg-fixed before:bg-black/60 
        ${/^\/modify/.test(pathname) ? "bg-smooth-brown" : "bg-rough-brown"}`}>

            {children}
        </main>
    )
}