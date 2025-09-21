import { useLocation } from "react-router-dom";

export default function ContentWrapper({ children }) {
    const { pathname } = useLocation();
    
    return (
        <main className={`grow bg-black/60 bg-blend-multiply bg-center bg-no-repeat bg-cover bg-fixed  
        ${/^\/modify/.test(pathname) ? "bg-smooth-brown" : "bg-rough-brown"}`}>

            {children}
        </main>
    )
}