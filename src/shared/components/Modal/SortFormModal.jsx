import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground.jsx";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper.jsx";
import { AppContext } from "../../../context/app-context.jsx";
import FormWrapper from "../Form/FormWrapper.jsx";
import { SubmitButton, StatusButton } from "../Button/buttons.js"
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
            setIsOpen(false);
        }, 1000);
    }

    function onAnimationEnd() {
        if (!isOpen) {
            setIsShowing(false);
            navigate(`/${pathname.split("/")[1]}`);
        }
    }

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper title={`Edit Sort`} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <FormWrapper onSubmit={onSave}>
                    <div className="flex justify-between items-end mt-2">
                        <label htmlFor="sort-name" className="text-start">
                            SORT TYPE
                        </label>
                        <StatusButton isActive={newSort.active} 
                        onClick={() => setNewSort(prev => ({...prev, active: !newSort.active}))} />
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