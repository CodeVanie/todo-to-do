import closeButton from '../../assets/images/close-logo.svg'

function CloseButton({ onClose }) {
    return (
        <button onClick={onClose} className="absolute top-2 right-2 w-10 h-10 active:scale-110">
            <img src={closeButton} alt="closebutton" />
        </button>
    )
}

export default CloseButton