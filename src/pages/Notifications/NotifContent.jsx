import { useContext } from "react";
import NotifContentWrapper from "../../layouts/NotifContentWrapper";
import { AppContext } from "../../context/app-context";

export default function NotifContent() {
    // console.log("NotifContent rendered");
    const { notifs } = useContext(AppContext);
    return (
        <NotifContentWrapper>
            <ul className="space-y-3">
            {notifs.map((notif) => 
                <li className="bg-red-950/50 hover:bg-red-950/75 cursor-pointer rounded-4xl py-3 px-6 text-ptlbrown-100">
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