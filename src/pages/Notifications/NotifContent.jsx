import { useContext } from "react";
import NotifContentWrapper from "../../layouts/NotifContentWrapper";
import { NotifContext } from "../../context/notif-context";

export default function NotifContent() {
    // console.log("NotifContent rendered");
    const { notifs, setNotifs } = useContext(NotifContext);
    const controlledNotif = notifs.sort((a, b) => 
        b.id.localeCompare(a.id, undefined, { numeric: true }));

    return (
        <NotifContentWrapper>
            <ul className="space-y-3">
            {controlledNotif.map((notif) => 
                <li key={notif.id} 
                    onClick={() => setNotifs((prev) => prev.map((n) => 
                    (n.id === notif.id ? {...n, clicked: true} : n)))}
                    className={`cursor-pointer rounded-4xl py-3 px-6 text-ptlbrown-100 whitespace-pre-line
                    ${notif.clicked ? "bg-red-950/50 hover:bg-red-950/75" : "bg-red-950 hover:bg-red-950"}`}>
                    <h1 className="text-xl font-bold">
                        <span>{notif.title}</span>
                    </h1>
                    <hr />
                    <p className="mt-4">{notif.body}</p>
                </li>
                )}
            </ul>
        </NotifContentWrapper>
    )
}