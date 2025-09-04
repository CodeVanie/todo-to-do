import { createPortal } from "react-dom";
import ModalTitle from "../Form/ModalTitle";
import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import CloseButton from "../Button/CloseButton";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";
import { AppContext } from "../../../context/app-context";

export default function CategoryFormModal({ type = "add", isOpen, onClose, modifyValues }) {
    const { categories, setCategories } = useContext(AppContext);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [newCategory, setNewCategory] = useState({});
    
    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            setNewCategory(type === "add" ? {id: `c_${categories.length}`, label: ""} : modifyValues);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, type]);

function handleInputChange(e) {
    const { value } = e.target;
    setNewCategory(prev =>  ({...prev, label: value}));
}
function onAnimationEnd() {
    if (!isOpen) setIsShowing(false);
}
function handleSaveButton() {
    type === "add" ? 
        setCategories((prev) => [...prev, newCategory]) : 
        setCategories((prev) => 
            prev.map((category) => 
                (category.id === modifyValues.id ? newCategory : category)));
    onClose();
}

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper isOpen={isOpen}>
                <CloseButton onClose={onClose} />
                <ModalTitle>Choose</ModalTitle>
                <div className="flex flex-col w-full gap-y-3 mt-3 font-bold text-red-950">
                    <label>CATEGORY NAME</label>
                    <input className="border-2 p-2 border-yellow-700 rounded-lg text-xl outline-0 basis-full text-red-950 caret-red-950 w-full hover:outline-1 hover:border-red-950 valid:border-red-950" 
                    placeholder='Add a category name...' type="text" value={newCategory.label} onChange={(e) => handleInputChange(e)} required/>
                    <button type="button" onClick={handleSaveButton} 
                    className="flex-1 py-2 bg-ptlbrown-100 border-2 border-red-950 rounded-4xl hover:bg-red-950 hover:text-ptlbrown-100 cursor-pointer tracking-widest">SAVE</button>
                </div>
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}