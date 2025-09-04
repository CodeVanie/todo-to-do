import { PortfolioIcon } from "../../shared/icons/IconCollection"

export default function Portfolio({ currentPage }) {
    return (
        <a href="/" className='flex grow max-sm:basis-1/10 basis-1/5 justify-end items-center hover:scale-110 transition duration-100 ease-in'>
            <span className="max-lg:hidden leading-tight text-end max-w-44 mr-3 font-bold">← Go back to CodeVANIE's Portfolio</span>
            <PortfolioIcon className={`w-7 h-7 max-md:w-6 max-md:h-6 
            ${currentPage === "/modify" ? "text-red-950" : "text-ptlbrown-100"}`}/>
        </a>
    )
}