
function ModalBackground({ isOpen, children, onAnimationEnd }) {
    console.log(isOpen);
    return (
        <div onAnimationEnd={onAnimationEnd} className={`fixed grid place-items-center inset-0 z-50 max-md:bg-smooth-brown bg-center bg-cover p-3 ${isOpen ? "animate-bgmodalfadein" : "animate-bgmodalfadeout"}`}>
            {children} 
        </div>
    )
}

export default ModalBackground;