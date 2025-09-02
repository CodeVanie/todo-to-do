import { useState } from "react";

function Controls({ children }) {
    const [showControl, setShowControl] = useState(false);
    function toggleControl() {setShowControl(prev => !prev)};
    return (
        <div className={`flex flex-col border-2 box-border border-ptlbrown-100 
           w-full px-2 pb-1 bg-[url(/images/header-bg.jpg)] bg-cover bg-center 
           rounded-2xl opacity-75 overflow-hidden transition-[max-height] duration-300 
           ease-in cursor-pointer 
           ${showControl ? "max-h-96" : "max-h-10"}`} 
            onMouseEnter={() => {
                if (window.innerWidth > 768) setShowControl(true);
            }}
            onMouseLeave={() => {
                if (window.innerWidth > 768) setShowControl(false);
            }}>
            <div className="text-lg text-center font-bold m-1" onClick={toggleControl}>
                Controls
            </div>
            <hr />
            {children}
        </div>
    )
}

export default Controls