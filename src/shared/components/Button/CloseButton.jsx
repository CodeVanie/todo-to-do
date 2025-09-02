import CloseIcon from "../../icons/CloseIcon"

function CloseButton({ onClose }) {
    return (
        <button onClick={onClose} className="absolute top-2 right-2 active:scale-110 hover:scale-110 cursor-pointer text-red-950">
            <CloseIcon className="w-10 h-10 text-red-950" />
        </button>

    )
}

export default CloseButton