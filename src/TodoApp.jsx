import Header from "./layouts/Header/Header.jsx"
import Footer from "./layouts/Footer.jsx"
import { Outlet, useLocation } from "react-router-dom"
import AppContextProvider from "./context/app-context.jsx"
import AppWrapper from "./layouts/AppWrapper.jsx"
import ContentWrapper from "./layouts/ContentWrapper.jsx"
import NotifContextProvider from "./context/notif-context.jsx"
import ScrollToTop from "./shared/ScrollToTop.jsx"

export default function TodoApp() {
    const { pathname } = useLocation();

    return (
        <AppWrapper>
            <AppContextProvider>
            <NotifContextProvider>
            <Header />
                <ContentWrapper> 
                    <ScrollToTop />
                    <Outlet />
                </ContentWrapper>
            </NotifContextProvider>
            </AppContextProvider>
            {pathname !== "/home" && <Footer />}
        </AppWrapper>
    )
}
