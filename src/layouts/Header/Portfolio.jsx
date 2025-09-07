import { PortfolioIcon } from "../../shared/icons/IconCollection"

export default function Portfolio({ currentPage }) {
// flex grow max-sm:basis-1/10 basis-1/5 justify-end items-center lg:hover:scale-110 transition-out-200
    return (
        <a href="/" className='basis-1/5 max-sm:basis-1/10 flex justify-end items-center lg:hover:scale-110 transition-out-200'>
            <span className="max-lg:hidden leading-tight text-end max-w-44 mr-3 font-bold">← Go back to CodeVANIE's Portfolio</span>
            <PortfolioIcon className={`w-7 h-7 max-lg:hover:scale-110 transition-out-200
            ${currentPage === "/modify" ? "text-red-950" : "text-ptlbrown-100"}`}/>
        </a>
    )
}