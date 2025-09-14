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

function handleCompleteButton(status) {
    let newTodo;
    if (status === "Completed") {
        newTodo = {...viewData, status: "Pending"};
    } else {
        newTodo = {...viewData, status: "Completed"}
    }
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
                <dl className={`relative rounded-2xl p-3 border-3 text-ptlbrown-100 tracking-widest whitespace-pre-line ${viewData.status === "Completed" ? "bg-green-950 border-green-700" : "bg-red-950/75"}`}>

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
                    <button class={`mt-3 py-2 px-4 border-2 border-green-900 rounded-4xl  cursor-pointer bg-green-800 hover:bg-green-700 block mx-auto transition-allin-300 w-full 
                        ${viewData.status === "Completed" ? "inset-shadow-sm tracking-[10px] inset-shadow-green-900 text-ptlbrown-100 font-extrabold max-w-3xs hover:max-w-full" : 
                        "text-ptlbrown-100 shadow-md shadow-black font-bold active:scale-95"}`} 
                        onClick={() => handleCompleteButton(viewData.status)}>
                    {viewData.status === "Completed" ? "COMPLETED" : "✔ Mark as Done"}
                    </button>
                </dl>
            </TodoFormModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}