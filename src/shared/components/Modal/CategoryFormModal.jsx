import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";
import { AppContext } from "../../../context/app-context";
import Form from "../Form/Form.jsx";
import EraseButton from "../Button/EraseButton";

export default function CategoryFormModal({ action = "add", isOpen, onClose, modifyValues }) {
    const { categories, setCategories } = useContext(AppContext);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [newCategory, setNewCategory] = useState({});
    
    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            setNewCategory(action === "add" ? {id: `c_${categories.length}`, label: ""} : modifyValues);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, action]);

function handleInputChange(e) {
    const { value } = e.target;
    setNewCategory(prev =>  ({...prev, label: value}));
}
function onAnimationEnd() {
    if (!isOpen) setIsShowing(false);
}
function handleSaveButton() {
    action === "add" ? 
        setCategories((prev) => [...prev, newCategory]) : 
        setCategories((prev) => 
            prev.map((category) => 
                (category.id === modifyValues.id ? newCategory : category)));
    setNewCategory({});
    onClose();
}

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper title={`Add\nCategory`} isOpen={isOpen} onClose={onClose}>
                <EraseButton onErase={() => setNewCategory(prev =>  ({...prev, label: ""}))} />
                <Form onSubmit={handleSaveButton}>
                    <label className="mt-3">CATEGORY NAME</label>
                    <input className="border-2 p-2 border-yellow-700 rounded-lg text-xl outline-0 text-red-950 caret-red-950 w-full hover:outline-1 hover:border-red-950 valid:border-red-950" 
                    placeholder='Add a category name...' type="text" value={newCategory.label} onChange={(e) => handleInputChange(e)} required/>
                    <button type="button" onClick={handleSaveButton} disabled={!newCategory.label}
                    className="py-2 mt-2 font-bold text-red-950 bg-ptlbrown-100 border-2 disabled:border-red-950/45 disabled:text-red-950/45 border-red-950 rounded-4xl enabled:hover:bg-red-950 enabled:hover:text-ptlbrown-100  enabled:cursor-pointer tracking-widest">SAVE</button>
                </Form>
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}