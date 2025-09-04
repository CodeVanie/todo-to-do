import { useState } from "react";

function Controls({ children }) {
    const [showControl, setShowControl] = useState(false);
    return (
        <div className={`flex flex-col border-2 box-border border-ptlbrown-100 border-dashed
           px-2 pb-1 bg-yellow-900/75 absolute z-10 top-3 left-3 right-3
           rounded-3xl overflow-hidden transition-all duration-300
           ease-in cursor-pointer text-ptlbrown-100
           ${showControl ? "max-h-96 opacity-100" : "max-h-10 opacity-75"}`} 
            onMouseEnter={() => {
                if (window.innerWidth > 768) setShowControl(true);
            }}
            onMouseLeave={() => {
                if (window.innerWidth > 768) setShowControl(false);
            }}>
            <div className="text-lg text-center font-bold m-1" onClick={() => setShowControl(!showControl)}>
                Controls
            </div>
            <hr />
            {children}
        </div>
    )
}

export default Controls