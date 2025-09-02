import Header from "./layouts/Header/Header.jsx"
import Footer from "./layouts/Footer.jsx"
import { Outlet } from "react-router-dom"
import AppContextProvider from "./context/app-context.jsx"
import AppWrapper from "./layouts/AppWrapper.jsx"
import ContentWrapper from "./layouts/ContentWrapper.jsx"

function TodoApp() {
    return (
        <AppWrapper>
            <Header />
            <AppContextProvider>
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
            </AppContextProvider>
            <Footer />
        </AppWrapper>
    )
}

export default TodoApp
