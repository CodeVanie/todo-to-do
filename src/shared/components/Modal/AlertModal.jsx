import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";
import AlertMessage from "./AlertMessage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../../context/alert-context";

export default function AlertModal() {
    const { pathname } = useLocation();
	const { alertid } = useParams();
    const navigate = useNavigate();
    const { alertMessages } = useContext(AlertContext);
	const [isOpen, setIsOpen] = useState(true);
    const [isShowing, setIsShowing] = useState(isOpen);
    const alertMessage = alertMessages.find(a => a.id === alertid);

    useEffect(() => {
        if (isOpen) {
          setIsShowing(true);
        }
    }, [isOpen]);

    function onAnimationEnd() {
        if (!isOpen) {
            setIsShowing(false);
            navigate(`/${pathname.split("/")[1]}`);
        }
    }

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper title={alertMessage.title} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <AlertMessage message={alertMessage.message} />
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}