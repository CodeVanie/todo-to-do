import { PortfolioIcon } from "../../shared/icons/IconCollection"

export default function Portfolio() {
    
    return (
        <a href="https://vanie-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className='basis-2/14 sm:basis-1/5 flex justify-end gap-x-3 items-center pr-2 lg:hover:scale-110 transition-out-200'>
            <h1 className="max-lg:hidden leading-4 text-lg text-end pt-1">
                CodeVANIE's<br />Portfolio
            </h1>          
            <PortfolioIcon className="w-6 xs:scale-115"/>
        </a>
    )
}