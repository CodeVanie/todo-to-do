
export default function ModalBackground({ isOpen, children, onAnimationEnd }) {
    
    return (
        <div onAnimationEnd={onAnimationEnd} className={`fixed grid place-items-center inset-0 z-50 max-md:bg-smooth-brown bg-center bg-cover p-3 overflow-y-auto scrollbar-hide 
        ${isOpen ? "animate-bgmodalfadein" : "animate-bgmodalfadeout"}`}>
            {children} 
        </div>
    )
}