import { createContext, useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "./app-context";
import { getTodosNearDeadline } from "../utils/date-utils";
import useNotifSound, { useLocalStorage } from "../hooks";

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
        path: "portfolio",
        clicked: false
    }
]

export default function NotifContextProvider({ children }) {
    const [userHasInteracted, setUserHasInteracted] = useState(false);
    const { listData } = useContext(AppContext);
    const playNotifSound = useNotifSound();
    const [notifs, setNotifs] = useLocalStorage("notifs", initialNotifs);
    const hasNotif = notifs.find((notif) => !notif.clicked) ? true : false;

    useEffect(() => {
        const enableAudio = () => setUserHasInteracted(true);
        window.addEventListener("click", enableAudio, { once: true });
        return () => window.removeEventListener("click", enableAudio);
    }, []);

    useEffect(() => {
        setNotifs(prev => {
            const newTodoNotifs = getTodosNearDeadline(listData[1].list, prev);
            
            const existingNotifIds = new Set(prev.map(n => n.id.split("-")[1] ?? ""));

            const newNotifs = newTodoNotifs.filter(n => !existingNotifIds.has(n.id.split("-")[1]));

            const polishPreviousNotifs = prev.filter((n,_) => {
                if (/^view/.test(n.path)) {
                    const todoid = n.path.split("/")[1];
                    const exist = listData[1].list.some(todo => todo.id === todoid);

                    if (exist) {return n;}
                } else {
                    return n;
                }
            })

            const updatedNotifs = [...polishPreviousNotifs, ...newNotifs];

            const limitToFifty = updatedNotifs.slice(-50);
            
            return limitToFifty
        });
    },[listData[1].list])

    useEffect(() => {
		if (userHasInteracted) {
			playNotifSound();
		}
    }, [notifs.length])
    
    return (
        <NotifContext.Provider value={{notifs, hasNotif, setNotifs}}>
            {children}
        </NotifContext.Provider>
    )
}