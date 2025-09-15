import { createContext, useContext, useEffect, useState } from "react"
import { AppContext } from "./app-context";
import { getTodosNearDeadline } from "../utils";

export const NotifContext = createContext();

const initialNotifs = [
    {
        id: "n_0",
        title: "Welcome to TODO-To-Do!",
        body: `Please check the "App Guide" section to learn more about the app.`,
        path: "/aboutapp",
        clicked: false
    },
    {
        id: "n_1",
        title: "Welcome TODO User!",
        body: `You can use this To-Do List application to list all your tasks.`,
        path: "/home",
        clicked: false
    },
    // {
    //     id: "n_2",
    //     title: "Wanna see more from CodeVANIE?",
    //     body: `Check CodeVANIE's Portfolio!`,
    //     path: "/home",
    //     clicked: false
    // }
]

export default function NotifContextProvider({ children }) {
    const { listData } = useContext(AppContext);
    const [notifs, setNotifs] = useState(initialNotifs);
    const hasNotif = notifs.find((notif) => !notif.clicked) ? true : false;

    useEffect(() => {
        setNotifs(prev => {
            const newItems = getTodosNearDeadline(listData[1].list, prev); 
            return newItems.length ? [...prev, ...newItems] : prev;
        });
    },[])
    
    return (
        <NotifContext.Provider value={{notifs, hasNotif, setNotifs}}>
            {children}
        </NotifContext.Provider>
    )
}