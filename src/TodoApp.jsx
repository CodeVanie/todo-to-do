import Header from "./layouts/Header/Header.jsx"
import Footer from "./layouts/Footer.jsx"
import { Outlet } from "react-router-dom"
import AppContextProvider from "./context/app-context.jsx"
import AppWrapper from "./layouts/AppWrapper.jsx"
import ContentWrapper from "./layouts/ContentWrapper.jsx"
import NotifContextProvider from "./context/notif-context.jsx"

export default function TodoApp() {
    return (
        <AppWrapper>
            <AppContextProvider>
            <NotifContextProvider>
            <Header />
                <ContentWrapper> 
                    <Outlet />
                </ContentWrapper>
            </NotifContextProvider>
            </AppContextProvider>
            <Footer />
        </AppWrapper>
    )
}
