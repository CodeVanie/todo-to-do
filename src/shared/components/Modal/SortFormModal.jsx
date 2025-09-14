import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground.jsx";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper.jsx";
import { AppContext } from "../../../context/app-context.jsx";
import FormWrapper from "../Form/FormWrapper.jsx";
import EraseButton from "../Button/EraseButton.jsx";
import SubmitButton from "../Button/SubmitButton.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function SortFormModal() {
    // console.log("SortFormModal Rendered");
    const { pathname } = useLocation();
	const { sortid } = useParams();
    const navigate = useNavigate();
    const { listData, setSortTypes } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(true);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [submitting, setSubmitting] = useState(false);
    const editSortData = listData[2].list.find(s => s.id === sortid);
    const [newSort, setNewSort] = useState(editSortData);
    
    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

function onSave(e) {
    e.preventDefault();
	setSubmitting(true);

    setTimeout(() => {
        setSortTypes((prev) => 
            prev.map((sort) => 
                (sort.id === editSortData.id ? newSort : sort)))
        setSubmitting(false);
        handleClose();
    }, 1000);
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
            <SmallModalWrapper title={`Edit Sort`} isOpen={isOpen} onClose={handleClose}>
                <FormWrapper onSubmit={onSave}>
                    <div className="flex justify-between items-end mt-2">
                        <label htmlFor="sort-name" className="text-start">
                            SORT TYPE
                        </label>
                        <button type="button" 
                        onClick={() => setNewSort(prev => ({...prev, active: !newSort.active}))} 
                        className={`py-1 px-2 text-white font-bold tracking-widest self-end rounded-lg cursor-pointer hover:scale-105 transition-out-200 active:scale-97 
                            ${newSort.active ? "shadow-[1px_1px_5px_#26800a,3px_3px_5px_#26800a] bg-green-500" : 
                                                   "shadow-[1px_1px_5px_#430c0a,3px_3px_5px_#430c0a] bg-red-500"}`}>
                            {newSort.active ? "ACTIVE" : "INACTIVE"}
                        </button>
                    </div>
                    <input id="sort-name" className="border-0 text-xl text-red-950 w-full" 
                    type="text" value={newSort.label ?? ""} disabled={true}/>
                    <SubmitButton
						isSubmitting={submitting}
						isValid={newSort.label}/>
                </FormWrapper>
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}