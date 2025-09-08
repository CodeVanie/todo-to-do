import { useEffect, useRef } from "react";

export default function SheetsSection({ children }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current && (scrollRef.current.scrollLeft = 
            scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2);
    },[]);
    return (
        <section ref={scrollRef} className="relative flex xl:justify-center items-start gap-x-2 px-5 snap-x snap-mandatory z-5 scrollbar-hide overflow-x-auto">
            {children}
        </section>
    )
}