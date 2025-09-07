import CloseButton from "../shared/components/Button/CloseButton";
import ModalTitle from "../shared/components/Modal/ModalTitle";

export default function TodoFormModalWrapper({ title, isOpen, onClose, children }) {
    return (
        <div className={`w-full max-w-[850px] min-w-0 xm:max-h-[90vh] relative p-3 border-3 xm:border-20 xm:border-double bg-ptlbrown-100 border-red-950 scrollbar-hide rounded-3xl xm:overflow-y-auto 
        ${isOpen ? "animate-modalentry" : "animate-modalexit"}`}>
            <CloseButton onClose={onClose} />
            <ModalTitle>{title}</ModalTitle>
            {children}
        </div>
    )
}