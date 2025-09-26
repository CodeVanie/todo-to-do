import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";
import { AppContext } from "../../../context/app-context";
import FormWrapper from "../Form/FormWrapper.jsx";
import { SubmitButton, EraseButton, StatusButton } from "../Button/buttons.js"
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CategoryFormModal() {
    // console.log("CategoryFormModal Rendered");
    const { pathname } = useLocation();
	const { action, categid } = useParams();
    const navigate = useNavigate();
    const { listData, setCategories } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(true);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [submitting, setSubmitting] = useState(false);
    const [newCategory, setNewCategory] = useState({id: null, label: null, active: null});
    const editCategData = action === "edit" ? listData[0].list.find(c => c.id === categid) : null;
    
    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            setNewCategory(action === "add" ? {id: `c_${listData[0].list.length+3}`, label: "", active: true} : editCategData);
        }
    }, [isOpen, action]);

    function onSave(e) {
        e.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            action === "add" ? 
            setCategories((prev) => [...prev, newCategory]) : 
            setCategories((prev) => 
                prev.map((category) => 
                    (category.id === editCategData.id ? newCategory : category)))

            setSubmitting(false);
            setNewCategory({id: null, label: null, active: null});
            setIsOpen(false);
        }, 1000);
    }

    function handleInputChange(e) {
        const { value } = e.target;
        setNewCategory(prev =>  ({...prev, label: value}));
    }
    
    function onAnimationEnd() {
        if (!isOpen) {
            setIsShowing(false);
            navigate(`/${pathname.split("/")[1]}`);
        }
    }

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper title={`Add\nCategory`} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <EraseButton onErase={() => setNewCategory(prev =>  ({...prev, label: ""}))} />
                <FormWrapper onSubmit={onSave}>
                    <div className="flex justify-between items-end">
                        <label htmlFor="category-name" className="text-start">
                            CATEGORY NAME
                        </label>
                        <StatusButton isActive={newCategory.active} 
                        onClick={() => setNewCategory(prev => ({...prev, active: !newCategory.active}))} />
                    </div>
                    <input id="category-name" className="border-2 p-2 border-yellow-700 rounded-lg text-xl outline-0 text-red-950 caret-red-950 w-full hover:outline-1 hover:border-red-950 valid:border-red-950" 
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