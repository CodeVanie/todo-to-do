
function ModalBackground({ isOpen, children, onAnimationEnd }) {
    return (
        <div onAnimationEnd={onAnimationEnd} className={`fixed grid place-items-center inset-0 z-50 max-md:bg-smooth-brown bg-center bg-cover p-3 max-sm:overflow-y-auto 
        ${isOpen ? "animate-bgmodalfadein" : "animate-bgmodalfadeout"}`}>
            {children} 
        </div>
    )
}

export default ModalBackground;