import { useContext } from "react";
import NotifContentWrapper from "../../layouts/NotifContentWrapper";
import { NotifContext } from "../../context/notif-context";
import { Outlet, useNavigate } from "react-router-dom";

export default function NotifContent() {
    // console.log("NotifContent rendered");
    const navigate = useNavigate();
    const { notifs, setNotifs } = useContext(NotifContext);
    const controlledNotif = notifs.sort((a, b) => 
        b.id.localeCompare(a.id, undefined, { numeric: true }));

    function handleNotifClick(notif) {
        setNotifs((prev) => prev.map((n) => (n.id === notif.id ? {...n, clicked: true} : n)));
        navigate(notif.path)
    }

    return (
        <NotifContentWrapper>
            <ul>
            {controlledNotif.map((notif) => 
                <li key={notif.id} onClick={() => handleNotifClick(notif)}
                    className={`relative cursor-pointer border p-6 overflow-hidden text-ptlbrown-100 whitespace-pre-line hover:before:absolute hover:before:inset-0 hover:before:bg-red-800/20
                    ${notif.clicked ? "bg-red-950/50" : "bg-red-950"}`}>
                    <h1 className="text-xl font-bold"><span>{notif.title}</span></h1>
                    <span className={`absolute flex size-3 right-4 top-4 ${notif.clicked && "hidden"}`}>
                        <span className={`absolute h-full w-full animate-ping rounded-4xl bg-red-400 opacity-75`}></span>
                        <span className="relative size-3 rounded-full bg-red-500"></span>
                    </span>
                    <hr />
                    <p className="mt-4">{notif.body}</p>
                </li>
                )}
            </ul>
            <Outlet />
        </NotifContentWrapper>
    )
}