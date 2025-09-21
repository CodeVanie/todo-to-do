import { useContext, useMemo, useState } from "react";
import NotifContentWrapper from "../../layouts/NotifContentWrapper";
import { NotifContext } from "../../context/notif-context";
import { Outlet, useNavigate } from "react-router-dom";
import NotifActionButtonWrapper from "../../layouts/NotifActionButtonWrapper";
import NotifButtonWrapper from "../../layouts/NotifButtonWrapper";
import NotifFilterButton from "../../shared/components/Button/NotifFilterButton";
import NotifPing from "./NotifPing";
import NotifActionButton from "../../shared/components/Button/NotifActionButton";

export default function NotifContent() {
    // console.log("NotifContent rendered");
    const navigate = useNavigate();
    const { notifs, setNotifs } = useContext(NotifContext);
    const [notifFilter, setNotifFilter] = useState("All");
    
    const controlledNotif = useMemo(() => {
        let notiflist = notifs;
        if (notifFilter === "Unread") {
            notiflist = notifs.filter((n,_) => !n.clicked);
        }

        return notiflist.sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));
    }, [notifFilter, notifs]);

    function handleNotifClick(notif) {
        setNotifs((prev) => prev.map((n) => (n.id === notif.id ? {...n, clicked: true} : n)));
        navigate(notif.path)
    }

    return (
        <NotifContentWrapper>
            <NotifActionButtonWrapper>
                <NotifButtonWrapper>
                    <NotifFilterButton onFilter={() => setNotifFilter("All")} isSelected={notifFilter === "All"}>
                        All
                    </NotifFilterButton>
                    <NotifFilterButton onFilter={() => setNotifFilter("Unread")} isSelected={notifFilter === "Unread"}>
                        Unread
                    </NotifFilterButton>
                </NotifButtonWrapper>
                <NotifButtonWrapper>
                    <NotifActionButton onAction={() => setNotifs([])}>
                        Delete All
                    </NotifActionButton>
                    <NotifActionButton onAction={() => setNotifs((prev) => prev.map((n) => ({...n, clicked: true})))}>
                        Mark all as Read
                    </NotifActionButton>
                </NotifButtonWrapper>
            </NotifActionButtonWrapper>
            
            <ul>
            {controlledNotif.map((notif) => 

                (notif.id === "n_2") ? (
                    <li key={notif.id}><a href="https://vanie-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className={`block relative cursor-pointer border p-6 overflow-hidden text-ptlbrown-100 whitespace-pre-line hover:before:absolute hover:before:inset-0 hover:before:bg-red-800/20 active:before:absolute active:before:inset-0 active:before:bg-red-800/20 shadow-xl/30 shadow-black 
                        ${notif.clicked ? "bg-red-950/50" : "bg-red-950"}`}>
                            <h1 className="text-xl">{notif.title}</h1>
                            <NotifPing isClicked={notif.clicked}/>
                            <hr />
                            <p className="mt-4">{notif.body}</p>
                    </a></li>
                ) : (
                    <li key={notif.id} onClick={() => handleNotifClick(notif)}
                        className={`relative cursor-pointer border p-6 overflow-hidden text-ptlbrown-100 whitespace-pre-line hover:before:absolute hover:before:inset-0 hover:before:bg-red-800/20 active:before:absolute active:before:inset-0 active:before:bg-red-800/20 shadow-xl/30 shadow-black 
                        ${notif.clicked ? "bg-red-950/50" : "bg-red-950"}`}>
                        <h1 className="text-xl">{notif.title}</h1>
                        <NotifPing isClicked={notif.clicked}/>
                        <hr />
                        <p className="mt-4">{notif.body}</p>
                    </li>
                )
                )}
            </ul>
            <Outlet />
        </NotifContentWrapper>
    )
}