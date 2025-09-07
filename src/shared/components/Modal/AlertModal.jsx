import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import SmallModalWrapper from "../../../layouts/SmallModalWrapper";
import AlertMessage from "./AlertMessage";

export default function AlertModal({ isOpen, onClose, message }) {
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

function onAnimationEnd() {
    if (!isOpen) setIsShowing(false);
}

    return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <SmallModalWrapper title="Chill!" isOpen={isOpen} onClose={onClose}>
                <AlertMessage message={message} />
            </SmallModalWrapper>
        </ModalBackground>,
        document.body
    ) : null;
}