import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import { createPortal } from "react-dom";
import TodoFormModalWrapper from "../../../layouts/TodoFormModalWrapper";
import FavoriteButton from "../Button/FavoriteButton";
import { AppContext } from "../../../context/app-context";

export default function ViewTodoModal({ isOpen, onClose, todo }) {
    const { setTasks } = useContext(AppContext);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [viewData, setViewData] = useState(todo);
    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            setViewData(todo);
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, todo]);

function handleFavoriteButton(newTodo) {
    console.log(newTodo);
    setViewData(newTodo);
    setTasks((prev) => prev.map((task) => (task.id === todo.id ? newTodo : task)));
}
function onAnimationEnd() {
    if (!isOpen) setIsShowing(false);
}
    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <TodoFormModalWrapper title="To-Do Info" isOpen={isOpen} onClose={onClose}>
                <dl className="relative rounded-2xl bg-red-950/75 p-3 text-ptlbrown-100 tracking-widest">
                    <FavoriteButton todo={viewData} onClick={() => handleFavoriteButton({...viewData, favorite: !viewData.favorite})}/>
                    <dt className="text-start italic text-lg xs:absolute xs:text-red-950 -top-10">
                        ID: {viewData.id}
                    </dt>
                    <dt className="mt-0">TITLE</dt>
                    <dd>{viewData.label}</dd>
                    <hr />
                    {viewData.priority && (
                    <>
                        <dt>PRIORITY</dt>
                        <dd>{viewData.priority}</dd>
                        <hr />
                    </>
                    )}
                    {viewData.category && (
                    <>
                        <dt>CATEGORY</dt>
                        <dd>{viewData.category}</dd>
                        <hr />
                    </>
                    )}
                    {viewData.details && (
                    <>
                        <dt>DETAILS</dt>
                        <dd>{viewData.details}</dd>
                        <hr />
                    </>
                    )}
                    <dt>DEADLINE</dt>
                    <dd>{viewData.deadline.label} {viewData.deadline.time}</dd>
                    <hr />
                </dl>
            </TodoFormModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}