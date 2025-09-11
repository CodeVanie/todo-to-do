import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import { createPortal } from "react-dom";
import TodoFormModalWrapper from "../../../layouts/TodoFormModalWrapper";
import FavoriteButton from "../Button/FavoriteButton";
import { AppContext } from "../../../context/app-context";
import { toLocaleDate } from "../../../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ViewTodoModal() {
    const { pathname } = useLocation();
    const { todoid } = useParams();
    const navigate = useNavigate();
    const { listData, setTodos } = useContext(AppContext);
    const viewedTodo = listData[1].list.find(t => t.id === todoid);
    const [viewData, setViewData] = useState(viewedTodo);
    const [isOpen, setIsOpen] = useState(true);
    const [isShowing, setIsShowing] = useState(isOpen);
    
    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

function handleFavoriteButton(newTodo) {
    setViewData(newTodo);
    setTodos((prev) => prev.map((todo) => (todo.id === viewedTodo.id ? newTodo : todo)));
}
function handleClose() {
    setIsOpen(false);
}
function onAnimationEnd() {
    if (!isOpen) {
        setIsShowing(false);
        navigate(`/${pathname.split("/")[1]}`);
    }
}
    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <TodoFormModalWrapper title="To-Do Info" isOpen={isOpen} onClose={handleClose}>
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
                    <dd>{toLocaleDate(viewData.deadline.dueDate)}</dd>
                    <hr />
                </dl>
            </TodoFormModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}