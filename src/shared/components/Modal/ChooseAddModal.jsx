import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";

// THIS IS NOT USED
export default function ChooseAddModal({ isOpen, onClose, addTodoModal, addCategoryModal }) {
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

    function handleAddTodoButton() {
        addTodoModal();
        onClose();
    }
    function handleAddCategoryButton() {
        addCategoryModal();
        onClose();
    }
    function onAnimationEnd() {
        if (!isOpen) setIsShowing(false);
    }

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper title="Choose" isOpen={isOpen} onClose={onClose}>
                <div className="flex flex-col gap-y-3 mt-3 font-bold text-red-950">
                    <button type="button" onClick={handleAddTodoButton} 
                    className="py-2 bg-ptlbrown-100 border-2 border-red-950 rounded-4xl hover:bg-red-950 hover:text-ptlbrown-100 cursor-pointer">
                        Add Task
                    </button>
                    <button type="button" onClick={handleAddCategoryButton} 
                    className="py-2 bg-ptlbrown-100 border-2 border-red-950 rounded-4xl hover:bg-red-950 hover:text-ptlbrown-100 cursor-pointer">
                        Add Category
                    </button>
                </div>
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}