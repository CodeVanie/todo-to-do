import { useContext, useEffect } from "react";
import { AppContext } from "../context/app-context";
import { NotifContext } from "../context/notif-context";
import { toLocaleDate, updateTodoDeadline } from "../utils/date-utils";

export default function ContentWrapper({ children }) {
    const { listData, setTodos } = useContext(AppContext);
    const { notifs, setNotifs } = useContext(NotifContext);

    useEffect(() => {
        if (listData[1].list.length > 0) {
            const newNotifs = [];
            let notifCount = notifs.length;

            setTodos(prev => prev.map(todo => {
                if (todo.status !== "Inactive") {
                    const { type, dueDate, datenums } = todo.deadline;
                    const updatedDueDate = updateTodoDeadline(type, new Date(dueDate), datenums);
                    const reset = new Date(dueDate).getTime() !== updatedDueDate.getTime();

                    if (reset) {
                        newNotifs.push({
                            id: `n_${notifCount++}`,
                            title: "TODO NEXT DEADLINE!",
                            body: `Task "${todo.label}" has been updated.\nNew Deadline: ${toLocaleDate(updatedDueDate)}`,
                            path: `view/${todo.id}`,
                            clicked: false
                        });
                    }

                    return {
                    ...todo,
                    deadline: { ...todo.deadline, dueDate: updatedDueDate },
                    status: reset ? "Pending" : todo.status
                    };
                }
                return todo;
            }));

            if (newNotifs.length > 0) {
                setNotifs(prev => [...prev, ...newNotifs]);
            }
        }
    }, []);

    return (
        <main className="flex min-h-screen bg-black/75">
            {children}
        </main>
    )
}