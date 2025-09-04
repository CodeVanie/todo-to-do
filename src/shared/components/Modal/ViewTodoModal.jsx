import { useEffect, useState } from "react"; 
import CloseButton from "../Button/CloseButton";
import ModalTitle from "../Form/ModalTitle";
import ModalBackground from "./ModalBackground";
import { createPortal } from "react-dom";
import TodoFormModalWrapper from "../../../layouts/TodoFormModalWrapper";

export default function ViewTodoModal({ isOpen, onClose, todo }) {
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

function onAnimationEnd() {
    if (!isOpen) setIsShowing(false);
}
    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <TodoFormModalWrapper isOpen={isOpen}>
                <CloseButton onClose={onClose} />
                <ModalTitle>To-Do Info</ModalTitle>
                <dl className="flex flex-col border rounded-2xl bg-red-950/75 px-3 pb-3 text-ptlbrown-100 h-full w-full tracking-widest">
                    <dt className="text-start italic text-lg xs:absolute xs:text-red-950 top-2">
                        ID: {viewData.id}
                    </dt>
                    <dt>TITLE</dt>
                    <dd>{viewData.label}</dd>
                    <hr />
                    <dt>PRIORITY</dt>
                    <dd>{viewData.priority}</dd>
                    <hr />
                    <dt>CATEGORY</dt>
                    <dd>{viewData.category}</dd>
                    <hr />
                    <dt>DETAILS</dt>
                    <dd>{viewData.details}</dd>
                    <hr />
                    <dt>DEADLINE</dt>
                    <dd>{viewData.deadline.label} {viewData.deadline.time}</dd>
                    <hr />
                </dl>
            </TodoFormModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}