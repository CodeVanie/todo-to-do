import CloseButton from "../shared/components/Button/CloseButton";
import ModalTitle from "../shared/components/Modal/ModalTitle";

export default function SmallModalWrapper({ title, isOpen, onClose, children }) {
    return (
        <div className={`min-w-xs max-w-sm w-full relative p-3 max-xxs:whitespace-pre-line bg-ptlbrown-100 border-3 border-dashed border-red-950  rounded-3xl ${isOpen ? "animate-modalentry" : "animate-modalexit"}`}>
            <CloseButton onClose={onClose} />
            <ModalTitle>{title}</ModalTitle>
            {children}
        </div>
    )
}