import { memo, useEffect, useRef } from "react";
import { isBetween } from "../../../utils/other-utils";

const SheetsSection = memo(function SheetsSection({ onSheetChange, selectedType, children }) {
    // console.log("SheetsSection Rendered!");
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current && (scrollRef.current.scrollLeft = 
            scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2);
    }, [])

    function handleSheetScroll() {
        const isMobile = window.innerWidth <= 768;

        if (!isMobile || !scrollRef.current) return;

        const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
        const betCandT = scrollWidth/2 - clientWidth;
        const betTandS = scrollWidth/2;
        if (scrollLeft < betCandT && selectedType !== "category") {
            onSheetChange("category");
        } else if (scrollLeft > betTandS && selectedType !== "sort") {
            onSheetChange("sort");
        } else if (isBetween(scrollLeft,betCandT,betTandS) && selectedType !== "todo") {
            onSheetChange("todo");
        }
    }
    
    return (
        <section ref={scrollRef} onScroll={handleSheetScroll} className="grow flex items-start gap-x-2 px-5 2xl:justify-center snap-x snap-mandatory scrollbar-hide overflow-x-auto">
            {children}
        </section>
    )
});

export default SheetsSection;