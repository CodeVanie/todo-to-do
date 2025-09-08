import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";
import { AppContext } from "../../../context/app-context";
import FormWrapper from "../Form/FormWrapper.jsx";
import EraseButton from "../Button/EraseButton";
import SubmitButton from "../Button/SubmitButton.jsx";

export default function CategoryFormModal({ action = "add", isOpen, onClose, modifyValues }) {
    // console.log("CategoryFormModal Rendered");
    const { categories, setCategories } = useContext(AppContext);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [submitting, setSubmitting] = useState(false);
    const [newCategory, setNewCategory] = useState(null);
    
    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            setNewCategory(action === "add" ? {id: `c_${categories.length+2}`, label: "", active: true} : modifyValues);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, action]);

function onSave(e) {
    e.preventDefault();
	setSubmitting(true);

    setTimeout(() => {
        action === "add" ? 
        setCategories((prev) => [...prev, newCategory]) : 
        setCategories((prev) => 
            prev.map((category) => 
                (category.id === modifyValues.id ? newCategory : category)))
        setSubmitting(false);
        setNewCategory({});
        onClose();
    }, 1000);
}
function handleInputChange(e) {
    const { value } = e.target;
    setNewCategory(prev =>  ({...prev, label: value}));
}
function onAnimationEnd() {
    if (!isOpen) setIsShowing(false);
}

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper title={`Add\nCategory`} isOpen={isOpen} onClose={onClose}>
                <EraseButton onErase={() => setNewCategory(prev =>  ({...prev, label: ""}))} />
                <FormWrapper onSubmit={onSave}>
                    <label className="mt-3">CATEGORY NAME</label>
                    <input className="border-2 p-2 border-yellow-700 rounded-lg text-xl outline-0 text-red-950 caret-red-950 w-full hover:outline-1 hover:border-red-950 valid:border-red-950" 
                    placeholder='Add a category name...' type="text" value={newCategory.label ?? ""} onChange={(e) => handleInputChange(e)} required/>
                    <SubmitButton
						isSubmitting={submitting}
						isValid={newCategory.label}/>
                </FormWrapper>
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}