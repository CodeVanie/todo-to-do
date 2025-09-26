import { createContext, useState } from "react";
import { useControlledList, useControls } from "../../../hooks";

export const ControlContext = createContext();

export default function Controls({ children }) {
    const [showControl, setShowControl] = useState(false);

    const { selectedSort, filteredCategory } = useControlledList();
    const { filterList, sortList } = useControls();
    
    const sortLabel = sortList.find(s => s.id === selectedSort).label;
    const categoryLabel = filterList.find(c => c.id === filteredCategory).label;
    
    return (
        <section id="control" className={`border-2 border-ptlbrown-100 border-dashed
           px-2 pb-1 bg-maroon/75 absolute z-1 top-3 left-3 right-3 text-center 
           rounded-3xl overflow-hidden transition-allin-300 text-ptlbrown-100 font-bold 
           ${showControl ? "max-h-96" : "max-h-10"}`} 

            onMouseEnter={() => {
                if (window.innerWidth > 768) setShowControl(true);
            }}
            onMouseLeave={() => {
                if (window.innerWidth > 768) setShowControl(false);
            }}>

            <div onClick={() => setShowControl(!showControl)} className="text-lg m-1">
                <span className="max-sm:hidden">Controls </span>
                <span className="font-normal">
                    ({sortLabel.toLowerCase()} | {categoryLabel.toLowerCase()})
                </span>
            </div>
            <hr />

            <ControlContext value={{setShowControl}}>
                {children}
            </ControlContext>
        </section>
    )
}