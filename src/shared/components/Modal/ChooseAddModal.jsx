import { createPortal } from "react-dom";
import ModalTitle from "../Form/ModalTitle";
import { useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import CloseButton from "../Button/CloseButton";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";

export default function ChooseAddModal({ isOpen, onClose, addTaskModal, addCategoryModal }) {
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

    function handleAddTaskButton() {
        onClose();
        addTaskModal();
    }
    function handleAddCategoryButton() {
        onClose();
        addCategoryModal();
    }
    function onAnimationEnd() {
        if (!isOpen) setIsShowing(false);
    }

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper isOpen={isOpen}>
                <CloseButton onClose={onClose} />
                <ModalTitle>Choose</ModalTitle>
                <div className="flex flex-col w-70 gap-y-3 mt-3 font-bold text-red-950">
                    <button type="button" onClick={handleAddTaskButton} 
                    className="flex-1 py-2 bg-ptlbrown-100 border-2 border-red-950 rounded-4xl hover:bg-red-950 hover:text-ptlbrown-100 cursor-pointer">Add Task</button>
                    <button type="button" onClick={handleAddCategoryButton} 
                    className="flex-1 py-2 bg-ptlbrown-100 border-2 border-red-950 rounded-4xl hover:bg-red-950 hover:text-ptlbrown-100 cursor-pointer">Add Category</button>
                </div>
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}