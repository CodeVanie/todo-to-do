import { createContext, useContext, useEffect, useState } from "react"
import { AppContext } from "./app-context";
import { getTodosNearDeadline } from "../utils";
import { useLocalStorage } from "../hooks";

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
    {
        id: "n_2",
        title: "Wanna see more from CodeVANIE?",
        body: `Check CodeVANIE's Portfolio!`,
        path: "/home",
        clicked: false
    }
]

export default function NotifContextProvider({ children }) {
    const { listData } = useContext(AppContext);
    const [notifs, setNotifs] = useLocalStorage("notifs", initialNotifs);
    const hasNotif = notifs.find((notif) => !notif.clicked) ? true : false;

    useEffect(() => {
        setNotifs(prev => {
            const newTodoNotifs = getTodosNearDeadline(listData[1].list, prev);

            const existingNotifIds = new Set(prev.map(n => n.id.split("-")[1] ?? ""));

            const newNotifs = newTodoNotifs.filter(n => !existingNotifIds.has(n.id.split("-")[1]));
            
            const updatedNotifs = [...prev, ...newNotifs];

            const limitToFifty = updatedNotifs.slice(-50);
            
            return limitToFifty
        });
    },[listData[1].list])
    
    return (
        <NotifContext.Provider value={{notifs, hasNotif, setNotifs}}>
            {children}
        </NotifContext.Provider>
    )
}