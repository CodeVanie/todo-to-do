
function ModalBackground({ children }) {
    return (
        <div className='fixed inset-0 bg-smooth-brown bg-center bg-cover p-3'>
            {children}
        </div>
    )
}

export default ModalBackground;