import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmMessage from "./ConfirmMessage";
import { AppContext } from "../../../context/app-context";
import { SpinnerIcon } from "../../icons/IconCollection";

export default function ConfirmModal() {
    const { listData, setTodos, setCategories } = useContext(AppContext);
    const { pathname, state } = useLocation();
    const { action } = useParams();
    const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(true);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const selectedItemsIDs = state.selectedItems ?? [];
    const selectedType = state.selectedType;
    const itemLabels = converToLabels(selectedItemsIDs);

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

    function converToLabels(ids) {
        let labels = [];
        if (isOpen) {
            labels = ids.map((id) => {
                const item = listData[0].list.find(c => c.id === id) || listData[1].list.find(t => t.id === id);
                return item.label;
            }
            );
        }
        return labels;
    }
    
    function handleYesButton() {
        setIsSubmitting(true);
        let list = selectedType === "todo" ? listData[1].list : listData[0].list;
        var newList = [];

        list.forEach(item => { // Create an array for items we don't want to delete
            !(selectedItemsIDs.includes(item.id)) && newList.push(item)
        });

        setTimeout(() => {
            selectedType === "todo" && setTodos(newList);
            selectedType === "category" && setCategories(newList);
            
            setIsOpen(false);
        }, 1000);
    }

    function onAnimationEnd() {
        if (!isOpen) {
            setIsShowing(false);
            setIsSubmitting(false);
            navigate(`/${pathname.split("/")[1]}`);
        }
    }

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper title="Are you sure?" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ConfirmMessage 
                    message={`${action === "delete" ? "Do you want to delete the following items?" : ""}`}/>
                    <ul className="mt-3 text-center text-red-950 overflow-hidden whitespace-nowrap">
                        {itemLabels.map((label, index) => 
                            <li key={index}>{label}</li>
                        )}
                    </ul>
                <div className="flex gap-x-10 justify-evenly mt-7 text-white font-bold text-lg">
                    <button className="flex-1 px-4 py-2 bg-green-800 hover:bg-green-700 rounded-3xl cursor-pointer transition-out-200" onClick={handleYesButton}>
                        {!isSubmitting ? "Yes" : 
                            <SpinnerIcon className="w-6 mx-auto animate-spin"/>
                        }
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-800 hover:bg-red-700 rounded-3xl cursor-pointer transition-out-200" onClick={() => setIsOpen(false)}>
                        No
                    </button>
                </div>
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}